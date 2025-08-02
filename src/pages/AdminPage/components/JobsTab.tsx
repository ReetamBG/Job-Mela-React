import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import useJobs from "@/hooks/adminPageHooks/useJobs";
import type { Job } from "@/types/adminPageTypes";
import { selectCurrentUser } from "@/store/slices/authSlice";
import { useAppSelector } from "@/store/hooks";

const JobsTab = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data, isPending, error } = useJobs({ melaId: user?.type==="Mela Admin" ? user?.data.fklMelaId : null });

  const jobs = useMemo<Job[]>(
    () => (data?.job ?? []) as unknown as Job[],
    [data]
  );

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(
      (j) =>
        j.jobName?.toLowerCase().includes(search.toLowerCase()) ||
        j.companyName?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, jobs]);

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredJobs.slice(start, start + itemsPerPage);
  }, [currentPage, filteredJobs]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  return (
    <div className="space-y-5">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-semibold text-xl sm:text-2xl text-foreground">
            Total Jobs: {jobs.length}
          </h3>
        </div>

        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by job or company name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Table */}
      {error ? (
        <p className="text-red-500 font-medium">Error loading jobs.</p>
      ) : (
        <div className="overflow-y-auto max-h-[550px] border rounded-md">
          <table className="w-full text-sm">
            <thead className="bg-muted sticky top-0 z-10">
              <tr className="h-9">
                <th className="text-left px-3 font-medium">#</th>
                <th className="text-left px-3 font-medium">Job Name</th>
                <th className="text-left px-3 font-medium">Company</th>
                <th className="text-left px-3 font-medium">Vacancy</th>
                <th className="text-left px-3 font-medium">Qualification</th>
                <th className="text-left px-3 font-medium">Selection</th>
                <th className="text-left px-3 font-medium">Applied Candidates</th>
              </tr>
            </thead>
            <tbody>
              {isPending ? (
                <tr className="h-10">
                  <td colSpan={7} className="text-center py-5">
                    Loading...
                  </td>
                </tr>
              ) : paginatedJobs.length === 0 ? (
                <tr className="h-10">
                  <td colSpan={7} className="text-center py-5">
                    No jobs found.
                  </td>
                </tr>
              ) : (
                paginatedJobs.map((job, idx) => (
                  <tr key={job.jobId} className="border-t h-10 hover:bg-muted/50">
                    <td className="px-3">
                      {(currentPage - 1) * itemsPerPage + idx + 1}
                    </td>
                    <td className="px-3 font-medium">{job.jobName}</td>
                    <td className="px-3">{job.companyName}</td>
                    <td className="px-3">{job.vacancy}</td>
                    <td className="px-3">{job.minimumQualification}</td>
                    <td className="px-3">{job.selectionProcedure}</td>
                    <td className="px-3">{job.appliedCandidateCount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
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

export default JobsTab;