import type { Mela } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface MelaFilters {
  vsVenueName?: string | null;
  vsDistrict?: string | null;
  qualification?: string | null;
  sortByStartDate?: "asc" | "desc" | null;
}

const useMelas = (filters?: MelaFilters) => {
  const [melas, setMelas] = useState<Mela[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const url = import.meta.env.VITE_BASE_URL + "/v1/mela/getMelas";

    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filters ?? {}),
        });
        if (!res.ok) throw new Error("Error fetching melas");
        const data = await res.json();
        let melasData = data.data;

        // Apply client-side sorting if specified
        if (filters?.sortByStartDate) {
          melasData = melasData.sort((a: Mela, b: Mela) => {
            const dateA = new Date(a.dtStartDate);
            const dateB = new Date(b.dtStartDate);

            // Handle invalid dates
            if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
            if (isNaN(dateA.getTime())) return 1;
            if (isNaN(dateB.getTime())) return -1;

            if (filters.sortByStartDate === "asc") {
              return dateA.getTime() - dateB.getTime();
            } else {
              return dateB.getTime() - dateA.getTime();
            }
          });
        }

        console.log("melas from useMelas: ", melasData);
        setMelas(melasData);
      } catch (error) {
        toast.error("Could not fetch melas");
        console.log(error);
        setMelas([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [filters]);

  return { melas, isLoading };
};

export default useMelas;
