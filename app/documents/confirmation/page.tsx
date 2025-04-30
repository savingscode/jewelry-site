import Link from "next/link";
import { CheckCircle, Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DocumentConfirmationPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-green-200">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">
                Documents Successfully Uploaded
              </CardTitle>
              <CardDescription className="text-lg">
                Thank you for submitting your documents
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-neutral-100 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">
                  What happens next?
                </h3>
                <ol className="space-y-3 list-decimal list-inside text-neutral-700">
                  <li>
                    Our HR team will review your documents within 3-5 business
                    days
                  </li>
                  <li>
                    You'll receive an email confirmation once your documents
                    have been verified
                  </li>
                  <li>
                    If additional information is needed, we'll contact you via
                    email
                  </li>
                  <li>
                    Upon successful verification, you'll be notified about the
                    next steps in the hiring process
                  </li>
                </ol>
              </div>

              <div className="flex items-start gap-3 p-4 border rounded-lg border-amber-200 bg-amber-50">
                <Shield className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">
                    Document Security
                  </h4>
                  <p className="text-sm text-amber-700">
                    Your documents are securely stored in our encrypted system
                    and will only be accessible to authorized personnel. They
                    will be retained according to our data retention policy and
                    applicable regulations.
                  </p>
                </div>
              </div>

              <div className="text-center text-neutral-600">
                <p>
                  If you have any questions or need assistance, please contact
                  our HR department at{" "}
                  <a
                    href="mailto:hr@elegancejewelry.com"
                    className="text-amber-600 hover:underline"
                  >
                    hr@elegancejewelry.com
                  </a>
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex justify-center pt-2">
              <Link href="/careers">
                <Button className="bg-amber-600 hover:bg-amber-700">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Careers
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <div className="mt-8 text-center text-sm text-neutral-500">
            <p>Reference ID: {generateReferenceId()}</p>
            <p className="mt-1">
              Please save this reference ID for future inquiries about your
              application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate a random reference ID for the document submission
function generateReferenceId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `DOC-${timestamp.slice(-4)}-${random}`;
}
