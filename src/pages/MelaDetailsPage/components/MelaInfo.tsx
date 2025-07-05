import Loading from "@/components/customComponents/Loading";
import { formatDate, getDaysRemaining } from "@/lib/dateTime";
import type { Mela } from "@/types";

interface MelaInfoProps {
  melaInfo: Mela | null;
  isLoading: boolean;
}

const MelaInfo = ({ melaInfo, isLoading }: MelaInfoProps) => {
  if (isLoading) return <Loading item="Mela Information" />;

  if (!melaInfo) {
    return (
      <div className="bg-white rounded-xl shadow-card border border-red-400 shadow-red-600 px-6 py-8">
        <h1 className="text-2xl font-bold text-red-900">Mela Not Found</h1>
        <p className="text-sm text-red-600">
          The mela you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-card border border-emerald-400 shadow-emerald-600 px-6 py-8">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          {melaInfo.vsVenueName}
        </h1>
        <p className="text-sm text-gray-600">{melaInfo.vsDistrict}</p>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm lg:text-base mb-6">
        {melaInfo.vsDescription ?? "No description provided for this mela."}
      </p>

      {/* Time & Venue */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold text-sm text-gray-900 mb-2">Dates</h3>
          <p className="flex items-center gap-2 text-gray-700 text-sm">
            <i className="bi bi-calendar-event-fill text-gray-900 text-xs"></i>
            {formatDate(melaInfo.dtStartDate)} –{" "}
            {formatDate(melaInfo.dtEndDate)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Ends in {getDaysRemaining(melaInfo.dtEndDate)} days
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-sm text-gray-900 mb-2">Location</h3>
          <p className="flex items-center gap-2 text-gray-700 text-sm">
            <i className="bi bi-geo-fill text-gray-900 text-xs"></i>
            {melaInfo.vsAddress}, {melaInfo.vsDistrict}
          </p>
        </div>
      </div>

      {/* Apply CTA */}
      <div className="mt-8 border-t border-dashed pt-4 flex justify-end gap-4"></div>
    </div>
  );
};

export default MelaInfo;
