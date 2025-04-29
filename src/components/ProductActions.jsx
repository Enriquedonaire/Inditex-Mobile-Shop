import { useState } from "react"

export default function ProductActions({ options = { colors: [], storages: [] }, onAddToCart = () => {} }) {
  const [selectedColor, setSelectedColor] = useState(options.colors?.[0]?.code || null)
  const [selectedStorage, setSelectedStorage] = useState(options.storages?.[0]?.code || null)
  const [isLoading, setIsLoading] = useState(false)

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

  return (
    <div className="bg-card rounded-lg shadow-md p-6 border border-border">
      <div className="mb-4">
        <label htmlFor="storage-select" className="block text-sm font-medium text-foreground mb-2">Storage</label>
        <div id="storage-select" className="grid grid-cols-2 gap-2">
          {(options.storages || []).map((storage) => (
            <button
              key={storage.code}
              className={`px-4 py-2 border rounded-md text-sm transition-colors ${
                selectedStorage === storage.code
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:bg-muted"
              }`}
              onClick={() => setSelectedStorage(storage.code)}
            >
              {storage.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="color-select" className="block text-sm font-medium text-foreground mb-2">Color</label>
        <div className="grid grid-cols-2 gap-2">
          {(options.colors || []).map((color) => (
            <button
              key={color.code}
              className={`px-4 py-2 border rounded-md text-sm transition-colors ${
                selectedColor === color.code
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:bg-muted"
              }`}
              onClick={() => setSelectedColor(color.code)}
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>

      <button
        className={`w-full py-3 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          isLoading || !selectedColor || !selectedStorage ? "opacity-70 cursor-not-allowed" : ""
        }`}
        onClick={handleAddToCart}
        disabled={isLoading || !selectedColor || !selectedStorage}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-foreground"
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