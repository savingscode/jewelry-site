import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-amber-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-xl mx-auto">
            We'd love to hear from you. Reach out with any questions about our
            collections or services.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-neutral-600">
                226 1st Ave
                <br />
                New York, NY 10009
                <br />
                United States
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-neutral-600 mb-2">
                For general inquiries:
                <br />
                <a
                  href="mailto:info@elegantjewelries.shop"
                  className="text-amber-600 hover:underline"
                >
                  info@elegantjewelries.shop
                </a>
              </p>
              <p className="text-neutral-600">
                For customer support:
                <br />
                <a
                  href="mailto:support@elegantjewelries.shop"
                  className="text-amber-600 hover:underline"
                >
                  support@elegantjewelries.shop
                </a>
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-neutral-600 mb-2">
                Customer Service:
                <br />
                <a
                  href="tel:+12125551234"
                  className="text-amber-600 hover:underline"
                >
                  +1 (212) 555-1234
                </a>
              </p>
              <p className="text-neutral-600">
                Hours: Monday-Friday
                <br />
                9:00 AM - 6:00 PM EST
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Send Us a Message
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input id="name" placeholder="Your name" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="product">Product Question</SelectItem>
                    <SelectItem value="custom">Custom Order</SelectItem>
                    <SelectItem value="support">Customer Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message"
                  className="min-h-[150px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] bg-neutral-200 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.998456789123!2d-73.98661328459496!3d40.72951397932992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598f1b8b1b1b%3A0x8c8b8b8b8b8b8b8b!2s226%201st%20Ave%2C%20New%20York%2C%20NY%2010009%2C%20USA!5e0!3m2!1sen!2sus!4v1697040000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
}
