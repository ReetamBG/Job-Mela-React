import JobPostings from "@/pages/MelaDetailsPage/components/JobPostings";
import MelaInfo from "@/pages/MelaDetailsPage/components/MelaInfo";

const MelaDetailsPage = () => {
  // const pklMelaId = useParams<{pklMelaId: string}>().pklMelaId!
  // const { melaInfo, jobPostings } = useMelaDetails({ pklMelaId });

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <MelaInfo />
      <JobPostings />      
    </div>
  );
};

export default MelaDetailsPage;
