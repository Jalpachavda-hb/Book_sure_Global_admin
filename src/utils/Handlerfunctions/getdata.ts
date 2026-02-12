import axiosInstance from "../axiosinstance";
import { toast } from "react-toastify";
import { API_PATHS } from "../apiPaths";

export const getAdminId = (): string | null => {
  const user = sessionStorage.getItem("user");
  if (user) {
    try {
      const parsed = JSON.parse(user);
      return parsed.id?.toString() || null;
    } catch {
      return null;
    }
  }
  return null;
};

export const Dashboardcount = async () => {
  try {
    const response = await axiosInstance.get(
      API_PATHS.HEROSECTION.GETDASHBOARDCOUNT,
    );
    return response.data; // { success, message, data }
  } catch (error) {
    console.error("Error fetching hero:", error);
    return {
      success: false,
      message: "Failed to fetch dashboard Count",
      data: null,
    };
  }
};

export const getHero = async () => {
  try {
    const response = await axiosInstance.get(
      API_PATHS.HEROSECTION.GETHEROSECTION,
    );
    return response.data; // { success, message, data }
  } catch (error) {
    console.error("Error fetching hero:", error);
    return {
      success: false,
      message: "Failed to fetch hero section",
      data: null,
    };
  }
};

export const fetchWebSetting = async () => {
  const res = await axiosInstance.get(API_PATHS.WEBSETTINGBOOK.GETWEBSETTING);
  return res.data.data;
};

export const getHomeAbout = async () => {
  try {
    const response = await axiosInstance.get(
      API_PATHS.HOMEABOUTSECTION.GETHOMEABOUT,
    );
    return response.data; // { success, data }
  } catch (error) {
    console.error("Error fetching about:", error);
    return {
      success: false,
      data: null,
    };
  }
};

export const getHelp = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.HELP.GETHELPSECTION);
    return response.data; // { success, data }
  } catch (error) {
    console.error("Error fetching help:", error);
    return { success: false, data: null };
  }
};
export const getwhychooseus = async () => {
  try {
    const response = await axiosInstance.get(
      API_PATHS.WHYCHOSSEUS.GETWHYCHOOSEUS,
    );
    return response.data;
  } catch {
    return { success: false, data: null };
  }
};

export const fetchProfile = async () => {
  const adminId = getAdminId();

  if (!adminId) {
    throw new Error("Admin ID not found");
  }

  const res = await axiosInstance.get(
    `${API_PATHS.ADMINAUTH.GET_PROFILE}/${adminId}`,
  );

  const data = res.data.data;

  return {
    admin_id: data.id,
    name: data.name,
    email: data.email,
    contact_number: data.contact_number,
    password: "",
  };
};

export const fetchSoftware = async () => {
  try {
    const res = await axiosInstance.get(API_PATHS.SOFTWARE.GETSOFTWARE);

    return res.data.data;
  } catch (error) {
    console.error("Error fetching active software:", error);
    toast.error("Failed to load active software images");
    throw error;
  }
};

export const fetchInActiveSoftware = async () => {
  try {
    const res = await axiosInstance.get(API_PATHS.SOFTWARE.GETINACTIVESOFTWARE);

    return res.data.data;
  } catch (error) {
    console.error("Error fetching inactive software:", error);
    toast.error("Failed to load inactive software images");
    throw error;
  }
};

/* ✅ GET ACTIVE */
export const fetchActiveTestimonials = async () => {
  try {
    const res = await axiosInstance.get(API_PATHS.TESTIMONIAL.GETTESTIMONIAL);

    return res.data.data; // ✅ Only Array
  } catch (error) {
    return [];
  }
};
/* ✅ GET INACTIVE */
export const fetchInactiveTestimonials = async () => {
  const res = await axiosInstance.get(
    API_PATHS.TESTIMONIAL.GETINACTIVETESTIMONIAL,
  );
  return res.data.data;
};

export const getcontactpage = async () => {
  const res = await axiosInstance.get(API_PATHS.CONTACT.GETCONTACTMSG);
  return res.data.data;
};

export const getcareerpage = async () => {
  const res = await axiosInstance.get(API_PATHS.CAREERS.GETCAREERSMSG);
  return res.data.data;
};

