import type { District, Qualification } from "@/types";
import { useEffect, useState } from "react";

const useDetails = () => {
  const [districts, setDistricts] = useState<District[]>([]);
  const [qualifications, setQualifications] = useState<Qualification[]>([]);

  useEffect(() => {
    const url = import.meta.env.VITE_BASE_URL + "/v1/candidate/master";

    (async () => {
      try {
        const res = await fetch(url, {
          headers: { "User-Agent": "Mozilla/5.0" },
        });
        const data = await res.json();
        if (!res.ok) throw new Error("Error fetching details");
        setDistricts(data.data.district);
        setQualifications(data.data.qualification);
      } catch (error) {
        console.log(error);
        setDistricts([]);
        setQualifications([]);
      }
    })();
  }, []);

  return { districts, qualifications };
};

export default useDetails;
