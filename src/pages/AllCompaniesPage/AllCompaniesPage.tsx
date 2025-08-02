import type { Company, District } from "@/types";
import useCompanies, { type GetCompaniesParams } from "@/hooks/useCompanies";
import useMasterApi from "@/hooks/useMasterApi";
import CompanyCard from "@/pages/AllCompaniesPage/components/CompanyCard";
import FilterForm from "@/pages/AllCompaniesPage/components/CompanyFilterForm";
import useMelas from "@/hooks/useMelas";
import { useState } from "react";
import Loading from "@/components/customComponents/Loading";

const AllCompaniesPage = () => {
  const { melas, isLoading } = useMelas();
  const { qualifications, districts } = useMasterApi();

  // filtered districts from Assam (state id = 4)
  const filteredDistricts = districts?.filter(
    (district: District) => district.fklStateId === 4
  );

  // Companies filter logic
  const [filters, setFilters] = useState<GetCompaniesParams>({
    district: null,
    qualification_id: null,
    fklmela_no: null,
    interview_mode: null,
  });

  const { companies } = useCompanies(filters);

  const handleFilterFormSubmit = (newFilters: GetCompaniesParams) => {
    setFilters(newFilters);
  };

  if (isLoading) return <Loading item="Companies" />

  return (
    <section className="px-4 py-12 flex-grow flex">
      <div className="max-w-7xl w-full mx-auto px-4 flex flex-col md:flex-row gap-6">
        {/* Filter Form */}
        <div className="flex flex-col gap-2 mb-12 w-full md:w-1/5 flex-shrink-0">
          <p className="text-lg font-semibold text-gray-700">
            Filter by preference
          </p>
          <div className="mt-8">
            <FilterForm
              districts={filteredDistricts}
              qualifications={qualifications}
              melas={melas}
              handleFilterFormSubmit={handleFilterFormSubmit}
            />
          </div>
        </div>

        {/* Companies Section */}
        <div className="flex flex-col w-full md:flex-grow">
          {companies.length === 0 && (
            <p className="mt-15 mx-15">
              No matches found for the current filters
            </p>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company: Company, idx: number) => (
              <CompanyCard
                key={idx}
                company={company}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllCompaniesPage;
