import { useNotification } from './toast';

export function useToast() {
  const { showNotification } = useNotification();
  
  return {
    toast: (props) => {
      showNotification({
        type: props.variant === 'destructive' ? 'error' : 'success',
        title: props.title,
        message: props.description,
        duration: 3000
      });
    }
  };
}
