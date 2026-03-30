import { create } from 'zustand';

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastData {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

interface ToastState {
  toasts: ToastData[];
  showToast: (data: { message: string; type?: ToastType; duration?: number }) => void;
  removeToast: (id: number) => void;
}

let toastId = 0;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  
  showToast: (data) => {
    const id = ++toastId;
    const newToast: ToastData = {
      id,
      type: "info",
      duration: 3000,
      ...data,
    };

    set((state) => ({ toasts: [...state.toasts, newToast] }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, newToast.duration);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));