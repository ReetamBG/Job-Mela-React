import Loading from "@/components/customComponents/Loading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { CandidateUser, JobPosting } from "@/types";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface JobPostingsProps {
  user: CandidateUser | null;
  userId: number | null;
  melaId: string;
  jobPostings: JobPosting[];
  setJobPostings: React.Dispatch<React.SetStateAction<JobPosting[]>>;
  isLoading: boolean;
}

const JobPostings = ({
  melaId,
  jobPostings,
  setJobPostings,
  userId,
  isLoading,
  user,
}: JobPostingsProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState<JobPosting[]>([]);

  const filteredJobPostings = jobPostings.filter((job) => job.isEligible !== 1);

  const areJobsLeftToApply = filteredJobPostings.some(
    (job) => job.isApplied !== 1
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedJobs.length === 0) {
      toast.info("Please select at least one job posting to apply for.");
      return;
    }

    // send application to server
    const jobPostDetails = selectedJobs.map((job) => ({
      jobId: job.job_id,
      companyId: job.fklEmployerId,
    }));
    try {
      setIsSubmitting(true);
      const res = await fetch(
        import.meta.env.VITE_BASE_URL + "/v1/candidate/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            candidateId: userId,
            melaID: melaId,
            applications: jobPostDetails,
          }),
        }
      );
      const resData = await res.json();
      if (!res.ok || resData.status !== true) {
        throw new Error(resData.message || "Failed to submit application");
      }

      toast.success("Application submitted successfully!");
      setSelectedJobs([]);

      // manually update state to reflect applied jobs
      setJobPostings((prev) =>
        prev.map((job) =>
          selectedJobs.some((j) => j.job_id === job.job_id)
            ? { ...job, isApplied: 1 }
            : job
        )
      );
      setIsSubmitting(false);
    } catch (error) {
      console.log("Error submitting application:", error);
      toast.error("Error submitting application. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loading item="Jobs" />;

  if (!jobPostings || jobPostings.length === 0) {
    return (
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Job Postings at this Mela
        </h2>
        <div className="border border-dashed border-gray-300 p-6 rounded-md text-gray-500 text-sm text-center mb-5">
          No job postings available yet.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Job Postings at this Mela
      </h2>
      {filteredJobPostings.length === 0 ? (
        <div className="border border-dashed border-gray-300 p-6 rounded-md text-gray-500 text-sm text-center mb-5">
          No job postings available yet.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <p className="my-2 text-emerald-700 text-sm p-3 border border-emerald-400 rounded-xl">
            Click to select the postings you want to apply for.
            <br />
            You can select multiple postings and apply for them all at once.
          </p>
          <form onSubmit={handleSubmit} id="job-application-form">
            <div className="max-h-full overflow-y-auto flex flex-col gap-3">
              {filteredJobPostings.map((job, index) => {
                const isApplied = job.isApplied ? job.isApplied === 1 : 0;
                const isIneligible = job.isEligible ? job.isEligible === 1 : 0;
                const isDisabled = isApplied || isIneligible;

                const isSelected = selectedJobs.some(
                  (j) => j.job_id === job.job_id
                );
                const checkboxChecked = isApplied || isSelected;

                return (
                  <div key={index} className="w-full">
                    <Label className="hover:bg-accent/50 flex justify-between items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-emerald-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-emerald-900 dark:has-[[aria-checked=true]]:bg-emerald-950">
                      <div className="flex gap-3">
                        <Checkbox
                          id={`job-${index}`}
                          disabled={!!isDisabled}
                          checked={checkboxChecked}
                          onCheckedChange={(checked) => {
                            if (isDisabled) return; // Don't update state if applied or ineligible

                            setSelectedJobs((prev) =>
                              checked
                                ? [...prev, job]
                                : prev.filter((j) => j.job_id !== job.job_id)
                            );
                          }}
                          className="data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600 data-[state=checked]:text-white dark:data-[state=checked]:border-emerald-700 dark:data-[state=checked]:bg-emerald-700"
                        />
                        <div className="grid gap-1.5 font-normal">
                          <p className="text-base leading-none font-medium">
                            Job Title:{" "}
                            <span className="text-emerald-700">
                              {job.post_name || "Unknown Job Title"}
                            </span>
                          </p>
                          <p className="text-muted-foreground text-sm">
                            Company: {job.company_name || "Unknown Company"}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            Minimum Qualification: 10th Pass
                          </p>
                        </div>
                      </div>

                      {/* status */}
                      {isApplied ? (
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                          ✅ Already Applied
                        </span>
                      ) : isIneligible ? (
                        <span className="text-xs font-semibold text-red-700 bg-red-100 px-3 py-1 rounded-full">
                          ⚠️ Not Eligible
                        </span>
                      ) : null}
                    </Label>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end mt-4">
              {!user ? (
                <ApplyDialog />
              ) : (
                // only show the apply button if there are jobs left to apply
                areJobsLeftToApply && (
                  <ApplyDialog user={user} isSubmitting={isSubmitting} />
                )
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default JobPostings;

const ApplyDialog = ({
  user,
  isSubmitting,
}: {
  user?: CandidateUser | null;
  isSubmitting?: boolean;
}) => (
  <Dialog>
    <Button asChild className="rounded-full">
      <DialogTrigger>Apply for mela</DialogTrigger>
    </Button>
    {user ? (
      <DialogContent className="w-auto">
        <DialogHeader className="px-4">
          <DialogTitle>
            Are you sure you want to apply for the selected melas?
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 justify-end">
          <Button type="submit" form="job-application-form" className="">
            {isSubmitting ? <Loader className="animate-spin" /> : "Yes"}
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    ) : (
      <DialogContent className="w-auto">
        <DialogHeader>
          <DialogTitle>Almost there!</DialogTitle>
          <DialogDescription>
            You need to log in or register to apply for this job.
            <br />
            It only takes a minute to get started!
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 justify-end">
          <Button asChild>
            <a
              href={`https://public-registration.skillmissionassam.org/login?redirect=${window.location.href}`}
            >
              Login
            </a>
          </Button>
          <Button asChild>
            <a
              href={`https://public-registration.skillmissionassam.org/register?redirect=${window.location.href}`}
            >
              Register
            </a>
          </Button>
        </div>
      </DialogContent>
    )}
  </Dialog>
);
