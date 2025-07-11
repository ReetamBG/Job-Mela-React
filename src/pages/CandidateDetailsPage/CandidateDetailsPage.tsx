import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";
import type { AppliedJob } from "@/types/adminPageTypes";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeftCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CandidateProfilePage = () => {
  const user = useAppSelector(selectCurrentUser)
  const melaId = user?.type === "Mela Admin" ? user?.data.fklMelaId : null;

  const navigate = useNavigate();
  const { state } = useLocation();
  const candidate = state?.candidate

  const {data} = useQuery<{
    appliedJobs: AppliedJob[];
  }>({
    queryKey: ["appliedJobs", candidate.candidteId, melaId],
    enabled: !!candidate?.candidateId && !!melaId,
    queryFn: async () => {
      const url = import.meta.env.VITE_BASE_URL + "/v1/candidate/job";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidateId: candidate.candidateId,
          melaId: melaId,
        }),
      });

      if (!res.ok) {
        toast.error("Could not fetch candidates");
        throw new Error("Could not fetch candidates");
      }
      const resData = await res.json();
      return { appliedJobs: resData.data };
    },
  });

  const appliedJobs = data?.appliedJobs || [];

  return (
    <div className="flex flex-col mt-8">
      <h2 className="text-2xl flex items-center gap-4 font-semibold mx-10 text-gray-900 mb-6 border-b pb-4 border-gray-200">
        <button onClick={() => navigate(-1)}>
          <ChevronLeftCircle className="text-foreground/50 cursor-pointer" size={25} />
        </button>
        Applied Jobs - {appliedJobs.length}
      </h2>

      <div className="flex flex-col md:flex-row gap-8 mx-5 sm:mx-10">
        {/* Candidate Info Pane */}

        <div className="md:w-1/3 bg-white shadow-xl border border-gray-200 rounded-2xl p-6 h-128">
          <div className="flex flex-col mb-5">
            <span className="size-20 border-2 font-semibold border-emerald-700 mb-5 text-3xl text-emerald-900  rounded-full bg-emerald-200 ring-2 ring-white grid place-content-center">
              {candidate.fullName.slice(0, 1).toUpperCase()}
            </span>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {candidate.fullName}
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mb-4">
              {candidate.qualification}
            </p>
          </div>
          <div className="space-y-2 text-sm sm:text-base text-gray-600 ">
            <p>
              <span className="font-semibold">DOB:</span>{" "}
              {new Date(candidate.dob).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Gender:</span> {candidate.gender}
            </p>
            <p>
              <span className="font-semibold">Religion:</span>{" "}
              {candidate.religion}
            </p>
            <p>
              <span className="font-semibold">Caste:</span> {candidate.caste}
            </p>
            <p>
              <span className="font-semibold">Mobile:</span> {candidate.mobile}
            </p>
            <p>
              <span className="font-semibold">Mela:</span> {candidate.melaName}
            </p>
          </div>
        </div>

        {/* Applied Jobs Pane */}
        <div className="md:w-full">
          {appliedJobs.length === 0 ? (
            <div className="border border-dashed border-gray-300 p-6 rounded-md text-gray-500 text-sm text-center mb-5">
              No jobs applied to yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5">
              {appliedJobs.map((job, index) => (
                <div
                  key={index}
                  className="border border-emerald-600  rounded-2xl p-5 bg-emerald-50 shadow-emerald-700/80"
                >
                  <div className="flex items-start gap-4">
                    {/* <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xl font-bold">
                    {job.post_name?.[0] || "J"}
                  </div> */}
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-emerald-800 mb-1">
                        {job.post_name || "Job Title Unknown"}
                      </h3>
                      <p className="text-sm sm:text-base font-semibold text-emerald-700 mb-1">
                        {/* <span className="font-semibold">Company:</span>{" "} */}
                        {job.company_name}
                      </p>
                      <div className="grid sm:grid-cols-2">
                        <p className="text-sm sm:text-base text-gray-700 mb-1">
                          <span className="font-semibold">Address:</span>{" "}
                          {job.companyAddress}, {job.companyPinCode}
                        </p>
                        <div className="grid sm:grid-cols-2">
                          <p className="text-sm sm:text-base text-gray-700 mb-1">
                            <span className="font-semibold">Vacancy:</span>{" "}
                            {job.vacancy}
                          </p>
                        </div>
                        <p className="text-sm sm:text-base text-gray-700 mb-1">
                          <span className="font-semibold">
                            Selection Procedure:
                          </span>{" "}
                          {job.vsSelectionProcedure}
                        </p>
                        <p className="text-sm sm:text-base text-gray-700">
                          <span className="font-semibold">
                            Minimum Qualification:
                          </span>{" "}
                          {job.vsQualification || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilePage;