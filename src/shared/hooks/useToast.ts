import { useState, useCallback, useRef } from 'react';
import { ToastMessage, ToastType } from '@shared/types';

/**
 * Hook for managing toast notifications
 * Uses a monotonic counter to ensure unique IDs even when multiple toasts
 * are added within the same millisecond
 */
export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const toastIdCounter = useRef(0);

  const addToast = useCallback((message: string, type: ToastType = 'success'): void => {
    const id = ++toastIdCounter.current;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: number): void => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
  };
};
