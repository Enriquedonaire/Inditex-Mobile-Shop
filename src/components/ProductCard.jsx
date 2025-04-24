export default function ProductCard({ product = {}, onClick = () => {} }) {
  // Si product es null o undefined, mostrar una tarjeta vacía o retornar null
  if (!product) return null;
  
  return (
    <div
      className="bg-card rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.05] border border-border"
      onClick={onClick}
    >
      <div className="relative h-48 bg-white flex items-center justify-center p-4 overflow-hidden">
        <img
          src={product.imgUrl || "/placeholder.svg"}
          alt={`${product.brand || ''} ${product.model || ''}`}
          className="w-full h-full object-contain transition-transform duration-300"
          style={{ transform: 'scale(0.9)' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
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