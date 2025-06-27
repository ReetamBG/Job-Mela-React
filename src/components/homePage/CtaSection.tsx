const CtaSection = () => {
  return (
    <section className="relative bg-emerald-50">
        <div
          className="bg-emerald-400 w-full h-20 mt-1"
          style={{ clipPath: "polygon(100% 0%, 0% 100%, 100% 100%)" }}
        ></div>
        <div className="bg-emerald-400 z-10 -mt-[.5px] py-12 xl:py-24">
          <div className="max-w-7xl mx-auto px-4 flex relative">
            <img
              src="/images/search-asset2.png"
              alt=""
              className="h-[32rem] object-contain absolute left-0 z-10 top-1/2 -translate-y-1/2"
            />
            <div className="max-w-3xl ml-auto pl-24">
              <h2 className="text-xl lg:text-3xl mb-4 font-bold">
                Ready to Kickstart Your Career? Discover jobs across popular sectors
              </h2>
              <p className="mt-2 mb-12 max-w-lg text-sm lg:text-base">
                Join thousands of job seekers who’ve already found their dream roles. It’s quick, easy, and free to get started.
              </p>
            </div>
            {/* 
            <a
              href="/register.php"
              className="text-sm font-medium inline-flex items-center gap-2 text-gray-700 py-4 px-8 bg-white hover:bg-emerald-50 rounded-full border-transparent mt-12 hover:shadow-lg hover:shadow-shadow transition-all duration-300"
            >
              <span>Register Now</span>
              <i className="bi bi-arrow-right"></i>
            </a>
            */}
          </div>
        </div>
        <div className="bg-white">
          <div
            className="bg-emerald-400 w-full h-20 rotate-180"
            style={{ clipPath: "polygon(100% 0%, 0% 100%, 100% 100%)" }}
          ></div>
        </div>
      </section>
  )
}

export default CtaSection