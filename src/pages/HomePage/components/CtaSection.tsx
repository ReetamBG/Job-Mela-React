const CtaSection = () => {
  return (
    <section className="relative">
      <div
        className="bg-emerald-400 w-full h-20 mt-1"
        style={{ clipPath: "polygon(100% 0%, 0% 100%, 100% 100%)" }}
      ></div>

      <div className="bg-emerald-400 py-12 xl:py-24 relative z-10 -mt-[.5px]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center relative">
          <div className="order-1 lg:order-none w-full lg:w-auto mb-8 lg:mb-0">
            <img
              src="/images/search-asset2.png"
              alt="cta image"
              className="h-72 sm:h-96 lg:h-[32rem] object-contain mx-auto lg:mx-0 lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 z-10"
            />
          </div>

          <div className="order-2 w-full lg:max-w-3xl lg:ml-auto lg:pl-24 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Your Dream Job Is Just a Click Away!
            </h2>
            <p className="mt-2 mb-8 lg:mb-12 max-w-lg text-sm lg:text-base mx-auto lg:mx-0">
              Discover roles that fit your passion.
            </p>
            <a
              href={`https://public-registration.skillmissionassam.org/register?redirect=${window.location.href}`}
              className="text-xs font-medium inline-flex items-center gap-2 py-4 px-8 bg-black text-white hover:bg-black/80 rounded-full hover:shadow-lg transition-all duration-300"
            >
              <span>Start Your Journey</span>
              <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