export interface CompanyHighlight {
  stat_1_value: string;
  stat_1_text: string;
  stat_2_value: string;
  stat_2_text: string;
  stat_3_value: string;
  stat_3_text: string;
  stat_4_value: string;
  stat_4_text: string;

  mission_title: string;
  mission_description: string;
  mission_image: string;

  vision_title: string;
  vision_description: string;
  vision_image: string;
}
export const getcompanyhighlight =
  async (): Promise<CompanyHighlight | null> => {
    try {
      const res = await axiosInstance.get(
        API_PATHS.COMPANYHIGHLIGHT.OURMISIION,
      );

      // Ensure we're returning the correct data structure
      if (res.data && res.data.data) {
        return res.data.data;
      }
      return res.data;
    } catch (error) {
      console.error("Fetch Company Highlight Error:", error);
      throw error; // Re-throw to handle in component
    }
  };

export const fetchFaq = async () => {
  try {
    const res = await axiosInstance.get(API_PATHS.CONTACT.GETACTIVEFAQ);

    // ✅ Return array safely
    return res.data?.data || [];
  } catch (error) {
    console.log("Active FAQ Fetch Error:", error);
    return [];
  }
};
export const fetchInActiveFaq = async () => {
  try {
    const res = await axiosInstance.get(API_PATHS.CONTACT.GETINACTIVEFAQ);

    // ✅ Return array safely
    return res.data?.data || [];
  } catch (error) {
    console.log("Inactive FAQ Fetch Error:", error);
    return [];
  }
};

export const GetContactPageInfo = async () => {
  try {
    const res = await axiosInstance.get(API_PATHS.CONTACT.GETCONTACTPAGEINFO);

    return res.data?.data || null;
  } catch (error) {
    console.log("Contact Page Fetch Error:", error);
    return null;
  }
};

export const fetchcontactemail = async () => {
  try {
    const res = await axiosInstance.get(API_PATHS.CONTACT.GETCONTACTEMAIL);

    return res.data.data;
  } catch (error) {
    console.error("Error fetching active software:", error);
    toast.error("Failed to load active software images");
    throw error;
  }
};

export const GetAboutmain = async () => {
  try {
    const res = await axiosInstance.get(API_PATHS.ABOUTMAIN.GETABOUTMAIN);
    return res.data || null; // Remove `.data` since your backend returns direct object
  } catch (error) {
    console.error("Get About Error:", error);
    return null;
  }
};

export const getActiveAssociate = async () => {
  try {
    const res = await axiosInstance.get(
      API_PATHS.OURASSOCIATE.GETACTIVEFOUNDER,
    );

    // ✅ Return only array
    return res.data?.data || [];
  } catch (error) {
    console.error("Get Active Associate Error:", error);
    return [];
  }
};

export const getInactiveAssociate = async () => {
  try {
    const res = await axiosInstance.get(
      API_PATHS.OURASSOCIATE.GETINACTIVEFOUNDER,
    );

    // ✅ Return only array
    return res.data?.data || [];
  } catch (error) {
    console.error("Get InActive Associate Error:", error);
    return [];
  }
};

export const getAssociateById = async (id: number) => {
  try {
    const res = await axiosInstance.get(
      `${API_PATHS.OURASSOCIATE.GETBYID}/${id}`,
    );

    return res.data?.data || null; // ✅ single object
  } catch (error) {
    console.error("Get Associate By ID Error:", error);
    return null;
  }
};

export const getWhyChooseUs = async () => {
  try {
    const res = await axiosInstance.get(API_PATHS.WHYCHOSSEUS.GETWHYCHOOSEUS);

    return res.data; // {success:true,data:{}}
  } catch (error) {
    console.error("Get WhyChooseUs Error:", error);
    return null;
  }
};

export const getinquirymsg = async () => {
  const res = await axiosInstance.get(API_PATHS.INQUIRY.GETPRICINGINQUIRY);
  return res.data.data;
};

export const fetchInqueryemail = async () => {
  try {
    const res = await axiosInstance.get(API_PATHS.INQUIRY.GETINQUIRYEMAIL);

    return res.data.data;
  } catch (error) {
    console.error("Error fetching active software:", error);
    toast.error("Failed to load active software images");
    throw error;
  }
};

