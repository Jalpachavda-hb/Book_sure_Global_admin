import { toast } from "react-toastify";

let activeToastId: string | number | null = null;

export const showErrorToast = (message: string) => {
  if (activeToastId !== null && toast.isActive(activeToastId)) {
    return; // ⛔ prevent duplicate toast
  }

  activeToastId = toast.error(message, {
    onClose: () => {
      activeToastId = null;
    },
  });
};