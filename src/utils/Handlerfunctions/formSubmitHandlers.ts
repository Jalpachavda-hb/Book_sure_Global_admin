import { toast } from "react-toastify";
import axiosInstance from "../axiosinstance";
// import { API_PATHS } from "../utils/apiPaths";
// import { validateContact, validatePassword } from "../utils/Validation";
import { validateContact, validatePassword } from "../Validation";
import { API_PATHS } from "../apiPaths";
import { getAdminId } from "./getdata";

import { NavigateFunction } from "react-router-dom";
interface HandleLoginSubmitProps {
  e: React.FormEvent;
  contact: string;
  password: string;
  navigate: NavigateFunction;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrors: React.Dispatch<
    React.SetStateAction<{ contact?: string; password?: string }>
  >;
}

export const handleLoginSubmit = async ({
  e,
  contact,
  password,
  setErrors,
  setLoading,
  navigate,
}: HandleLoginSubmitProps) => {
  e.preventDefault();
  setLoading(true);

  /* -------- Frontend Validation -------- */
  const newErrors: { contact?: string; password?: string } = {};

  const contactError = validateContact(contact);
  const passwordError = validatePassword(password);

  if (contactError) newErrors.contact = contactError;
  if (passwordError) newErrors.password = passwordError;

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    setLoading(false);
    return;
  }

  try {
    /* -------- API CALL -------- */
    const res = await axiosInstance.post(API_PATHS.ADMINAUTH.ADMINLOGIN, {
      contact_number: contact,
      password,
    });

    console.log("LOGIN RESPONSE:", res.data);

    /* -------- SUCCESS -------- */
    if (res.data?.success === true) {
      const user = res.data.admin;

      sessionStorage.setItem("user", JSON.stringify(user));
      console.log("SESSION USER:", sessionStorage.getItem("user"));

      toast.success(res.data.message || "Login successful!");

      navigate("/admin/dashboard", { replace: true });
    } else {
      toast.error(res.data.message || "Login failed");
    }
  } catch (err: any) {
    /* -------- ERROR HANDLING -------- */
    console.error("LOGIN ERROR:", err);

    if (err.response) {
      const { status, data } = err.response;

      if (status === 400) {
        toast.error(data.message || "Bad request");
      } else if (status === 401) {
        setErrors({ password: "Invalid password" });
      } else if (status === 404) {
        setErrors({ contact: "Contact number not found" });
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    } else {
      toast.error("Network error. Please check your connection!");
    }
  } finally {
    setLoading(false);
  }
};
// utils/Handlerfunctions/formSubmitHandlers.ts
export const handleLogout = (navigate: (path: string) => void): void => {
  sessionStorage.removeItem("user");
  sessionStorage.clear();
  console.log("logout call");
  navigate("/admin/login");
};

//  ADD SPLASH SCREEN

export const updatecontact = async (formData: FormData) => {
  const adminId = getAdminId();

  if (!adminId) {
    toast.error("Admin ID not found. Please login again.");
    return null;
  }

  try {
    //  Append admin_id if not already present
    if (!formData.has("admin_id")) {
      formData.append("admin_id", adminId);
    }

    const response = await axiosInstance.post(
      API_PATHS.WEBSETTING.UPDATECONTACTUS,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );

    if (response.status === 200) {
      toast.success("Contact data Update  successfully ");
      return response.data;
    } else {
      toast.error("Failed to add section ");
      return null;
    }
  } catch (error: any) {
    console.error("Error adding updating contact data:", error);
    toast.error("Something went wrong while adding slider ");
    throw error;
  }
};

export const updateaboutmain = async (formData: FormData) => {
  const adminId = getAdminId();

  if (!adminId) {
    toast.error("Admin ID not found. Please login again.");
    return null;
  }

  try {
    //  Append admin_id if not already present
    if (!formData.has("admin_id")) {
      formData.append("admin_id", adminId);
    }

    const response = await axiosInstance.post(
      API_PATHS.WEBSETTING.UPDATEMAINABOUTUSSECTION,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );

    if (response.status === 200) {
      return response.data;
    } else {
      toast.error("Failed to add section ");
      return null;
    }
  } catch (error: any) {
    console.error("Error adding updating about data:", error);
    toast.error("Something went wrong while adding slider ");
    throw error;
  }
};

