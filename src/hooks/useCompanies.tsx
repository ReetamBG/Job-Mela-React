import type { Company } from "@/types";
import { useEffect, useState } from "react";

export interface GetCompaniesParams {
  district: string;
  qualification_id: string;
  fklmela_no: string;
  interview_mode: string;
}

const useCompanies = (filters?: GetCompaniesParams) => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const url = import.meta.env.VITE_BASE_URL + "/v1/company/";

    (async () => {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filters ?? {}), // send empty object if undefined
        });
        if (!res.ok) throw new Error("Could not fetch companies");
        const data = await res.json();
        setCompanies(data.data);
      } catch (error) {
        console.log(error);
        setCompanies([]);
      }
    })();
  }, [filters]);

  return { companies };
};

export default useCompanies;
