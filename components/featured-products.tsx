import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FeaturedProducts() {
  // Sample featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Diamond Eternity Ring",
      price: 2499,
      image: "/Diamond_Eternity_Ring.webp?height=600&width=600",
    },
    {
      id: 2,
      name: "Sapphire Pendant",
      price: 1899,
      image: "/elegant_pendant_necklace.webp?height=600&width=600",
    },
    {
      id: 3,
      name: "Pearl Drop Earrings",
      price: 899,
      image: "/elegant_p.webp?height=600&width=600",
    },
    {
      id: 4,
      name: "Gold Bangle",
      price: 1299,
      image: "/gold_bangle.webp?height=600&width=600",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Collections</h2>
            <p className="text-neutral-600 max-w-xl">
              Discover our most popular pieces, handcrafted with exceptional materials and timeless design.
            </p>
          </div>
          <Link href="/collections" className="mt-4 md:mt-0 group">
            <Button variant="outline" className="flex items-center gap-2">
              View All Collections
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-neutral-100">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-amber-600">${product.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

