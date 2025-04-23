"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CalendarIcon, Clock, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, addDays, isBefore, isSunday, startOfDay } from "date-fns";

export default function BookAppointmentPage() {
  const router = useRouter();
  const tomorrow = addDays(new Date(), 1);
  const [date, setDate] = useState<Date | undefined>(tomorrow);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    appointmentType: "consultation",
    time: "",
    notes: "",
  });

  const availableTimes = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!date) {
      alert("Please select a date for your appointment");
      setIsSubmitting(false);
      return;
    }

    if (!formData.time) {
      alert("Please select a time for your appointment");
      setIsSubmitting(false);
      return;
    }

    try {
      // Format the date properly for the API
      const formattedDate = format(date, "yyyy-MM-dd");

      // Combine form data with selected date
      const appointmentData = {
        ...formData,
        date: formattedDate,
        formattedDate: format(date, "PPP"), // Human-readable date for display
      };

      console.log("Sending appointment data:", appointmentData);

      // Use the environment variable for the API URL if available, or fallback to a default
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
        ? `${process.env.NEXT_PUBLIC_API_URL}/book-appointment`
        : "/api/book-appointment";

      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(appointmentData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to book appointment");
      }

      // Success - redirect to confirmation page
      router.push("/book-appointment/confirmation");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert(
        "An error occurred while booking your appointment. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="/placeholder.svg?height=800&width=1920"
          alt="Jewelry consultation"
          fill
          className="object-cover"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Book an Appointment
          </h1>
          <p className="text-xl text-white/90 max-w-xl">
            Schedule a personalized consultation with our jewelry experts
          </p>
        </div>
      </section>

      {/* Appointment Types */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              We offer personalized appointments to help you find the perfect
              piece or create a custom design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center">
              <CardHeader className="pb-2">
                <CardTitle>Collection Viewing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <CalendarIcon className="w-8 h-8 text-amber-600" />
                </div>
                <p className="text-neutral-600">
                  Browse our exclusive collections with the guidance of our
                  jewelry specialists.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <CardTitle>Design Consultation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <Info className="w-8 h-8 text-amber-600" />
                </div>
                <p className="text-neutral-600">
                  Discuss your vision for a custom piece with our expert
                  designers.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader className="pb-2">
                <CardTitle>Private Showing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-amber-600" />
                </div>
                <p className="text-neutral-600">
                  Enjoy a private viewing of our most exclusive pieces in a
                  luxurious setting.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Schedule Your Visit</CardTitle>
              <CardDescription>
                Please fill out the form below to book your appointment. All
                fields marked with * are required.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Appointment Type */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Appointment Details</h3>

                  <div className="space-y-2">
                    <Label htmlFor="appointmentType">
                      Appointment Type <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup
                      defaultValue="consultation"
                      onValueChange={(value) =>
                        handleSelectChange("appointmentType", value)
                      }
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-neutral-50 cursor-pointer">
                        <RadioGroupItem
                          value="consultation"
                          id="consultation"
                        />
                        <Label
                          htmlFor="consultation"
                          className="cursor-pointer"
                        >
                          Collection Viewing
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-neutral-50 cursor-pointer">
                        <RadioGroupItem value="design" id="design" />
                        <Label htmlFor="design" className="cursor-pointer">
                          Design Consultation
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-neutral-50 cursor-pointer">
                        <RadioGroupItem value="private" id="private" />
                        <Label htmlFor="private" className="cursor-pointer">
                          Private Showing
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>
                        Date <span className="text-red-500">*</span>
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Select a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(newDate) => {
                              setDate(newDate);
                              console.log("Date selected:", newDate);
                            }}
                            initialFocus
                            disabled={(date) => {
                              const today = startOfDay(new Date());
                              return isBefore(date, today) || isSunday(date);
                            }}
                            className="border rounded-md"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">
                        Time <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange("time", value)
                        }
                        required
                        value={formData.time}
                      >
                        <SelectTrigger id="time">
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent
                          position="popper"
                          className="max-h-[300px]"
                        >
                          {availableTimes.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {!formData.time && isSubmitting && (
                        <p className="text-red-500 text-sm mt-1">
                          Please select an appointment time
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Please share any specific requests or questions you have for your appointment"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Book Appointment"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                How long do appointments typically last?
              </h3>
              <p className="text-neutral-600">
                Our appointments are scheduled for 1 hour, but we can
                accommodate longer sessions for custom design consultations if
                needed.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                Is there a fee for booking an appointment?
              </h3>
              <p className="text-neutral-600">
                No, all consultations are complimentary. We're committed to
                helping you find or create the perfect piece.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                Can I bring someone with me to my appointment?
              </h3>
              <p className="text-neutral-600">
                We encourage you to bring along anyone who might help you make
                your decision.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                What if I need to reschedule my appointment?
              </h3>
              <p className="text-neutral-600">
                You can reschedule up to 24 hours before your appointment by
                calling us or using the link in your confirmation email.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
