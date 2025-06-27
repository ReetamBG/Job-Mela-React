import { formatDate, getDaysRemaining } from "@/lib/dateTime";
import { Link } from "react-router-dom";
import useMelas from "@/hooks/useMelas";

const Melas = () => {
  // Job Melas section
  const { melas } = useMelas();

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 py-12 xl:py-24">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-12">
          <div className="md:col-span-2 xl:col-span-1 row-span-2">
            <p className="text-center xl:text-left text-3xl lg:text-5xl mb-4">
              Job Melas
            </p>
            <p className="text-center xl:text-left mt-2 text-gray-700 mb-12 max-w-xl mx-auto xl:mx-0 text-sm lg:text-base">
              Connect with top employers and job seekers effortlessly. Register
              now to explore opportunities and schedule interviews with ease.
            </p>
          </div>
          {melas.slice(0, 5).map((mela) => (
            <div
              key={mela.sl_no}
              className="bg-white border border-emerald-400 shadow-card shadow-emerald-600"
            >
              <div className="p-8">
                <div className="flex gap-1 items-center mb-6"></div>
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
          ))}
        </div>
        {/* No Mela */}
        {melas.length === 0 && (
          <div className="text-center py-12">
            <img
              src="./assets/images/nf.png"
              alt="No Job Melas"
              className="mx-auto h-44 mb-6"
            />
            <p className="text-2xl font-semibold text-gray-800">
              No Upcoming Job Melas
            </p>
            <p className="text-gray-700 mt-2">
              Stay tuned! New events will be announced soon.
            </p>
          </div>
        )}

        <div className="flex items-start justify-center">
          <Link
            to="/all-melas"
            className="text-xs font-medium inline-flex items-center gap-2 text-gray-600 border border-gray-300 py-2 px-4 hover:bg-gray-300/80 rounded-full mt-12 hover:shadow-lg hover:shadow-shadow transition-all duration-300"
          >
            <span>View All Melas</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Melas;
