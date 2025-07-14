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
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useMasterApi from "@/hooks/useMasterApi";
import { useFieldArray } from "react-hook-form";
import { Form } from "@/components/ui/form";
import {
  FormInput,
  FormSelect,
  FormMultiDatePicker,
} from "@/components/customComponents/FormFields";
import type { Mela } from "@/types";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";
import { useState } from "react";

export default function EmployerApplyMelaFormModal({ mela }: { mela: Mela }) {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const employerId =
    user?.type === "Employer" ? user.data[0].pklEntityId : null;
  const jobPostSchema = z
    .object({
      vsPostName: z.string().min(1, "Post name is required"),
      iVacancy: z.coerce.number().min(1, "Vacancies must be at least 1"),
      iInterviewDurationMin: z.coerce
        .number()
        .min(1, "Duration must be at least 1 minute"),
      fklMinQalificationId: z.coerce.number({
        invalid_type_error: "Qualification is required",
      }),
      dtInterviewStartTime: z.string().min(1, "Start time is required"),
      dtInterviewEndTime: z.string().min(1, "End time is required"),
      participationDates: z
        .array(z.string())
        .min(1, "Select at least one participation date"),
      vsSelectionProcedure: z.enum(["online", "offline"]),
    })
    .refine(
      (data) => {
        // Check if all participation dates fall within the mela date range
        return data.participationDates.every(
          (date) => date >= mela.dtStartDate && date <= mela.dtEndDate
        );
      },
      {
        message: "All participation dates must fall within the mela date range",
        path: ["participationDates"],
      }
    );

  const schema = z.object({
    jobList: z.array(jobPostSchema).min(1, "Add at least one job post"),
  });

  type FormFields = z.infer<typeof schema>;

  const { qualifications } = useMasterApi();
  const qualificationOptions = qualifications.map((q) => ({
    // for select input
    value: q.pklQualificationId,
    label: q.vsQualification,
  }));

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      jobList: [
        {
          vsPostName: "",
          iVacancy: 1,
          iInterviewDurationMin: 15,
          fklMinQalificationId: undefined,
          dtInterviewStartTime: "",
          dtInterviewEndTime: "",
          participationDates: [],
          vsSelectionProcedure: "online",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "jobList",
  });

  const onSubmit = async (data: FormFields) => {
    const jobList = data.jobList.map((job) => {
      return {
        vsPostName: job.vsPostName,
        iVacancy: job.iVacancy,
        iInterviewDurationMin: job.iInterviewDurationMin,
        fklMinQalificationId: job.fklMinQalificationId,
        dtInterviewStartTime: job.dtInterviewStartTime,
        dtInterviewEndTime: job.dtInterviewEndTime,
        vsSelectionProcedure: job.vsSelectionProcedure,
        participationDates: job.participationDates,
      };
    });

    const submissionData = {
      melaID: mela.pklMelaId,
      fklEmployerId: employerId,
      jobList,
    };

    console.log("Submitting data: ", submissionData);

    try {
      const res = await fetch(
        "https://job-mela.skillmissionassam.org/nw/v1/company/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        }
      );

      const resData = await res.json();

      if (!res.ok || resData.status !== true) {
        const errorData = await res.json();
        console.log(errorData || "Failed to apply for Mela");
        throw new Error("Failed to apply for Mela. Please try again.");
      }

      form.reset();
      toast.success("Successfully applied for Mela!");
      setIsOpen(false); // Close the modal on successful submission
    } catch (error) {
      toast.error("Failed to apply for Mela");
      console.error("Error applying for Mela: ", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full h-8">Apply for Mela</Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-[95%] sm:max-w-8xl max-h-[80vh] top-4/7 overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>Apply for {mela.vsVenueName} Mela</DialogTitle>
              <DialogDescription>
                Add at least one Job Post to apply for the Mela.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {fields.map((field, index) => (
                <div key={index}>
                  <p className="font-semibold text-xl">Job Post {index + 1}</p>
                  <div
                    key={field.id}
                    className="border p-6 rounded-lg bg-muted grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                  >
                    <FormInput
                      name={`jobList.${index}.vsPostName`}
                      label="Post Name"
                      control={form.control}
                      placeholder="Enter post name"
                    />

                    <FormSelect
                      name={`jobList.${index}.fklMinQalificationId`}
                      label="Minimum Qualification"
                      control={form.control}
                      options={qualificationOptions}
                      placeholder="Select qualification"
                    />

                    <FormInput
                      name={`jobList.${index}.iVacancy`}
                      label="Vacancies"
                      type="number"
                      control={form.control}
                      placeholder="Enter number of vacancies"
                    />

                    <FormInput
                      name={`jobList.${index}.iInterviewDurationMin`}
                      label="Interview Duration (min)"
                      type="number"
                      control={form.control}
                      placeholder="Enter duration in minutes"
                    />

                    <FormInput
                      name={`jobList.${index}.dtInterviewStartTime`}
                      label="Interview Start Time"
                      type="time"
                      control={form.control}
                    />

                    <FormInput
                      name={`jobList.${index}.dtInterviewEndTime`}
                      label="Interview End Time"
                      type="time"
                      control={form.control}
                    />

                    <FormMultiDatePicker
                      name={`jobList.${index}.participationDates`}
                      label="Participation Dates"
                      control={form.control}
                      minDate={new Date(mela.dtStartDate)}
                      maxDate={new Date(mela.dtEndDate)}
                      placeholder="Select participation dates"
                    />

                    <FormSelect
                      name={`jobList.${index}.vsSelectionProcedure`}
                      label="Selection Procedure"
                      control={form.control}
                      options={[
                        { value: "online", label: "Online" },
                        { value: "offline", label: "Offline" },
                      ]}
                    />

                    {index > 0 && (
                      <div className="flex justify-end col-span-full">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <Button
                type="button"
                onClick={() =>
                  append({
                    vsPostName: "",
                    iVacancy: 1,
                    iInterviewDurationMin: 15,
                    fklMinQalificationId: qualificationOptions?.[0]?.value || 1,
                    dtInterviewStartTime: "",
                    dtInterviewEndTime: "",
                    participationDates: [],
                    vsSelectionProcedure: "online",
                  })
                }
              >
                + Add Another Job Post
              </Button>
            </div>

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button variant="outline" onClick={() => form.reset()}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    Applying...
                  </>
                ) : (
                  "Apply"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
