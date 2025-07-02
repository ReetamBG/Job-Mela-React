import { useEffect } from "react";
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


const Navbar = () => {
  // get JWT token from URL search params
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  // Decode JWT token to get user
  useEffect(() => {
    // Check if JWT token is available in cookies else take from URL search params
    let jwtToken: string | null | undefined;
    let decodedUser: User | null = null;

    jwtToken = Cookies.get("token");
    if (jwtToken) {
      decodedUser = decodeJwt<User>(jwtToken);
    } else {
      jwtToken = searchParams.get("token");
      if (jwtToken) {
        decodedUser = decodeJwt<User>(jwtToken);
        Cookies.set("token", jwtToken, {expires: 7})  // set token in cookies
      }
    }
    if (decodedUser) {
      dispatch(setUser(decodedUser));
      // console.log("Decoded User:", decodedUser);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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
          <Link to="/" className="flex gap-2 items-center flex-shrink-0">
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
          </Link>

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
                <a href="#" className="text-base font-medium text-gray-700">
                  <i className="bi bi-bullseye" /> Schemes / Programs
                </a>
                <a href="#" className="text-base font-medium text-gray-700">
                  <i className="bi bi-chat-left-heart" /> Recommendations
                </a>
                <a href="#" className="text-base font-medium text-gray-700">
                  <i className="bi bi-mortarboard" /> Skill Courses
                </a>
                <a href="#" className="text-base font-medium text-gray-700">
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
                    <a href="#" className="text-base font-medium text-gray-700">
        
                      <i className="bi bi-box-arrow-in-right" /> Logout
                    </a>
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
          {user ? (
            <div className="xl:flex flex-row gap-5 hidden">
              <a
                href="#"
                className="size-15 text-3xl text-emerald-900 font-medium rounded-full bg-emerald-200 ring-2 ring-white grid place-content-center"
              >
                {user.type === "candidate" && user.data.firstName.slice(0,1)}
                {/* <i className="bi bi-person" />
                <span>Profile</span> */}
              </a>
              <button
                onClick={handleLogout}
                className="text-sm font-medium flex items-center gap-2 text-gray-700 hover:underline py-4 xl:bg-black xl:hover:bg-black/80 xl:text-white xl:rounded-full xl:border-gray-300 px-8 xl:px-4 xl:py-2.5 xl:no-underline xl:hover:no-underline"
              >
                <i className="bi bi-box-arrow-right" />
                <span>Logout</span>
              </button>
            </div>
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

        {/* Desktop Nav Items */}
        <div className="hidden xl:block border-t border-emerald-400 mt-1 pt-2">
          <nav className="flex flex-row gap-8">
            <a
              href="#"
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
              href="#"
              className="text-sm text-gray-700 flex items-center gap-2 hover:underline"
            >
              <i className="bi bi-mortarboard" />
              <span>Skill Courses</span>
            </a>
            <a
              href="#"
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
