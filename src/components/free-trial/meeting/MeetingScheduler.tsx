import { UseFormReturn } from "react-hook-form";
import { FreeTrialFormData } from "@/lib/validations/free-trial";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
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
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MeetingSchedulerProps {
  form: UseFormReturn<FreeTrialFormData>;
}

export const MeetingScheduler = ({ form }: MeetingSchedulerProps) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  const selectedDate = watch("meetingDate");
  const meetingType = watch("meetingType");
  const selectedTime = watch("meetingTime");

  // Get the minimum allowed date (2 days from now)
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);
  minDate.setHours(0, 0, 0, 0);

  // Generate available times (8 AM to 9 PM)
  const availableTimes = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 8;
    return {
      value: `${hour}:00`,
      label: `${hour === 12 ? 12 : hour % 12}:00 ${hour >= 12 ? "PM" : "AM"}`,
    };
  });

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg">Schedule Your Free Consultation</h3>

      <div className="space-y-3">
        <Label>Meeting Type</Label>
        <RadioGroup
          defaultValue={meetingType}
          onValueChange={(value) =>
            setValue("meetingType", value as "online" | "onsite")
          }
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="online" id="online" />
            <Label htmlFor="online">Online Meeting (Zoom)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="onsite" id="onsite" />
            <Label htmlFor="onsite">Onsite at Breka Hastings</Label>
          </div>
        </RadioGroup>
        {errors.meetingType && (
          <p className="text-red-500 text-sm">{errors.meetingType.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => setValue("meetingDate", date)}
                disabled={(date) => date < minDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.meetingDate && (
            <p className="text-red-500 text-sm">{errors.meetingDate.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label>Time</Label>
          <Select
            value={selectedTime}
            onValueChange={(value) => setValue("meetingTime", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {availableTimes.map((time) => (
                <SelectItem key={time.value} value={time.value}>
                  {time.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.meetingTime && (
            <p className="text-red-500 text-sm">{errors.meetingTime.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};