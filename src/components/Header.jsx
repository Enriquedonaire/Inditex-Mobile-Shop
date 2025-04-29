import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import Cart from "./Cart"
import ThemeToggle from "./ThemeToggle"
import { ShoppingCart } from 'lucide-react'

export default function Header({ currentPage = "" }) {
  const { cartCount = 0, toggleCart = () => {} } = useCart() || {}

  return (
    <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-foreground">
              Mobile Shop
            </Link>

            {currentPage && (
              <div className="ml-4 flex items-center text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <span className="text-foreground truncate max-w-[200px] md:max-w-none">
                  {currentPage}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <div 
              className="relative cursor-pointer p-2 rounded-full hover:bg-muted transition-colors" 
              onClick={toggleCart}
              onKeyDown={(e) => e.key === 'Enter' && toggleCart()}
              role="button"
              tabIndex={0}
              aria-label="Open cart"
            >
              <ShoppingCart className="h-6 w-6 text-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <Cart />
    </header>
  )
}