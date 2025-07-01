import HoverPill from "@/components/customComponents/HoverPill";
import { ArrowRight, GraduationCap, MessageCircleMore } from "lucide-react";
import { Link } from "react-router-dom";

interface CompanyCardProps {
  phoneNo: string;
  name: string;
  mela: string;
  qualification: string;
  type: "online" | "offline";
}

const CompanyCard = ({
  phoneNo,
  name,
  mela,
  qualification,
  type,
}: CompanyCardProps) => {
  return (
    <div className="min-w-[250px] max-w-sm flex-shrink-0 bg-white border border-emerald-400 shadow-card shadow-emerald-600 text-center px-6 py-8">
      <img
        src={`https://dummyimage.com/80x80/${Math.floor(
          Math.random() * 16777215
        ).toString(16)}/ffffff&text=${name.slice(0, 1)}`}
        alt={name}
        className="mx-auto mb-4"
        height={80}
        width={80}
      />
      <h3 className="text-base font-medium">{name}</h3>
      <p className="text-sm text-gray-500 mb-2 flex items-center justify-center gap-1">
        <span className="text-green-700 font-medium">Mela · {mela}</span>
      </p>

      <div className="grid grid-cols-2 gap-4 text-xs mt-4">
        {/* <div className="block items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs">
          <i className="bi bi-mortarboard-fill"></i>{" "}
          <span>{qualification}</span>
        </div>
        <div className="block items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs">
          <i className="bi bi-chat-dots-fill"></i> <span>{type}</span>
        </div> */}
        <HoverPill
          icon={<GraduationCap size={15} />}
          title={"Qualification"}
          subtitle={"Minimum Qualification Required"}
          content={qualification}
        />
        <HoverPill
          icon={<MessageCircleMore size={15} />}
          title={"Interview"}
          subtitle={"Interview Type"}
          content={type}
        />
      </div>

      <p className=" w-full">
        <Link
          to={`/company/${phoneNo}`}
          className="hover:underline flex text-xs text-emerald-700 justify-end mt-5 me-2"
        >
          More Details
          <span>
            <ArrowRight size={15} />
          </span>
        </Link>
      </p>
    </div>
  );
};

export default CompanyCard;