export const getDataSequrity = async () => {
  try {
    const res = await axiosInstance.get(
      API_PATHS.DATASEQURITY.GETDATASECTIONDATA,
    );

    return res.data;
  } catch (error) {
    console.error("Get Data Security Error:", error);
    return null;
  }
};

export const getActivePricingModel = async () => {
  try {
    const res = await axiosInstance.get(
      API_PATHS.PRICINGMODEL.GETACTIVEPRICINGMODELS,
    );

    // ✅ Return only array
    return res.data?.data || [];
  } catch (error) {
    console.error("Get Active Pricing Model Error:", error);
    return [];
  }
};

export const getInActivePricingModel = async () => {
  try {
    const res = await axiosInstance.get(
      API_PATHS.PRICINGMODEL.GETINACTIVEPRICINGMODELS,
    );

    // ✅ Return only array
    return res.data?.data || [];
  } catch (error) {
    console.error("Get IN Active Pricing Model Error:", error);
    return [];
  }
};

export const getModelById = async (id: number) => {
  try {
    const res = await axiosInstance.get(
      `${API_PATHS.PRICINGMODEL.GETPRICINGMODELBYID}/${id}`,
    );

    return res.data?.data || null; // ✅ single object
  } catch (error) {
    console.error("Get Pricing Model By ID Error:", error);
    return null;
  }
};

export const getActiveServices = async () => {
  try {
    const res = await axiosInstance.get(API_PATHS.SERVICES.GETACTIVESERVICES);

    // ✅ Return only array
    return res.data?.data || [];
  } catch (error) {
    console.error("Get Active Services Error:", error);
    return [];
  }
};

export const getInactiveServices = async () => {
  try {
    const res = await axiosInstance.get(API_PATHS.SERVICES.GETINACTIVESERVICES);

    // ✅ Return only array
    return res.data?.data || [];
  } catch (error) {
    console.error("Get Active Services Error:", error);
    return [];
  }
};

export const getServiceById = async (id: number) => {
  try {
    const res = await axiosInstance.get(`${API_PATHS.SERVICES.GETBYID}/${id}`);

    return res.data?.data || null; // ✅ single object
  } catch (error) {
    console.error("Get Service By ID Error:", error);
    return null;
  }
};
export const getSubServiceBySlug = async (slug: string) => {
  try {
    const res = await axiosInstance.get(
      `${API_PATHS.SUBSERVICES.GETSERVICEBYSLUG}/${slug}`,
    );

    return res.data?.data || [];
  } catch (error) {
    console.error("Get SubService By Slug Error:", error);
    return [];
  }
};

export const getSubServiceById = async (id: number) => {
  try {
    const res = await axiosInstance.get(
      `${API_PATHS.SUBSERVICES.EDITSUBSERVICEBYID}/${id}`,
    );

    return res.data?.data || null; // ✅ single object
  } catch (error) {
    console.error("Get SubService By ID Error:", error);
    return null;
  }
};

export const getInActiveSubServiceBySlug = async (slug: string) => {
  try {
    const res = await axiosInstance.get(
      `${API_PATHS.SUBSERVICES.GETINACTIVESUBSERVICES}/${slug}`,
    );

    return res.data?.data || [];
  } catch (error) {
    console.error("Get InActive SubService By Slug Error:", error);
    return [];
  }
};


export const getActiveteam_member = async () => {
  try {
    const res = await axiosInstance.get(API_PATHS.TEAM.GETTEAMMEMBERS);

    // ✅ Return only array
    return res.data?.data || [];
  } catch (error) {
    console.error("Get Active Services Error:", error);
    return [];
  }
};
export const getInactiveteam_member = async () => {
  try {
    const res = await axiosInstance.get(API_PATHS.TEAM.GETINACTIVETEAMMEMBERS);

    // ✅ Return only array
    return res.data?.data || [];
  } catch (error) {
    console.error("Get InActive Team Members Error:", error);
    return [];
  }
};
export const GetTeamMemberById = async (id: number) => {
  try {
    const res = await axiosInstance.get(
      `${API_PATHS.TEAM.GETTEAMMEMBERBYID}/${id}`
    );

    return res.data;
  } catch {
    return { success: false };
  }
};