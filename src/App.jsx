import { Routes, Route } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import { ThemeProvider } from "./context/ThemeContext"
import HomePage from "./pages/HomePage"
import ProductDetailPage from "./pages/ProductDetailPage"
import CheckoutPage from "./pages/CheckoutPage"
import NotFoundPage from "./pages/NotFoundPage"
import { NotificationProvider } from "./components/ui/toast"

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <NotificationProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </NotificationProvider>
      </CartProvider>
    </ThemeProvider>
  )
}