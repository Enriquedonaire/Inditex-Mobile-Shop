export default function ProductImage({ imageUrl = "", alt = "Product image" }) {
  return (
    <div className="bg-card rounded-lg shadow-md p-4 border border-border">
      <div className="relative h-[400px] bg-white flex items-center justify-center">
        <img 
          src={imageUrl || "/placeholder.svg"} 
          alt={alt} 
          className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-110"
        />
      </div>
    </div>
  )
}