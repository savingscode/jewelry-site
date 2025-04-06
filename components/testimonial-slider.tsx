"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TestimonialSlider() {
  // Sample testimonials
  const testimonials = [
    {
      id: 1,
      quote:
        "The craftsmanship of my engagement ring is absolutely stunning. Every detail was perfectly executed, and the customer service was exceptional.",
      author: "Sarah Johnson",
      role: "Customer",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      quote:
        "I've been collecting pieces from Elegance Jewelry for years. Their attention to detail and quality is unmatched in the industry.",
      author: "Michael Chen",
      role: "Collector",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      quote:
        "The custom necklace they created for my anniversary exceeded all expectations. It's become a cherished family heirloom.",
      author: "Emily Rodriguez",
      role: "Customer",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Discover why our clients choose Elegance Jewelry for their most precious moments.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white p-8 md:p-12 rounded-lg shadow-sm">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Quote className="w-6 h-6 text-amber-600" />
              </div>
            </div>

            <div className="pt-6">
              <p className="text-lg text-center italic mb-8">"{testimonials[currentIndex].quote}"</p>

              <div className="flex items-center justify-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].author}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonials[currentIndex].author}</h4>
                  <p className="text-neutral-600">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <Button variant="outline" size="icon" onClick={prevTestimonial} aria-label="Previous testimonial">
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <Button variant="outline" size="icon" onClick={nextTestimonial} aria-label="Next testimonial">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

