import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { CreditCard, CheckCircle2, Loader2 } from 'lucide-react'
import { useCart } from "../context/CartContext"

export default function CheckoutPage() {
  
  const { cartItems = [], getCartTotal = () => 0, clearCart = () => {} } = useCart() || {}
  const navigate = useNavigate()
  const [step, setStep] = useState("checkout") 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
  })
  const [errors, setErrors] = useState({})

  
  if (cartItems.length === 0 && typeof window !== "undefined" && step === "checkout") {
    navigate("/")
    return null
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    
    if (name === "cardNumber") {
      
      const formatted = value
        .replace(/\s/g, "")
        .replace(/\D/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ")
        .slice(0, 19)
      setFormData({ ...formData, [name]: formatted })
    } else if (name === "expiry") {
      
      const formatted = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(?=\d)/g, "$1/")
        .slice(0, 5)
      setFormData({ ...formData, [name]: formatted })
    } else if (name === "cvc") {
      
      const formatted = value.replace(/\D/g, "").slice(0, 4)
      setFormData({ ...formData, [name]: formatted })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.zip.trim()) newErrors.zip = "ZIP code is required"
    if (!formData.country.trim()) newErrors.country = "Country is required"

    
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required"
    else if (formData.cardNumber.replace(/\s/g, "").length < 16) newErrors.cardNumber = "Card number must be 16 digits"

    if (!formData.cardName.trim()) newErrors.cardName = "Name on card is required"

    if (!formData.expiry.trim()) newErrors.expiry = "Expiry date is required"
    else if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) newErrors.expiry = "Expiry date must be in MM/YY format"

    if (!formData.cvc.trim()) newErrors.cvc = "CVC is required"
    else if (formData.cvc.length < 3) newErrors.cvc = "CVC must be 3-4 digits"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      
      setStep("processing")

      
      setTimeout(() => {
        setStep("success")
        clearCart()
      }, 2000)
    }
  }

  const handleBackToProducts = () => {
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {step === "checkout" && (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Checkout</h1>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                        }`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                      <input
                        id="address"
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          errors.address ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                        }`}
                      />
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                      <input
                        id="city"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          errors.city ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                        }`}
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ZIP Code</label>
                        <input
                          id="zip"
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                            errors.zip ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                          }`}
                        />
                        {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
                        <input
                          id="country"
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                            errors.country ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                          }`}
                        />
                        {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Payment Information</h2>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Card Number</label>
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">Secure payment</span>
                      </div>
                    </div>
                    <input
                      id="cardNumber"
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        errors.cardNumber ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                      }`}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name on Card</label>
                    <input
                      id="cardName"
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        errors.cardName ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                      }`}
                    />
                    {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiry Date</label>
                      <input
                        id="expiry"
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          errors.expiry ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                        }`}
                      />
                      {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CVC</label>
                      <input
                        id="cvc"
                        type="text"
                        name="cvc"
                        value={formData.cvc}
                        onChange={handleChange}
                        placeholder="123"
                        className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          errors.cvc ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                        }`}
                      />
                      {errors.cvc && <p className="text-red-500 text-xs mt-1">{errors.cvc}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    Complete Order
                  </button>
                </div>
              </form>
            </div>

            <div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow sticky top-20">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Order Summary</h2>
                <div className="space-y-4 mb-4 max-h-80 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <div className="relative h-16 w-16 bg-gray-100 dark:bg-gray-700 rounded">
                        <img
                          src={item.imgUrl || "/placeholder.svg"}
                          alt={`${item.brand} ${item.model}`}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="font-medium text-sm text-gray-900 dark:text-white">
                          {item.brand} {item.model}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.colorName}, {item.storageName}
                        </p>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {item.quantity} x ${item.price}
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="text-gray-900 dark:text-white">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="text-gray-900 dark:text-white">Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-4">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-gray-900 dark:text-white">${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === "processing" && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-16 w-16 text-gray-900 dark:text-gray-100 animate-spin mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Processing your order</h2>
            <p className="text-gray-600 dark:text-gray-400">Please wait while we process your payment...</p>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 mb-6">
              <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Order Successful!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
              Thank you for your purchase. Your order has been processed successfully.
            </p>
            <button
              onClick={handleBackToProducts}
              className="px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-600"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  )
}