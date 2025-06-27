import type { Company, District } from "@/types";
import useCompanies, { type GetCompaniesParams } from "@/hooks/useCompanies";
import useDetails from "@/hooks/useDetails";
import CompanyCard from "@/components/allCompaniesPage/CompanyCard";
import FilterForm from "@/components/allCompaniesPage/FilterForm";
import useMelas from "@/hooks/useMelas";
import { useState } from "react";


const AllCompaniesPage = () => {
  const { melas } = useMelas();
  const { qualifications, districts } = useDetails();

  // filtered districts from Assam (state id = 4)
  const filteredDistricts = districts?.filter(
    (district: District) => district.fklStateId === 4
  );

  // Companies filter logic
  const [filters, setFilters] = useState<GetCompaniesParams>({
    district: "",
    qualification_id: "",
    fklmela_no: "",
    interview_mode: "",
  });

  const { companies } = useCompanies(filters);

  const handleFilterFormSubmit = (newFilters: GetCompaniesParams) => {
    setFilters(newFilters);
  };

  return (
    <section className="px-4 py-12 flex-grow flex">
      <div className="max-w-7xl w-full mx-auto px-4 flex gap-6">
        <div className="flex flex-col gap-2 mb-12 w-1/5 flex-shrink-0">
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
        <div className="flex flex-col flex-grow">
          {companies.length === 0 && (
            <p className="mt-15 mx-15">
              No matches found for the current filters
            </p>
          )}
          <div className="grid gap-6 lg:grid-cols-3">
            {companies.map((company: Company, idx: number) => (
              <CompanyCard
                key={idx}
                phoneNo={company.phone_no}  // TODO: Change this maybe for actual company id 
                name={company.company_name}
                mela={company.venue_name}
                qualification={company.vsQualification}
                type={company.vsSelectionProcedure}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllCompaniesPage;
