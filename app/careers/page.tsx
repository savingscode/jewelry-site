import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CareersPage() {
  // Sample job listings
  const jobs = [
    {
      id: 1,
      title: "Executive Secretary",
      location: "New York, NY",
      type: "Full-time",
      wage: "40 - 60/hr",
      description:
        "Support our executive team with administrative tasks, scheduling, and correspondence.",
      slug: "executive-secretary",
    },
    {
      id: 2,
      title: "Virtual Assistant",
      location: "Remote",
      type: "Full-time",
      wage: "20 - 30/hr",
      description:
        "Provide remote administrative support to our management team across various departments.",
      slug: "virtual-assistant",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="/placeholder.svg?height=800&width=1920"
          alt="Elegance Jewelry team"
          fill
          className="object-cover"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-white/90 max-w-xl">
            Build your career with a company that values craftsmanship and
            innovation
          </p>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Current Openings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {jobs.map((job) => (
              <Card key={job.id} className="group">
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="w-4 h-4 text-neutral-500" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-neutral-500" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <DollarSign className="w-4 h-4 text-neutral-500" />

                      <span>{job.wage}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 mb-4">{job.description}</p>
                  <Link href={`/careers/apply/${job.slug}`}>
                    <Button className="bg-amber-600 hover:bg-amber-700 group-hover:translate-x-1 transition-transform">
                      Apply Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Why Work With Us</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              At Elegance Jewelry, we're passionate about creating an
              environment where talent thrives and creativity flourishes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Growth Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  We invest in our team members' professional development
                  through mentorship, training programs, and clear advancement
                  paths.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Collaborative Culture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  We foster a supportive environment where ideas are valued and
                  teamwork is essential to our success.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Competitive Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  We offer comprehensive benefits including health insurance,
                  retirement plans, and employee discounts on our jewelry
                  collections.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Our Application Process
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Apply Online</h3>
                    <p className="text-neutral-600">
                      Submit your application through our careers portal with
                      your resume and cover letter.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Initial Review
                    </h3>
                    <p className="text-neutral-600">
                      Our HR team will review your application and reach out to
                      qualified candidates.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Interviews</h3>
                    <p className="text-neutral-600">
                      Selected candidates will participate in interviews with
                      the hiring manager and team members.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Offer & Onboarding
                    </h3>
                    <p className="text-neutral-600">
                      Successful candidates will receive an offer and begin our
                      comprehensive onboarding process.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/application_process.webp?height=1000&width=800"
                alt="Team working together"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Don't See the Right Fit?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            We're always looking for talented individuals to join our team. Send
            us your resume and we'll keep you in mind for future opportunities.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="text-black border-white hover:bg-white/10"
          >
            <Link href={"/careers/apply/resume"}>Submit Your Resume</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
