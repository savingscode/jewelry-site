import Image from "next/image"
import { Button } from "@/components/ui/button"

interface Product {
  id: number
  name: string
  price: number
  image: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group">
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-neutral-100">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <h3 className="text-lg font-medium">{product.name}</h3>
      <p className="text-amber-600 mb-3">${product.price.toLocaleString()}</p>
      <Button variant="outline" className="w-full">
        View Details
      </Button>
    </div>
  )
}

