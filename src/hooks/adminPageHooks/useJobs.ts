import type { Job } from "@/types/adminPageTypes";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useJobs = ({ melaId }: { melaId: string | number | null }) => {
  return useQuery<{
    job: Job[];
  }>({
    queryKey: ["job", melaId],
    queryFn: async () => {
      if (!melaId) {
        toast.error("Mela ID is required to fetch jobs");
        throw new Error("Mela ID is required in Admin Page");
      }
      const res = await fetch(
        "https://job-mela.skillmissionassam.org/nw/v1/center/allJob",
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
        toast.error("Could not fetch jobs");
        throw new Error("Could not fetch jobs");
      }

      const resData = await res.json();
      const job = resData.job;

      return { job };
    },
  });
};

export default useJobs;
