import type { Mela } from "@/types";
import { useEffect, useState } from "react";

const useMelas = () => {
  const [melas, setMelas] = useState<Mela[]>([]);

  useEffect(() => {
    const url = import.meta.env.VITE_BASE_URL + "/v1/candidate/master";

    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Error fetching melas");
        const data = await res.json();
        setMelas(data.data.melaInfo);
      } catch (error) {
        console.log(error);
        setMelas([]);
      }
    })();
  }, []);

  return { melas };
};

export default useMelas;
