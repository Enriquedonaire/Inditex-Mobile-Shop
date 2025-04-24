import ProductCard from "./ProductCard"

export default function ProductList({ products = [], onProductClick }) {
  // Añadimos un valor por defecto para products (array vacío)
  
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl text-gray-600 dark:text-gray-400">No products found</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-500">Try adjusting your search criteria</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onClick={() => onProductClick && onProductClick(product.id)} 
        />
      ))}
    </div>
  )
}