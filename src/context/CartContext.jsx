import { createContext, useContext, useState, useEffect } from "react";

const api = {
  addToCart: async (_product) => {
    return { success: true };
  }
};

const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  isCartOpen: false,
  toggleCart: () => {}
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = async (product, colorCode, storageCode) => {
    try {
      const response = await api.addToCart({
        id: product.id,
        colorCode,
        storageCode
      });

      if (response.success) {
        const newItem = {
          id: `${product.id}-${colorCode}-${storageCode}`,
          productId: product.id,
          brand: product.brand,
          model: product.model,
          price: product.price,
          imgUrl: product.imgUrl,
          quantity: 1,
          colorName: product.options.colors.find(c => c.code === colorCode)?.name || '',
          storageName: product.options.storages.find(s => s.code === storageCode)?.name || ''
        };

        const existingItemIndex = cartItems.findIndex(item => item.id === newItem.id);

        if (existingItemIndex >= 0) {
          const updatedItems = [...cartItems];
          updatedItems[existingItemIndex].quantity += 1;
          setCartItems(updatedItems);
        } else {
          setCartItems([...cartItems, newItem]);
        }

        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
    if (cartItems.length === 1) {
      localStorage.removeItem('cart');
    }
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedItems = cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedItems);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      isCartOpen,
      toggleCart
    }}>
      {children}
    </CartContext.Provider>
  );
};