import { formatDate } from "@/lib/dateTime";
import { useAppSelector } from "@/store/hooks";
import {
  Users,
  Briefcase,
  MapPin,
  Calendar,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface MyJobMela {
  address: string;
  description: string;
  district: string;
  dtSlotEndTime: string;
  dtSlotStartTime: string;
  end_date: string;
  melaId: number;
  start_date: string;
  total_applicants: number;
  total_vacancy: number;
  venueName: string;
}

const MyJobMelas = () => {
  const user = useAppSelector((state) => state.auth.user);
  if (user?.type !== "Employer") return null;

  const [loading, setLoading] = useState(true);
  const [myJobMelas, setMyJobMelas] = useState<MyJobMela[]>([]);

  useEffect(() => {
    try {
      setLoading(true);
      (async () => {
        const res = await fetch(
          "https://public-registration.skillmissionassam.org/client/company/company-wise-mela",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              entityId: user.data[0].pklEntityId,
            }),
          },
        );
        const resData = await res.json();
        console.log("Job Melas from myJobMelas:", resData);
        if (!res.ok) {
          throw new Error(resData.message || "Failed to fetch job melas");
        } else {
          setMyJobMelas(resData.data);
        }
      })();
    } catch (error) {
      toast.error("Error fetching job melas");
      console.log("Error fetching job melas:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // const getStatusColor = (status: number) => {
  //   switch (status) {
  //     case 1:
  //       return "bg-green-100 text-green-600 border border-green-200";
  //     case 0:
  //       return "bg-gray-100 text-gray-500 border border-gray-200";
  //     default:
  //       return "bg-blue-100 text-blue-600 border border-blue-200";
  //   }
  // };

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  if (loading) return null;

  return (
    <>
      <style>{`
                .scrollbar-thin::-webkit-scrollbar {
                    height: 6px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: #f0f0f0;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background: #ccc;
                    border-radius: 3px;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb:hover {
                    background: #999;
                }
            `}</style>

      <div className="text-black relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold ps-10">My Job Melas</h2>
          {/* <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"> */}
          {/*   <Plus className="h-4 w-4" /> */}
          {/*   Create New */}
          {/* </button> */}
        </div>

        {/* Navigation Buttons */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white border rounded-full shadow p-1 hover:bg-gray-100"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white border rounded-full shadow p-1 hover:bg-gray-100"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-thin pb-2 scroll-smooth px-8"
        >
          {myJobMelas.map((mela) => (
            <div
              key={mela.melaId}
              className="min-w-[300px] max-w-sm bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition duration-200 flex-shrink-0"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-900">
                  {mela.venueName}
                </h3>
                {/* <span */}
                {/*   className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(mela.status)}`} */}
                {/* > */}
                {/*   {mela.status} */}
                {/* </span> */}
              </div>

              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-500" />
                  <span>
                    {formatDate(mela.start_date)} - {formatDate(mela.end_date)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-500" />
                  <span>{mela.address}</span>
                </div>
                <div className="flex justify-between mt-3 pt-2 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-500" />
                    <span className="text-xs">
                      <span className="font-medium text-gray-800">
                        Applicants:
                      </span>{" "}
                      {mela.total_applicants}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-green-500" />
                    <span className="text-xs">
                      <span className="font-medium text-gray-800">
                        Vacancies:
                      </span>{" "}
                      {mela.total_vacancy}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <Link
                  to={`/mela/${mela.melaId}`}
                  className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors flex items-center gap-1"
                >
                  <Eye className="h-3 w-3" />
                  View Details
                </Link>
                {/* <button className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors flex items-center gap-1"> */}
                {/*   <Edit className="h-3 w-3" /> */}
                {/*   Edit */}
                {/* </button> */}
                {/* {mela.status === "Active" && ( */}
                {/*   <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors flex items-center gap-1"> */}
                {/*     <Settings className="h-3 w-3" /> */}
                {/*     Manage */}
                {/*   </button> */}
                {/* )} */}
              </div>
            </div>
          ))}
        </div>

        {myJobMelas.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium mb-2">No job melas created yet</p>
            {/* <p className="text-sm"> */}
            {/*   Create your first job mela to get started! */}
            {/* </p> */}
          </div>
        )}
      </div>
    </>
  );
};

export default MyJobMelas;
