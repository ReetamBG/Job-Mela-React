import Loading from "@/components/customComponents/Loading";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Calendar,
  ClipboardCheck,
  GraduationCap,
  MapPin,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CompanyDetails {
  comDesc: string | null;
  companyAddress: string | null;
  companyEmail: string;
  companyMobile: string;
  companyName: string;
  companyPinCode: string | null;
  empTypeName: string | null;
  melaCount: number;
  organizationTypeName: string | null;
  selectionProcedure: "offline" | "online";
  userName: string;
}

interface Job {
  job_id: number;
  post_name: string;
  vacancy: number;
  vsQualification: string;
  vsVenueName: string;
  vsSelectionProcedure: "offline" | "online";
  participation_dates: string;
  total_applicants?: number;
}

const CompanyDetailsPage = () => {
  const { phoneNo } = useParams<{ phoneNo: string }>();
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(
    null
  );
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      const url = import.meta.env.VITE_BASE_URL + "/v1/company/";
      try {
        setIsLoading(true);
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone_no: phoneNo }),
        });
        if (!res.ok) throw new Error("Could not fetch company details");
        const data = await res.json();
        setCompanyDetails(data.data[0]);
        setJobs(data.jobs || []);
        console.log("companyDetails from CompanyDetailsPage", data);
      } catch (error) {
        console.error(error);
        setCompanyDetails(null);
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (phoneNo) fetchCompanyDetails();
  }, [phoneNo]);

  if (isLoading) return <Loading item="Company Details" />;
  if (!companyDetails)
    return (
      <p className="text-center text-gray-600 py-6">No company data found</p>
    );

  return (
    <section className="max-w-5xl mx-auto px-4 py-6 text-sm text-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-300 pb-3 mb-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-semibold text-lg">
            {companyDetails.companyName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-semibold text-lg text-gray-900 leading-tight">
              {companyDetails.companyName}
            </h2>
            <p className="text-gray-600 text-xs">
              Contact: {companyDetails.companyMobile}
            </p>
          </div>
        </div>
        <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded">
          {companyDetails.selectionProcedure.toUpperCase()}
        </span>
      </div>

      {/* Grid Info */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 mb-6">
        <Info
          label="Employment Type"
          value={companyDetails.empTypeName ?? "—"}
        />
        <Info
          label="Org Type"
          value={companyDetails.organizationTypeName ?? "—"}
        />
        <Info label="Mela Count" value={companyDetails.melaCount} />
        <Info label="Email" value={companyDetails.companyEmail} />
        <Info label="Address" value={companyDetails.companyAddress ?? "—"} />
        <Info label="Pin Code" value={companyDetails.companyPinCode ?? "—"} />
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="font-semibold mb-1">About the Company</h3>
        <p className="text-gray-700 leading-snug">
          {companyDetails.comDesc || "No description available."}
        </p>
      </div>

      {/* SPOC */}
      <div className="border-t pt-4 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 mb-6">
        <Info label="SPOC Name" value={companyDetails.userName} />
        <Info label="SPOC Email" value={companyDetails.companyEmail} />
        <Info label="SPOC Contact" value={companyDetails.companyMobile} />
      </div>

      {/* Jobs */}
      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Jobs Posted by This Company
        </h3>

        {jobs.length === 0 ? (
          <div className="border border-dashed border-gray-300 p-6 rounded-md text-gray-500 text-sm text-center mb-5">
            No job postings available yet.
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="max-h-full overflow-y-auto flex flex-col gap-3">
              {jobs.map((job, index) => (
                <div key={index} className="w-full">
                  <div className="flex justify-between items-start gap-4 rounded-lg border p-4 hover:shadow-sm transition-shadow">
                    <div className="flex-1 grid gap-3">
                      {/* Job Title */}
                      <div className="flex items-center gap-2">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900">
                          {job.post_name || "Unknown Job Title"}
                        </h4>
                      </div>

                      {/* Job Details */}
                      <div className="text-xs grid grid-cols-1 md:grid-cols-2 gap-2 sm:text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>
                            {job.vsVenueName || "Location not specified"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-gray-400" />
                          <span>
                            {job.vsQualification ||
                              "Qualification not specified"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>{job.vacancy ?? "—"} positions</span>
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
                                  <span
                                    key={i}
                                    className="flex items-center gap-2"
                                  >
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const Info = ({ label, value }: { label: string; value: string | number }) => (
  <div>
    <p className="text-gray-500 text-xs font-medium">{label}</p>
    <p className="text-gray-900 font-normal truncate">{value}</p>
  </div>
);

export default CompanyDetailsPage;
