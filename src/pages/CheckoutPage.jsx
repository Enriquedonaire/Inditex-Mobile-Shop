import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      clearCart();
      navigate('/success');
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : ''}`}>Checkout</h1>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
                <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : ''}`}>Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'} ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'} ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'} ${errors.address ? 'border-red-500' : ''}`}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label htmlFor="city" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="zip" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
                <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : ''}`}>Payment Information</h2>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="cardNumber" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Card Number
                    </label>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Secure payment</span>
                    </div>
                  </div>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'} ${errors.cardNumber ? 'border-red-500' : ''}`}
                  />
                  {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="cardName" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
                    />
                  </div>
                  <div>
                    <label htmlFor="cvc" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      CVC
                    </label>
                    <input
                      type="text"
                      id="cvc"
                      name="cvc"
                      placeholder="123"
                      value={formData.cvc}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`px-6 py-3 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-900 hover:bg-gray-800'} text-white rounded-md`}
                >
                  Complete Order
                </button>
              </div>
            </form>
          </div>
          <div>
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow sticky top-20`}>
              <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : ''}`}>Order Summary</h2>
              <div className="space-y-4 mb-4 max-h-80 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="relative h-16 w-16 bg-gray-100 rounded">
                      <img src={item.imgUrl || "/placeholder.svg"} alt={`${item.brand} ${item.model}`} className="object-contain w-full h-full" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className={`font-medium text-sm ${theme === 'dark' ? 'text-gray-200' : ''}`}>
                        {item.brand} {item.model}
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {item.colorName}, {item.storageName}
                      </p>
                      <div className="flex justify-between mt-1">
                        <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : ''}`}>
                          {item.quantity} x ${item.price}
                        </span>
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : ''}`}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={`border-t ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} pt-4`}>
                <div className="flex justify-between mb-2">
                  <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Subtotal
                  </span>
                  <span className={`${theme === 'dark' ? 'text-gray-200' : ''}`}>
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Shipping
                  </span>
                  <span className={`${theme === 'dark' ? 'text-gray-200' : ''}`}>
                    Free
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4">
                  <span className={`${theme === 'dark' ? 'text-white' : ''}`}>
                    Total
                  </span>
                  <span className={`${theme === 'dark' ? 'text-white' : ''}`}>
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;