import { useCallback, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { MdMergeType } from "react-icons/md";

import { LuClipboardCheck, LuUserPlus, LuSettings } from "react-icons/lu";
import { CgWebsite } from "react-icons/cg";
import { FaAngleDown } from "react-icons/fa";
import { BiSolidCategoryAlt, BiSolidDetail } from "react-icons/bi";
import { RiCustomerService2Fill } from "react-icons/ri";
import { useSidebar } from "../context/SidebarContext";
import SidebarWidget from "./SidebarWidget";
import { FaUserGroup } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import { fetchWebSetting } from "../utils/Handlerfunctions/getdata";
import { FaEnvelopeOpenText } from "react-icons/fa6";
import { IoIosText } from "react-icons/io";
import { FaDatabase } from "react-icons/fa";
import { FaCommentDollar } from "react-icons/fa";
/* ================= TYPES ================= */
type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: {
    name: string;
    path?: string;
    icon?: React.ReactNode;
    subSubItems?: {
      name: string;
      path: string;
      icon?: React.ReactNode;
    }[];
  }[];
};
type WebSettingType = {
  id: number;
  WebTitle: string;
  Logo: string;
  Favicon: string;
  created_at: string;
  updated_at: string;
};
/* ================= STATIC MENU ================= */
const navItems: NavItem[] = [
  {
    name: "Dashboard",
    icon: <LuLayoutDashboard />,
    path: "/admin/dashboard",
  },

  {
    name: "Home Page",
    icon: <CgWebsite />,
    subItems: [
      {
        name: "Hero Section",
        icon: <MdMergeType />,
        path: "/admin/Hero_Section",
      },
      {
        name: "Home About Section",
        icon: <BiSolidCategoryAlt />,
        path: "/admin/aboutus_section",
      },
      {
        name: "Problem We Solve Section",
        icon: <BiSolidDetail />,
        path: "/admin/help",
      },
      {
        name: "SoftWares Section",
        icon: <BiSolidDetail />,
        path: "/admin/softwares",
      },
      {
        name: "Why Choose Us Section",
        icon: <BiSolidDetail />,
        path: "/admin/whychooseus",
      },
      {
        name: "Testimonials",
        icon: <BiSolidDetail />,
        path: "/admin/testimonial_section",
      },
    ],
  },
  {
    name: "About Us",
    icon: <LuUserPlus />,
    subItems: [
      // {
      //   name: "About Us",
      //   icon: <LuUserPlus />,
      //   subSubItems: [
      //     { name: "About Us section", path: "/admin/Aboutus_section" },
      //     { name: "Our Mission & Vision", path: "/admin/Aboutus_section" },
      //     { name: "Our Associate", path: "/admin/Aboutus_section" },
      //   ],
      // },
      {
        name: "About Us section",
        icon: <LuUserPlus />,
        path: "/admin/aboutmain_section",
      },
      {
        name: "Our Mission & Vision",
        icon: <LuUserPlus />,
        path: "/admin/Company_highlight",
      },
  
      // { name: "Blog", icon: <LuUserPlus />, path: "/admin/blog" },
      // { name: "Gallery", icon: <LuUserPlus />, path: "/admin/gallery" },
    ],
  },

  {
    name: "Contact Us",
    icon: <RiCustomerService2Fill />,
    subItems: [
      {
        name: "Contact page ",
        icon: <LuUserPlus />,
        path: "/admin/contact_page",
      },
      {
        name: " Email",
        icon: <LuUserPlus />,
        path: "/admin/contact_email",
      },
      {
        name: "Contact Us FAQ",
        icon: <LuUserPlus />,
        path: "/admin/faq",
      },
    ],
  },

  {
    name: "Pricing Plan",
    icon:<FaCommentDollar />
,
    path: "/admin/pricing_model",
  },

  {
    name: "Data Security",
    icon: <FaDatabase />,
    path: "/admin/data_security",
  },

  {
    name: "Services",
    icon: <LuClipboardCheck />,
    path: "/admin/services",
  },

  {
    name: "Team",
    icon: <FaUserGroup />,
    path: "/admin/team",
  },
  // {
  //   name: "Pricing Plan",
  //   icon: <LuClipboardCheck />,
  //   path: "/admin/pricing",
  // },
  // {
  //   name: "Data Security",
  //   icon: <LuClipboardCheck />,
  //   path: "/admin/data-security",
  // },

  {
    name: "Web Setting",
    icon: <LuSettings />,
    path: "/admin/logo_setting",
  },
];

const othersItems: NavItem[] = [
  {
    name: "Quote",
    icon: <IoIosText />,
    subItems: [
      {
        name: "Quote Details",
        icon: <MdMergeType />,
        path: "/admin/inquiry",
      },
      {
        name: "Quote Email",
        icon: <MdMergeType />,
        path: "/admin/inquiry_email",
      },
    ],
  },
  { name: "Careers", icon: <FaEnvelopeOpenText />, path: "/admin/careers" },
  // { name: "Inquiry", icon: <FiSettings />, path: "/admin/inquiry" },
  // { name: "Contact Us", icon: <FiSettings />, path: "/admin/contact" },
];

