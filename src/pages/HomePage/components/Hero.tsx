import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";
import { Link } from "react-router-dom";

const Hero = () => {
  // Hero Section
  const user = useAppSelector(selectCurrentUser);
  return (
    <>
      {/* background image  */}
      <div className="absolute block w-full h-[60rem] bg-[url('/images/grid1.png')] -z-10 top-0 bg-no-repeat bg-cover rotate-"></div>

      {/* content */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-24 xl:py-36 grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-center">
            <div className="order-1 md:order-2">
              <img
                src="/images/job2.png"
                alt=""
                className="w-full max-w-2xl mx-auto"
              />
            </div>

            <div className="order-2 md:order-1 text-center md:text-left">
              <p className="text-3xl md:text-4xl lg:text-5xl font-medium leading-snug">
                Find Your Dream Job or Your Ideal Candidate — All in One Place!
              </p>
              <p className="text-base lg:text-lg text-gray-600 mt-4">
                Register with Job Mela, get matched with the right
                opportunities, and schedule interviews in just a few clicks!
              </p>
              {/* if logged show apply button else register */}
              {user ? (
                <Link
                  to="/all-melas"
                  className="text-sm font-medium inline-flex items-center gap-2 py-4 px-8 bg-black hover:bg-black/80 text-white rounded-full mt-12 hover:shadow-lg hover:shadow-shadow transition-all duration-300"
                >
                  <span>Apply Now</span>
                  <i className="ml-2 bi bi-arrow-right"></i>
                </Link>
              ) : (
                <a
                  href={`https://public-registration.skillmissionassam.org/register?redirect=${window.location.href}`}
                  className="text-sm font-medium inline-flex items-center gap-2 py-4 px-8 bg-black hover:bg-black/80 text-white rounded-full mt-12 hover:shadow-lg hover:shadow-shadow transition-all duration-300"
                >
                  <span>Register Now</span>
                  <i className="bi bi-arrow-right"></i>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
