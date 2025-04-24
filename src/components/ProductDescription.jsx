export default function ProductDescription({ product = {} }) {
  if (!product) return null;
  
  return (
    <div className="bg-card rounded-lg shadow-md p-6 mb-6 border border-border">
      <h1 className="text-2xl font-bold text-foreground mb-2">
        {product.brand || 'Unknown Brand'} {product.model || 'Unknown Model'}
      </h1>
      <p className="text-2xl font-bold text-foreground mb-6">${product.price || '0.00'}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="p-2 rounded-md bg-muted/50">
            <span className="font-semibold text-foreground">CPU:</span>{" "}
            <span className="text-muted-foreground">{product.cpu || 'N/A'}</span>
          </div>
          <div className="p-2 rounded-md bg-muted/50">
            <span className="font-semibold text-foreground">RAM:</span>{" "}
            <span className="text-muted-foreground">{product.ram || 'N/A'}</span>
          </div>
          <div className="p-2 rounded-md bg-muted/50">
            <span className="font-semibold text-foreground">OS:</span>{" "}
            <span className="text-muted-foreground">{product.os || 'N/A'}</span>
          </div>
          <div className="p-2 rounded-md bg-muted/50">
            <span className="font-semibold text-foreground">Display:</span>{" "}
            <span className="text-muted-foreground">{product.displayResolution || 'N/A'}</span>
          </div>
          <div className="p-2 rounded-md bg-muted/50">
            <span className="font-semibold text-foreground">Battery:</span>{" "}
            <span className="text-muted-foreground">{product.battery || 'N/A'}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="p-2 rounded-md bg-muted/50">
            <span className="font-semibold text-foreground">Primary Camera:</span>{" "}
            <span className="text-muted-foreground">
              {Array.isArray(product.primaryCamera) ? product.primaryCamera.join(", ") : (product.primaryCamera || 'N/A')}
            </span>
          </div>
          <div className="p-2 rounded-md bg-muted/50">
            <span className="font-semibold text-foreground">Secondary Camera:</span>{" "}
            <span className="text-muted-foreground">
              {Array.isArray(product.secondaryCmera) ? product.secondaryCmera.join(", ") : (product.secondaryCmera || 'N/A')}
            </span>
          </div>
          <div className="p-2 rounded-md bg-muted/50">
            <span className="font-semibold text-foreground">Dimensions:</span>{" "}
            <span className="text-muted-foreground">{product.dimentions || 'N/A'}</span>
          </div>
          <div className="p-2 rounded-md bg-muted/50">
            <span className="font-semibold text-foreground">Weight:</span>{" "}
            <span className="text-muted-foreground">{product.weight ? `${product.weight}g` : 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}