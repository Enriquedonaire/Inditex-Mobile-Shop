import { useState, useEffect, createContext, useContext } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';


const NotificationContext = createContext({
  showNotification: () => {},
});

export const useNotification = () => useContext(NotificationContext);

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);
  
  const showNotification = ({ type = 'info', title, message, duration = 3000 }) => {
    setNotification({ type, title, message, id: Date.now() });
    
    
    setTimeout(() => {
      setNotification(null);
    }, duration);
  };
  
  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && <Notification {...notification} onClose={() => setNotification(null)} />}
    </NotificationContext.Provider>
  );
}

function Notification({ type, title, message, onClose }) {
  useEffect(() => {
    return () => {
      
    };
  }, []);
  
  const icons = {
    success: <CheckCircle className="h-6 w-6 text-emerald-500" />,
    error: <AlertCircle className="h-6 w-6 text-red-500" />,
    info: <Info className="h-6 w-6 text-blue-500" />
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 min-w-[300px] max-w-md border border-gray-200 dark:border-gray-700 animate-in slide-in-from-right-full">
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-3">
          {icons[type]}
        </div>
        <div>
          {title && <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">{title}</h4>}
          {message && <p className="text-sm text-gray-700 dark:text-gray-300">{message}</p>}
        </div>
      </div>
      <button 
        onClick={onClose} 
        className="ml-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export const ToastProvider = ({ children }) => children;
export const Toast = () => null;
export const ToastTitle = () => null;
export const ToastDescription = () => null;
export const ToastClose = () => null;
export const ToastViewport = () => null;