import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import ProductList from "../components/ProductList"
import { fetchProducts } from "../services/api"
import ErrorDisplay from "../components/ErrorDisplay"

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts()
        setProducts(data || [])
        setFilteredProducts(data || [])
        setIsLoading(false)
      } catch (error) {
        console.error("Error loading products:", error)
        setError("Failed to load products. Please try again later.")
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [])

  useEffect(() => {
    if (searchTerm && products && products.length > 0) {
      const filtered = products.filter(
        (product) =>
          product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.model?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts(products)
    }
  }, [searchTerm, products])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleProductClick = (productId) => {
    if (productId) {
      navigate(`/product/${productId}`)
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <ErrorDisplay message={error} />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} />
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
          </div>
        ) : (
          <ProductList products={filteredProducts} onProductClick={handleProductClick} />
        )}
      </div>
    </main>
  )
}