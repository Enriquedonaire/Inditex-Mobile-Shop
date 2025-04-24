import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductDetailPage from "./pages/ProductDetailPage"
import CheckoutPage from "./pages/CheckoutPage"
import NotFoundPage from "./pages/NotFoundPage"
import { ThemeProvider } from "./context/ThemeContext"
import { NotificationProvider } from "./components/ui/toast"

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </NotificationProvider>
    </ThemeProvider>
  )
}

export default App