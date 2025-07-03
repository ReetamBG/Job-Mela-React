import { formatDate, getDaysRemaining } from "@/lib/dateTime";

import type { Mela } from "@/types";

const MelaCard = ({ mela }: { mela: Mela }) => {
  return (
    <div
      key={mela.pklMelaId}
      className="bg-white border border-emerald-400 shadow-card shadow-emerald-600"
    >
      <div className="px-8 py-4">
        <div className="flex gap-1 items-center mb-6"></div>
        <p className="font-medium text-lg lg:text-xl mb-4">
          {mela.vsVenueName} – {mela.vsDistrict}
        </p>
        <p className="pb-6 border-gray-200 text-gray-700 text-sm line-clamp-3 truncate">
          {/* Join us in New York City for top tech job opportunities. Meet
                  recruiters and get hired. */}
          {mela.vsDescription ?? "No description given"}
        </p>
        <p className="font-semibold mt-4 mb-2 text-sm lg:text-base">
          TIME & VENUE
        </p>
        <p className="text-gray-700 flex items-center gap-2 text-xs mb-1">
          <i className="bi bi-calendar-event-fill text-gray-900 text-xs"></i>
          <span>
            {formatDate(mela.dtStartDate)} – {formatDate(mela.dtEndDate)}
          </span>
        </p>
        <p className="text-gray-700 flex items-center gap-2 text-xs">
          <i className="bi bi-geo-fill text-gray-900 text-xs"></i>
          <span>
            {/* District, Address */}
            {mela.vsAddress}, {mela.vsDistrict}
          </span>
        </p>
      </div>
      <div className="border-t-2 border-gray-300 border-dashed px-8 py-4 flex items-center justify-between gap-4">
        <p className="text-xs font-medium text-gray-500">
          Ends in {getDaysRemaining(mela.dtEndDate)} days
        </p>
        <a
          href={`/mela/${mela.pklMelaId}`}
          className="inline-block text-emerald-600 text-xs font-semibold rounded-full hover:bg-emerald-200 px-2 py-1"
        >
          View Details
        </a>
      </div>
    </div>
  );
};

export default MelaCard;
