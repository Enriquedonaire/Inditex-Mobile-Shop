import React, { useState, useEffect, createContext, useContext } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

// Contexto para las notificaciones
const NotificationContext = createContext({
  showNotification: () => {},
});

export const useNotification = () => useContext(NotificationContext);

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);
  
  const showNotification = ({ type = 'info', title, message, duration = 2000 }) => {
    setNotification({ type, title, message, id: Date.now() });
    
    // Auto-dismiss after duration
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
      // Cleanup if needed
    };
  }, []);
  
  const icons = {
    success: <CheckCircle className="h-6 w-6 text-emerald-500" />,
    error: <AlertCircle className="h-6 w-6 text-red-500" />,
    info: <Info className="h-6 w-6 text-blue-500" />
  };
  
  return (
    <div className={`notification-toast ${type}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-3">
          {icons[type]}
        </div>
        <div>
          {title && <h4 className="font-medium text-sm">{title}</h4>}
          {message && <p className="text-sm opacity-90">{message}</p>}
        </div>
      </div>
      <button 
        onClick={onClose} 
        className="ml-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}