import useMelaDetails from "@/hooks/useMelaDetails";
import JobPostingsCandidate from "@/pages/MelaDetailsPage/components/JobPostingsCandidate";
import JobPostingsEmployer from "@/pages/MelaDetailsPage/components/JobPostingsEmployer";
import MelaInfo from "@/pages/MelaDetailsPage/components/MelaInfo";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";
import { useParams } from "react-router-dom";

const MelaDetailsPage = () => {
  const { melaId } = useParams<{ melaId: string }>();
  const user = useAppSelector(selectCurrentUser);

  let userId;
  if (user?.type === "Mela Admin") {
    userId = null;
  } else if (user?.type === "candidate") {
    userId = user?.data?.id ?? null;
  } else {
    userId = user?.data[0]?.pklEntityId ?? null;
  }

  const { melaInfo, jobPostings, setJobPostings, isLoading } = useMelaDetails({
    pklMelaId: melaId!,
    pklCandidateId: userId ? String(userId) : undefined,
  });

  return (
    <div className="mx-auto">
      <MelaInfo melaInfo={melaInfo} isLoading={isLoading} />
      {!user || user.type === "candidate" ? (
        <JobPostingsCandidate
          melaId={melaId!}
          jobPostings={jobPostings}
          setJobPostings={setJobPostings}
          isLoading={isLoading}
          userId={userId}
          user={user}
        />
      ) : (
        <JobPostingsEmployer
          melaInfo={melaInfo}
          jobPostings={jobPostings}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default MelaDetailsPage;
