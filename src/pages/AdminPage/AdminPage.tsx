import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CandidatesTab from "@/pages/AdminPage/components/CandidatesTab";
import JobsTab from "./components/JobsTab";
import CompaniesTab from "./components/CompaniesTab";
import {
  BriefcaseBusiness,
  Building,
  ChevronDown,
  LogOut,
  LogOutIcon,
  LucideMenu,
  Settings,
  User,
} from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearUser, selectCurrentUser } from "@/store/slices/authSlice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";

const AdminPage = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(clearUser());
    Cookies.remove("token");
    window.location.href = "/";
  };

  const sideBarTabs = [
    {
      value: "candidates",
      label: "Candidates",
      icon: <User />,
    },
    {
      value: "jobs",
      label: "Jobs",
      icon: <BriefcaseBusiness />,
    },
    {
      value: "companies",
      label: "Companies",
      icon: <Building />,
    },
    {
      value: "settings",
      label: "Settings",
      icon: <Settings />,
      isDropdown: true,
      children: [
        {
          label: "Profile Settings",
          value: "profile-settings",
          icon: <User />,
        },
        {
          label: "Account",
          value: "account",
          icon: <Settings />,
        },
      ],
    },
    {
      value: "logout",
      label: "Logout",
      icon: <LogOut />,
      onClick: () => {
        handleLogout();
      },
    },
  ];

  const [selectedTab, setSelectedTab] = useState("candidates");
  const [expandSidebar, setExpandSidebar] = useState(true);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  return (
    <section className="w-full min-h-screen overflow-x-hidden">
      <Tabs
        defaultValue="candidates"
        className="w-full h-full"
        onValueChange={(value) => setSelectedTab(value)}
      >
        <div className="flex  flex-col md:flex-row h-full">
          <TabsList
            className={`md:flex flex-col justify-start p-0 ps-5 min-h-screen bg-emerald-600 items-start rounded-none transition-all duration-300 ease-in-out overflow-hidden ${
              expandSidebar
                ? "md:min-w-[300px] md:w-[300px]"
                : "md:min-w-[80px] md:w-[80px]"
            }`}
          >
            <div
              className="border-b mb-4 flex items-center justify-between gap-2 w-full px-4 cursor-pointer my-2"
              onClick={() => setExpandSidebar(!expandSidebar)}
            >
              <img src="/images/logo.png" className="min-w-10 w-10" />
              <div
                className={`pb-4 w-full flex items-center gap-2 text-white text-lg transition-all duration-300 ${
                  expandSidebar
                    ? "opacity-100 w-auto "
                    : "opacity-0 w-0 overflow-hidden"
                }`}
              >
                <div>
                  <p className="font-semibold text-white whitespace-nowrap">
                    Digital Skill Center
                  </p>
                  <p className="font-medium text-white/80 text-sm whitespace-nowrap">
                    Mela Dashboard
                  </p>
                </div>
              </div>
            </div>
            {sideBarTabs.map((tab, idx) => (
              <div key={idx} className="w-full">
                <TabsTrigger
                  onClick={() => {
                    if (tab.isDropdown) {
                      setShowSettingsDropdown((prev) => !prev);
                    } else if (tab.onClick) {
                      tab.onClick();
                    } else {
                      setSelectedTab(tab.value);
                      setShowSettingsDropdown(false);
                    }
                  }}
                  value={tab.value}
                  className="justify-center cursor-pointer max-h-16 rounded-l-full md:justify-start flex items-center gap-3 w-full py-2 md:py-5 text-base sm:text-lg font-medium"
                >
                  <div
                    className={`rounded-full p-1 md:p-3 ${
                      selectedTab === tab.value
                        ? "bg-emerald-200"
                        : "bg-emerald-600 text-white"
                    }`}
                  >
                    {tab.icon}
                  </div>
                  <span
                    className={`whitespace-nowrap hidden md:block transition-all duration-300
                    } ${
                      selectedTab === tab.value
                        ? "text-emerald-600"
                        : "text-white"
                    }`}
                  >
                    {tab.label}
                  </span>
                  {tab.isDropdown && (
                    <ChevronDown
                      size={16}
                      className={`ml-auto text-white transition-transform duration-300 ${
                        showSettingsDropdown ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </TabsTrigger>

                {/* Dropdown Items */}
                {tab.isDropdown && showSettingsDropdown && (
                  <div className="flex flex-col w-full ml-4">
                    {tab.children.map((child, childIdx) => (
                      <button
                        key={childIdx}
                        onClick={() => console.log(`${child.value} clicked`)}
                        className="text-white flex items-center gap-3 py-2 w-full hover:bg-emerald-700 rounded-lg transition-all duration-300 px-4"
                      >
                        <span className="p-2 bg-emerald-500 rounded-full">
                          {child.icon}
                        </span>
                        <span
                          className={`transition-all duration-300 ${
                            expandSidebar ? "opacity-100" : "opacity-0 w-0"
                          }`}
                        >
                          {child.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </TabsList>

          <div className="w-full bg-white">
            {/* Navbar  */}
            <AdminNavbar setExpandSidebar={setExpandSidebar} handleLogout={handleLogout}/>

            <div className="px-10">
              <hr className="mb-2" />
              <TabsContent value="candidates">
                <CandidatesTab />
              </TabsContent>
              <TabsContent value="jobs">
                <JobsTab />
              </TabsContent>
              <TabsContent value="companies">
                <CompaniesTab />
              </TabsContent>
            </div>
          </div>
        </div>
      </Tabs>
    </section>
  );
};

export default AdminPage;

const AdminNavbar = ({
  setExpandSidebar,
  handleLogout,
}: {
  setExpandSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
}) => {
  const user = useAppSelector(selectCurrentUser);
  return (
    <div className="flex items-center justify-between p-4 bg-white text-black/50 shadow-md px-10">
      <LucideMenu
        className="cursor-pointer border-2 border-black/50 rounded-md"
        onClick={() => setExpandSidebar((prev) => !prev)}
      />

      <Popover>
        <PopoverTrigger>
          <span className="cursor-pointer size-10 text-3xl text-emerald-900 font-medium rounded-full bg-emerald-200 ring-2 ring-white grid place-content-center">
            {user &&
              user.type === "Mela Admin" &&
              user.login_name.slice(0, 1).toUpperCase()}
          </span>
        </PopoverTrigger>
        <PopoverContent className="relative right-8 top-2 w-40 py-2">
          <Button
            onClick={handleLogout}
            className="w-full text-lg font-semibold"
            variant="ghost"
          >
            <LogOutIcon />
            Logout
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};
