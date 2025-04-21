import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="/placeholder.svg?height=800&width=1920"
          alt="Our jewelry workshop"
          fill
          className="object-cover"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Story
          </h1>
          <p className="text-xl text-white/90 max-w-xl">
            Crafting elegance since 1985
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                A Legacy of Excellence
              </h2>
              <p className="text-neutral-700 mb-4">
                Founded in 1985 by master jeweler Elizabeth Harmon, Elegance
                Jewelry began as a small atelier dedicated to creating bespoke
                piecebg-white/10s for discerning clients. What started as a
                passion project quickly gained recognition for its exceptional
                craftsmanship and innovative designs.
              </p>
              <p className="text-neutral-700 mb-4">
                Over three decades later, we've grown into an internationally
                recognized brand while maintaining our commitment to handcrafted
                quality and personalized service. Each piece in our collection
                continues to be made with the same attention to detail and
                passion that defined our earliest creations.
              </p>
              <p className="text-neutral-700">
                Today, our team of skilled artisans combines traditional
                techniques with contemporary innovation, creating jewelry that
                honors our heritage while embracing modern aesthetics.
              </p>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/logo.webp?height=1000&width=800"
                alt="Our founder in the workshop"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Craftsmanship</h3>
              <p className="text-neutral-600">
                We believe in the value of handcrafted quality. Each piece is
                meticulously created by our skilled artisans, ensuring
                exceptional attention to detail and lasting beauty.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
              <p className="text-neutral-600">
                We're committed to ethical sourcing and sustainable practices.
                From recycled precious metals to responsibly mined gemstones, we
                prioritize the wellbeing of our planet.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-neutral-600">
                While honoring traditional techniques, we continuously explore
                new methods and designs. This balance of heritage and innovation
                defines our unique aesthetic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Meet Our Team</h2>
          <p className="text-center text-neutral-600 max-w-2xl mx-auto mb-16">
            Our talented team brings together diverse expertise and shared
            passion for creating exceptional jewelry.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Elizabeth Harmon",
                role: "Founder & Creative Director",
                image: "/lizz.jpeg?height=400&width=400",
              },
              {
                name: "James Chen",
                role: "Master Jeweler",
                image: "/james.jpeg?height=400&width=400",
              },
              {
                name: "Sofia Rodriguez",
                role: "Design Lead",
                image: "/sofia.jpeg?height=400&width=400",
              },
              {
                name: "Michael Okafor",
                role: "Production Manager",
                image: "/placeholder.svg?height=400&width=400",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-neutral-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Growing Team</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            We're always looking for talented individuals who share our passion
            for craftsmanship and excellence.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="text-black border-white hover:bg-white/10"
          >
            View Career Opportunities
          </Button>
        </div>
      </section>
    </div>
  );
}

