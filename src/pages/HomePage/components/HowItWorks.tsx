const HowItWorks = () => {
  // How it works
  return (
    <section className="relative py-12 xl:py-24 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-3xl md:text-4xl font-bold mb-2 text-center">How Job Mela Works?</p>
        <p className="mt-2 text-gray-700 mb-12 text-center max-w-2xl mx-auto text-sm lg:text-base">Whether you're just starting out or seeking your next opportunity, our streamlined process ensures a smooth experience from registration to interview.</p>

        <div className="relative mt-24">
          <div className="hidden lg:block relative overflow-hidden w-full h-6 top-0">
            <div className="absolute h-0.5 w-full border-t-2 border-dashed border-gray-700 -z-0 timeline-line top-3 timeline-animate-left"><div className="arrow-head"></div></div>
          </div>

          <div className="flex flex-col lg:flex-row items-end lg:items-start">
            <div className="relative w-10/12 lg:w-[32%] flex flex-col-reverse h-full gap-6 pt-12">
              <div className="w-full text-center px-6">
                <h3 className="text- tracking-wide font-semibold mb-6">Register or Apply Fast</h3>
                <p className="text-gray-600 text-sm">
                  Start with a new profile or use your existing one. Quick ID check, and you're ready to go!
                </p>
              </div>
              <div className="lg:absolute mx-auto -left-4 lg:left-0 transform -translate-x-1/2 tracking-widest bg-yellow-600 text-gray-100 size-8 text-xs font-bold flex items-center justify-center rounded-full z-10 top-4 lg:-top-7">
                1
              </div>
              <div className="w-full">
                <img src="/images/step1.png"
                  alt="Registration Process" className="w-full object-contain px-6 h-44 object-center pb-6" />
              </div>
            </div>
            <div className="relative w-10/12 lg:w-[32%] flex flex-col-reverse h-full gap-6 pt-12">
              <div className="w-full lg:pl-10 text-center px-6">
                <h3 className="text- tracking-wide font-semibold mb-6">Get Smart Matches</h3>
                <p className="text-gray-600 text-sm">
                  Based on your skills and interests, we suggest the best jobs or candidates—just for you.
                </p>
              </div>
              <div className="lg:absolute mx-auto -left-4 lg:left-0 transform -translate-x-1/2 tracking-widest bg-yellow-600 text-gray-100 size-8 text-xs font-bold flex items-center justify-center rounded-full z-10 top-4 lg:-top-7">
                2
              </div>
              <div className="w-full">
                <img src="/images/step2.png"
                  alt="Recommendations" className="w-full object-contain px-6 h-44 object-center pb-4" />
              </div>
            </div>
            <div className="relative w-10/12 lg:w-[32%] flex flex-col-reverse h-full gap-6 pt-12">
              <div className="w-full text-center px-6">
                <h3 className="text- tracking-wide font-semibold mb-6">Get Interview Schedule Instantly</h3>
                <p className="text-gray-600 text-sm">
                  Once matched, you’ll get your interview time—no hassles, no back-and-forth.
                </p>
              </div>
              <div className="lg:absolute mx-auto -left-4 lg:left-0 transform -translate-x-1/2 tracking-widest bg-yellow-600 text-gray-100 size-8 text-xs font-bold flex items-center justify-center rounded-full z-10 top-4 lg:-top-7">
                3
              </div>
              <div className="w-full">
                <img src="/images/step3.png"
                  alt="Schedule Interview" className="w-full object-contain px-6 h-44 object-center" />
              </div>
            </div>

            <div className="relative w-10/12 lg:w-[4%] z-10 flex flex-col items-center gap-10 pt-12 lg:pt-0">
              <div className="bg-emerald-400 text-xs font-bold rounded-full size-8 flex items-center justify-center lg:absolute mx-auto lg:-right-1 top-4 lg:-top-7">
                <i className="bi bi-check text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
