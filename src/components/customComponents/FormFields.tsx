import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import type { Control, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  label: string;
  type?: string;
}

export const FormInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
  label,
  type = "text",
}: FormInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const FormSelect = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
}: {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: { value: string | number; label: string }[];
  placeholder?: string;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option, idx) => (
                <SelectItem key={idx} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface FormDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
}

export const FormDatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Select a date",
  minDate,
  maxDate,
}: FormDatePickerProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(new Date(field.value), "PPP")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => {
                  field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                }}
                disabled={(date) => {
                  if (minDate && date < minDate) return true;
                  if (maxDate && date > maxDate) return true;
                  return false;
                }}
                autoFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface FormMultiDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
}

export const FormMultiDatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Select dates",
  minDate,
  maxDate,
}: FormMultiDatePickerProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedDates: string[] = Array.isArray(field.value)
          ? field.value
          : [];

        const handleDateSelect = (date: Date | undefined) => {
          if (!date) return;

          const dateString = format(date, "yyyy-MM-dd");
          const currentDates: string[] = Array.isArray(field.value)
            ? field.value
            : [];

          if (currentDates.includes(dateString)) {
            // Remove date if already selected
            field.onChange(
              currentDates.filter((d: string) => d !== dateString)
            );
          } else {
            // Add date if not selected
            field.onChange([...currentDates, dateString]);
          }
        };

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "flex-1 justify-start text-left font-normal",
                          selectedDates.length === 0 && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDates.length > 0 ? (
                          `${selectedDates.length} date${
                            selectedDates.length > 1 ? "s" : ""
                          } selected`
                        ) : (
                          <span>{placeholder}</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={undefined}
                      onSelect={handleDateSelect}
                      disabled={(date) => {
                        if (minDate && date < minDate) return true;
                        if (maxDate && date > maxDate) return true;
                        return false;
                      }}
                      modifiers={{
                        selected: (date) => {
                          const dateString = format(date, "yyyy-MM-dd");
                          return selectedDates.includes(dateString);
                        },
                      }}
                      modifiersStyles={{
                        selected: {
                          backgroundColor: "hsl(var(--primary))",
                          color: "hsl(var(--primary-foreground))",
                        },
                      }}
                      autoFocus
                    />{" "}
                  </PopoverContent>
                </Popover>
                {selectedDates.length > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => field.onChange([])}
                    className="px-3"
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
