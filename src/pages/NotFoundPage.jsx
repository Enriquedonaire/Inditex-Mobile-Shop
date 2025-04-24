import { Link } from "react-router-dom"
import Header from "../components/Header"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404 - Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">The page you are looking for does not exist.</p>
        <Link to="/" className="px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">
          Return to Home
        </Link>
      </div>
    </div>
  )
}