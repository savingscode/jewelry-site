import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ThankYouPage() {
  return (
    <div className="py-20 bg-neutral-50 min-h-screen flex items-center">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Application Submitted!</h1>

          <p className="text-neutral-600 mb-8">
            Thank you for applying to join the Elegance Jewelry team. We've received your application and will review it
            shortly. If your qualifications match our needs, we'll be in touch soon.
          </p>

          <div className="space-y-4">
            <Link href="/">
              <Button className="bg-amber-600 hover:bg-amber-700">Return to Homepage</Button>
            </Link>

            <div>
              <p className="text-sm text-neutral-500 mt-8">
                Have questions? Contact us at{" "}
                <a href="mailto:careers@elegancejewelry.com" className="text-amber-600 hover:underline">
                  careers@elegancejewelry.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

