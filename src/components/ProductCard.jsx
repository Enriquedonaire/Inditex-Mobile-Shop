export default function ProductCard({ product = {}, onClick }) {
  if (!product) return null;
  
  return (
    <div
      className="bg-card rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] border border-border"
      onClick={onClick}
    >
      <div className="relative h-48 bg-muted flex items-center justify-center p-4">
        <img
          src={product.imgUrl || "/placeholder.svg"}
          alt={`${product.brand || ''} ${product.model || ''}`}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground">{product.brand || 'Unknown Brand'}</h3>
        <p className="text-muted-foreground">{product.model || 'Unknown Model'}</p>
        <div className="mt-2 flex justify-between items-center">
          <p className="text-xl font-bold text-foreground">${product.price || '0.00'}</p>
          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
            View details
          </span>
        </div>
      </div>
    </div>
  )
}