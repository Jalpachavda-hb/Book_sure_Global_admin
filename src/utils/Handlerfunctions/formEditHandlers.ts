import axiosInstance from "../axiosinstance";
import { toast } from "react-toastify";
import { API_PATHS } from "../apiPaths";

// ===========book sure glbal==========================

export const updateherosection = async (data: {
  title: string;
  subtitle: string;
  button_text: string;
  button_link: string;
  background_image?: File | null;
}) => {
  try {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    formData.append("button_text", data.button_text);
    formData.append("button_link", data.button_link);

    if (data.background_image instanceof File) {
      formData.append("background_image", data.background_image);
    }

    const response = await axiosInstance.post(
      API_PATHS.HEROSECTION.UPDATEHEROSECTION,
      formData,
    );

    return response.data;
  } catch (error) {
    console.error("Error updating hero:", error);
    throw error;
  }
};

export const updateWebSetting = async (
  groupName: string,
  logoFile: File | null,
  faviconFile: File | null,
) => {
  const formData = new FormData();

  formData.append("WebTitle", groupName);

  if (logoFile) formData.append("logo", logoFile);
  if (faviconFile) formData.append("favicon", faviconFile);

  const res = await axiosInstance.post(
    API_PATHS.WEBSETTINGBOOK.UPDATEWEBSETTING,
    formData,
  );

  return res.data;
};

export const updateHomeAbout = async (
  toptitle: string,
  title: string,
  aboutcontent: string,
  year_experience: number,
  mainimage: File | null,
  secondimage: File | null,
) => {
  const formData = new FormData();

  formData.append("toptitle", toptitle);
  formData.append("title", title);
  formData.append("aboutcontent", aboutcontent);
  formData.append("year_experience", String(year_experience));

  if (mainimage) formData.append("mainimage", mainimage);
  if (secondimage) formData.append("secondimage", secondimage);

  const res = await axiosInstance.post(
    API_PATHS.HOMEABOUTSECTION.UPDATEHOMEABOUT,
    formData,
  );

  return res.data;
};

export const updateHelp = async (
  maintitle: string,
  title: string,
  helpcontent: string,
  mainimage: File | null,
) => {
  const formData = new FormData();

  formData.append("maintitle", maintitle);
  formData.append("title", title);
  formData.append("helpcontent", helpcontent);

  if (mainimage) formData.append("mainimage", mainimage);

  const res = await axiosInstance.post(API_PATHS.HELP.UPDATEHELP, formData);

  return res.data;
};

// export const updateWhychooseus = async (
//   section_title: string,
//   section_subtitle: string,
//   content_title: string,
//   content_para: string,
//   experience_years: number,
//   button_text: string,
//   button_link: string,
//   cards: SpecialityField[],
//   features: string[],
//   whychosseus_image: File | null,
// ) => {
//   const formData = new FormData();

//   formData.append("section_title", section_title);
//   formData.append("section_subtitle", section_subtitle);
//   formData.append("content_title", content_title);
//   formData.append("content_para", content_para);
//   formData.append("experience_years", String(experience_years));
//   formData.append("button_text", button_text);
//   formData.append("button_link", button_link);

//   formData.append("cards", JSON.stringify(cards));
//   formData.append("features", JSON.stringify(features));

//   if (whychosseus_image) {
//     formData.append("whychosseus_image", whychosseus_image);
//   }

//   const res = await axiosInstance.post(
//     API_PATHS.WHYCHOSSEUS.UPDATEWHYCHOSSEUS,
//     formData,
//   );

//   return res.data;
// };

export const handleUpdateProfile = async (
  formData: {
    admin_id: string;
    name: string;
    email: string;
    contact_number: string;
    password?: string;
  },
  onSuccess: () => void,
) => {
  const payload = {
    name: formData.name,
    email: formData.email,
    contact_number: formData.contact_number,
    ...(formData.password ? { password: formData.password } : {}),
  };

  const { data } = await axiosInstance.post(
    `${API_PATHS.ADMINAUTH.UPDATE_PROFIL}/${formData.admin_id}`,
    payload,
  );

  if (data.success) {
    toast.success(data.message);
    onSuccess();
  } else {
    toast.error(data.message);
  }
};

