export default function ProductImage({ imageUrl = "", alt = "Product image" }) {
  return (
    <div className="bg-card rounded-lg shadow-md p-4 border border-border">
      <div className="relative h-[400px] bg-muted flex items-center justify-center">
        <img 
          src={imageUrl || "/placeholder.svg"} 
          alt={alt} 
          className="w-full h-full object-contain p-4"
        />
      </div>
    </div>
  )
}