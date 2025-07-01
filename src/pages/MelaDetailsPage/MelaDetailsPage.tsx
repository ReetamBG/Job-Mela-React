import JobPostings from "@/pages/MelaDetailsPage/components/JobPostings";
import MelaInfo from "@/pages/MelaDetailsPage/components/MelaInfo";
import type { Mela } from "@/types";


const MelaDetailsPage = () => {
  const mela: Mela = {
  sl_no: 1,
  venue_name: "Assam Career Expo 2025",
  address: "Maniram Dewan Trade Center, Betkuchi, Guwahati",
  district: "Kamrup Metropolitan",
  start_date: "2025-07-10",
  end_date: "2025-07-12",
  melaDesc:
    "Join the Assam Career Expo 2025 to explore hundreds of job opportunities across tech, healthcare, and public sector industries. Meet recruiters, attend workshops, and land your dream job – all under one roof!",
  venueType: "In Person",
};

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <MelaInfo mela={mela} />
      <JobPostings jobPostings={null} />      
    </div>
  );
};

export default MelaDetailsPage;
