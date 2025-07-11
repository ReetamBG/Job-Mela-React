import type { Candidate } from "@/types/adminPageTypes";
import type { Mela } from "@/types/";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCandidates = ({ melaId }: { melaId: string | number | null}) => {
  return useQuery<{
    candidates: Candidate[];
    mela: Mela;
    totalApplicants: number;
  }>({
    queryKey: ["candidates", melaId],
    queryFn: async () => {

      if(!melaId) {
        toast.error("Mela ID is required to fetch candidates");
        throw new Error("Mela ID is required in Admin Page");
      }

      const res = await fetch(
        "https://job-mela.skillmissionassam.org/nw/v1/center/candidate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mela_id: melaId,
          }),
        }
      );

      if (!res.ok) {
        toast.error("Could not fetch candidates");
        throw new Error("Could not fetch candidates");
      }

      const resData = await res.json();
      const candidates = resData.data;
      const mela = resData.mela;
      const totalApplicants = resData.totalApplicant;

      return { candidates, mela, totalApplicants };
    },
  });
};

export default useCandidates;
