import useMelas from "@/hooks/useMelas";
import type { Mela } from "@/types";
import { formatDate, getDaysRemaining } from "@/lib/dateTime";

const AllMelasPage = () => {
  const { melas } = useMelas();

  return (
    <section className="px-4 py-12 flex-grow flex">
      <div className="max-w-7xl w-full mx-auto px-4 flex gap-6">
        <div className="flex flex-col flex-grow">
          <h1 className="text-3xl font-medium mb-5 ms-5">All Melas</h1>
          <div className="grid gap-6 lg:grid-cols-3">
            {melas.map((mela: Mela) => (
              <MelaCard key={mela.sl_no} mela={mela} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllMelasPage;

const MelaCard = ({ key, mela }: { key: number; mela: Mela }) => {
  return (
    <div
      key={key}
      className="bg-white border border-emerald-400 shadow-card shadow-emerald-600"
    >
      <div className="p-8">
        <div className="flex gap-1 items-center mb-6">
          {/* <div className="px-3 py-1 text-xs bg-emerald-400 rounded-full">
                        In Person
                      </div>
                      <div className="px-3 py-1 text-xs bg-black text-white rounded-full">
                        Online
                      </div> */}
        </div>
        <p className="font-medium text-lg lg:text-xl mb-4">
          {mela.venue_name} – {mela.district}
        </p>
        <p className="pb-6 border-gray-200 text-gray-700 text-sm line-clamp-3 truncate">
          {/* Join us in New York City for top tech job opportunities. Meet
                      recruiters and get hired. */}
          {mela.melaDesc ?? "No melaDesc given"}
        </p>
        <p className="font-semibold mt-4 mb-2 text-sm lg:text-base">
          TIME & VENUE
        </p>
        <p className="text-gray-700 flex items-center gap-2 text-xs mb-1">
          <i className="bi bi-calendar-event-fill text-gray-900 text-xs"></i>
          <span>
            {formatDate(mela.start_date)} – {formatDate(mela.end_date)}
          </span>
        </p>
        <p className="text-gray-700 flex items-center gap-2 text-xs">
          <i className="bi bi-geo-fill text-gray-900 text-xs"></i>
          <span>
            {/* District, Address */}
            {mela.address}, {mela.district}
          </span>
        </p>
      </div>
      <div className="border-t-2 border-gray-300 border-dashed px-8 py-4 flex items-center justify-between gap-4">
        <p className="text-xs font-medium text-gray-500">
          Ends in {getDaysRemaining(mela.end_date)} days
        </p>
        <a
          href="#"
          className="inline-block text-emerald-600 text-xs font-semibold rounded-full hover:bg-emerald-200"
        >
          View Details
        </a>
      </div>
    </div>
  );
};
