export default function ProductCard({ product = {}, onClick = () => {} }) {
  // Si product es null o undefined, mostrar una tarjeta vacía o retornar null
  if (!product) return null;
  
  // Función para manejar eventos de teclado
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  // Funciones para manejar el escalado de la imagen
  const handleImageFocus = (e) => {
    e.currentTarget.style.transform = 'scale(1.1)';
  };
  
  const handleImageBlur = (e) => {
    e.currentTarget.style.transform = 'scale(0.9)';
  };
  
  return (
    <div
      className="bg-card rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.05] border border-border"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Ver detalles de ${product.brand || 'Unknown Brand'} ${product.model || 'Unknown Model'}`}
    >
      <div className="relative h-48 bg-white flex items-center justify-center p-4 overflow-hidden">
        <img
          src={product.imgUrl || "/placeholder.svg"}
          alt={`${product.brand || ''} ${product.model || ''}`}
          className="w-full h-full object-contain transition-transform duration-300"
          style={{ transform: 'scale(0.9)' }}
          onMouseOver={handleImageFocus}
          onMouseOut={handleImageBlur}
          onFocus={handleImageFocus}
          onBlur={handleImageBlur}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground">{product.title || 'Unknown Product'}</h3>
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