import { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut, Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/store/slices/sidebarSlice";
import { useAppSelector } from "@/store/hooks";
import { clearUser, selectCurrentUser } from "@/store/slices/authSlice";

export default function Header() {
  const user = useAppSelector(selectCurrentUser);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  // const [notifications] = useState(5);
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(clearUser());
    // Cookies.remove("token");
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  if (user?.type !== "Employer") return null;

  return (
    <>
      <style>{`
                :root {
                    --primary: 34 197 94;
                    --primary-dark: 21 128 61;
                    --primary-light: 74 222 128;
                }
                
                .header-container {
                    background: linear-gradient(135deg, 
                        rgba(15, 23, 42, 0.95) 0%, 
                        rgba(30, 41, 59, 0.9) 50%, 
                        rgba(15, 23, 42, 0.95) 100%);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(148, 163, 184, 0.1);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }
                
                .toggle-button {
                    background: linear-gradient(135deg, 
                        rgba(var(--primary), 0.1) 0%, 
                        rgba(var(--primary), 0.05) 100%);
                    border: 1px solid rgba(var(--primary), 0.3);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }
                
                .toggle-button::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, 
                        transparent, 
                        rgba(var(--primary), 0.2), 
                        transparent);
                    transition: left 0.5s;
                }
                
                .toggle-button:hover::before {
                    left: 100%;
                }
                
                .toggle-button:hover {
                    border-color: rgba(var(--primary), 0.6);
                    box-shadow: 
                        0 4px 15px rgba(var(--primary), 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1);
                    transform: scale(1.05);
                }
                
                .toggle-button:active {
                    transform: scale(0.95);
                }
                
                .logo-container {
                    filter: drop-shadow(0 0 8px rgba(var(--primary), 0.3));
                    transition: all 0.3s ease;
                }
                
                .logo-container:hover {
                    filter: drop-shadow(0 0 12px rgba(var(--primary), 0.5));
                    transform: scale(1.05);
                }
                
                .search-container {
                    position: relative;
                    transition: all 0.3s ease;
                }
                
                .search-input {
                    background: linear-gradient(135deg, 
                        rgba(15, 23, 42, 0.8) 0%, 
                        rgba(30, 41, 59, 0.6) 100%);
                    border: 1px solid rgba(148, 163, 184, 0.2);
                    color: #f1f5f9;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    backdrop-filter: blur(10px);
                }
                
                .search-input::placeholder {
                    color: #94a3b8;
                }
                
                .search-input:focus {
                    border-color: rgba(var(--primary), 0.5);
                    box-shadow: 
                        0 0 0 3px rgba(var(--primary), 0.1),
                        0 4px 20px rgba(var(--primary), 0.15);
                    background: linear-gradient(135deg, 
                        rgba(15, 23, 42, 0.9) 0%, 
                        rgba(30, 41, 59, 0.8) 100%);
                }
                
                .search-focused .search-icon {
                    color: rgb(var(--primary));
                    filter: drop-shadow(0 0 4px rgba(var(--primary), 0.5));
                }
                
                .notification-button {
                    background: linear-gradient(135deg, 
                        rgba(15, 23, 42, 0.8) 0%, 
                        rgba(30, 41, 59, 0.6) 100%);
                    border: 1px solid rgba(148, 163, 184, 0.2);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }
                
                .notification-button:hover {
                    border-color: rgba(var(--primary), 0.4);
                    box-shadow: 
                        0 4px 15px rgba(var(--primary), 0.15),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1);
                    transform: translateY(-2px);
                }
                
                .notification-badge {
                    background: linear-gradient(135deg, #ef4444, #dc2626);
                    animation: pulse-notification 2s ease-in-out infinite;
                    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
                }
                
                @keyframes pulse-notification {
                    0%, 100% { 
                        transform: scale(1);
                        box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
                    }
                    50% { 
                        transform: scale(1.1);
                        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.6);
                    }
                }
                
                .profile-button {
                    transition: all 0.3s ease;
                    position: relative;
                }
                
                .profile-button::before {
                    content: '';
                    position: absolute;
                    inset: -2px;
                    border-radius: 50%;
                    background: linear-gradient(45deg, 
                        rgb(var(--primary)), 
                        rgb(var(--primary-light)), 
                        rgb(var(--primary)));
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    z-index: -1;
                }
                
                .profile-button:hover {
                    transform: scale(1.05);
                }
                
                .dropdown-menu {
                    background: linear-gradient(135deg, 
                        rgba(15, 23, 42, 0.98) 0%, 
                        rgba(30, 41, 59, 0.95) 50%, 
                        rgba(15, 23, 42, 0.98) 100%);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(148, 163, 184, 0.2);
                    box-shadow: 
                        0 20px 40px rgba(0, 0, 0, 0.3),
                        0 0 0 1px rgba(var(--primary), 0.1),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1);
                    animation: dropdown-appear 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    transform-origin: top right;
                }
                
                @keyframes dropdown-appear {
                    0% {
                        opacity: 0;
                        transform: scale(0.95) translateY(-10px);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                
                .dropdown-header {
                    border-bottom: 1px solid rgba(148, 163, 184, 0.1);
                    background: linear-gradient(135deg, 
                        rgba(var(--primary), 0.05) 0%, 
                        rgba(var(--primary), 0.02) 100%);
                }
                
                .dropdown-item {
                    color: #f1f5f9;
                    transition: all 0.2s ease;
                    position: relative;
                    overflow: hidden;
                }
                
                .dropdown-item::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 0;
                    background: linear-gradient(90deg, 
                        rgba(var(--primary), 0.1), 
                        rgba(var(--primary), 0.05));
                    transition: width 0.3s ease;
                }
                
                .dropdown-item:hover::before {
                    width: 100%;
                }
                
                .dropdown-item:hover {
                    color: rgb(var(--primary-light));
                    background: rgba(var(--primary), 0.08);
                    transform: translateX(4px);
                }
                
                .dropdown-item svg {
                    transition: all 0.2s ease;
                }
                
                .dropdown-item:hover svg {
                    color: rgb(var(--primary));
                    transform: scale(1.1);
                }
                
                .logout-item {
                    border-top: 1px solid rgba(148, 163, 184, 0.1);
                }
                
                .logout-item:hover {
                    color: #fca5a5;
                    background: rgba(239, 68, 68, 0.08);
                }
                
                .logout-item:hover svg {
                    color: #ef4444;
                }
            `}</style>

      <header className="header-container sticky top-0 z-40">
        <div className="flex items-center gap-2 lg:gap-8 justify-between max-w-7xl mx-auto w-full py-4 px-6">
          {/* Left section: Toggle + Logo + Search */}
          <div className="flex items-center gap-2 lg:gap-8 flex-grow">
            <button
              onClick={onToggleSidebar}
              className="toggle-button size-10 rounded-xl p-2 flex items-center justify-center"
              title="Toggle Sidebar"
            >
              <Menu className="text-primary h-5 w-5 transition-transform duration-200 scale-110" />
            </button>

            <div className="logo-container lg:hidden">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-gradient to-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">eP</span>
              </div>
            </div>

            {/* Enhanced Search */}
            <div
              className={`search-container relative hidden sm:block ${searchFocused ? "search-focused" : ""}`}
            >
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 z-10">
                <Search className="search-icon text-slate-400 h-4 w-4 transition-all duration-300" />
              </div>
              <input
                type="search"
                placeholder="Search..."
                className="search-input block w-full max-w-md pl-12 pr-4 py-3 text-sm rounded-xl focus:outline-none"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>

          {/* Right section: Notification + Avatar */}
          <div className="flex items-center gap-4">
            {/* Enhanced Notification */}
            {/* <button */}
            {/*     title="Notifications" */}
            {/*     className="notification-button relative h-10 w-10 flex items-center justify-center rounded-xl" */}
            {/* > */}
            {/*     <Bell className="text-slate-300 h-4 w-4 transition-colors duration-200 hover:text-primary" /> */}
            {/*     {notifications > 0 && ( */}
            {/*         <span className="notification-badge absolute top-1 right-1 rounded-full text-xs text-white h-3 w-3 flex items-center justify-center "> */}
            {/*             {notifications > 9 ? '9+' : notifications} */}
            {/*         </span> */}
            {/*     )} */}
            {/* </button> */}

            {/* Enhanced Profile */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="profile-button flex items-center gap-3 focus:outline-none rounded-xl"
                title="User Menu"
              >
                <div className="relative">
                  <span className="cursor-pointer size-10 text-3xl text-emerald-900 font-medium rounded-full bg-emerald-200 ring-2 ring-white grid place-content-center">
                    {user?.data[0].userName.slice(0, 1)}
                  </span>
                  {/* <img
                                        src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1600"
                                        alt="profile"
                                        width={36}
                                        height={36}
                                        className="rounded-xl object-cover object-center h-9 w-9 border-2 border-slate-600"
                                        onError={(e) => {
                                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjM2IiBoZWlnaHQ9IjM2IiByeD0iOCIgZmlsbD0iIzE2YTM0YSIvPgo8cGF0aCBkPSJNMTggMTFDMTkuNjU2OSAxMSAyMSAxMi4zNDMxIDIxIDE0QzIxIDE1LjY1NjkgMTkuNjU2OSAxNyAxOCAxN0MxNi4zNDMxIDE3IDE1IDE1LjY1NjkgMTUgMTRDMTUgMTIuMzQzMSAxNi4zNDMxIDExIDE4IDExWk0yNCAyMlYyNEgxMlYyMkMxMiAxOS4yIDIwLjU3IDE3IDE4IDE3QzE1LjQzIDE3IDEyIDE5LjIgMTIgMjJaIiBmaWxsPSIjZmZmZmZmIi8+Cjwvc3ZnPgo=';
                                        }}
                                    /> */}
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-semibold text-white">
                    {user.data[0].userName}
                  </div>
                  <div className="text-xs text-slate-400">Administrator</div>
                </div>
              </button>

              {/* Enhanced Dropdown */}
              {isDropdownOpen && (
                <div className="dropdown-menu absolute right-0 mt-3 w-64 rounded-2xl z-50">
                  <div className="dropdown-header px-4 py-4 flex items-center gap-3">
                    <span className="cursor-pointer size-10 text-3xl text-emerald-900 font-medium rounded-full bg-emerald-200 ring-2 ring-white grid place-content-center">
                      {user.data[0].userName.slice(0, 1)}
                    </span>
                    {/* <img
                                            src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1600"
                                            alt="profile"
                                            width={40}
                                            height={40}
                                            className="rounded-xl h-10 w-10 object-cover border-2 border-slate-600"
                                        /> */}
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-white">
                        {user.data[0].userName}
                      </div>
                      <div className="text-xs text-slate-400">
                        {user.data[0].companyEmail}
                      </div>
                      <div className="text-xs text-slate-400 font-medium mt-1">
                        Administrator
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="dropdown-item flex items-center gap-3 px-4 py-3 relative"
                    >
                      <User className="h-4 w-4" />
                      <span className="font-medium">My Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="dropdown-item flex items-center gap-3 px-4 py-3 relative"
                    >
                      <Settings className="h-4 w-4" />
                      <span className="font-medium">Settings</span>
                    </Link>
                  </div>

                  <div className="py-2">
                    <button
                      onClick={handleLogout}
                      className="dropdown-item logout-item flex items-center gap-3 px-4 py-3 relative"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="font-medium">Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