export const updateSoftwareStatus = async (
  id: number,
  isActive: 0 | 1,
  onSuccess: () => void,
) => {
  try {
    const res = await axiosInstance.put(
      `${API_PATHS.SOFTWARE.UPDATESTATUSBYID}/${id}`,
      { isActive },
    );

    if (res.data.success) {
      toast.success(res.data.message);
      onSuccess();
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error("Error updating software status:", error);
    toast.error("Status update failed");
  }
};

export const updateTestimonial = async (id: number, data: any) => {
  try {
    const res = await axiosInstance.put(
      `${API_PATHS.TESTIMONIAL.EDITTESTIMONIAL}/${id}`,
      data,
    );

    if (res.data.success) {
      toast.success(res.data.message);
      return true;
    }

    toast.error(res.data.message);
    return false;
  } catch (error) {
    toast.error("Update Failed ❌");
    return false;
  }
};
export const updateTestimonialStatus = async (
  id: number,
  Is_Active: 0 | 1,
  refresh: () => void,
) => {
  try {
    const res = await axiosInstance.put(
      `${API_PATHS.TESTIMONIAL.UPDATESTATUSBYID}/${id}`,
      { Is_Active }, // ✅ correct key
    );

    if (res.data.success) {
      toast.success(res.data.message);
      refresh();
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error("Status update failed ❌");
  }
};

export const updatecompanyhighlight = async (
  id: number,
  formData: FormData,
) => {
  try {
    const res = await axiosInstance.put(
      `${API_PATHS.COMPANYHIGHLIGHT.EDITCOMPANYHIGHTLIGHT}/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return res.data;
  } catch (error: any) {
    console.error("Update Highlight Error:", error);

    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to update company highlight",
    };
  }
};

export const updateFaqStatus = async (
  id: number,
  is_active: 0 | 1,
  refresh: () => void,
) => {
  try {
    const res = await axiosInstance.patch(
      `${API_PATHS.CONTACT.UPDATEFAQSTATUAS}/${id}/status`,
      { is_active },
    );

    if (res.data?.success) {
      toast.success(res.data.message || "Status Updated ✅");
      refresh();
    } else {
      toast.error(res.data.message || "Update Failed ❌");
    }
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Status update failed ❌");
  }
};
export const updateEmailStatus = async (
  id: number,
  is_active: 0 | 1,
  refresh: () => void,
) => {
  try {
    const res = await axiosInstance.patch(
      `${API_PATHS.CONTACT.UPDATEEMAILSTATUS}/${id}`,
      { is_active },
    );

    if (res.data?.success) {
      toast.success(res.data.message || "delet ");
      refresh();
    } else {
      toast.error(res.data.message || "Update Failed ❌");
    }
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Status update failed ❌");
  }
};

export const updateContactpageinfo = async (id: number, form: any) => {
  try {
    const res = await axiosInstance.put(
      `${API_PATHS.CONTACT.UPDATECONTACTPAGEINFO}/${id}`,
      form,
    );

    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to update contact page info",
    };
  }
};
export interface AboutForm {
  subtitle: string;
  title: string;
  description: string;
  experience_list: string[];
  main_image_file: File | null;
  main_image: string;
}

export const updateAboutSection = async (id: number, form: AboutForm) => {
  try {
    const formData = new FormData();

    /* ✅ Append Text Fields */
    formData.append("subtitle", form.subtitle);
    formData.append("title", form.title);
    formData.append("description", form.description);

    /* ✅ Append Experience List */
    formData.append("experience_list", JSON.stringify(form.experience_list));

    /* ✅ Append Image Only If Selected */
    if (form.main_image_file) {
      formData.append("main_image", form.main_image_file);
    }

    /* ✅ API Call Always Runs */
    const res = await axiosInstance.put(
      `${API_PATHS.ABOUTMAIN.UPDATEABOUTMAIN}/${id}`,
      formData,
    );

    return res.data;
  } catch (error: any) {
    console.error("Update About Error:", error);

    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to update About Section ❌",
    };
  }
};
export const updateFounder = async (
  id: number,
  form: any,
): Promise<{ success: boolean; message: string }> => {
  try {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("designation", form.designation);
    formData.append("description", form.description);

    if (form.image_file) {
      formData.append("image", form.image_file);
    }

    const res = await axiosInstance.put(`/update/${id}`, formData);

    // ✅ Return only backend response data
    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Update failed ❌",
    };
  }
};



export const updateWhyChooseUs = async (
  id: number,
  sectionTitle: string,
  sectionSubtitle: string,
  contentTitle: string,
  contentPara: string,
  specialityList: any[],
  imageFile: File | null,
) => {
  try {
    const formData = new FormData();

    formData.append("section_title", sectionTitle);
    formData.append("section_subtitle", sectionSubtitle);
    formData.append("content_title", contentTitle);
    formData.append("content_para", contentPara);

    /* ✅ Send array of objects */
    formData.append("speciality_list", JSON.stringify(specialityList));

    /* ✅ Optional Image */
    if (imageFile) {
      formData.append("whychosseus_image", imageFile);
    }

    /* ✅ Axios PUT Request */
    const res = await axiosInstance.put(
      `${API_PATHS.WHYCHOSSEUS.UPDATEWHYCHOSSEUS}/${id}`,
      formData,
    );

    /* ✅ Axios returns data directly */
    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Something went wrong ❌",
    };
  }
};

export const updateInqEmailStatus = async (
  id: number,
  is_active: 0 | 1,
  refresh: () => void,
) => {
  try {
    const res = await axiosInstance.put(
      `${API_PATHS.INQUIRY.UPDATEEMAILSTATUS}/${id}`,
      { is_active },
    );

    if (res.data?.success) {
      toast.success(res.data.message || "Email deleted successfully ✅");
      refresh();
    } else {
      toast.error(res.data.message || "Delete Failed ❌");
    }
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Delete request failed ❌");
  }
};

export interface SecurePoint {
  title: string;
  description: string;
}

export const updateDataSecurity = async (
  sectionTag: string,
  title: string,
  description: string,
  howWeKeepSecure: SecurePoint[],
  mainImage: File | null,
) => {
  try {
    const formData = new FormData();

    /* ✅ Text Fields */
    formData.append("section_tag", sectionTag);
    formData.append("title", title);
    formData.append("description", description);

    /* ✅ JSON Array Field */
    formData.append("how_we_keep_secure", JSON.stringify(howWeKeepSecure));

    /* ✅ Optional Image */
    if (mainImage) {
      formData.append("main_image", mainImage);
    }

    /* ✅ PUT Request */
    const res = await axiosInstance.put(
      API_PATHS.DATASEQURITY.UPDATEDATASECTION,
      formData,
    );

    return res.data;
  } catch (error: any) {
    console.error("Update Data Security Error:", error);

    return {
      success: false,
      message: error?.response?.data?.message || "Update Failed ❌",
    };
  }
};

export const updatePricingModelStatus = async (
  id: number,
  is_active: number,
) => {
  try {
    const res = await axiosInstance.put(
      `${API_PATHS.PRICINGMODEL.UPDATEPRICINGMODELSTATUS}/${id}`,
      { is_active },
    );

    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Status Update Failed ❌",
    };
  }
};

export const updatePricingmodel = async (
  id: number,
  data: {
    title: string;
    price: number;
    short_description: string;
    features: string[];
  },
) => {
  try {
    const res = await axiosInstance.put(
      `${API_PATHS.PRICINGMODEL.UPDATEPRICINGMODELBYID}/${id}`,
      data,
    );

    return res.data;
  } catch (error: any) {
    console.error("Update Pricing Model Error:", error);

    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to update Pricing Model ❌",
    };
  }
};
export const updateServicesStatus = async (id: number, is_active: number) => {
  try {
    const res = await axiosInstance.put(
      `${API_PATHS.SERVICES.UPDATESERVICESSTATUS}/${id}`,
      { is_active },
    );

    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Status Update Failed ❌",
    };
  }
};

export const updateSerivec = async (id: number, data: any) => {
  try {
    const res = await axiosInstance.put(
      `${API_PATHS.SERVICES.UPDATESERIVES}/${id}`,
      data,
    );

    if (res.data.success) {
      toast.success(res.data.message);
      return true;
    }

    toast.error(res.data.message);
    return false;
  } catch (error) {
    toast.error("Update Failed ❌");
    return false;
  }
};

export const updatesubSerivec = async (id: number, data: FormData) => {
  try {
    const res = await axiosInstance.put(
      `${API_PATHS.SUBSERVICES.EDITSUBSERVICEBYID}/${id}`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    toast.success(res.data.message);
    return true;
  } catch {
    toast.error("Update Failed ❌");
    return false;
  }
};
export const updatesubServicesStatus = async (
  id: number,
  is_active: number,
) => {
  try {
    const res = await axiosInstance.put(
      `${API_PATHS.SUBSERVICES.UPDATESUBSERVICESSTATUS}/${id}`,
      { is_active },
    );

    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Status Update Failed ❌",
    };
  }
};

export const updateTeamStatus = async (
  id: number,
  is_active: number
) => {
  try {
    const res = await axiosInstance.put(
      `${API_PATHS.TEAM.UPDATETEAMMEMBERSTATUS}/${id}`,
      { is_active }
    );

    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Status Update Failed ❌",
    };
  }
};


export const EditTeam = async (id: number, data: any) => {
  try {
    const res = await axiosInstance.put(
      `${API_PATHS.TEAM.UPDATETEAMMEMBERBYID}/${id}`,
      data
    );

    return {
      success: true,
      message: res.data.message,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Update Failed ❌",
    };
  }
};