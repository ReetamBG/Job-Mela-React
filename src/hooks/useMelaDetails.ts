import { useAppSelector } from "@/store/hooks";
import { selectIsUserResolved } from "@/store/slices/authSlice";
import type { JobPosting, Mela } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Return Mela details and job postings for a given mela ID
const useMelaDetails = ({
  pklMelaId,
  pklCandidateId,
}: {
  pklMelaId: string;
  pklCandidateId?: string;
}) => {
  const isUserResolved = useAppSelector(selectIsUserResolved);
  const [melaInfo, setMelaInfo] = useState<Mela | null>(null);
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isUserResolved) return; // prevent running if user state is not resolved

    const url = import.meta.env.VITE_BASE_URL + "/v1/mela";

    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pklMelaId, pklCandidateId }),
        });
        if (!res.ok) throw new Error("Error fetching mela details");
        const data = await res.json();
        setMelaInfo(data.data.mela[0]);
        setJobPostings(data.data.company);
        console.log("Mela Info:", data.data.mela[0]);
        console.log("Job Postings:", data.data.company);
      } catch (error) {
        toast.error("Error fetching mela details");
        console.log(error);
        setMelaInfo(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [pklMelaId, pklCandidateId, isUserResolved]);

  return { melaInfo, jobPostings, setMelaInfo, setJobPostings, isLoading };
};

export default useMelaDetails;
