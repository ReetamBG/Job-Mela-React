import type { Company } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCandidates = ({ melaId }: { melaId: string | number | null }) => {
  return useQuery<{
    company: Company[];
  }>({
    queryKey: ["company", melaId],
    queryFn: async () => {
      if (!melaId) {
        toast.error("Mela ID is required to fetch companies");
        throw new Error("Mela ID is required in Admin Page");
      }
      const res = await fetch(
        "https://job-mela.skillmissionassam.org/nw/v1/center/company",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            melaId: melaId,
          }),
        }
      );

      if (!res.ok) {
        toast.error("Could not fetch companies");
        throw new Error("Could not fetch companies");
      }

      const resData = await res.json();
      const company = resData.company;

      return { company };
    },
  });
};

export default useCandidates;
