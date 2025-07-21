import type { Company } from "@/types";
// import { GraduationCap, MessageCircleMore } from "lucide-react";
import { Link } from "react-router-dom";

const CompanyCard = ({ company }: { company: Company }) => {
  return (
    <Link
      to={`/company/${company.companyMobile}`}
      className="flex flex-col justify-between min-w-[250px] max-w-[250px] flex-shrink-0 bg-white border border-gray-200 hover:shadow-lg transition-transform duration-200 hover:scale-[1.02] rounded-2xl text-center px-5 py-6 shadow-sm relative"
    >
      <div>
        <img
          src={`https://dummyimage.com/80x80/${Math.floor(
            Math.random() * 16777215,
          ).toString(16)}/ffffff&text=${company.companyName.slice(0, 1)}`}
          alt={company.companyName}
          className="mx-auto mb-3 rounded-full"
        />
        <h3 className="text-base font-semibold text-gray-800 mb-1">
          {company.companyName}
        </h3>
        <p className="text-xs text-gray-500 mb-2 leading-snug">
          {company.comDesc}
        </p>
        <p className="text-xs text-gray-700 font-semibold mb-3">
          Participating in {company.melaCount} melas
        </p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <HoverPill
          icon={<span>+</span>}
          color="emerald"
          title="Type"
          subtitle="Company Type"
          content={company.empTypeName}
        />
        <HoverPill
          icon={<span>o</span>}
          color="blue"
          title="Interview"
          subtitle="Interview Mode"
          content={company.selectionProcedure}
        />
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
