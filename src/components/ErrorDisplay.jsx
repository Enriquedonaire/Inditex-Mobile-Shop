import { AlertCircle } from 'lucide-react'

export default function ErrorDisplay({ message }) {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
      <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center mb-4">
          <AlertCircle className="h-6 w-6 text-destructive mr-2" />
          <h2 className="text-xl font-semibold text-destructive">Error</h2>
        </div>
        <p className="text-destructive/90">{message}</p>
      </div>
    </div>
  )
}