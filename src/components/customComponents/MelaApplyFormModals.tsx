import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDetails from "@/hooks/useDetails";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { Mela } from "@/types";
import { toast } from "react-toastify";
import { useAppSelector } from "@/store/hooks";
import type { CandidateUser } from "@/types";
import { selectCurrentUser } from "@/store/slices/authSlice";

interface JobPost {
  qualification: string;
  postName: string;
  vacancy: number;
}

export const EmployerApplyFormModal = ({ mela }: { mela: Mela }) => {
  // const CompanyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6Mjg5OSwiZW1haWwiOiJFTVBSMDAwMDAxIiwidHlwZSI6IkVtcGxveWVyIiwiaWF0IjoxNzUxMjc5MzA3LCJleHAiOjE3NTM4NzEzMDd9.DW04F3otb6YKf-8I-APwMDExSMoD-tnNxYkv9Id4UQo'
  // const candidateToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiI2MDAxMzE0NTA4IiwiaWF0IjoxNzUxMjY3NjAzLCJleHAiOjE3NTM4NTk2MDN9.KsFGQjpzCbZmSyLewHU3bftwjFoZhPLlB1B2MvIhjLw'
  const { qualifications } = useDetails();

  const [jobPosts, setJobPosts] = useState<JobPost[]>([
    {
      qualification: "",
      postName: "",
      vacancy: 0,
    },
  ]);

  const handleAddPost = () => {
    setJobPosts((prev) => [
      ...prev,
      { qualification: "", postName: "", vacancy: 0 },
    ]);
  };

  const handleRemovePost = () => {
    setJobPosts(jobPosts.slice(0, -1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasEmpty = jobPosts.some(
      (post) =>
        post.qualification.trim() === "" ||
        post.postName.trim() === "" ||
        isNaN(post.vacancy) ||
        post.vacancy <= 0
    );

    if (hasEmpty) {
      toast.error("Please fill out all fields.");
      return;
    }

    console.log("Submitted Posts: ", jobPosts);
    setJobPosts([{ qualification: "", postName: "", vacancy: 0 }]);
    toast.success("Application submitted successfully!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full text-xs h-8 cursor-pointer">
          Apply
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              Apply for Mela - <span>{mela.venue_name}</span>
            </DialogTitle>
            <DialogDescription>
              Fill in the details and apply for the selected mela
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5 overflow-scroll max-h-[350px] grid grid-cols-1 sm:grid-cols-2 gap-5">
            {jobPosts.map((post, idx) => (
              <div key={idx} className="grid gap-4">
                <p className="font-semibold">Post {idx + 1}</p>
                <div className="grid gap-3">
                  <Label htmlFor="qualification">Qualifications</Label>
                  <Select
                    name={`qualification-${idx}`}
                    value={post.qualification}
                    onValueChange={(value) => {
                      const updatePosts = [...jobPosts];
                      updatePosts[idx].qualification = value;
                      setJobPosts(updatePosts);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {/* <SelectLabel>Fruits</SelectLabel> */}
                        {qualifications.map((qualification) => (
                          <SelectItem
                            key={qualification.pklQualificationId}
                            value={String(qualification.pklQualificationId)}
                          >
                            {qualification.vsQualification}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="vacancy">Vacancy</Label>
                  <Input
                    value={post.vacancy}
                    type="number"
                    id="vacancy"
                    name="vacancy"
                    placeholder="Enter Vacancy"
                    onChange={(e) => {
                      const updatePosts = [...jobPosts];
                      updatePosts[idx].vacancy = parseInt(e.target.value, 10);
                      setJobPosts(updatePosts);
                    }}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="post-name">Post Name</Label>
                  <Input
                    value={post.postName}
                    id="post-name"
                    name="post-name"
                    placeholder="Enter Post Name"
                    onChange={(e) => {
                      const updatePosts = [...jobPosts];
                      updatePosts[idx].postName = e.target.value;
                      setJobPosts(updatePosts);
                    }}
                  />
                </div>
                <hr className="my-4" />
              </div>
            ))}
            <div className="flex justify-start gap-2 mb-5">
              {jobPosts.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  className="text-xs rounded-full border-red-500 text-red-500 h-7"
                  onClick={handleRemovePost}
                >
                  Remove <Minus />
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                className="text-xs rounded-full h-7"
                onClick={handleAddPost}
              >
                Add more <Plus />
              </Button>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Apply</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};


export const CandidateApplyFormModal = ({ mela }: { mela: Mela }) => {
  const baseUser = useAppSelector(selectCurrentUser);
if (!baseUser || baseUser.type !== "candidate") return null;

const user = baseUser as CandidateUser;

  // Type guard for Candidate
  if (!user || user.type !== "candidate") return null;
  if (!user.data) {
    toast.error("User data is not available.");
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full text-xs h-8 cursor-pointer">Apply</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] sm:max-w-[600px]">
        <form>
          <DialogHeader>
            <DialogTitle>Apply for Mela - {mela.venue_name}</DialogTitle>
            <DialogDescription>
              Review your information before applying. All fields are read-only.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5 max-h-[400px] sm:max-h-auto overflow-y-auto sm:overflow-visible grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="grid gap-3">
              <Label>First Name</Label>
              <Input value={user.data.firstName} disabled />
            </div>
            <div className="grid gap-3">
              <Label>Middle Name</Label>
              <Input value={user.data.middleName ?? ""} disabled />
            </div>
            <div className="grid gap-3">
              <Label>Last Name</Label>
              <Input value={user.data.lastName} disabled />
            </div>
            <div className="grid gap-3">
              <Label>Date of Birth</Label>
              <Input value={new Date(user.data.dob).toLocaleDateString()} disabled />
            </div>
            <div className="grid gap-3">
              <Label>Mobile</Label>
              <Input value={user.data.mobile} disabled />
            </div>
            <div className="grid gap-3">
              <Label>Gender</Label>
              <Input value={user.data.gender} disabled />
            </div>
            <div className="grid gap-3">
              <Label>Religion</Label>
              <Input value={user.data.religion} disabled />
            </div>
            <div className="grid gap-3">
              <Label>Caste</Label>
              <Input value={user.data.caste} disabled />
            </div>
            <div className="grid gap-3">
              <Label>Qualification</Label>
              <Input value={user.data.qualification} disabled />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled>
              Apply
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};