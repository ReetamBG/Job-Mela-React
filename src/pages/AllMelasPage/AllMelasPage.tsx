import MelaCard from "@/components/customComponents/MelaCard";
import Loading from "@/components/customComponents/Loading";
import useMelas, { type MelaFilters } from "@/hooks/useMelas";
import useMasterApi from "@/hooks/useMasterApi";
import MelaFilterForm from "@/pages/AllMelasPage/components/MelaFilterForm";
import type { District } from "@/types";
import { useState } from "react";

const AllMelasPage = () => {
  const { qualifications, districts } = useMasterApi();

  // filtered districts from Assam (state id = 4)
  const filteredDistricts = districts?.filter(
    (district: District) => district.fklStateId === 4
  );

  // Melas filter logic
  const [filters, setFilters] = useState<MelaFilters>({
    vsVenueName: null,
    vsDistrict: null,
    qualification: null,
    sortByStartDate: null,
  });

  const { melas, isLoading } = useMelas(filters);

  const handleFilterFormSubmit = (newFilters: MelaFilters) => {
    setFilters(newFilters);
  };

  if (isLoading) return <Loading item="Melas" />;

  return (
    <section className=" py-12 flex-grow flex">
      <div className="max-w-8xl w-full mx-auto px-4 flex flex-col md:flex-row gap-6">
        {/* Filter Form */}
        <div className="flex flex-col gap-2 mb-12 w-full md:w-1/5 flex-shrink-0">
          <p className="text-lg font-semibold text-gray-700">
            Filter by preference
          </p>
          <div className="mt-8">
            <MelaFilterForm
              districts={filteredDistricts}
              qualifications={qualifications}
              handleFilterFormSubmit={handleFilterFormSubmit}
            />
          </div>
        </div>

        {/* Melas Section */}
        <div className="flex flex-col w-full md:flex-grow">
          <h1 className="text-3xl font-medium mb-5">All Melas</h1>
          {melas.length === 0 && (
            <p className="mt-15 mx-15 text-center text-gray-600">
              No melas found for the current filters
            </p>
          )}
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {melas.map((mela) => (
              <MelaCard key={mela.pklMelaId} mela={mela} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllMelasPage;

