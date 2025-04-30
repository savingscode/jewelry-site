"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Shield,
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

export default function SecureDocumentsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [files, setFiles] = useState({
    idCardFront: null as File | null,
    idCardBack: null as File | null,
    transcript: null as File | null,
  });

  const [formData, setFormData] = useState({
    candidateId: "",
    ssn: "",
  });

  // Simulate redirect/loading screen for 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 4; // Increase by 4% every 200ms to reach 100% in 5 seconds
      });
    }, 200);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: keyof typeof files
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFiles((prev) => ({
        ...prev,
        [fileType]: e.target.files![0],
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Format SSN as user types (XXX-XX-XXXX)
  const formatSSN = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");

    // Apply formatting based on length
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 5) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else {
      return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(
        5,
        9
      )}`;
    }
  };

  const handleSSNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatSSN(e.target.value);
    setFormData((prev) => ({
      ...prev,
      ssn: formattedValue,
    }));
  };

  const validateForm = () => {
    // Check if candidate ID is provided
    if (!formData.candidateId.trim()) {
      setUploadError("Please enter your Candidate ID");
      return false;
    }

    // Validate SSN format (XXX-XX-XXXX)
    const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
    if (!ssnRegex.test(formData.ssn)) {
      setUploadError(
        "Please enter a valid Social Security Number in the format XXX-XX-XXXX"
      );
      return false;
    }

    // Check if all required files are uploaded
    if (!files.idCardFront || !files.idCardBack || !files.transcript) {
      setUploadError("Please upload all required documents");
      return false;
    }

    // Check file sizes (max 5MB each)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (
      files.idCardFront.size > maxSize ||
      files.idCardBack.size > maxSize ||
      files.transcript.size > maxSize
    ) {
      setUploadError("One or more files exceed the maximum size of 5MB");
      return false;
    }

    // Check file types
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (
      !allowedTypes.includes(files.idCardFront.type) ||
      !allowedTypes.includes(files.idCardBack.type) ||
      !allowedTypes.includes(files.transcript.type)
    ) {
      setUploadError("Please upload files in PDF, JPEG, or PNG format only");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData to send files and form data
      const data = new FormData(); // Renamed from 'formData' to 'data'
      data.append("candidateId", formData.candidateId);
      data.append("ssn", formData.ssn);
      data.append("idCardFront", files.idCardFront!);
      data.append("idCardBack", files.idCardBack!);
      data.append("transcript", files.transcript!);

      // Send data to the /upload-docs endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/upload-docs`,
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload documents");
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success message
      setUploadSuccess(true);

      // Redirect to thank you page after 3 seconds
      setTimeout(() => {
        router.push("/careers/documents/confirmation");
      }, 3000);
    } catch (error) {
      console.error("Error uploading documents:", error);
      setUploadError(
        "An error occurred while uploading your documents. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              Redirecting to Secure Portal
            </CardTitle>
            <CardDescription>
              Please wait while we redirect you to our secure document upload
              portal...
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <Shield className="h-16 w-16 text-amber-600 animate-pulse" />
            </div>
            <Progress value={loadingProgress} className="h-2" />
            <p className="text-center text-sm text-neutral-500">
              Establishing secure connection...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (uploadSuccess) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <CardTitle className="text-xl">
              Documents Uploaded Successfully!
            </CardTitle>
            <CardDescription>
              Your information has been securely uploaded to our system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-sm text-neutral-500">
              Redirecting you to the confirmation page...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Secure Document Upload</h1>
            <p className="text-neutral-600">
              Please provide the required information to complete your
              application process
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-amber-600" />
                <CardTitle className="text-xl">
                  Candidate Document Portal
                </CardTitle>
              </div>
              <CardDescription>
                All information is encrypted and securely stored in compliance
                with privacy regulations.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {uploadError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{uploadError}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="candidateId">
                    Candidate ID <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="candidateId"
                    name="candidateId"
                    value={formData.candidateId}
                    onChange={handleInputChange}
                    placeholder="Enter the Candidate ID provided in your application email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ssn">
                    Social Security Number{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="ssn"
                      name="ssn"
                      value={formData.ssn}
                      onChange={handleSSNChange}
                      placeholder="XXX-XX-XXXX"
                      maxLength={11}
                      className="pr-10"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <CreditCard className="h-4 w-4 text-neutral-400" />
                    </div>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Your SSN is required for employment verification and tax
                    purposes
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Required Documents</h3>
                  <p className="text-sm text-neutral-500">
                    Please upload the following documents in PDF, JPEG, or PNG
                    format (max 5MB each)
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="idCardFront">
                        Driver's License or ID Card (Front){" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="idCardFront"
                          type="file"
                          onChange={(e) => handleFileChange(e, "idCardFront")}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200"
                          required
                        />
                        {files.idCardFront && (
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-neutral-500">
                        Upload a clear copy of the front of your driver's
                        license or state ID
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="idCardBack">
                        Driver's License or ID Card (Back){" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="idCardBack"
                          type="file"
                          onChange={(e) => handleFileChange(e, "idCardBack")}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200"
                          required
                        />
                        {files.idCardBack && (
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-neutral-500">
                        Upload a clear copy of the back of your driver's license
                        or state ID
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="transcript">
                        High School Transcript{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="transcript"
                          type="file"
                          onChange={(e) => handleFileChange(e, "transcript")}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200"
                          required
                        />
                        {files.transcript && (
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-neutral-500">
                        Upload your official or unofficial high school
                        transcript
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="bg-amber-50 border-amber-200">
                  <FileText className="h-4 w-4 text-amber-600" />
                  <AlertTitle>Security Information</AlertTitle>
                  <AlertDescription className="text-sm">
                    Your Social Security Number and documents are encrypted
                    during transmission and storage. They will only be
                    accessible to authorized HR personnel for verification
                    purposes.
                  </AlertDescription>
                </Alert>
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
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Submit Information
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
