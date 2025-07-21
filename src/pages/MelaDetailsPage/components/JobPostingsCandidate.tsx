import Loading from "@/components/customComponents/Loading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { CandidateUser, JobPosting } from "@/types";
import {
  Loader,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Users,
  Building2,
  ClipboardCheck,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

// Helper function to generate company initials
const getCompanyInitials = (companyName: string): string => {
  if (!companyName) return "UK";

  const words = companyName.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return words[0].substring(0, 2).toUpperCase();
};

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
    (job) => job.isApplied !== 1,
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
        },
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
            : job,
        ),
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
    <div className="mt-10 px-4 lg:px-8 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Job Postings at this Mela
      </h2>
      {filteredJobPostings.length === 0 ? (
        <div className="border border-dashed border-gray-300 p-6 rounded-md text-gray-500 text-sm text-center mb-5">
          No job postings available yet.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <p className="my-2 text-yellow-600 text-sm px-8 py-4 bg-yellow-100 rounded-xl">
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
                  (j) => j.job_id === job.job_id,
                );
                const checkboxChecked = isApplied || isSelected;

                return (
                  <div key={index} className="w-full">
                    <Label className="hover:bg-accent/50 flex justify-between items-start gap-4 rounded-lg border p-4 has-[[aria-checked=true]]:border-emerald-600 has-[[aria-checked=true]]:bg-emerald-50 dark:has-[[aria-checked=true]]:border-emerald-900 dark:has-[[aria-checked=true]]:bg-emerald-950 has-[:checked=true]:border-emerald-600]">
                      <div className="flex gap-4 flex-1">
                        <Checkbox
                          id={`job-${index}`}
                          disabled={!!isDisabled}
                          checked={checkboxChecked}
                          onCheckedChange={(checked) => {
                            if (isDisabled) return;

                            setSelectedJobs((prev) =>
                              checked
                                ? [...prev, job]
                                : prev.filter((j) => j.job_id !== job.job_id),
                            );
                          }}
                          className="sr-only data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600 data-[state=checked]:text-white dark:data-[state=checked]:border-emerald-700 dark:data-[state=checked]:bg-emerald-700 mt-1"
                        />

                        {/* Main Content Area */}
                        <div className="flex-1 grid gap-3">
                          {/* Job Title and Company */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4 text-emerald-600" />
                              <h3 className="text-base sm:text-xl font-semibold text-gray-900">
                                {job.post_name || "Unknown Job Title"}
                              </h3>
                            </div>
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-gray-500" />
                              <p className="text-gray-700 font-medium leading-5">
                                {job.company_name || "Unknown Company"}
                              </p>
                            </div>
                          </div>

                          {/* Job Details Grid */}
                          <div className="text-xs grid grid-cols-1 md:grid-cols-2 gap-2 sm:text-sm text-gray-600">
                            {/* Location */}
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span>
                                {job.companyAddress || "Location not specified"}
                              </span>
                            </div>

                            {/* Qualification */}
                            <div className="flex items-center gap-2">
                              <GraduationCap className="w-4 h-4 text-gray-400" />
                              <span>
                                {job.vsQualification ||
                                  "Qualification not specified"}
                              </span>
                            </div>

                            {/* Vacancies */}
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span>
                                {job.vacancy || "Not specified"} positions
                              </span>
                            </div>

                            {/* Total Applicants */}
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span>
                                {job.total_applicants ?? 0} applicants
                              </span>
                            </div>

                            {/* Participation Dates */}
                            {job.participation_dates && (
                              <div className="flex items-start gap-2">
                                <Calendar className="w-4 h-4 text-gray-400 mt-1" />
                                <span className="flex flex-wrap gap-x-2 text-sm text-gray-700">
                                  {job.participation_dates
                                    .split(",")
                                    .map((date) => date.trim())
                                    .map((date, i, arr) => (
                                      <span
                                        key={i}
                                        className="flex items-center gap-2"
                                      >
                                        <span>{date}</span>
                                        {i < arr.length - 1 && (
                                          <span className="text-gray-400">
                                            |
                                          </span>
                                        )}
                                      </span>
                                    ))}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Selection Procedure */}
                          <Badge className="bg-emerald-100 border-1 border-emerald-500">
                            <ClipboardCheck className="w-4 h-4 text-gray-800" />
                            <span className="capitalize text-gray-800">
                              {job.vsSelectionProcedure || "TBD"}
                            </span>
                          </Badge>
                        </div>
                      </div>

                      {/* Right Side - Avatar and Status */}
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          {getCompanyInitials(job.company_name || "UK")}
                        </div>

                        {isApplied ? (
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full whitespace-nowrap">
                            ✅ Applied
                          </span>
                        ) : null}
                      </div>
                    </Label>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end mt-4">
              {!user ? (
                <ApplyDialog />
              ) : (
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
