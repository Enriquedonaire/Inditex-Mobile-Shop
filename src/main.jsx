import React from "react"
import ReactDOM from "react-dom/client"
import { HashRouter } from "react-router-dom"
import App from "./App"
import { CartProvider } from "./context/CartContext"
import { ThemeProvider } from "./context/ThemeContext"
import { NotificationProvider } from "./components/ui/toast"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider>
        <CartProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </CartProvider>
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);