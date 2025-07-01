import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const JobPostings = ({ jobPostings }: { jobPostings: null }) => {
  console.log(jobPostings);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Job Postings at this Mela
      </h2>
      <div className="border border-dashed border-gray-300 p-6 rounded-md text-gray-500 text-sm text-center mb-5">
        No job postings available yet.
      </div>
      <div className="flex flex-col gap-6">
        <p className="my-2 text-emerald-700 text-sm p-3 border border-emerald-400 rounded-xl">Click to select the postings you want to apply for.<br />You can select multiple postings and apply for them all at once.</p>
        <form action="">
          <div className="max-h-[420px] overflow-y-auto flex flex-col gap-3">
            {[...Array(20)].map((_, index) => (
              <div key={index}>
                <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-emerald-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-emerald-900 dark:has-[[aria-checked=true]]:bg-emerald-950">
                  <Checkbox
                    id={`job-${index}`}
                    className="data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600 data-[state=checked]:text-white dark:data-[state=checked]:border-emerald-700 dark:data-[state=checked]:bg-emerald-700"
                  />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-base leading-none font-medium">
                      Job Title: Hoola Moola
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Company: Hoola Moola Pvt Ltd
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Minimum Qualification: 10th Pass
                    </p>
                  </div>
                </Label>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <Button type="submit" className="rounded-full h-10">
              Apply for Selected Jobs
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobPostings;
