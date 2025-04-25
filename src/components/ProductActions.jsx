import { useState } from "react"
import { useTheme } from "../context/ThemeContext"

export default function ProductActions({ options = {}, onAddToCart = () => {} }) {
  // Asegurarnos de que options.colors y options.storages existan
  const colors = options?.colors || [];
  const storages = options?.storages || [];
  
  const [selectedColor, setSelectedColor] = useState(colors[0]?.code || null)
  const [selectedStorage, setSelectedStorage] = useState(storages[0]?.code || null)
  const [isLoading, setIsLoading] = useState(false)
  const { theme } = useTheme() || { theme: 'light' } // Valor por defecto si useTheme devuelve undefined
  
  const handleAddToCart = async () => {
    if (selectedColor !== null && selectedStorage !== null) {
      setIsLoading(true)
      try {
        await onAddToCart(selectedColor, selectedStorage)
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Función para determinar las clases de los botones según el tema y si están seleccionados
  const getButtonClasses = (isSelected) => {
    if (theme === 'dark') {
      return isSelected
        ? "bg-white text-gray-900 border-white" // En modo oscuro, botón seleccionado es blanco con texto oscuro
        : "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
    } else {
      return isSelected
        ? "bg-gray-900 text-white border-gray-900" // En modo claro, botón seleccionado es oscuro con texto blanco
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      {storages.length > 0 && (
        <div className="mb-4">
          <label htmlFor="storage-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Storage</label>
          <div className="grid grid-cols-2 gap-2" role="group" aria-labelledby="storage-select">
            {storages.map((storage) => (
              <button
                key={storage.code}
                id={`storage-${storage.code}`}
                className={`px-4 py-2 border rounded-md text-sm transition-colors ${
                  getButtonClasses(selectedStorage === storage.code)
                }`}
                onClick={() => setSelectedStorage(storage.code)}
                aria-pressed={selectedStorage === storage.code}
              >
                {storage.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div className="mb-6">
          <label htmlFor="color-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color</label>
          <div className="grid grid-cols-2 gap-2" role="group" aria-labelledby="color-select">
            {colors.map((color) => (
              <button
                key={color.code}
                id={`color-${color.code}`}
                className={`px-4 py-2 border rounded-md text-sm transition-colors ${
                  getButtonClasses(selectedColor === color.code)
                }`}
                onClick={() => setSelectedColor(color.code)}
                aria-pressed={selectedColor === color.code}
              >
                {color.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        className={`w-full py-3 px-4 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:hover:bg-gray-600 ${
          isLoading ? "opacity-70 cursor-not-allowed" : ""
        }`}
        onClick={handleAddToCart}
        disabled={isLoading || !selectedColor || !selectedStorage}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Adding...
          </span>
        ) : (
          "Add to Cart"
        )}
      </button>
    </div>
  )
}