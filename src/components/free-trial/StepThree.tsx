
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
          Ini adalah konsultasi gratis. Tidak ada pembayaran yang diperlukan sekarang - Anda hanya
          akan dikenakan biaya jika Anda memutuskan untuk melanjutkan dengan layanan kami setelah meninjau
          redesain website.
        </AlertDescription>
      </Alert>

      {/* Plans Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Pilih Paket yang Anda Inginkan</h3>
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
                <h4 className="font-semibold text-xl">Dasar</h4>
                <p className="text-2xl font-bold mt-2">
                  Rp 11.500.000<span className="text-sm font-normal">/bulan</span>
                </p>
              </div>
              {selectedPlan === "starter" && (
                <Check className="text-rich-purple h-6 w-6" />
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Sempurna untuk bisnis kecil yang ingin membangun kehadiran online mereka
            </p>
            <div className="mt-6">
              <p className="font-medium mb-3">Yang termasuk:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Desain website responsif kustom</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Hingga 5 halaman</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Pengaturan optimasi SEO dasar</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Pendekatan mobile-first</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>
                    Pemeliharaan bulanan (pembaruan, perbaikan bug, dan backup)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Waktu respons dukungan 24 jam</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Laporan kinerja bulanan</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Batalkan kapan saja, tanpa kontrak</span>
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
                <h4 className="font-semibold text-xl">Profesional</h4>
                <p className="text-2xl font-bold mt-2">
                  Rp 19.500.000<span className="text-sm font-normal">/bulan</span>
                </p>
              </div>
              {selectedPlan === "professional" && (
                <Check className="text-rich-purple h-6 w-6" />
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Untuk bisnis berkembang yang membutuhkan kehadiran online yang kuat
            </p>
            <div className="mt-6">
              <p className="font-medium mb-3">Semua fitur Dasar, plus:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Hingga 30 halaman.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Pemeliharaan dan pemantauan mingguan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Pengaturan fungsionalitas e-commerce</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Animasi dan interaksi kustom</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Waktu respons dukungan 1 jam</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Analitik kinerja mingguan</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Dukungan prioritas (email dan live chat 24/7).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Pengaturan otomatisasi</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Akses prioritas ke fitur baru</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>

      {/* Meeting Schedule */}
      <div className="space-y-6">
        <h3 className="font-semibold text-lg">
          Jadwalkan Konsultasi Gratis Anda
        </h3>

        {/* Meeting Type Selection */}
        <div className="space-y-3">
          <Label>Jenis Pertemuan</Label>
          <RadioGroup
            defaultValue={meetingType}
            onValueChange={(value) =>
              setValue("meetingType", value as "online" | "onsite")
            }
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="online" id="online" />
              <Label htmlFor="online">Pertemuan Online (Zoom)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="onsite" id="onsite" />
              <Label htmlFor="onsite">Tatap Muka di Kantor Jakarta</Label>
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
            <Label>Tanggal</Label>
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
                  {selectedDate ? format(selectedDate, "PPP") : "Pilih tanggal"}
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
            <Label>Waktu</Label>
            <Select
              value={selectedTime}
              onValueChange={(value) => setValue("meetingTime", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih waktu" />
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
