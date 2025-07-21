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
    <div className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition rounded-xl overflow-hidden flex flex-col">
      <div className="p-6 flex-1">
        {/* <!-- Tags --> */}
        {/* <div className="flex gap-2 mb-4 flex-wrap"> */}
        {/*   <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">{ }</span> */}
        {/*   <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">Online</span> */}
        {/* <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700">AI/ML</span> */}
        {/* </div> */}

        {/* <!-- Title & Desc --> */}
        <h3 className="text-lg font-semibold mb-2">{mela.vsVenueName} – {mela.vsDistrict}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{mela.vsDescription}</p>

        {/* <!-- Info --> */}
        <div className="text-xs text-gray-700 mb-4 space-y-1">
          <p><i className="bi bi-calendar-event mr-1 text-gray-900"></i>{formatDate(mela.dtStartDate)} - {formatDate(mela.dtEndDate)}</p>
          <p><i className="bi bi-geo-alt-fill mr-1 text-gray-900"></i>{mela.vsDistrict}, {mela.vsAddress}</p>
        </div>

        {/* <!-- Participating Companies --> */}
        <div className="mb-4">
          <div className="mb-4 flex items-center gap-2 text-xs font-medium text-gray-700">
            <i className="bi bi-buildings"></i>
            {mela.companyCount} Companies Participating
          </div>
        </div>
      </div>

      {/* <!-- Footer --> */}
      <div className="border-t border-gray-200 px-6 py-4 flex justify-between items-center text-xs text-gray-500">
        {status}
        <Link
          to={`/mela/${mela.pklMelaId}`}
          className="text-emerald-600 font-medium hover:underline">
          View Details
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
