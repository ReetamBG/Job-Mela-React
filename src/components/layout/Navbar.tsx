import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCurrentUser,
  setUser,
  clearUser,
} from "@/store/slices/authSlice";
import { decodeJwt } from "@/lib/jwt";
import type { User } from "@/types";
import Cookies from "js-cookie";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, LogOut, User as UserIcon } from "lucide-react";

const Navbar = () => {
  // get JWT token from URL search params
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const [jwtToken, setJwtToken] = useState<string>("");

  useEffect(() => {
    let decodedUser: User | null = null;
    let token: string | null = Cookies.get("token") ?? null;

    if (token) {
      decodedUser = decodeJwt<User>(token);
    } else {
      token = searchParams.get("token");
      if (token) {
        decodedUser = decodeJwt<User>(token);
        Cookies.set("token", token, { expires: 7 });
      }
    }

    // needed to redirect to links with the token
    if (token) {
      setJwtToken(token);
    }

    if (decodedUser) {
      dispatch(setUser(decodedUser));
    }
  }, [searchParams, dispatch]);

  const handleLogout = () => {
    dispatch(clearUser());
    Cookies.remove("token");
    window.location.href = "/";
  };

  return (
    <section className="sticky top-0 bg-white/30 backdrop-blur-md shadow-md z-[99]">
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="flex gap-8 items-center justify-between py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center divide-x divide-emerald-200"
          >
            <img
              alt="Logo"
              className="h-10 xl:h-14 object-contain object-center pr-3"
              src="https://skillmission.assam.gov.in/images/emblem-logo.png"
            />
            <img
              alt="Logo"
              className="h-10 xl:h-14 object-contain object-center pl-3"
              src="https://skillmission.assam.gov.in/images/logo.png"
            />
            <div className="flex flex-col ml-5">
              <p className="text-sm lg:text-3xl text-gray-700 font-semibold">
                Assam Skill Developement Mission
              </p>
              <p className="text-xs lg:text-sm font-medium text-gray-700">
                Digital Skill Center
              </p>
            </div>
          </Link>
          {/* <Link to="/" className="flex gap-2 items-center flex-shrink-0">
            <img
              src="/images/logo-demo.png"
              alt="Logo"
              className="h-10 xl:h-14"
            />
            <div>
              <p className="text-sm xl:text-2xl font-medium">
                Assam Skill Developement Mission
              </p>
              <p className="text-xs xl:text-sm text-gray-700 font-medium">
                Digital Skill Center
              </p>
            </div>
          </Link> */}

          {/* Mobile Toggle Button */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="font-medium rounded-full border-gray-300 size-6 flex items-center justify-center xl:hidden"
              >
                <i className="bi bi-list text-lg"></i>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 sm:w-100 p-4">
              <nav className="flex flex-col gap-10 mt-25">
                <a
                  href={`https://skillcourse.skillmissionassam.org/${
                    jwtToken ? `?token=${jwtToken}` : ""
                  }`}
                  className="text-base font-medium text-gray-700"
                >
                  <i className="bi bi-bullseye" /> Schemes / Programs
                </a>
                <a href="#" className="text-base font-medium text-gray-700">
                  <i className="bi bi-chat-left-heart" /> Recommendations
                </a>
                <a
                  href={`https://skillcourse.skillmissionassam.org/${
                    jwtToken ? `?token=${jwtToken}` : ""
                  }`}
                  className="text-base font-medium text-gray-700"
                >
                  <i className="bi bi-mortarboard" /> Skill Courses
                </a>
                <a
                  href={`https://jobboard.skillmissionassam.org/${
                    jwtToken ? `?token=${jwtToken}` : ""
                  }`}
                  className="text-base font-medium text-gray-700"
                >
                  <i className="bi bi-briefcase" /> Job Search
                </a>
                <a href="#" className="text-base font-medium text-gray-700">
                  <i className="bi bi-geo-alt" /> Skill Centers
                </a>
                <a href="#" className="text-base font-medium text-gray-700">
                  <i className="bi bi-calendar-event" /> Job Melas
                </a>
                <a href="#" className="text-base font-medium text-gray-700">
                  <i className="bi bi-headset" /> Support
                </a>
                {user ? (
                  <>
                    <a href="#" className="text-base font-medium text-gray-700">
                      <i className="bi bi-person" />
                      Profile
                    </a>
                    <a href="#" className="text-base font-medium text-gray-700 flex gap-2 items-center">
                      <LayoutDashboard size={15}/>
                      Dashboard
                    </a>
                    <Button
                      onClick={handleLogout}
                      className="text-base font-medium text-white"
                    >
                      <i className="bi bi-box-arrow-in-right" /> Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <a
                      href="https://public-registration.skillmissionassam.org/register?redirect=https://job-mela.skillmissionassam.org/"
                      className="text-base font-medium text-gray-700"
                    >
                      <i className="bi bi-input-cursor" /> Register
                    </a>
                    <a
                      href="https://public-registration.skillmissionassam.org/login?redirect=https://job-mela.skillmissionassam.org/"
                      className="text-base font-medium text-gray-700"
                    >
                      <i className="bi bi-box-arrow-in-right" /> Login
                    </a>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop Buttons */}
          <div className="hidden md:block">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <button className="cursor-pointer size-10 text-3xl text-emerald-900 font-medium rounded-full bg-emerald-200 ring-2 ring-white grid place-content-center">
                    {user.type === "candidate" &&
                      user.data.firstName.slice(0, 1)}
                    {user.type === "Employer" &&
                      user.data[0].userName.slice(0, 1)}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="z-100 relative top-2 right-10 rounded-sm w-40">
                  <DropdownMenuItem className="text-lg text-gray-700">
                    <a href="#" className="flex gap-2 items-center">
                      <UserIcon />
                      Profile
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-lg text-gray-700">
                    <a href="#" className="flex gap-2 items-center">
                      <LayoutDashboard />
                      Dashboard
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-lg text-gray-700 flex gap-2 items-center"
                    onClick={handleLogout}
                  >
                    <LogOut />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="xl:flex flex-row gap-2 hidden">
                <a
                  href="https://public-registration.skillmissionassam.org/register?redirect=https://job-mela.skillmissionassam.org/"
                  className="text-sm font-medium flex items-center gap-2 text-gray-700 hover:underline py-4 xl:bg-emerald-400 xl:hover:bg-emerald-400/80 xl:rounded-full xl:border-gray-300 px-8 xl:px-4 xl:py-2.5 xl:no-underline xl:hover:no-underline"
                >
                  <i className="bi bi-input-cursor" />
                  <span>Register</span>
                </a>
                <a
                  href="https://public-registration.skillmissionassam.org/login?redirect=https://job-mela.skillmissionassam.org/"
                  className="text-sm font-medium flex items-center gap-2 text-gray-700 hover:underline py-4 xl:bg-black xl:hover:bg-black/80 xl:text-white xl:rounded-full xl:border-gray-300 px-8 xl:px-4 xl:py-2.5 xl:no-underline xl:hover:no-underline"
                >
                  <i className="bi bi-box-arrow-in-right" />
                  <span>Login</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden xl:block border-t border-emerald-400 mt-1 pt-2">
          <nav className="flex flex-row gap-8">
            <a
              href={`https://skillcourse.skillmissionassam.org/${
                jwtToken ? `?token=${jwtToken}` : ""
              }`}
              className="text-sm text-gray-700 flex items-center gap-2 hover:underline"
            >
              <i className="bi bi-bullseye" />
              <span>Schemes / Programs</span>
            </a>
            <a
              href="#"
              className="text-sm text-gray-700 flex items-center gap-2 hover:underline"
            >
              <i className="bi bi-chat-left-heart" />
              <span>Recommendations</span>
            </a>
            <a
              href={`https://skillcourse.skillmissionassam.org/${
                jwtToken ? `?token=${jwtToken}` : ""
              }`}
              className="text-sm text-gray-700 flex items-center gap-2 hover:underline"
            >
              <i className="bi bi-mortarboard" />
              <span>Skill Courses</span>
            </a>
            <a
              href={`https://jobboard.skillmissionassam.org/${
                jwtToken ? `?token=${jwtToken}` : ""
              }`}
              className="text-sm text-gray-700 flex items-center gap-2 hover:underline"
            >
              <i className="bi bi-briefcase" />
              <span>Job Search</span>
            </a>
            <a
              href="#"
              className="text-sm text-gray-700 flex items-center gap-2 hover:underline"
            >
              <i className="bi bi-geo-alt" />
              <span>Skill Centers</span>
            </a>
            <a
              href="#"
              className="text-sm text-gray-700 flex items-center gap-2 hover:underline"
            >
              <i className="bi bi-calendar-event" />
              <span>Job Melas</span>
            </a>
            <a
              href="#"
              className="text-sm text-gray-700 flex items-center gap-2 hover:underline"
            >
              <i className="bi bi-headset" />
              <span>Support</span>
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
