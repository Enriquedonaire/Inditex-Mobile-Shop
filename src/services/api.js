const API_BASE_URL = "https://itx-frontend-test.onrender.com/api"
const CACHE_EXPIRATION = 60 * 60 * 1000 // 1 hora en milisegundos

// Helper function to check if cache is valid
const isCacheValid = (timestamp) => {
  if (!timestamp) return false
  const now = new Date().getTime()
  return now - timestamp < CACHE_EXPIRATION
}

// Helper function to get cached data
const getCachedData = (key) => {
  if (typeof window === "undefined") return null

  const cachedData = localStorage.getItem(key)
  if (!cachedData) return null

  try {
    const { data, timestamp } = JSON.parse(cachedData)
    if (isCacheValid(timestamp)) {
      return data
    }
    return null
  } catch (error) {
    console.error("Error parsing cached data:", error)
    return null
  }
}

// Helper function to set cached data
const setCachedData = (key, data) => {
  if (typeof window === "undefined") return

  const cacheData = {
    data,
    timestamp: new Date().getTime(),
  }
  try {
    localStorage.setItem(key, JSON.stringify(cacheData))
  } catch (error) {
    console.error("Error setting cache:", error)
  }
}

// Fetch all products
export const fetchProducts = async () => {
  const cacheKey = "products"
  const cachedProducts = getCachedData(cacheKey)

  if (cachedProducts) {
    return cachedProducts
  }

  try {
    const response = await fetch(`${API_BASE_URL}/product`)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    setCachedData(cacheKey, data)
    return data
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}

// Fetch product details by ID
export const fetchProductDetails = async (productId) => {
  const cacheKey = `product_${productId}`
  const cachedProduct = getCachedData(cacheKey)

  if (cachedProduct) {
    return cachedProduct
  }

  try {
    const response = await fetch(`${API_BASE_URL}/product/${productId}`)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    setCachedData(cacheKey, data)
    return data
  } catch (error) {
    console.error(`Error fetching product details for ID ${productId}:`, error)
    throw error
  }
}

// Add product to cart
export const addToCart = async (productId, colorCode, storageCode) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: productId,
        colorCode,
        storageCode,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error adding product to cart:", error)
    throw error
  }
}
