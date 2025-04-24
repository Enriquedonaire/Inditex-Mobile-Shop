
import { createContext, useContext, useState, useEffect } from "react"

// Asegurarse de que el contexto tenga valores por defecto
const CartContext = createContext({
  cartItems: [],
  cartCount: 0,
  isCartOpen: false,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  toggleCart: () => {},
  setIsCartOpen: () => {},
})

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems")
    
    if (storedCart) {
      try {
        const parsedItems = JSON.parse(storedCart);
        setCartItems(parsedItems);
        
        // Calcular el contador basado en la cantidad total de productos
        const totalCount = parsedItems.reduce((total, item) => total + item.quantity, 0);
        setCartCount(totalCount);
      } catch (error) {
        console.error("Error parsing cart items from localStorage:", error)
        setCartItems([])
        setCartCount(0);
      }
    }
  }, [])

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
    
    // Actualizar el contador en localStorage
    const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    localStorage.setItem("cartCount", totalCount.toString());
  }, [cartItems])

  // Añadir producto al carrito
  const addToCart = (product, colorCode, storageCode) => {
    const selectedColor = product.options.colors.find((color) => color.code === colorCode)
    const selectedStorage = product.options.storages.find((storage) => storage.code === storageCode)

    const newItem = {
      id: `${product.id}-${colorCode}-${storageCode}`,
      productId: product.id,
      brand: product.brand,
      model: product.model,
      price: product.price,
      imgUrl: product.imgUrl,
      colorCode,
      colorName: selectedColor ? selectedColor.name : "",
      storageCode,
      storageName: selectedStorage ? selectedStorage.name : "",
      quantity: 1,
    }

    setCartItems((prevItems) => {
      // Verificar si el producto ya está en el carrito
      const existingItemIndex = prevItems.findIndex(
        (item) => item.productId === product.id && item.colorCode === colorCode && item.storageCode === storageCode,
      )

      let updatedItems;
      
      if (existingItemIndex >= 0) {
        // Si existe, incrementar la cantidad
        updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
      } else {
        // Si no existe, añadir nuevo item
        updatedItems = [...prevItems, newItem];
      }
      
      // Calcular el nuevo contador total
      const newTotalCount = updatedItems.reduce((total, item) => total + item.quantity, 0);
      setCartCount(newTotalCount);
      
      return updatedItems;
    })

    setIsCartOpen(true)
  }

  // Eliminar producto del carrito
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);
      
      // Calcular el nuevo contador total
      const newTotalCount = updatedItems.reduce((total, item) => total + item.quantity, 0);
      setCartCount(newTotalCount);
      
      return updatedItems;
    })
  }

  // Actualizar cantidad de un producto
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      
      // Calcular el nuevo contador total
      const newTotalCount = updatedItems.reduce((total, item) => total + item.quantity, 0);
      setCartCount(newTotalCount);
      
      return updatedItems;
    })
  }

  // Limpiar carrito
  const clearCart = () => {
    setCartItems([])
    setCartCount(0)
    localStorage.setItem("cartCount", "0")
  }

  // Calcular total del carrito
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Abrir/cerrar carrito
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        toggleCart,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)