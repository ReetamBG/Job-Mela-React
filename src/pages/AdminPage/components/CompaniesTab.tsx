
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";

import useCompanies from "@/hooks/adminPageHooks/useCompanies";
import { Search } from "lucide-react";
import type { Company } from "@/types/adminPageTypes";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";

const CompaniesTab = () => {
  const user = useAppSelector(selectCurrentUser);
  const {
    data,
    isPending,
    error,
  } = useCompanies({ melaId: user?.type==="Mela Admin" ? user?.data.fklMelaId : null });

  // Cast the company array to AdminCompany[] for type safety
  // Memoize company array and cast to AdminCompany[] for type safety
  const company = useMemo<Company[]>(
    () => (data?.company ?? []) as unknown as Company[],
    [data]
  );

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);


  const filteredCompanies = useMemo(() => {
    return company.filter((c) =>
      c.companyName?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, company]);

  const paginatedCompanies = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCompanies.slice(start, start + itemsPerPage);
  }, [currentPage, filteredCompanies]);

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  return (
    <div className="space-y-5">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-semibold text-xl sm:text-2xl text-foreground">
            Total Companies: {company.length}
          </h3>
        </div>
        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Table */}
      {error ? (
        <p className="text-red-500 font-medium">Error loading companies.</p>
      ) : (
        <div className="overflow-y-auto max-h-[550px] border rounded-md">
          <table className="w-full text-sm">
            <thead className="bg-muted sticky top-0 z-10">
              <tr className="h-9">
                <th className="text-left px-3 font-medium">#</th>
                <th className="text-left px-3 font-medium">Company Name</th>
                <th className="text-left px-3 font-medium">Email</th>
                <th className="text-left px-3 font-medium">Mobile</th>
                <th className="text-left px-3 font-medium">Type</th>
                <th className="text-left px-3 font-medium">Address</th>
                <th className="text-left px-3 font-medium">Created At</th>
              </tr>
            </thead>
            <tbody>
              {isPending ? (
                <tr className="h-10">
                  <td colSpan={7} className="text-center py-5">
                    Loading...
                  </td>
                </tr>
              ) : paginatedCompanies.length === 0 ? (
                <tr className="h-10">
                  <td colSpan={7} className="text-center py-5">
                    No companies match the search.
                  </td>
                </tr>
              ) : (
                paginatedCompanies.map((c, idx) => (
                  <tr key={c.pklEntityId} className="border-t h-10 hover:bg-muted/50">
                    <td className="px-3">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                    <td className="px-3 font-medium">{c.companyName}</td>
                    <td className="px-3">{c.companyEmail}</td>
                    <td className="px-3">{c.companyMobile}</td>
                    <td className="px-3">{c.empTypeName || c.organizationTypeName || "-"}</td>
                    <td className="px-3">{c.companyAddress || "-"}</td>
                    <td className="px-3">{c.createdAt ? new Date(c.createdAt).toLocaleDateString("en-IN") : "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            className="text-sm px-2 py-1 border rounded disabled:opacity-40"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          <span className="text-sm px-3">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="text-sm px-2 py-1 border rounded disabled:opacity-40"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CompaniesTab;
