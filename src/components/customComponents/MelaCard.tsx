import { formatDate } from "@/lib/dateTime";
import type { Mela } from "@/types";
import { Link } from "react-router-dom";

const MelaCard = ({ mela }: { mela: Mela }) => {
  let status = null;
  const currDate = new Date();
  const melaStartDate = new Date(mela.dtStartDate);


  const diffInDays = (currDate.getTime() - melaStartDate.getTime()) / (1000 * 60 * 60 * 24);

  if (diffInDays > 30) {
    status = (
      <span className="flex items-center gap-1 text-red-500 font-medium">
        <i className="bi bi-broadcast-pin"></i>Started over a month ago
      </span>
    );
  } else if (diffInDays >= 0) {
    status = (
      <span className="flex items-center gap-1 text-blue-500 font-medium">
        <i className="bi bi-broadcast-pin"></i> Happening now
      </span>
    );
  } else {
    status = (
      <span className="flex items-center gap-1 text-gray-500 font-medium">
        <i className="bi bi-broadcast-pin"></i> Upcoming
      </span>
    );
  }


  // Format days remaining into a shortened string
  // let daysRemainingShortened: string;
  // const remainingDays = getDaysRemaining(mela.dtEndDate);
  // if (remainingDays === null) {
  //   daysRemainingShortened = "N/A";
  // } else {
  //   const days = getDaysRemaining(mela.dtEndDate);
  //   if (remainingDays < 7) {
  //     daysRemainingShortened = days + " days";
  //   } else if (remainingDays > 30 && remainingDays < 60) {
  //     daysRemainingShortened = Math.floor(remainingDays / 7) + " weeks";
  //   } else if (remainingDays >= 60 && remainingDays < 365) {
  //     daysRemainingShortened = Math.floor(remainingDays / 30) + " months";
  //   } else {
  //     daysRemainingShortened = Math.floor(remainingDays / 365) + " year";
  //   }
  // }

  return (
    <div className="bg-white border border-gray-200 shadow-md hover:shadow-lg hover:scale-101 transition rounded-3xl overflow-hidden flex flex-col max-w-sm">
      {/* Header Section - Green background */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-6 text-white">
        <h3 className="text-lg font-semibold leading-tight">{mela.vsVenueName} – {mela.vsDistrict}</h3>
      </div>

      {/* Content Section - White background */}
      <div className="p-6 flex-1 bg-gray-50">
        <p className="text-sm text-gray-600 mb-6">{mela.vsDescription || "Course description not available."}</p>

        {/* Info with icons */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <i className="bi bi-calendar-event text-emerald-600 text-sm"></i>
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Duration</div>
              <div className="text-sm font-semibold text-gray-600">{formatDate(mela.dtStartDate)} - {formatDate(mela.dtEndDate)}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <i className="bi bi-buildings text-emerald-600 text-sm"></i>
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Companies</div>
              <div className="text-sm font-semibold text-gray-600">{mela.companyCount} Companies Participating</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <i className="bi bi-geo-alt-fill text-emerald-600 text-sm"></i>
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">District</div>
              <div className="text-sm font-semibold text-gray-600">{mela.vsDistrict}, {mela.vsAddress}</div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mt-6 mb-6 text-sm">
          {status}
        </div>

        {/* Learn More Button */}
        <Link
          to={`/mela/${mela.pklMelaId}`}
          className="inline-flex items-center gap-2 py-1 px-2 bg-white border-2 border-emerald-500/70 text-emerald-600/70 font-medium rounded-full hover:bg-emerald-50 transition-colors text-sm">
          Learn More
          <i className="bi bi-arrow-right"></i>
        </Link>
      </div>
    </div>
  )
  // return (
  //   <div
  //     key={mela.pklMelaId}
  //     className="bg-white border border-emerald-400 shadow-card shadow-emerald-600"
  //   >
  //     <div className="px-8 py-4">
  //       <div className="flex gap-1 items-center mb-6"></div>
  //       <p className="font-medium text-lg lg:text-xl mb-4">
  //         {mela.vsVenueName} – {mela.vsDistrict}
  //       </p>
  //       <p className="pb-6 border-gray-200 text-gray-700 text-sm line-clamp-3 truncate">
  //         {/* Join us in New York City for top tech job opportunities. Meet
  //                 recruiters and get hired. */}
  //         {mela.vsDescription ?? "No description given"}
  //       </p>
  //       <p className="font-semibold mt-4 mb-2 text-sm lg:text-base">
  //         TIME & VENUE
  //       </p>
  //       <p className="text-gray-700 flex items-center gap-2 text-xs mb-1">
  //         <i className="bi bi-calendar-event-fill text-gray-900 text-xs"></i>
  //         <span>
  //           {formatDate(mela.dtStartDate)} – {formatDate(mela.dtEndDate)}
  //         </span>
  //       </p>
  //       <p className="text-gray-700 flex items-center gap-2 text-xs">
  //         <i className="bi bi-geo-fill text-gray-900 text-xs"></i>
  //         <span>
  //           {/* District, Address */}
  //           {mela.vsAddress}, {mela.vsDistrict}
  //         </span>
  //       </p>
  //     </div>
  //     <div className="border-t-2 border-gray-300 border-dashed px-8 py-4 flex items-center justify-between gap-4">
  //       <p className="text-xs font-medium text-gray-500">
  //         Ends in {daysRemainingShortened}
  //       </p>
  //       <a
  //         href={`/mela/${mela.pklMelaId}`}
  //         className="inline-block text-emerald-600 text-xs font-semibold rounded-full hover:bg-emerald-200 px-2 py-1"
  //       >
  //         View Details
  //       </a>
  //     </div>
  //   </div>
  // );
};

export default MelaCard;
