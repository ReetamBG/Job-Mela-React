import { useState } from "react";
import {
  useSearchParams,
  Link,
  // useNavigate,
  // useLocation,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCurrentUser, clearUser } from "@/store/slices/authSlice";
import type { User } from "@/types";
// import Cookies from "js-cookie";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Activity,
  // ArrowLeftCircle,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Settings,
  User as UserIcon,
  HeartHandshake,
  GraduationCap,
  Briefcase,
  CalendarCheck,
  Headphones,
  // MoreVertical,
  // ChevronDown,
  MoveHorizontal,
  LogIn,
  TextCursorInput,
  Home,
} from "lucide-react";

const Navbar = () => {
  // get JWT token from URL search params
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  let jwtToken = searchParams.get("token");
  if (!jwtToken) {
    jwtToken = sessionStorage.getItem("token") || "";
  }

  const [showMore, setShowMore] = useState<boolean>(false);

  // const navigate = useNavigate();
  // const location = useLocation();

  const handleLogout = () => {
    dispatch(clearUser());
    // Cookies.remove("token");
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  if (user?.type === "Mela Admin") {
    return null;
  }

  return (
    <section className="sticky top-0 z-[999]">
      {/*  Logo and title*/}
      <div className="w-full mx-auto px-4 lg:px-30 relative bg-white/30 backdrop-blur-md shadow-md">
        <div className="flex gap-8 items-center justify-between py-4">
          <Link
            to="/"
            className="flex items-center divide-x divide-emerald-200"
          >
            <img
              alt="Logo"
              className="h-10 xl:h-14 object-contain object-center pr-4"
              src="https://skillmission.assam.gov.in/images/emblem-logo.png"
            />
            <img
              alt="Logo"
              className="h-10 xl:h-14 object-contain object-center px-4"
              src="/images/logo.png"
            />
            <div className="flex flex-col ml-5">
              <p className="text-sm leading-8 lg:text-3xl text-gray-700 font-semibold">
                Digital Skill Center
              </p>
              <p className="text-xs lg:text-sm font-medium text-gray-700/80">
                Assam Skill Developement Mission
              </p>
              <p className="text-xs leading-2 lg:text-sm font-medium text-gray-700/80">
                Government of Assam
              </p>
            </div>
          </Link>

          <MobileNav
            user={user}
            jwtToken={jwtToken}
            handleLogout={handleLogout}
          />
          <DesktopUserSection
            user={user}
            handleLogout={handleLogout}
            jwtToken={jwtToken}
          />
        </div>
        <DesktopNavLinks jwtToken={jwtToken} setShowMore={setShowMore} />
      </div>

      {/* More section */}
      <div
        className={`absolute w-[85%] left-1/2 -translate-x-1/2 top-35 rounded-xl bg-white/30 backdrop-blur-md shadow-md z-[9998] transition-all ${
          showMore ? "block" : "hidden"
        }`}
      >
        <div className="w-full px-15 py-10 flex flex-col md:flex-row justify-between gap-8 relative">
          {/* Left Menu */}
          <div className="flex flex-col gap-10 text-gray-700 md:w-1/2">
            <a
              href="https://ds1.skillmissionassam.org/centerSearch/#/centerLocation/14"
              className="flex gap-4 items-start"
            >
              <MapPin className="mt-1" />
              <div>
                <p className="text-lg font-semibold">Skill Centers</p>
                <p className="text-sm">Find nearby training centers</p>
              </div>
            </a>

            <a
              href="https://convergence_v1.skillmissionassam.org/"
              className="flex gap-4 items-start"
            >
              <MoveHorizontal className="mt-1" />
              <div>
                <p className="text-lg font-semibold">Convergence</p>
                <p className="text-sm">Integrated schemes & partnerships</p>
              </div>
            </a>
          </div>

          <div className="flex flex-col md:w-1/2 bg-white/30 p-6 rounded-md shadow-md max-w-xl">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">
              Empowering Careers Through Skills
            </h2>
            <p className="text-sm md:text-sm text-gray-700 mb-4">
              Access training programs and scheme partnerships under one
              platform to build your future.
            </p>
            {/* Image Placeholder */}
            <div className="h-50 overflow-hidden" />
            <img
              src="/images/asset.png"
              alt="girl working on laptop"
              className="object-contain absolute size-90 right-0 -bottom-12"
            />
          </div>
        </div>
      </div>

      {/* Back button */}
      {/* {location.pathname !== "/" && (
          <button onClick={() => navigate(-1)} className="hidden sm:block relative left-4 top-4 cursor-pointer text-foreground/50">
            <ArrowLeftCircle size={30} />
          </button>
      )} */}
    </section>
  );
};

export default Navbar;

function DesktopUserSection({
  user,
  handleLogout,
  jwtToken,
}: {
  user: User | null;
  handleLogout: () => void;
  jwtToken?: string;
}) {
  return (
    <div className="hidden lg:block relative">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span className="cursor-pointer size-10 text-3xl text-emerald-900 font-medium rounded-full bg-emerald-200 ring-2 ring-white grid place-content-center">
              {user.type === "candidate" && user.data.firstName.slice(0, 1)}
              {user.type === "Employer" && user.data[0].userName.slice(0, 1)}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-[9999] absolute top-2 -right-5 rounded-sm w-60 px-5">
            {/* Profile icon and name */}
            <DropdownMenuItem className="text-lg text-gray-700">
              <button className="mx-2 cursor-pointer size-10 text-3xl text-emerald-900 font-medium rounded-full bg-emerald-200 ring-2 ring-white grid place-content-center">
                {user.type === "candidate" &&
                  user.data.firstName.slice(0, 1).toUpperCase()}
                {user.type === "Employer" &&
                  user.data[0].userName.slice(0, 1).toUpperCase()}
              </button>
              {user.type === "candidate" &&
                user.data.firstName + " " + user.data.lastName}
              {user.type === "Employer" && user.data[0].companyName}
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            {/* DropDown Items */}
            <div className="space-y-2">
              {[
                {
                  name: "My Dashboard",
                  icon: <LayoutDashboard size={15} />,
                  link:
                    user.type === "Employer"
                      ? window.location.origin + "/company/company-dashboard"
                      : `https://public-registration.skillmissionassam.org/dashboard/${
                          jwtToken ? `?token=${jwtToken}` : ""
                        }`,
                },
                {
                  name: "My Profile",
                  icon: <UserIcon size={15} />,
                  link: `https://public-registration.skillmissionassam.org/profile/${
                    jwtToken ? `?token=${jwtToken}` : ""
                  }`,
                },
                {
                  name: "My Activities",
                  icon: <Activity size={15} />,
                  link: "#",
                },
                {
                  name: "Settings",
                  icon: <Settings size={15} />,
                  link: "#",
                },
              ].map((item) => (
                <DropdownMenuItem
                  key={item.name}
                  className="text-base text-gray-700"
                >
                  <a href={item.link} className="flex gap-2 items-center">
                    {item.icon}
                    {item.name}
                  </a>
                </DropdownMenuItem>
              ))}

              <DropdownMenuItem
                className="text-base text-gray-700 flex gap-2 items-center"
                onClick={handleLogout}
              >
                <LogOut />
                Logout
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="xl:flex flex-row gap-2 hidden">
          <a
            href={`https://public-registration.skillmissionassam.org/register?redirect=${window.location.href}`}
            className="text-sm font-medium flex items-center gap-2 text-gray-700 hover:underline py-4 xl:bg-emerald-400 xl:hover:bg-emerald-400/80 xl:rounded-full xl:border-gray-300 px-8 xl:px-4 xl:py-2.5 xl:no-underline xl:hover:no-underline"
          >
            <TextCursorInput size={15} />
            <span>Register</span>
          </a>
          <a
            href={`https://public-registration.skillmissionassam.org/login?redirect=${window.location.href}`}
            className="text-sm font-medium flex items-center gap-2 text-gray-700 hover:underline py-4 xl:bg-black xl:hover:bg-black/80 xl:text-white xl:rounded-full xl:border-gray-300 px-8 xl:px-4 xl:py-2.5 xl:no-underline xl:hover:no-underline"
          >
            <LogIn size={15} />
            <span>Login</span>
          </a>
        </div>
      )}
    </div>
  );
}

