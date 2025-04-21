import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductCard from "@/components/product-card"

export default function CollectionsPage() {
  // Sample product data
  const collections = {
    signature: [
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
        image: "/placeholder.svg?height=600&width=600",
      },
      {
        id: 3,
        name: "Gold Bangle",
        price: 1299,
        image: "/placeholder.svg?height=600&width=600",
      },
      {
        id: 4,
        name: "Pearl Drop Earrings",
        price: 899,
        image: "/placeholder.svg?height=600&width=600",
      },
    ],
    seasonal: [
      {
        id: 5,
        name: "Summer Opal Necklace",
        price: 1599,
        image: "/placeholder.svg?height=600&width=600",
      },
      {
        id: 6,
        name: "Floral Diamond Brooch",
        price: 2199,
        image: "/placeholder.svg?height=600&width=600",
      },
      {
        id: 7,
        name: "Emerald Tennis Bracelet",
        price: 3499,
        image: "/placeholder.svg?height=600&width=600",
      },
      {
        id: 8,
        name: "Ruby Stud Earrings",
        price: 1099,
        image: "/placeholder.svg?height=600&width=600",
      },
    ],
    bridal: [
      {
        id: 9,
        name: "Diamond Solitaire Ring",
        price: 4999,
        image: "/placeholder.svg?height=600&width=600",
      },
      {
        id: 10,
        name: "Pearl Wedding Set",
        price: 2899,
        image: "/placeholder.svg?height=600&width=600",
      },
      {
        id: 11,
        name: "Sapphire Engagement Ring",
        price: 3799,
        image: "/placeholder.svg?height=600&width=600",
      },
      {
        id: 12,
        name: "Diamond Wedding Band",
        price: 1799,
        image: "/placeholder.svg?height=600&width=600",
      },
    ],
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image src="/placeholder.svg?height=800&width=1920" alt="Jewelry collections" fill className="object-cover" />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Collections</h1>
          <p className="text-xl text-white/90 max-w-xl">Discover pieces that tell your unique story</p>
        </div>
      </section>

      {/* Collections Tabs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="signature" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-neutral-100">
                <TabsTrigger value="signature" className="text-lg px-6">
                  Signature
                </TabsTrigger>
                <TabsTrigger value="seasonal" className="text-lg px-6">
                  Seasonal
                </TabsTrigger>
                <TabsTrigger value="bridal" className="text-lg px-6">
                  Bridal
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="signature">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Signature Collection</h2>
                <p className="text-neutral-600 max-w-2xl mx-auto">
                  Our timeless pieces that embody the essence of Elegance Jewelry. Each item is meticulously crafted to
                  be worn and treasured for generations.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {collections.signature.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="seasonal">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Seasonal Collection</h2>
                <p className="text-neutral-600 max-w-2xl mx-auto">
                  Our latest designs inspired by the changing seasons. These limited edition pieces capture the essence
                  of natural beauty.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {collections.seasonal.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bridal">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Bridal Collection</h2>
                <p className="text-neutral-600 max-w-2xl mx-auto">
                  Celebrate your special moments with our exquisite bridal jewelry. From engagement rings to complete
                  wedding sets, find the perfect symbol of your love.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {collections.bridal.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Custom Orders */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=800"
                alt="Custom jewelry design process"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Custom Creations</h2>
              <p className="text-neutral-700 mb-6">
                Can't find exactly what you're looking for? Our bespoke service allows you to collaborate with our
                designers to create a truly unique piece that perfectly captures your vision.
              </p>
              <Button className="bg-amber-600 hover:bg-amber-700">Learn About Custom Orders</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

