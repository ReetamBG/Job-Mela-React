import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    LayoutDashboard,
    Mail,
    Settings,
    ChevronRight,
    Minus
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "@/store/slices/sidebarSlice";
import { type RootState } from "@/store/index";



const navigation = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/company/company-dashboard" },
    { name: "Job Melas", icon: Mail, href: "/all-melas" },
];

const settingsSubmenu = [
    { name: "System", href: "#" },
    { name: "Preferences", href: "#" },
];

const cn = (...classes: (string | undefined | false | null)[]) => classes.filter(Boolean).join(' ');

export default function Sidebar() {
    const dispatch = useDispatch();
    const navOpen = useSelector((state: RootState) => state.sidebar.isOpen);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [activeItem, setActiveItem] = useState<string>('Dashboard');
    const overlayRef = useRef(null);

    // Close on Escape key
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && navOpen) {
                dispatch(toggleSidebar());
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [navOpen, dispatch]);

    useEffect(() => {
        const isLarge = window.innerWidth >= 1024;
        document.body.style.overflow = (navOpen && !isLarge) ? 'hidden' : 'unset';
    }, [navOpen]);

    const sidebarClasses = cn(
        "top-0 left-0 z-50 h-screen transition-all duration-300 ease-in-out overflow-hidden flex flex-col",
        "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900",
        "border-r border-slate-700/50 backdrop-blur-xl",
        navOpen
            ? "w-62 shadow-2xl shadow-black/20"
            : "-left-full lg:left-0 lg:w-20 lg:shadow-lg"
    );

    const handleDropdownToggle = (id: string) => {
        setActiveDropdown(prev => prev === id ? null : id);
    };

    const handleNavClick = (name: string) => {
        setActiveItem(name);
        if (window.innerWidth < 1024) dispatch(toggleSidebar());
    };

    return (
        <>
            <style>{`
                :root {
                    --primary: 34 197 94;
                }
                .nav-item-active {
                    background: linear-gradient(135deg, rgb(var(--primary) / 0.15), rgb(var(--primary) / 0.05));
                    border-right: 3px solid rgb(var(--primary));
                    color: rgb(var(--primary));
                }
                .nav-item-active::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 4px;
                    background: linear-gradient(to bottom, rgb(var(--primary)), rgb(var(--primary) / 0.6));
                    border-radius: 0 4px 4px 0;
                }
                .nav-item:hover {
                    background: linear-gradient(135deg, rgb(var(--primary) / 0.08), transparent);
                    transform: translateX(4px);
                }
                .logo-glow {
                    filter: drop-shadow(0 0 8px rgb(var(--primary) / 0.3));
                }
                .text-glow {
                    text-shadow: 0 0 20px rgb(var(--primary) / 0.3);
                }
                .scrollbar-thin::-webkit-scrollbar {
                    width: 4px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: rgb(var(--primary) / 0.1);
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background: rgb(var(--primary) / 0.3);
                    border-radius: 2px;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb:hover {
                    background: rgb(var(--primary) / 0.5);
                }
            `}</style>

            {navOpen && (
                <div
                    ref={overlayRef}
                    className=""
                    onClick={() => dispatch(toggleSidebar())}
                />
            )}

            <nav className={sidebarClasses} aria-label="Main navigation">
                {/* Header with improved styling */}
                <div className={` ${navOpen ? 'px-6 py-6' : 'px-4 py-1'} flex items-center border-b border-slate-700/30`}>
                    <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-gradient to-primary flex items-center justify-center logo-glow">
                            <span className="text-white font-bold text-lg">eP</span>
                        </div>
                    </div>
                    <div className={cn(
                        "text-white transition-all duration-300 overflow-hidden",
                        navOpen ? 'ml-4 opacity-100' : 'w-0 opacity-0 lg:ml-4 lg:opacity-100'
                    )}>
                        <p className="text-md font-bold text-glow">ePatrika</p>
                        <p className="text-xs text-slate-300 font-medium tracking-wide">
                            Desk to Destination Instantly
                        </p>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="py-6 flex-grow overflow-y-auto scrollbar-thin">
                    <div className="px-6">
                        {/* Section Header */}
                        <div className="mb-4">
                            <span className={cn(
                                "text-xs font-bold text-slate-400 uppercase tracking-widest",
                                navOpen ? 'block' : 'hidden lg:block lg:text-center'
                            )}>
                                Main
                            </span>
                        </div>

                        {/* Main Navigation */}
                        <ul className="space-y-2">
                            {navigation.map(item => (
                                <li key={item.name}>
                                    <Link
                                        to={item.href}
                                        onClick={() => {
                                            handleNavClick(item.name);
                                        }}
                                        className={cn(
                                            "nav-item group flex items-center rounded-xl transition-all duration-200 relative",
                                            navOpen ? "px-4 py-2" : null,
                                            "hover:shadow-lg hover:shadow-primary/10 text-sm",
                                            navOpen &&
                                                activeItem === item.name
                                                ? "nav-item-active"
                                                : "text-slate-300 hover:text-white"
                                        )}
                                    >
                                        <div className="flex items-center w-full gap-2">

                                            <item.icon className={cn(
                                                "transition-all duration-200",
                                                navOpen ? 'h-5 w-5' : 'h-10 w-10',
                                                activeItem === item.name
                                                    ? "text-primary"
                                                    : "text-slate-400 group-hover:text-primary"
                                            )} />
                                            <span className={cn(
                                                "whitespace-nowrap font-medium transition-all duration-200",
                                                navOpen ? 'opacity-100' : 'lg:w-0 lg:opacity-0 lg:overflow-hidden'
                                            )}>
                                                {item.name}
                                            </span>
                                        </div>
                                        {activeItem === item.name && (
                                            <div className="absolute right-3">
                                                <div className={`${navOpen ? 'h-2 w-2' : null} rounded-full bg-primary animate-pulse`}></div>
                                            </div>
                                        )}
                                    </Link>
                                </li>
                            ))}

                            {/* Settings Dropdown */}
                            <li className="mt-6">
                                <div
                                    onClick={() => handleDropdownToggle('settings')}
                                    className="nav-item group flex items-center cursor-pointer text-slate-300 hover:text-white rounded-xl justify-between transition-all duration-200 hover:bg-slate-800/50 text-xs"
                                >

                                    <div className={`flex items-center ${navOpen ? 'px-4' : null}`}>

                                        <Settings className={`${navOpen ? 'h-5 w-5' : 'h-6 w-6'} text-slate-400 group-hover:text-primary transition-colors duration-200`} />
                                        <span className={cn(
                                            "ml-4 whitespace-nowrap font-medium transition-all duration-200",
                                            navOpen ? 'opacity-100' : 'lg:w-0 lg:opacity-0 lg:overflow-hidden'
                                        )}>
                                            Settings
                                        </span>
                                    </div>
                                    <ChevronRight className={cn(
                                        "h-4 w-4 transition-all duration-300 text-slate-400 group-hover:text-primary",
                                        activeDropdown === 'settings' ? 'rotate-90 text-primary' : ''
                                    )} />
                                </div>

                                {/* Submenu */}
                                <div className={cn(
                                    "overflow-hidden transition-all duration-300 ease-in-out",
                                    activeDropdown === 'settings' ? 'max-h-32 opacity-100 mt-2' : 'max-h-0 opacity-0'
                                )}>
                                    <ul className="space-y-2 ml-6 pl-4 border-l border-slate-700/50">
                                        {settingsSubmenu.map(sub => (
                                            <li key={sub.name}>
                                                <Link
                                                    to={sub.href}
                                                    onClick={() => { handleNavClick(sub.name); }}
                                                    className="nav-item group flex items-center py-2 px-3 text-sm text-slate-400 hover:text-white rounded-lg transition-all duration-200 hover:bg-slate-800/30"
                                                >
                                                    <Minus className="h-3 w-3 mr-3 opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all" />
                                                    <span className="whitespace-nowrap">{sub.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-700/30">
                    <div className={cn(
                        "flex items-center transition-all duration-300",
                        navOpen ? 'justify-between' : 'justify-center'
                    )}>
                        <div className={cn(
                            "text-xs text-slate-500 transition-all duration-300",
                            navOpen ? 'opacity-100' : 'opacity-0 lg:opacity-100'
                        )}>
                            v2.1.0
                        </div>
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    </div>
                </div>
            </nav>
        </>
    );
}