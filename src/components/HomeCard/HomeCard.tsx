import { useEffect, useState } from "react";
import { FcServices } from "react-icons/fc";
import { MdOutlineWorkHistory } from "react-icons/md";
import { FcQuestions } from "react-icons/fc";
import { Dashboardcount } from "../../utils/Handlerfunctions/getdata";

export default function HomeCard() {
  const [cardData, setCardData] = useState({
    totalServices: 0,
    yearExperience: 0,
    totalInquiries: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const response = await Dashboardcount();

    if (response.success) {
      setCardData(response.data);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100">
            <FcServices className="text-xl" />
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-6">Total Services</p>

        <div className="flex items-end justify-between mt-2">
          <h2 className="text-3xl font-bold text-gray-800">
            {cardData.totalServices}
          </h2>

          <img
            src="/images/cardservices.jpg"
            alt="services"
            className="h-10 w-16 object-contain"
          />
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100">
            <MdOutlineWorkHistory className="text-xl" />
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-6">Years of Experience</p>

        <div className="flex items-end justify-between mt-2">
          <h2 className="text-3xl font-bold text-gray-800">
            {cardData.yearExperience}
          </h2>

          <img
            src="/images/expirience.jpg"
            alt="experience"
            className="h-10 w-16 object-contain"
          />
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100">
            <FcQuestions className="text-xl" />
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-6">Total Quote Inquiry</p>

        <div className="flex items-end justify-between mt-2">
          <h2 className="text-3xl font-bold text-gray-800">
            {cardData.totalInquiries}
          </h2>

          <img
            src="/images/inquery.jpg"
            alt="inquiry"
            className="h-10 w-16 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
