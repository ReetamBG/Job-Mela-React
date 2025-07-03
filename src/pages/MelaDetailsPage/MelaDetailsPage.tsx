import JobPostingsCandidate from "@/pages/MelaDetailsPage/components/JobPostingsCandidate";
import JobPostingsEmployer from "@/pages/MelaDetailsPage/components/JobPostingsEmployer";
import MelaInfo from "@/pages/MelaDetailsPage/components/MelaInfo";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";

const MelaDetailsPage = () => {
  const user = useAppSelector(selectCurrentUser);
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <MelaInfo />
      {!user || user.type === "candidate" ? (
        <JobPostingsCandidate />
      ) : (
        <JobPostingsEmployer />
      )}
    </div>
  );
};

export default MelaDetailsPage;