/* ================= COMPONENT ================= */
const AppSidebar: React.FC = () => {
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    setIsHovered,
    toggleMobileSidebar,
  } = useSidebar();

  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [openSubSubmenu, setOpenSubSubmenu] = useState<string | null>(null);
  const [webSetting, setWebSetting] = useState<WebSettingType | null>(null);
  // const _subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const getSettings = async () => {
      try {
        const data = await fetchWebSetting();
        setWebSetting(data);
      } catch (error) {
        console.error("Error fetching web settings:", error);
      }
    };

    getSettings();
  }, []);

  const isActive = useCallback(
    (path?: string) => (path ? location.pathname === path : false),
    [location.pathname],
  );

  const handleSubmenuToggle = (index: number, type: "main" | "others") => {
    setOpenSubmenu((prev) =>
      prev && prev.type === type && prev.index === index
        ? null
        : { type, index },
    );
  };

  const handleSubSubmenuToggle = (name: string) => {
    setOpenSubSubmenu((prev) => (prev === name ? null : name));
  };

  return (
    <aside
      className={` bg-[#0b1c3a] text-white fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 h-screen transition-all duration-300 ease-in-out z-[9999] border-r border-gray-200
        ${isExpanded || isMobileOpen || isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* LOGO */}
      <div className="py-8 flex justify-center">
        <Link to="/admin/dashboard">
          {webSetting ? (
            isExpanded || isHovered || isMobileOpen ? (
              <img
                src={webSetting.Logo}
                alt={webSetting.WebTitle}
                width={1000}
                height={60}
              />
            ) : (
              <img
                src={webSetting.Favicon}
                alt="Favicon"
                width={40}
                height={40}
              />
            )
          ) : (
            // Loader or fallback
            <div className="h-14 w-14 bg-gray-700 rounded animate-pulse"></div>
          )}
        </Link>
      </div>

      {/* MENU */}
      <div className="flex flex-col overflow-y-auto no-scrollbar">
        <nav className="mb-1">
          <div className="flex flex-col gap-4">
            {[
              { key: "main", items: navItems, title: "Website Setting" },
              { key: "others", items: othersItems, title: "Others" },
            ].map(({ key, items, title }) => (
              <div key={key}>
                <h2 className="mb-4 text-xs uppercase flex text-white">
                  {isExpanded || isHovered || isMobileOpen ? (
                    title
                  ) : (
                    <IoEllipsisHorizontalSharp />
                  )}
                </h2>

                <ul className="flex flex-col gap-4">
                  {items.map((nav, index) => {
                    const isOpen =
                      openSubmenu?.type === key && openSubmenu?.index === index;

                    return (
                      <li key={nav.name}>
                        {nav.subItems ? (
                          <>
                            <button
                              onClick={() =>
                                handleSubmenuToggle(index, key as any)
                              }
                              className={`menu-item group ${
                                isOpen ? "menu-item-active" : "menu-item"
                              }`}
                            >
                              <span className="menu-item-icon-size">
                                {nav.icon}
                              </span>
                              {(isExpanded || isHovered || isMobileOpen) && (
                                <>
                                  <span className="menu-item-text">
                                    {nav.name}
                                  </span>
                                  <FaAngleDown
                                    className={`ml-auto transition-transform ${
                                      isOpen ? "rotate-180" : ""
                                    }`}
                                  />
                                </>
                              )}
                            </button>

                            {isOpen && (
                              <ul className="mt-2 space-y-1 ml-9">
                                {nav.subItems.map((sub) => (
                                  <li key={sub.name}>
                                    {sub.subSubItems ? (
                                      <>
                                        <button
                                          onClick={() =>
                                            handleSubSubmenuToggle(sub.name)
                                          }
                                          className="menu-dropdown-item flex justify-between"
                                        >
                                          {sub.name}
                                          <FaAngleDown />
                                        </button>

                                        {openSubSubmenu === sub.name && (
                                          <ul className="ml-6 mt-2 space-y-1">
                                            {sub.subSubItems.map((s) => (
                                              <li key={s.name}>
                                                {/* <Link
                                                  to={s.path}
                                                  className="menu-dropdown-item"
                                                >
                                                  {s.name}
                                                </Link> */}

                                                <Link
                                                  to={s.path}
                                                  className={`menu-dropdown-item ${
                                                    isActive(s.path)
                                                      ? "submenu-active"
                                                      : ""
                                                  }`}
                                                >
                                                  {s.name}
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                      </>
                                    ) : (
                                      <Link
                                        to={sub.path!}
                                        className="menu-dropdown-item"
                                      >
                                        {sub.name}
                                      </Link>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </>
                        ) : (
                          <Link
                            to={nav.path!}
                            onClick={() =>
                              isMobileOpen && toggleMobileSidebar()
                            }
                            className={`menu-item group ${
                              isActive(nav.path)
                                ? "menu-item-active"
                                : "menu-item"
                            }`}
                          >
                            <span className="menu-item-icon-size">
                              {nav.icon}
                            </span>
                            {(isExpanded || isHovered || isMobileOpen) && (
                              <span className="menu-item-text">{nav.name}</span>
                            )}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        {(isExpanded || isHovered || isMobileOpen) && <SidebarWidget />}
      </div>
    </aside>
  );
};

export default AppSidebar;
