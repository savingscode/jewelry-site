"use client";

import type React from "react";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function JobApplicationPage() {
  const router = useRouter();
  const params = useParams(); // Unwrap params using useParams
  const job = Array.isArray(params.job) ? params.job[0] : params.job || ""; // Ensure job is a string
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: null,
    experience: "",
    heardFrom: "",
    ssn: "",
    idCardFront: null,
    idCardBack: null,
  });

  const [imagePreviews, setImagePreviews] = useState({
    idCardFront: null as string | null,
    idCardBack: null as string | null,
  });

  const [filePreviews, setFilePreviews] = useState({
    resume: null as string | null,
    coverLetter: null as string | null,
  });

  // Get job title from slug
  const getJobTitle = (slug: string) => {
    const titles: Record<string, string> = {
      "executive-secretary": "Executive Secretary",
      "virtual-assistant": "Virtual Assistant",
    };
    return titles[slug] || "Job Position";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value as Blob | string);
        }
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/send-dets`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success - redirect to thank you page
      router.push("/careers/thank-you");
    } catch (error) {
      console.error("Error submitting application:", error);
      setIsSubmitting(false);
      // Handle error state here
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, [field]: file }));

    if (file) {
      if (field === "resume" || field === "coverLetter") {
        setFilePreviews((prev) => ({ ...prev, [field]: file.name }));
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreviews((prev) => ({
            ...prev,
            [field]: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      if (field === "resume" || field === "coverLetter") {
        setFilePreviews((prev) => ({ ...prev, [field]: null }));
      } else {
        setImagePreviews((prev) => ({ ...prev, [field]: null }));
      }
    }
  };

  return (
    <div className="py-12 bg-neutral-50 min-h-screen">
      <div className="container mx-auto px-4">
        <Link
          href="/careers"
          className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Careers
        </Link>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">
              Apply for {getJobTitle(job)} {/* Use unwrapped job */}
            </CardTitle>
            <CardDescription>
              Please fill out the form below to apply for this position. All
              fields marked with * are required.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
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

                {/* <div className="space-y-2">
                  <Label htmlFor="ssn">
                    Social Security Number (SSN){" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="ssn"
                    name="ssn"
                    type="text"
                    value={formData.ssn}
                    onChange={handleInputChange}
                    required
                  />
                </div> */}

                {/* <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    ID Card/ Drivers Licence
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="idCardFront">
                      ID Front <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex items-center gap-4">
                      <input
                        id="idCardFront"
                        name="idCardFront"
                        type="file"
                        accept="image/jpeg, image/png"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "idCardFront")}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-24 flex flex-col items-center justify-center border-dashed"
                        onClick={() =>
                          document.getElementById("idCardFront")?.click()
                        }
                      >
                        {imagePreviews.idCardFront ? (
                          <img
                            src={imagePreviews.idCardFront}
                            alt="ID Front Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <>
                            <Upload className="w-6 h-6 mb-2" />
                            <span>Upload Front Image</span>
                            <span className="text-xs text-neutral-500 mt-1">
                              JPG, PNG (Max 5MB)
                            </span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idCardBack">
                      ID Back <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex items-center gap-4">
                      <input
                        id="idCardBack"
                        name="idCardBack"
                        type="file"
                        accept="image/jpeg, image/png"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "idCardBack")}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-24 flex flex-col items-center justify-center border-dashed"
                        onClick={() =>
                          document.getElementById("idCardBack")?.click()
                        }
                      >
                        {imagePreviews.idCardBack ? (
                          <img
                            src={imagePreviews.idCardBack}
                            alt="ID Back Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <>
                            <Upload className="w-6 h-6 mb-2" />
                            <span>Upload Back Image</span>
                            <span className="text-xs text-neutral-500 mt-1">
                              JPG, PNG (Max 5MB)
                            </span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div> */}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Resume & Cover Letter</h3>

                <div className="space-y-2">
                  <Label htmlFor="resume">
                    Resume <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center gap-4">
                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf, .doc, .docx"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "resume")}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-24 flex flex-col items-center justify-center border-dashed"
                      onClick={() => document.getElementById("resume")?.click()}
                    >
                      {filePreviews.resume ? (
                        <span className="text-sm text-neutral-700">
                          {filePreviews.resume}
                        </span>
                      ) : (
                        <>
                          <Upload className="w-6 h-6 mb-2" />
                          <span>Upload Resume</span>
                          <span className="text-xs text-neutral-500 mt-1">
                            PDF, DOC, or DOCX (Max 5MB)
                          </span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <div className="flex items-center gap-4">
                    <input
                      id="coverLetter"
                      name="coverLetter"
                      type="file"
                      accept=".pdf, .doc, .docx"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "coverLetter")}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-24 flex flex-col items-center justify-center border-dashed"
                      onClick={() =>
                        document.getElementById("coverLetter")?.click()
                      }
                    >
                      {filePreviews.coverLetter ? (
                        <span className="text-sm text-neutral-700">
                          {filePreviews.coverLetter}
                        </span>
                      ) : (
                        <>
                          <Upload className="w-6 h-6 mb-2" />
                          <span>Upload Cover Letter</span>
                          <span className="text-xs text-neutral-500 mt-1">
                            PDF, DOC, or DOCX (Max 5MB)
                          </span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Additional Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="experience">
                    Relevant Experience <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="Please describe your relevant experience for this position"
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="heardFrom">
                    How did you hear about us?{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("heardFrom", value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="company-website">
                        Company Website
                      </SelectItem>
                      <SelectItem value="job-board">Job Board</SelectItem>
                      <SelectItem value="social-media">Social Media</SelectItem>
                      <SelectItem value="referral">
                        Employee Referral
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/careers")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
