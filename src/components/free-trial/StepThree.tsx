import { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Check, AlertCircle } from "lucide-react";
import { FreeTrialFormData } from "@/lib/validations/free-trial";

interface StepThreeProps {
  form: UseFormReturn<FreeTrialFormData>;
}

export const StepThree = ({ form }: StepThreeProps) => {
  const {
    formState: { errors },
    watch,
    setValue,
  } = form;
  const selectedPlan = watch("selectedPlan");
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          This is a free consultation. No payment is required now - you'll only
          be charged if you decide to proceed with our services after reviewing
          the website redesign.
        </AlertDescription>
      </Alert>

      {/* Plans Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Choose Your Preferred Plan</h3>
          {errors.selectedPlan && (
            <p className="text-red-500 text-sm">
              {errors.selectedPlan.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Basic Plan */}
          <Card
            className={cn(
              "p-6 cursor-pointer border-2 transition-all hover:border-rich-purple/50",
              selectedPlan === "starter"
                ? "border-rich-purple ring-2 ring-rich-purple ring-offset-2"
                : "border-muted",
            )}
            onClick={() => setValue("selectedPlan", "starter")}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-xl">Basic</h4>
                <p className="text-2xl font-bold mt-2">
                  $750<span className="text-sm font-normal">/month</span>
                </p>
              </div>
              {selectedPlan === "starter" && (
                <Check className="text-rich-purple h-6 w-6" />
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Perfect for small businesses looking to establish their online
              presence
            </p>
            <div className="mt-6">
              <p className="font-medium mb-3">What's included:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Custom responsive website design</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Up to 5 pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Basic SEO optimization setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Mobile-first approach</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>
                    Monthly maintenance (updates, bug fixes, and backups)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>24-hour support response time</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Monthly performance report</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Cancel anytime, no contracts</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Professional Plan */}
          <Card
            className={cn(
              "p-6 cursor-pointer border-2 transition-all hover:border-rich-purple/50",
              selectedPlan === "professional"
                ? "border-rich-purple ring-2 ring-rich-purple ring-offset-2"
                : "border-muted",
            )}
            onClick={() => setValue("selectedPlan", "professional")}
          >
            <div className="flex justify-between items-start">
              <div className="relative">
                <h4 className="font-semibold text-xl">Professional</h4>
                <p className="text-2xl font-bold mt-2">
                  $1,275<span className="text-sm font-normal">/month</span>
                </p>
              </div>
              {selectedPlan === "professional" && (
                <Check className="text-rich-purple h-6 w-6" />
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              For growing businesses that need a powerful online presence
            </p>
            <div className="mt-6">
              <p className="font-medium mb-3">Everything in Basic, plus:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Up to 30 pages.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Weekly maintenance and monitoring.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>E-commerce functionality setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Custom animations and interactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>1-hour support response time</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Weekly performance analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Priority support (email and live chat 24/7).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Automation setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Priority access to new features</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>

      {/* Meeting Schedule */}
      <div className="space-y-6">
        <h3 className="font-semibold text-lg">
          Schedule Your Free Consultation
        </h3>

        {/* Meeting Type Selection */}
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

        {/* Date and Time Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date Selection */}
          <div className="space-y-3">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground",
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
              <p className="text-red-500 text-sm">
                {errors.meetingDate.message}
              </p>
            )}
          </div>

          {/* Time Selection */}
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
              <p className="text-red-500 text-sm">
                {errors.meetingTime.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
