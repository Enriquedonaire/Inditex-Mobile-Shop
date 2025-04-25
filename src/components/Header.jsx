import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import Cart from "./Cart"
import ThemeToggle from "./ThemeToggle"

export default function Header({ currentPage = "" }) {
  // Usar valores por defecto para evitar errores si el contexto no está listo
  const { cartCount = 0, toggleCart = () => {} } = useCart() || {}

  return (
    <header className="bg-white dark:bg-gray-900 shadow sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Mobile Shop
            </Link>

            {currentPage && (
              <div className="ml-4 flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Link to="/" className="hover:text-gray-900 dark:hover:text-white">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 dark:text-white truncate max-w-[200px] md:max-w-none">
                  {currentPage}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <button 
              onClick={toggleCart}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleCart();
                }
              }}
              aria-label="Carrito de compras"
              tabIndex={0}
              className="relative focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      <Cart />
    </header>
  )
}