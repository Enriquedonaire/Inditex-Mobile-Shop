import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from "../context/CartContext"

export default function Cart() {
  // Usar valores por defecto para evitar errores si el contexto no está listo
  const {
    cartItems = [],
    isCartOpen = false,
    setIsCartOpen = () => {},
    removeFromCart = () => {},
    updateQuantity = () => {},
    clearCart = () => {},
    getCartTotal = () => 0,
  } = useCart() || {}

  const navigate = useNavigate()
  const cartRef = useRef(null)

  // Cerrar el carrito al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target) && isCartOpen) {
        setIsCartOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isCartOpen, setIsCartOpen])

  // Prevenir scroll cuando el carrito está abierto
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isCartOpen])

  const handleCheckout = () => {
    setIsCartOpen(false)
    navigate("/checkout")
  }

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div
        ref={cartRef}
        className="bg-white dark:bg-gray-800 w-full max-w-md h-full flex flex-col shadow-xl transform transition-transform duration-300"
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close cart"
          >
            <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">Your cart is empty</p>
            <p className="text-gray-400 dark:text-gray-500 text-center">Add some products to your cart and they will appear here</p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="mt-6 px-6 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-600"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex border-b dark:border-gray-700 py-4">
                  <div className="relative h-20 w-20 bg-gray-100 dark:bg-gray-700 rounded">
                    <img
                      src={item.imgUrl || "/placeholder.svg"}
                      alt={`${item.brand} ${item.model}`}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {item.brand} {item.model}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.colorName}, {item.storageName}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                        aria-label="Remove item"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border dark:border-gray-600 rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </button>
                        <span className="px-2 text-gray-900 dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </button>
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t dark:border-gray-700 p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="text-gray-900 dark:text-white">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span className="text-gray-900 dark:text-white">Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg mb-6">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-gray-900 dark:text-white">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-600"
                >
                  Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-2 flex items-center justify-center text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}