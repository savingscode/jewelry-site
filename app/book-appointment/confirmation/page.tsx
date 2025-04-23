import Link from "next/link";
import { CheckCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AppointmentConfirmationPage() {
  return (
    <div className="py-20 bg-neutral-50 min-h-screen flex items-center">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Appointment Confirmed!</h1>

          <p className="text-neutral-600 mb-8">
            Thank you for scheduling an appointment with Elegance Jewelry. We've
            sent a confirmation email with all the details. We look forward to
            meeting you soon!
          </p>

          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <div className="flex items-center justify-center mb-4">
              <Calendar className="w-5 h-5 text-amber-600 mr-2" />
              <h2 className="text-lg font-semibold">Appointment Details</h2>
            </div>
            <p className="text-neutral-600">
              A customer service representative will contact you within 24 hours
              to confirm your appointment time and answer any questions you may
              have.
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/">
              <Button className="bg-amber-600 hover:bg-amber-700">
                Return to Homepage
              </Button>
            </Link>

            <div>
              <p className="text-sm text-neutral-500 mt-8">
                Need to make changes? Contact us at{" "}
                <a
                  href="mailto:appointments@elegancejewelry.com"
                  className="text-amber-600 hover:underline"
                >
                  appointments@elegantjewelries.shop
                </a>{" "}
                or call{" "}
                <a
                  href="tel:+12125551234"
                  className="text-amber-600 hover:underline"
                >
                  (212) 555-1234
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
