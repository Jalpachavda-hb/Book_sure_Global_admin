import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import Software from "./pages/Herosection/Software";
import Inactivesoftwares from "./pages/Herosection/InActiveSoftware";
import Aboutus from "./pages/Herosection/Aboutus";
// import Slider from "./pages/setting/Homepage/Slider";
import UserProfiles from "./pages/UserProfiles";
import Help from "./pages/Herosection/Helpsection";

import Team from "./pages/Team/Team";
import InActiveTeam from "./pages/Team/InActiveTeam";
// =================================
import WhyCooseUs from "./pages/Herosection/WhyCooseUs";
import Herosection from "./pages/Herosection/Herosection";
import AddSoftware from "./pages/Herosection/AddSoftware";
import Testimonial from "./pages/Herosection/Testimonial/Testimonial";
import InActiveTestimonial from "./pages/Herosection/Testimonial/InActiveTestimonial";
import AddTestimonial from "./pages/Herosection/Testimonial/Addtestimonial";
import Logosetting from "./pages/setting/Homepage/Logosetting";
import Contact from "./pages/Tables/Contact/Contact";
import Inquery from "./pages/Tables/inquery/Inquery";
import Contactpageinfo from "./pages/Tables/Contact/Contactpageinfo";
import Contactmail from "./pages/Tables/Contact/Contactmail";
import Faq from "./pages/Tables/Contact/Faq";
import InactiveFaq from "./pages/Tables/Contact/InactiveFaq";
import AddFaq from "./pages/Tables/Contact/AddFaq";
import Careers from "./pages/Tables/Careers";
import Companyhighlight from "./pages/Aboutus/Ourmission&vision";
import Addcontactmail from "./pages/Tables/Contact/Addcontactmail";
import Aboutmain from "./pages/Aboutus/Aboutmain";
import Inquirymail from "./pages/Tables/inquery/inquirymail";
import AddInquirymail from "./pages/Tables/inquery/AddInquirymail";
import Data_sequrity from "./pages/Data_Sequrity/Data_sequrity";
import Pricing_model from "./pages/Pricing/Pricing_model";
import INActivePricingModelTable from "./pages/Pricing/Inactivemodel";
import Addpricingmodel from "./pages/Pricing/Addpricingmodel";
import EditPricingModel from "./pages/Pricing/EditPricingModel";
import Services from "./pages/Services/Services";
import EditServices from "./pages/Services/EditServices";
import InActiveservices from "./pages/Services/Inactiveservices";
import Addservices from "./pages/Services/Addservices";
import SubServices from "./pages/Services/SubServices";
import AddSubServices from "./pages/Services/Addsubservices";
import EditSubService from "./pages/Services/Editsubservice";
import InAtiveSubServicesTable from "./pages/Services/Inactivesubservices";
import AddTeamMember from "./pages/Team/Addteam";
import Home from "./pages/Dashboard/Home";
import EditTeammember from "./pages/Team/EditTeam";
import CalendlyBookings from "./pages/Calendly/CalendlyBookings";
export default function Allfile() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="dashboard" element={<Home />} />

        <Route path="Hero_Section" element={<Herosection />} />
        <Route path="event" element={<CalendlyBookings />} />
        <Route path="Company_highlight" element={<Companyhighlight />} />
        <Route path="aboutmain_section" element={<Aboutmain />} />
        <Route path="help" element={<Help />} />
        <Route path="/whychooseus" element={<WhyCooseUs />} />
        <Route path="aboutus_section" element={<Aboutus />} />
        <Route path="testimonial_section" element={<Testimonial />} />
        <Route path="addtestimonial" element={<AddTestimonial />} />
        <Route path="inactivetestimonial" element={<InActiveTestimonial />} />
        <Route path="testimonials/add" element={<AddTestimonial />} />
        <Route path="contact" element={<Contact />} />
        <Route path="contact_page" element={<Contactpageinfo />} />
        <Route path="contact_email" element={<Contactmail />} />
        <Route path="contact_email/add" element={<Addcontactmail />} />
        <Route path="faq" element={<Faq />} />
        <Route path="InactiveFaqs" element={<InactiveFaq />} />
        <Route path="faq/add" element={<AddFaq />} />
        <Route path="careers" element={<Careers />} />
        <Route path="data_security" element={<Data_sequrity />} />
        <Route path="pricing_model" element={<Pricing_model />} />
        <Route path="pricing-model/add" element={<Addpricingmodel />} />
        <Route path="team" element={<Team />} />
        <Route path="inactive_team" element={<InActiveTeam />} />
        <Route path="team/add" element={<AddTeamMember />} />
        <Route path="team/edit/:id" element={<EditTeammember />} />

        <Route
          path="inactive_pricing_model"
          element={<INActivePricingModelTable />}
        />
        <Route path="/pricing-model/edit/:id" element={<EditPricingModel />} />

        <Route path="softwares/add" element={<AddSoftware />} />
        <Route path="softwares" element={<Software />} />
        <Route path="Inactivesoftwares" element={<Inactivesoftwares />} />
        <Route path="Services" element={<Services />} />
        <Route path="subservices/add" element={<AddSubServices />} />

        <Route path="sub-services/edit/:id" element={<EditSubService />} />
        <Route
          path="/Inactivesub_services"
          element={<InAtiveSubServicesTable />}
        />
        <Route path="subservices/:slug" element={<SubServices />} />
        <Route path="/services/edit/:id" element={<EditServices />} />
        <Route path="InActiveservices" element={<InActiveservices />} />
        <Route
          path="Inactivesub_services/:slug"
          element={<InAtiveSubServicesTable />}
        />

        <Route path="services/add" element={<Addservices />} />
        <Route path="profile" element={<UserProfiles />} />
        <Route path="logo_setting" element={<Logosetting />} />

        {/* unuse but usefull routes */}
        <Route path="inquiry" element={<Inquery />} />
        <Route path="inquiry_email" element={<Inquirymail />} />
        <Route path="inquiry_email/add" element={<AddInquirymail />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
