import EmployerApplyMelaFormModal from "@/pages/MelaDetailsPage/components/EmployerApplyMelaFormModal";
import Loading from "@/components/customComponents/Loading";
import type { JobPosting, Mela } from "@/types";
import {
  Briefcase,
  Building2,
  Calendar,
  ClipboardCheck,
  GraduationCap,
  MapPin,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface JobPostingsEmployerProps {
  melaInfo: Mela | null;
  jobPostings: JobPosting[];
  isLoading: boolean;
}

const getCompanyInitials = (companyName: string): string => {
  if (!companyName) return "UK";

  const words = companyName.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return words[0].substring(0, 2).toUpperCase();
};

const JobPostingsEmployer = ({
  melaInfo,
  jobPostings,
  isLoading,
}: JobPostingsEmployerProps) => {
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
    <div className="mt-10 px-8 pb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Job Postings at this Mela
      </h2>

      <div className="flex flex-col gap-6">
        <div className="max-h-full overflow-y-auto flex flex-col gap-3">
          {jobPostings.map((job, index) => (
            <div key={index} className="w-full">
              <div className="flex justify-between items-start gap-4 rounded-lg border p-4 has-[[aria-checked=true]]:border-emerald-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-emerald-900 dark:has-[[aria-checked=true]]:bg-emerald-950">
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
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>
                        {job.companyAddress || "Location not specified"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-gray-400" />
                      <span>
                        {job.vsQualification || "Qualification not specified"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{job.vacancy || "Not specified"} positions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{job.total_applicants ?? 0} applicants</span>
                    </div>

                    {job.participation_dates && (
                      <div className="flex items-start gap-2 col-span-full">
                        <Calendar className="w-4 h-4 text-gray-400 mt-1" />
                        <span className="flex flex-wrap gap-x-2 text-sm text-gray-700">
                          {job.participation_dates
                            .split(",")
                            .map((date) => date.trim())
                            .map((date, i, arr) => (
                              <span key={i} className="flex items-center gap-2">
                                <span>{date}</span>
                                {i < arr.length - 1 && (
                                  <span className="text-gray-400">|</span>
                                )}
                              </span>
                            ))}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Selection Procedure */}
                  <Badge className="bg-emerald-100 border border-emerald-500 w-fit">
                    <ClipboardCheck className="w-4 h-4 text-gray-800 mr-1" />
                    <span className="capitalize text-gray-800">
                      {job.vsSelectionProcedure || "TBD"}
                    </span>
                  </Badge>
                </div>

                {/* Company Avatar */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    {getCompanyInitials(job.company_name || "UK")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          {melaInfo && <EmployerApplyMelaFormModal mela={melaInfo} />}
        </div>
      </div>
    </div>
  );
};

export default JobPostingsEmployer;
