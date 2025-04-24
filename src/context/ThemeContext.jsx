
import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext({
  theme: "light",
  setTheme: () => null,
  toggleTheme: () => null,
})

export function ThemeProvider({ children }) {
  // Intentar obtener el tema del localStorage o usar 'light' como predeterminado
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme")
      return savedTheme || "light"
    }
    return "light"
  })

  // Función para alternar entre temas de forma instantánea
  const toggleTheme = () => {
    // Añadir clase para desactivar todas las transiciones temporalmente
    document.documentElement.classList.add('disable-transitions');
    
    // Cambiar el tema
    setTheme(theme === "light" ? "dark" : "light")
    
    // Eliminar la clase después de un breve tiempo para restaurar las transiciones
    setTimeout(() => {
      document.documentElement.classList.remove('disable-transitions');
    }, 100);
  }

  // Aplicar la clase 'dark' al elemento html cuando cambie el tema
  useEffect(() => {
    const root = window.document.documentElement
    
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    // Guardar el tema en localStorage
    localStorage.setItem("theme", theme)
  }, [theme])

  // Detectar preferencia de color del sistema al cargar
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    // Si no hay tema guardado, usar la preferencia del sistema
    if (!localStorage.getItem("theme")) {
      setTheme(mediaQuery.matches ? "dark" : "light")
    }

    // Actualizar el tema si cambia la preferencia del sistema
    const handleChange = (e) => {
      if (!localStorage.getItem("theme-manual-set")) {
        setTheme(e.matches ? "dark" : "light")
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>
}

// Hook personalizado para usar el tema
export const useTheme = () => useContext(ThemeContext)