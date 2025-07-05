import EmployerApplyMelaFormModal from "@/pages/MelaDetailsPage/components/EmployerApplyMelaFormModal";
import Loading from "@/components/customComponents/Loading";
import type { JobPosting, Mela } from "@/types";

interface JobPostingsEmployerProps {
  melaInfo: Mela | null;
  jobPostings: JobPosting[];
  isLoading: boolean;
}

const JobPostingsEmployer = ({ melaInfo, jobPostings, isLoading }: JobPostingsEmployerProps) => {
  if (isLoading) {
    return <Loading item="Jobs" />;
  }

  if (!jobPostings || jobPostings.length === 0) {
    return (
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Job Postings at this Mela
        </h2>
        <div className="border border-dashed border-gray-300 p-6 rounded-md text-gray-500 text-sm text-center mb-5">
          No job postings available yet.
        </div>
        <div className="flex justify-end mt-4">
          {melaInfo && <EmployerApplyMelaFormModal mela={melaInfo} />}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Job Postings at this Mela
      </h2>
      {jobPostings.length === 0 ? (
        <div className="border border-dashed border-gray-300 p-6 rounded-md text-gray-500 text-sm text-center mb-5">
          No job postings available yet.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="max-h-full overflow-y-auto flex flex-col gap-3">
            {jobPostings.map((job, index) => {
              return (
                <div key={index} className="w-full">
                  <div className="flex justify-between items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-emerald-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-emerald-900 dark:has-[[aria-checked=true]]:bg-emerald-950">
                    <div className="flex gap-3">
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
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end mt-4">
            {melaInfo && <EmployerApplyMelaFormModal mela={melaInfo} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPostingsEmployer;
