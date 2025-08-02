import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
import useCandidates from "@/hooks/adminPageHooks/useCandidates";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";

const CandidatesTab = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  const {
    data: { candidates = [], mela, totalApplicants } = {},
    isPending,
    error,
  } = useCandidates({
    melaId: user?.type === "Mela Admin" ? user?.data.fklMelaId : null,
  });

  const [search, setSearch] = useState("");
  // const [presentCandidates, setPresentCandidates] = useState<Set<number>>(
  //   new Set()
  // );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset page on search
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, candidates]);

  const paginatedCandidates = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCandidates.slice(start, start + itemsPerPage);
  }, [currentPage, filteredCandidates]);

  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);

  // const toggleAttendance = (id: number, checked: boolean) => {
  //   setPresentCandidates((prev) => {
  //     const updated = new Set(prev);
  //     if (checked) updated.add(id);
  //     else updated.delete(id);
  //     return updated;
  //   });
  // };

  return (
    <div className="space-y-5">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-semibold text-xl sm:text-2xl text-foreground">
            Total Candidates: {totalApplicants}
          </h3>
          <p className="text-muted-foreground text-sm">
            Mela: {mela?.vsVenueName} — {mela?.vsAddress}
          </p>
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
        <p className="text-red-500 font-medium">Error loading candidates.</p>
      ) : (
        <div className="overflow-y-auto max-h-[550px] border rounded-md">
          <table className="w-full text-sm">
            <thead className="bg-muted sticky top-0 z-10">
              <tr className="h-9">
                <th className="text-left px-3 font-medium">#</th>
                <th className="text-left px-3 font-medium">Full Name</th>
                <th className="text-left px-3 font-medium">Gender</th>
                <th className="text-left px-3 font-medium">Qualification</th>
                <th className="text-left px-3 font-medium">Mobile</th>
                <th className="text-left px-3 font-medium">DOB</th>
                <th className="text-left px-3 font-medium">Activity</th>
                {/* <th className="text-left px-3 font-medium">Checked In</th> */}
              </tr>
            </thead>
            <tbody>
              {isPending ? (
                <tr className="h-10">
                  <td colSpan={7} className="text-center py-5">
                    Loading...
                  </td>
                </tr>
              ) : paginatedCandidates.length === 0 ? (
                <tr className="h-10">
                  <td colSpan={7} className="text-center py-5">
                    No candidates match the search.
                  </td>
                </tr>
              ) : (
                paginatedCandidates.map((c, idx) => {
                  // const isPresent = presentCandidates.has(c.candidateId);
                  return (
                    <tr key={c.candidateId} className="border-t h-10">
                      <td className="px-3">
                        {(currentPage - 1) * itemsPerPage + idx + 1}
                      </td>
                      <td className="px-3 font-medium">{c.fullName}</td>
                      <td className="px-3">{c.gender}</td>
                      <td className="px-3">{c.qualification}</td>
                      <td className="px-3">{c.mobile}</td>
                      <td className="px-3">
                        {new Date(c.dob).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-3 hover:underline text-blue-600">
                        <span
                        className="cursor-pointer"
                          onClick={() =>
                            navigate(`/admin/candidates/${c.candidateId}`, {
                              state: { candidate: c },
                            })
                          }
                        >
                          View
                        </span>
                      </td>
                      {/* <td className="px-3" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={isPresent}
                          onClick={() =>
                            toggleAttendance(c.candidateId, !isPresent)
                          }
                          onCheckedChange={(checked) =>
                            toggleAttendance(c.candidateId, Boolean(checked))
                          }
                        />
                      </td> */}
                    </tr>
                  );
                })
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

export default CandidatesTab;
