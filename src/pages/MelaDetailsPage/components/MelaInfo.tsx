import Loading from "@/components/customComponents/Loading";
import { formatDate, formatTime, getDaysRemaining } from "@/lib/dateTime";
import type { Mela } from "@/types";
import { Calendar, Clock, LocateFixedIcon, UserIcon } from "lucide-react";

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
    <div className="">
      <div className="flex justify-center bg-emerald-600 text-white w-full py-24 px-4">
        <div className="max-w-6xl ">
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-4xl font-bold">
              {melaInfo.vsVenueName} - {melaInfo.vsDistrict}
            </h1>
          </div>

          {/* Description */}
          <p className="text-white/90 text-sm lg:text-base mb-6">
            {melaInfo.vsDescription ?? "No description provided for this mela."}
          </p>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 mb-6">
            <div className="flex gap-2">
              <Calendar />
              <div>
                <p className="flex items-center gap-2">
                  {formatDate(melaInfo.dtStartDate)}, -
                  {formatDate(melaInfo.dtEndDate)},{" "}
                </p>
                <p className="text-xs  mt-1">
                  Ends in {getDaysRemaining(melaInfo.dtEndDate)} days
                </p>
              </div>
            </div>

            {/* Time  */}
            <div>
              <p className="flex items-center gap-2">
                <Clock />
                {formatTime(melaInfo.dtSlotStartTime)} -{" "}
                {formatTime(melaInfo.dtSlotEndTime)}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-2">
                <LocateFixedIcon />
                {melaInfo.vsAddress}, {melaInfo.vsDistrict}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-2">
                <UserIcon />
                {melaInfo.totalParticipent} Enrolled
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MelaInfo;