export const addSoftware = async (image: File | null) => {
  if (!image) {
    toast.error("Please select an image");
    return false;
  }

  try {
    const formData = new FormData();
    formData.append("image", image);

    const res = await axiosInstance.post(
      API_PATHS.SOFTWARE.INSERTSOFTWARE,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    if (res.data.success) {
      toast.success(res.data.message);
      return true;
    }

    toast.error(res.data.message);
    return false;
  } catch (error) {
    console.error("Error adding software image:", error);
    toast.error("Image upload failed");
    return false;
  }
};

export const addTestimonial = async (data: any) => {
  const res = await axiosInstance.post(
    API_PATHS.TESTIMONIAL.INSERTTESTIMONIAL,
    data,
  );

  if (res.data.success) {
    toast.success("Testimonial Added");
    return true;
  }
  toast.error("Failed");
  return false;
};

export const addFaq = async (question: string, answer: string) => {
  try {
    const res = await axiosInstance.post(API_PATHS.CONTACT.ADDFAQ, {
      question,
      answer,
    });

    if (res.data?.success) {
      toast.success(res.data?.message || "FAQ Added Successfully ✅");
      return true;
    }

    toast.error(res.data?.message || "Failed to Add FAQ ❌");
    return false;
  } catch (error: any) {
    console.error("Error adding FAQ:", error);

    toast.error(error.response?.data?.message || "FAQ Add Failed ❌");

    return false;
  }
};

export const addcontactEmail = async (email: string) => {
  try {
    const res = await axiosInstance.post(API_PATHS.CONTACT.ADDCONTACTEMAIL, {
      email,
    });

    if (res.data?.success) {
      toast.success(res.data?.message || "Email Added Successfully ✅");
      return true;
    }

    toast.error(res.data?.message || "Failed to Add Email ❌");
    return false;
  } catch (error: any) {
    console.error("Error adding email:", error);

    toast.error(error.response?.data?.message || "Email Add Failed ❌");

    return false;
  }
};

interface ApiResponse {
  success: boolean;
  message: string;
}

interface AssociateForm {
  name: string;
  designation: string;
  description: string;
  image_file: File | null;
}

export const addFounder = async (form: AssociateForm): Promise<ApiResponse> => {
  try {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("designation", form.designation);
    formData.append("description", form.description);

    if (form.image_file) {
      formData.append("image", form.image_file);
    }

    const res = await axiosInstance.post(
      API_PATHS.OURASSOCIATE.ADDFOUNDER,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Add Failed ❌",
    };
  }
};

export const addInquiryEmail = async (email: string) => {
  try {
    const res = await axiosInstance.post(API_PATHS.INQUIRY.ADDINQUIRYEMAIL, {
      email,
    });

    if (res.data?.success) {
      toast.success(res.data?.message || "Email Added Successfully ✅");
      return true;
    }

    toast.error(res.data?.message || "Failed to Add Email ❌");
    return false;
  } catch (error: any) {
    console.error("Error adding email:", error);

    toast.error(error.response?.data?.message || "Email Add Failed ❌");

    return false;
  }
};

export interface PricingModelPayload {
  title: string;
  price: number;
  short_description: string;
  features: string[];
  created_by?: string;
}

/* ✅ Add Pricing Model API */
export const addPricingModel = async (data: PricingModelPayload) => {
  const res = await axiosInstance.post(
    API_PATHS.PRICINGMODEL.ADDPRICINGMODEL,
    data
  );
  return res.data;
};

export interface ServicesPayload {
  service_name: string;
  slug: string;
}
export const addservices = async (data: ServicesPayload) => {
  const res = await axiosInstance.post(
    API_PATHS.SERVICES.ADDSERVICES,
    data
  );

  return res.data;
};

export interface SubServiceForm {
  service_id: number;
  title: string;
  description: string;
  points: string[];
  image_file?: File;
}

export const addSubService = async (form: any): Promise<any> => {
  try {
    const formData = new FormData();

    formData.append("service_id", String(form.service_id));
    formData.append("title", form.title);
    formData.append("description", form.description);

    formData.append("points", JSON.stringify(form.points));

    if (form.image_file) {
      formData.append("image", form.image_file);
    }

    const res = await axiosInstance.post(
      API_PATHS.SUBSERVICES.ADDSUBSERVICES,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Add Sub-Service Failed ❌",
    };
  }
};


export const addTeam = async (form: any) => {
  try {
    const res = await axiosInstance.post(
      API_PATHS.TEAM.ADDTEAMMEMBER,
      {
        name: form.name,
        education: form.education || "",
        experience: form.experience || "",
        member_type: form.member_type,
        description: form.description || "",
        created_by: "1",
      }
    );

    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Add Team Member Failed",
    };
  }
};