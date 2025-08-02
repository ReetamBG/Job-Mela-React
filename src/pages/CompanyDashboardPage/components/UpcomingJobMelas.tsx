import Loading from "@/components/customComponents/Loading";
import { formatDate, formatTime } from "@/lib/dateTime";
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  Eye,
  ChevronLeft,
  ChevronRight,
  Building,
  Clock1,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface Mela {
  bActive: 0 | 1;
  companyCount: number;
  dtCreatedAt: string;
  dtEndDate: string;
  dtSlotEndTime: string;
  dtSlotStartTime: string;
  dtStartDate: string;
  dtUpdatedAt: string | null;
  iMaxCapacity: number;
  pklMelaId: number;
  vsAddress: string;
  vsDescription: string;
  vsVenueName: string;
}

const UpcomingJobMelas = () => {
  const [jobMelas, setJobMelas] = useState<Mela[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setLoading(true);
      (async () => {
        const res = await fetch(
          "https://public-registration.skillmissionassam.org/client/company/mela",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.message || "Failed to fetch job melas");
        } else {
          setJobMelas(resData.data);
        }
      })();
    } catch (error) {
      toast.error("Error fetching job melas");
      console.log("Error fetching job melas:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350; // adjust to card width
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 1:
        return "bg-green-100 text-green-600 border border-green-200";
      case 0:
        return "bg-gray-100 text-gray-500 border border-gray-200";
      default:
        return "bg-blue-100 text-blue-600 border border-blue-200";
    }
  };

  // const getDaysUntil = (date: string) => {
  //     const today = new Date();
  //     const eventDate = new Date(date);
  //     const diffTime = eventDate.getTime() - today.getTime();
  //     return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // };

  // const isRegistrationOpen = (deadline: string) => {
  //     const today = new Date();
  //     const deadlineDate = new Date(deadline);
  //     return today <= deadlineDate;
  // };

  return (
    <>
      <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

      <div className="relative px-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Upcoming Job Melas
          </h2>
          <Link
            to="/all-melas"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Browse All
          </Link>
        </div>

        {loading && <Loading item="Job Melas" />}
        {/* Navigation Buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-[50%] -translate-y-1/2 z-10 bg-white border border-gray-300 hover:bg-gray-100 text-gray-600 p-2 rounded-full shadow-md"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-[50%] -translate-y-1/2 z-10 bg-white border border-gray-300 hover:bg-gray-100 text-gray-600 p-2 rounded-full shadow-md"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth snap-x snap-mandatory px-2"
        >
          {jobMelas.map((mela) => {
            // const daysUntil = getDaysUntil(mela.date);
            // const registrationOpen = isRegistrationOpen(mela.registrationDeadline);

            return (
              <div
                key={mela.pklMelaId}
                className="min-w-[300px] sm:min-w-[350px] lg:min-w-[400px] bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md snap-start shrink-0 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-900 px-2">
                    {mela.vsVenueName}
                  </h3>
                  <div className="flex gap-2">
                    {/* {mela.isRegistered && (
                                            <span className="px-3 py-1 bg-blue-100 text-blue-600 border border-blue-300 rounded-full text-xs font-medium flex items-center gap-1">
                                                <CheckCircle className="h-3 w-3" />
                                                Registered
                                            </span>
                                        )} */}
                    {/* <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${daysUntil <= 7
                                            ? 'bg-red-100 text-red-600 border border-red-300'
                                            : 'bg-green-100 text-green-700 border border-green-300'
                                            }`}>
                                            <Clock className="h-3 w-3" />
                                            {daysUntil > 0 ? `${daysUntil} days` : 'Today'}
                                        </span> */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 
                                            ${getStatusColor(mela.bActive)}
                                            }`}
                    >
                      <Clock className="h-3 w-3" />
                      {mela.bActive ? "Active" : "Completed"}
                    </span>
                  </div>
                </div>

                <div className="text-sm text-gray-700 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <span>
                      {formatDate(mela.dtStartDate)} -{" "}
                      {formatDate(mela.dtEndDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock1 className="h-4 w-4 text-green-600" />
                    <span>
                      {formatTime(mela.dtSlotStartTime)} -{" "}
                      {formatTime(mela.dtSlotEndTime)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span>{mela.vsAddress}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-green-600" />
                    <span>{mela.companyCount} companies participating</span>
                  </div>
                  {/* <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-green-600" />
                                        <span>{mela.organizer}</span>
                                    </div> */}
                  {/* <div className="flex items-center gap-2">
                                        <XCircle className="h-4 w-4 text-green-600" />
                                        <span>
                                            <span className="font-medium text-gray-800">Registration Deadline:</span> {new Date(mela.registrationDeadline).toLocaleDateString()}
                                        </span>
                                    </div> */}
                </div>

                {/* <div className="flex gap-2 mt-3 flex-wrap">
                                    {mela.categories.map((category, index) => (
                                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg text-xs flex items-center gap-1">
                                            <Tag className="h-3 w-3" />
                                            {category}
                                        </span>
                                    ))}
                                </div> */}

                <div className="flex gap-3 mt-4 pt-3 border-t border-gray-200">
                  <Link
                    to={`/mela/${mela.pklMelaId}`}
                    className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
                  >
                    <Eye className="h-3 w-3" />
                    View Details
                  </Link>
                  {/* {mela.dtStartDate && */}
                  {/*   new Date(mela.dtStartDate).getTime() < Date.now() && ( */}
                  {/*     <span className="text-red-500 text-sm font-medium flex items-center gap-1"> */}
                  {/*       <XCircle className="h-3 w-3" /> */}
                  {/*       Registration Closed */}
                  {/*     </span> */}
                  {/*   )} */}
                  {/* {!mela.isRegistered && registrationOpen && (
                                        <button className="bg-green-100 hover:bg-green-200 text-green-700 border border-green-300 px-3 py-1 rounded-lg text-sm font-medium">
                                            Register
                                        </button>
                                    )}
                                    {!registrationOpen && !mela.isRegistered && (
                                        <span className="text-red-500 text-sm font-medium flex items-center gap-1">
                                            <XCircle className="h-3 w-3" />
                                            Registration Closed
                                        </span>
                                    )} */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default UpcomingJobMelas;
