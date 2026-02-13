// export const BASE_URL = "https://booksureglobal.com/api/";
// export const IMGURL = "https://booksureglobal.com";

export const BASE_URL = "http://localhost:8000/api";
export const IMGURL = "http://localhost:8000";

export const API_PATHS = {
  // PENDINGFORAPPROVALS

  // WEBSETTING

  WEBSETTING: {
    GETWEBSETTING: "getWebSetting",
    UPDATEWEBSETTING: "updateWebSetting",
    GETSLIDER: "getSliders",
    ADDSLIDER: "AddSliders",
    DELETESLIDER: "deleteSlider",
    GETTESTIMONIAL: "getTestimonialer",
    DELETETETESTIMONIAL: "deleteTestimonialer",
    ADDTESTIMONIAL: "addTestimonialer",
    GETABOUTSECTION: "about-section",
    UPDATEABOUTSECTION: "about-section/update",
    GETHEROSECTION: "hero-sliders",
    DELETESLIDERHERO: "hero-sliders/delete",
    ADDHEROSLIDER: "hero-sliders/save",
    GETCONTACTUS: "contact-us",
    UPDATECONTACTUS: "contact-us/update",
    // main about us Selection(MAS)
    GETMAINABOUTUSSECTION: "masGet",
    UPDATEMAINABOUTUSSECTION: "masUpdate",
  },

  // book sure global////
  HEROSECTION: {
    GETHEROSECTION: "getHero",
    UPDATEHEROSECTION: "updateHero",
    GETDASHBOARDCOUNT: "getDashboardCardData",
  },
  HOMEABOUTSECTION: {
    GETHOMEABOUT: "getAbout",
    UPDATEHOMEABOUT: "updateHomeAbout",
  },
  HELP: {
    GETHELPSECTION: "getHelp",
    UPDATEHELP: "updateHomeHelp",
  },
  WHYCHOSSEUS: {
    GETWHYCHOOSEUS: "getwhychooseus",
    UPDATEWHYCHOSSEUS: "updatewhychooseus",
  },

  WEBSETTINGBOOK: {
    GETWEBSETTING: "getwebdetail",
    UPDATEWEBSETTING: "editwebsetting",
  },

  ADMINAUTH: {
    ADMINLOGIN: "login",
    GET_PROFILE: "getadminbyid",
    UPDATE_PROFIL: "update-profile",
    ADMINROLEPERMISSION: "adminRolePermissions",
  },

  SOFTWARE: {
    GETSOFTWARE: "getSoftwareActive",
    DELETESOFTWARE: "deleteSoftwareById",
    INSERTSOFTWARE: "addSoftware",
    GETINACTIVESOFTWARE: "getSoftwareInactive",
    UPDATESTATUSBYID: "update-status",
  },
  //  GETSECTIONTITLE: "getSoftwareSectionMaster",
  // UPDATETITLE: "updateSoftwareSection",

  TESTIMONIAL: {
    GETTESTIMONIAL: "getActiveTestimonials",
    INSERTTESTIMONIAL: "addTestimonial",
    GETINACTIVETESTIMONIAL: "getInActiveTestimonials",
    UPDATESTATUSBYID: "updateTestimonialStatus",
    GETTESTIMONIALBYID: "getTestimonialById",
    EDITTESTIMONIAL: "editTestimonialById",
    DELETETESTIMONIAL: "deleteTestimonial",
  },

  CONTACT: {
    UPDATECONTACTPAGEINFO: "contact/contact-page",
    GETCONTACTEMAIL: "contact/contact-emails",
    ADDCONTACTEMAIL: "contact/contact-email",
    ADDFAQ: "contact/contact-faq",

    UPDATEEMAILSTATUS: "contact/contact-email/status",
    UPDATEFAQSTATUAS: "contact/contact-faq",
    GETCONTACTPAGEINFO: "contact/getContactPageInfo",
    GETACTIVEFAQ: "contact/contact-faqs/active",
    GETINACTIVEFAQ: "contact/contact-faqs/inactive",
    DELETEEMAIL: "contact/contact-email/",
    DELETEFAQ: "contact/contact-faq",
    GETCONTACTMSG: "contact/contact-messages",
  },

  CAREERS: {
    GETCAREERSMSG: "career/career-applications",
  },

  ABOUTMAIN: {
    GETABOUTMAIN: "aboutmain/about",
    UPDATEABOUTMAIN: "aboutmain/about",
  },
  COMPANYHIGHLIGHT: {
    OURMISIION: "aboutmain/highlights",
    EDITCOMPANYHIGHTLIGHT: "aboutmain/highlights",
  },



  INQUIRY: {
    GETPRICINGINQUIRY: "inq/getpricinginquiries",
    GETINQUIRYEMAIL: "inq/pricing-inquiry-emails",
    ADDINQUIRYEMAIL: "inq/pricing-inquiry-email",
    EDITMAIL: "pricing-inquiry-email",
    UPDATEEMAILSTATUS: "/inq/inquiry-email/status",
  },

  DATASEQURITY: {
    GETDATASECTIONDATA: "data/data-security",
    UPDATEDATASECTION: "data/update-data-security",
  },

  PRICINGMODEL: {
    UPDATEPRICINGSECTION: "pricing/update",
    UPDATEPRICINGMODELSTATUS: "pricing/pricing-model/status",
    GETINACTIVEPRICINGMODELS: "pricing/inactive",
    GETACTIVEPRICINGMODELS: "pricing/active",
    DELETEPRICINGMODEL: "pricing/pricing-model",
    ADDPRICINGMODEL: "pricing/pricing-model/add",
    GETPRICINGMODELBYID: "pricing/pricing-model",
    UPDATEPRICINGMODELBYID: "pricing/pricing-model",
    GETPRICINGMODELTITLES: "pricing/gettitles",
    GETPRICINGSECTION: "pricing/getpricingsection",
  },

  SERVICES: {
    GETACTIVESERVICES: "/services/active",
    GETINACTIVESERVICES: "/services/inactive",
    UPDATESERVICESSTATUS: "/services/status",
    ADDSERVICES: "/services",
    GETBYID: "/services/getbyid",
    UPDATESERIVES: "/updateservices",
    DELETESERVICES: "/services",
  },
  SUBSERVICES: {
    ADDSUBSERVICES: "/sub-services",
    GETSERVICEBYSLUG: "/sub-services/by-slug",
    EDITSUBSERVICEBYID: "/sub-services",
    UPDATESUBSERVICESSTATUS: "/sub-services/status",
    GETINACTIVESUBSERVICES: "/sub-services/inactive",
    DELETESUBSERVICES: "/sub-services/delete",
  },

  TEAM: {
    ADDTEAMMEMBER: "team/addmember",
    DELETETEAMMEMBER: "team/member",
    GETTEAMMEMBERS: "team/getmembers",
    UPDATETEAMSECTION: "team/edittile",
    GETTEAMSECTION: "team/gettitle",
    GETACTIVETEAMMEMBERS: "team/members/active",
    GETINACTIVETEAMMEMBERS: "team/members/inactive",
    UPDATETEAMMEMBERSTATUS: "team/member/status",
    UPDATETEAMMEMBERBYID: "team/editmember",
    GETTEAMMEMBERBYID: "team/getmemberbyid",
  },
};
