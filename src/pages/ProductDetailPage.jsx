import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import ProductImage from "../components/ProductImage"
import ProductDescription from "../components/ProductDescription"
import ProductActions from "../components/ProductActions"
import { fetchProductDetails, addToCart } from "../services/api"
import ErrorDisplay from "../components/ErrorDisplay"
import { useNotification } from "../components/ui/toast"
import { useCart } from "../context/CartContext"

export default function ProductDetailPage() {
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const params = useParams()
  const navigate = useNavigate()
  const { id } = params
  const { addToCart: addToCartContext = () => {} } = useCart() || {}
  const { showNotification } = useNotification()

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        if (!id) {
          setError("Product ID is missing")
          setIsLoading(false)
          return
        }
        
        const data = await fetchProductDetails(id)
        setProduct(data || null)
        setIsLoading(false)
      } catch (error) {
        console.error("Error loading product details:", error)
        setError("Failed to load product details. Please try again later.")
        setIsLoading(false)
      }
    }

    if (id) {
      loadProductDetails()
    }
  }, [id])

  const handleAddToCart = async (colorCode, storageCode) => {
    try {
      if (!id || !product) return;
      
      
      const _response = await addToCart(id, colorCode, storageCode)

      
      addToCartContext(product, colorCode, storageCode)

      showNotification({
        type: 'success',
        title: 'Added to cart',
        message: `${product.brand} ${product.model} has been added to your cart`,
        duration: 2000
      })
    } catch (error) {
      console.error("Error adding to cart:", error)
      showNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to add product to cart. Please try again.',
        duration: 3000
      })
    }
  }

  const handleBackToList = () => {
    navigate("/")
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <ErrorDisplay message={error} />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">Product not found</h2>
            <button
              onClick={handleBackToList}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-opacity-90 transition-colors"
            >
              Back to products
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage={`${product.brand} ${product.model}`} />
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={handleBackToList} 
          className="mb-6 flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductImage imageUrl={product.imgUrl} alt={`${product.brand} ${product.model}`} />
          <div>
            <ProductDescription product={product} />
            <ProductActions
              options={{
                colors: product.options?.colors || [],
                storages: product.options?.storages || [],
              }}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  )
}