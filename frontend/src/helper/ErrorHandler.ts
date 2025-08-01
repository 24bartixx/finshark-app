import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const errorResponse = error.response;

    if (Array.isArray(errorResponse?.data.errors)) {
      for (let err of errorResponse?.data.errors) {
        toast.warning(err.description);
      }
    } else if (typeof errorResponse?.data.errors === "object") {
      for (let err of errorResponse?.data.errors) {
        toast.warning(err.data.errors[err][0]);
      }
    } else if (errorResponse?.data) {
      toast.warning(errorResponse.data);
    } else if (errorResponse?.status === 401) {
      toast.warning("Please login");
      window.history.pushState({}, "LoginPage", "/login");
    } else if (errorResponse) {
      toast.warning(errorResponse.data);
    }
  }
};
