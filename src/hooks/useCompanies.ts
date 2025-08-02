import type { Company } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface GetCompaniesParams {
  district: string | null;
  qualification_id: string | null;
  fklmela_no: string | null;
  interview_mode: string | null;
}

const useCompanies = (filters?: GetCompaniesParams) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const url = import.meta.env.VITE_BASE_URL + "/v1/company/";

    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filters ?? {}), // send empty object if undefined
        });
        if (!res.ok) throw new Error("Could not fetch companies");
        const data = await res.json();
        console.log("companies from useCompanies", data.data);
        setCompanies(data.data);
      } catch (error) {
        toast.error("No companies found");
        console.log(error);
        setCompanies([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [filters]);

  return { companies, isLoading };
};

export default useCompanies;