function DesktopNavLinks({
  jwtToken,
  // setShowMore,
}: {
  jwtToken: string;
  setShowMore: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const links = [
    {
      name: "Schemes / Programs",
      icon: <Home size={15} />,
      url: `https://skillcourse.skillmissionassam.org/${
        jwtToken ? `?token=${jwtToken}` : ""
      }`,
    },
    {
      name: "Recommendations",
      icon: <HeartHandshake size={15} />,
      url: "#",
    },
    {
      name: "Skill Courses",
      icon: <GraduationCap size={15} />,
      url: `https://skillcourse.skillmissionassam.org/${
        jwtToken ? `?token=${jwtToken}` : ""
      }`,
    },
    {
      name: "Job Search",
      icon: <Briefcase size={15} />,
      url: `https://jobboard.skillmissionassam.org/${
        jwtToken ? `?token=${jwtToken}` : ""
      }`,
    },
    {
      name: "Job Melas",
      icon: <CalendarCheck size={15} />,
      url: "/",
      type: "internalLink",
    },
    {
      name: "Support",
      icon: <Headphones size={15} />,
      url: "#",
    },
  ];

  return (
    <div className="hidden lg:block border-t border-emerald-400 mt-1 py-2">
      <nav className="flex flex-row gap-8">
        {links.map((link) =>
          link.type === "internalLink" ? (
            <Link
              key={link.name}
              to={link.url}
              className="text-sm text-gray-700 flex items-center gap-2 hover:underline"
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ) : (
            <a
              key={link.name}
              href={link.url}
              className="text-sm text-gray-700 flex items-center gap-2 hover:underline"
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          ),
        )}
        {/* <button
          onClick={() => setShowMore((prev) => !prev)}
          className="text-sm text-gray-700 flex items-center gap-2 hover:underline cursor-pointer"
        >
          <MoreVertical size={15} />
          <span>More</span>
          <ChevronDown size={15} />
        </button> */}
      </nav>
    </div>
  );
}

function MobileNav({
  user,
  jwtToken,
  handleLogout,
}: {
  user: User | null;
  jwtToken: string;
  handleLogout: () => void;
}) {
  // const [showMore, setShowMore] = useState<boolean>(false);
  const [showMore] = useState<boolean>(false);
  const links = [
    {
      name: "Schemes / Programs",
      icon: <Home size={20} />,
      url: `https://skillcourse.skillmissionassam.org/${
        jwtToken ? `?token=${jwtToken}` : ""
      }`,
    },
    {
      name: "Recommendations",
      icon: <HeartHandshake size={20} />,
      url: "#",
    },
    {
      name: "Skill Courses",
      icon: <GraduationCap size={20} />,
      url: `https://skillcourse.skillmissionassam.org/${
        jwtToken ? `?token=${jwtToken}` : ""
      }`,
    },
    {
      name: "Job Search",
      icon: <Briefcase size={20} />,
      url: `https://jobboard.skillmissionassam.org/${
        jwtToken ? `?token=${jwtToken}` : ""
      }`,
    },
    {
      name: "Job Melas",
      icon: <CalendarCheck size={20} />,
      url: "#",
    },
    {
      name: "Support",
      icon: <Headphones size={20} />,
      url: "#",
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="font-medium rounded-full border-gray-300 size-6 flex items-center justify-center lg:hidden"
        >
          <Menu size={18} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-64 sm:w-100 p-4">
        <nav className="flex flex-col gap-10 mt-25">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              className="text-base font-medium text-gray-700 flex items-center gap-2"
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          ))}

          {/* More section */}
          {/* <button
            className="text-base flex items-center font-medium text-gray-700  gap-2 cursor-pointer"
            onClick={() => setShowMore((prev) => !prev)}
          >
            <MoreVertical size={20} /> More
          </button> */}
          <div
            className={`flex flex-col gap-8 text-gray-700 text-base font-medium relative left-5 ${
              showMore ? "block" : "hidden"
            }`}
          >
            <a href="#" className="flex gap-4 items-center">
              <MapPin size={20} />
              <p className="">Skill Centers</p>
            </a>
            <a href="#" className="flex gap-4 items-center">
              <MoveHorizontal size={20} />
              <p className="text-base font-medium">Convergence</p>
            </a>
          </div>

          {/* Profile, Dashboard and Logout */}
          {user ? (
            <>
              <a
                href={`https://public-registration.skillmissionassam.org/dashboard/${
                  jwtToken ? `?token=${jwtToken}` : ""
                }`}
                className="text-base font-medium text-gray-700 flex gap-2 items-center"
              >
                <LayoutDashboard size={15} />
                My Dashboard
              </a>
              <a
                href={`https://public-registration.skillmissionassam.org/profile/${
                  jwtToken ? `?token=${jwtToken}` : ""
                }`}
                className="text-base font-medium text-gray-700 flex items-center gap-2"
              >
                <UserIcon size={15} />
                My Profile
              </a>
              <Button
                onClick={handleLogout}
                className="text-base font-medium text-white flex items-center gap-2"
              >
                <LogOut size={15} /> Logout
              </Button>
            </>
          ) : (
            <>
              <a
                href={`https://public-registration.skillmissionassam.org/register?redirect=${window.location.href}`}
                className="text-base font-medium text-gray-700 flex items-center gap-2"
              >
                <TextCursorInput size={15} /> Register
              </a>
              <a
                href={`https://public-registration.skillmissionassam.org/login?redirect=${window.location.href}`}
                className="text-base font-medium text-gray-700 flex items-center gap-2"
              >
                <LogIn size={15} /> Login
              </a>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
