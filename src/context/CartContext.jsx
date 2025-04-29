"use client"

import { createContext, useContext, useState, useEffect } from "react"


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

  
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems")
    
    if (storedCart) {
      try {
        const parsedItems = JSON.parse(storedCart);
        setCartItems(parsedItems);
        
        
        const totalCount = parsedItems.reduce((total, item) => total + item.quantity, 0);
        setCartCount(totalCount);
      } catch (error) {
        console.error("Error parsing cart items from localStorage:", error)
        setCartItems([])
        setCartCount(0);
      }
    }
  }, [])

  
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
    
    
    const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    localStorage.setItem("cartCount", totalCount.toString());
  }, [cartItems])

  
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
      
      const existingItemIndex = prevItems.findIndex(
        (item) => item.productId === product.id && item.colorCode === colorCode && item.storageCode === storageCode,
      )

      let updatedItems;
      
      if (existingItemIndex >= 0) {
        
        updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
      } else {
        
        updatedItems = [...prevItems, newItem];
      }
      
      
      const newTotalCount = updatedItems.reduce((total, item) => total + item.quantity, 0);
      setCartCount(newTotalCount);
      
      return updatedItems;
    })

    setIsCartOpen(true)
  }

  
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);
      
      
      const newTotalCount = updatedItems.reduce((total, item) => total + item.quantity, 0);
      setCartCount(newTotalCount);
      
      return updatedItems;
    })
  }

  
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      
      
      const newTotalCount = updatedItems.reduce((total, item) => total + item.quantity, 0);
      setCartCount(newTotalCount);
      
      return updatedItems;
    })
  }

  
  const clearCart = () => {
    setCartItems([])
    setCartCount(0)
    localStorage.setItem("cartCount", "0")
  }

  
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  
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