import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Diamond, Shield, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import FeaturedProducts from "@/components/featured-products"
import TestimonialSlider from "@/components/testimonial-slider"


export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Elegant jewelry collection"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Timeless Elegance
            <br />
            Exquisite Craftsmanship
          </h1>
          <p className="text-xl text-white/90 max-w-xl mb-8">
            Discover our handcrafted jewelry collections that blend traditional artistry with contemporary design.
          </p>
          <div className="flex flex-wrap gap-4">
           <Link href="/careers">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
              Join Us
            </Button>
            </Link>
            <Link href="about">
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-dark">
              Our Story
            </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose Elegance Jewelry</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <Diamond className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Materials</h3>
              <p className="text-neutral-600">
                We source only the finest materials, ensuring each piece meets our exceptional standards.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Master Craftsmanship</h3>
              <p className="text-neutral-600">
                Our artisans bring decades of experience to create jewelry with unparalleled attention to detail.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lifetime Guarantee</h3>
              <p className="text-neutral-600">
                Every purchase comes with our promise of quality and our commitment to excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Testimonials */}
      <TestimonialSlider />

      {/* CTA Section */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Exclusive Collection Preview</h2>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
            Be the first to see our newest designs and receive special offers by joining our mailing list.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <Button className="bg-amber-600 hover:bg-amber-700 whitespace-nowrap">Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Join Our Team</h2>
              <p className="text-neutral-700 max-w-xl">
                We're looking for passionate individuals to join our growing team. Explore our current openings for
                secretary and virtual assistant positions.
              </p>
            </div>
            <Link href="/careers" className="group">
              <Button className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2">
                View Openings
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

