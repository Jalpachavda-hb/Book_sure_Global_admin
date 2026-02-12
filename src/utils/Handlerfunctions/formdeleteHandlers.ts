import axiosInstance from "../axiosinstance";
import { toast } from "react-toastify";
import { API_PATHS } from "../apiPaths";

export const deleteSoftware = async (id: number) => {
  try {
    const res = await axiosInstance.delete(
      `${API_PATHS.SOFTWARE.DELETESOFTWARE}/${id}`,
    );

    if (res.data.success) {
      toast.success(res.data.message);
      return true;
    }

    toast.error(res.data.message);
    return false;
  } catch (error) {
    console.error("Error deleting software:", error);
    toast.error("Delete failed");
    return false;
  }
};
export const deleteTestimonial = async (id: number) => {
  try {
    const res = await axiosInstance.delete(
      `${API_PATHS.TESTIMONIAL.DELETETESTIMONIAL}/${id}`,
    );

    if (res.data.success) {
      toast.success(res.data.message || "Deleted Successfully ✅");
      return true;
    }

    toast.error(res.data.message || "Delete Failed ❌");
    return false;
  } catch (error: any) {
    console.error("Delete Error:", error);

    toast.error(error.response?.data?.message || "Something went wrong ❌");

    return false;
  }
};

export const deleteFaq = async (id: number): Promise<boolean> => {
  try {
    const res = await axiosInstance.delete(
      `${API_PATHS.CONTACT.DELETEFAQ}/${id}`,
    );

    if (res.data?.success) {
      toast.success(res.data?.message || "Deleted Successfully ✅");
      return true;
    }

    toast.error(res.data?.message || "Delete Failed ❌");
    return false;
  } catch (error: any) {
    console.error("Delete FAQ Error:", error);

    toast.error(error.response?.data?.message || "Something went wrong ❌");

    return false;
  }
};

// export const deletecontactMail = async (id: number): Promise<boolean> => {
//   try {
//     const res = await axiosInstance.delete(
//       `${API_PATHS.CONTACT.DELETEEMAIL}/${id}`
//     );

//     if (res.data?.success) {
//       toast.success(res.data?.message || "Deleted Successfully ✅");
//       return true;
//     }

//     toast.error(res.data?.message || "Delete Failed ❌");
//     return false;
//   } catch (error: any) {
//     console.error("Delete Mail Error:", error);

//     toast.error(
//       error.response?.data?.message || "Something went wrong ❌"
//     );

//     return false;
//   }
// };

export const deleteFounder = async (id: number): Promise<boolean> => {
  try {
    const res = await axiosInstance.delete(
      `${API_PATHS.OURASSOCIATE.DELETEFOUNDER}/${id}`,
    );

    if (res.data?.success) {
      toast.success(res.data.message || "Deleted Successfully ✅");
      return true;
    }

    toast.error(res.data.message || "Delete Failed ❌");
    return false;
  } catch (error: any) {
    console.error("Delete Founder Error:", error);

    toast.error(error.response?.data?.message || "Something went wrong ❌");

    return false;
  }
};

export const deleteService = async (id: number): Promise<boolean> => {
  try {
    const res = await axiosInstance.delete(
      `${API_PATHS.SERVICES.DELETESERVICES}/${id}`,
    );

    /* ✅ Success */
    if (res.data?.success) {
      toast.success(res.data.message || "Service deleted successfully ✅");
      return true;
    }

    /* ❌ Backend returned success:false */
    toast.error(res.data.message || "Failed to delete service ❌");
    return false;
  } catch (error: any) {
    console.error("Delete Service Error:", error);

    /* ✅ Proper Backend Error Message */
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong ❌";

    toast.error(errorMessage);

    return false;
  }
};

export const deletesubService = async (id: number): Promise<boolean> => {
  try {
    const res = await axiosInstance.delete(
      `${API_PATHS.SUBSERVICES.DELETESUBSERVICES}/${id}`,
    );

    /* ✅ Success */
    if (res.data?.success) {
      toast.success(res.data.message || "Service deleted successfully ✅");
      return true;
    }

    /* ❌ Backend returned success:false */
    toast.error(res.data.message || "Failed to delete service ❌");
    return false;
  } catch (error: any) {
    console.error("Delete Service Error:", error);

    /* ✅ Proper Backend Error Message */
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong ❌";

    toast.error(errorMessage);

    return false;
  }
};


export const deleteteam = async (id: number): Promise<boolean> => {
  try {
    const res = await axiosInstance.delete(
      `${API_PATHS.TEAM.DELETETEAMMEMBER}/${id}`,
    );

    if (res.data?.success) {
      toast.success(res.data.message || "Deleted Successfully ✅");
      return true;
    }

    toast.error(res.data.message || "Delete Failed ❌");
    return false;
  } catch (error: any) {
    console.error("Delete Founder Error:", error);

    toast.error(error.response?.data?.message || "Something went wrong ❌");

    return false;
  }
};