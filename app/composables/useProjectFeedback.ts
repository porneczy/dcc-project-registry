import { toast } from 'vue-sonner'

export const useProjectFeedback = () => {
  const showSuccess = (message: string) => {
    toast.success(message)
  }

  const showError = (message: string) => {
    toast.error(message)
  }

  return {
    showSuccess,
    showError,
  }
}
