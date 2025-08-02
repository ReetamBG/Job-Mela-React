import type { Company } from "@/types";
// import { GraduationCap, MessageCircleMore } from "lucide-react";
import { Link } from "react-router-dom";

const CompanyCard = ({ company }: { company: Company }) => {
  return (
    <Link
      to={`/company/${company.companyMobile}`}
      className="flex flex-col min-w-[280px] max-w-[280px] flex-shrink-0 bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] rounded-3xl overflow-hidden"
    >
      {/* Header Section - Green background */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white">
        <div className="flex items-center gap-3">
          <img
            src={`https://dummyimage.com/40x40/${Math.floor(
              Math.random() * 16777215,
            ).toString(16)}/ffffff&text=${company.companyName.slice(0, 1)}`}
            alt={company.companyName}
            className="rounded-full border-2 border-white/20 flex-shrink-0"
          />
          <h3 className="text-lg font-semibold leading-tight flex-1 truncate">
            {company.companyName}
          </h3>
        </div>
      </div>

      {/* Content Section - White background */}
      <div className="p-6 flex-1 bg-gray-50">
        <p className="text-sm text-gray-600 mb-6 leading-snug">
          {company.comDesc || "Company description not available."}
        </p>

        {/* Info with icons */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <i className="bi bi-buildings text-emerald-600 text-sm"></i>
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Participation</div>
              <div className="text-sm font-semibold text-gray-700">Participating in {company.melaCount} melas</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <i className="bi bi-briefcase text-emerald-600 text-sm"></i>
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Company Type</div>
              <div className="text-sm font-semibold text-gray-700">{company.empTypeName}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <i className="bi bi-person-check text-emerald-600 text-sm"></i>
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Selection Process</div>
              <div className="text-sm font-semibold text-gray-700">{company.selectionProcedure}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
  // return (
  //   <Link to={`/company/${phoneNo}`} className="flex-shrink-0 bg-white border border-gray-400 shadow-card shadow-gray-600 hover:bg-gray-100 text-center px-6 py-8">
  //     <img
  //       src={`https://dummyimage.com/80x80/${Math.floor(
  //         Math.random() * 16777215
  //       ).toString(16)}/ffffff&text=${name.slice(0, 1)}`}
  //       alt={name}
  //       className="mx-auto mb-4"
  //       height={80}
  //       width={80}
  //     />
  //     <h3 className="text-base font-medium">{name}</h3>
  //     <p className="text-sm text-gray-500 mb-2 flex items-center justify-center gap-1">
  //       <span className="text-green-700 font-medium">Mela · {mela}</span>
  //     </p>
  //
  //     <div className="grid grid-cols-2 gap-4 text-xs mt-4">
  //       <HoverPill
  //         icon={<GraduationCap size={15} />}
  //         title={"Qualification"}
  //         subtitle={"Minimum Qualification Required"}
  //         content={qualification}
  //       />
  //       <HoverPill
  //         icon={<MessageCircleMore size={15} />}
  //         title={"Interview"}
  //         subtitle={"Interview Type"}
  //         content={type}
  //       />
  //     </div>
  //
  //     <p className=" w-full">
  //
  //     </p>
  //   </Link>
  // );
};

export default CompanyCard;

interface HoverPillProps {
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  content: string;
  color: "emerald" | "blue";
}

export function HoverPill({
  icon,
  title,
  subtitle,
  content,
  color,
}: HoverPillProps) {
  return (
    <div className="relative group">
      <div
        className={`px-2.5 py-1 text-xs rounded-full border 
${color === "emerald" ? "border-emerald-400 text-emerald-600 bg-emerald-50" : "border-blue-400 text-blue-600 bg-blue-50"} flex items-center gap-1`}
      >
        <span className="text-sm">{icon}</span> {title}
      </div>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-[180px] px-3 py-2 bg-gray-900 text-white text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
        <div className="font-medium mb-1">{subtitle}</div>
        {content}
      </div>
    </div>
  );
}
