const HowItWorks = () => {
  // How it works
  return (
    <section className="relative py-12 xl:py-24 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-3xl lg:text-5xl text-center mb-4">How Job Mela Works?</p>
          <p className="mt-2 text-gray-700 mb-12 text-center max-w-lg mx-auto text-sm lg:text-base">
            Whether you&apos;re just starting out or seeking your next opportunity, our streamlined process ensures a smooth experience from registration to interview.
          </p>

          <div className="relative mt-24">
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-0.5 w-full border-t-2 border-dashed border-gray-700 -z-0"></div>

            <div className="flex">
              {/* STEP 1 */}
              <div className="relative w-[32%] flex flex-col-reverse h-full gap-10 pt-24">
                {/* Text */}
                <div className="w-full text-center md:text-left px-6">
                  <h3 className="text-xl font-medium mb-6">Register or Apply with Existing Details</h3>
                  <p className="text-gray-700 text-sm">
                    Begin by creating a new profile or applying with your existing credentials. Your identity will be verified to ensure eligibility and streamline further steps in the hiring process.
                  </p>
                </div>
                <div className="absolute left-0 transform -translate-x-1/2 tracking-widest bg-gray-200 text-gray-700 text-xs font-bold py-4 px-8 rounded-full z-10 -top-6">
                  STEP 1
                </div>
                <div className="w-full">
                  <img
                    src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-27096.jpg?ga=GA1.1.2029762281.1750667458&semt=ais_items_boosted&w=740"
                    alt="Registration Process"
                    className="w-full object-contain px-6 h-72 pb-6"
                  />
                </div>
              </div>
              {/* STEP 2 */}
              <div className="relative w-[32%] flex flex-col-reverse h-full gap-10 pt-24">
                {/* Text */}
                <div className="w-full lg:pl-10 text-center md:text-left px-6">
                  <h3 className="text-xl font-medium mb-6">Get Personalized Recommendations</h3>
                  <p className="text-gray-700 text-sm">
                    Based on your qualifications and preferences, the system will recommend potential employers or candidates. These suggestions align with your profile, increasing your chances of a successful match.
                  </p>
                </div>
                <div className="absolute left-0 transform -translate-x-1/2 tracking-widest bg-gray-200 text-gray-700 text-xs font-bold py-4 px-8 rounded-full z-10 -top-6">
                  STEP 2
                </div>
                <div className="w-full">
                  <img
                    src="https://img.freepik.com/free-vector/organic-flat-feedback-concept_23-2148959061.jpg?ga=GA1.1.2029762281.1750667458&semt=ais_items_boosted&w=740"
                    alt="Recommendations"
                    className="w-full object-contain px-6 h-72 pb-4"
                  />
                </div>
              </div>
              {/* STEP 3 */}
              <div className="relative w-[32%] flex flex-col-reverse h-full gap-10 pt-24">
                {/* Text */}
                <div className="w-full text-center md:text-left px-6">
                  <h3 className="text-xl font-medium mb-6">Schedule Interviews with Ease</h3>
                  <p className="text-gray-700 text-sm">
                    Once you’ve found the right match, set up your interview—either in person or online—at a time that suits both parties. Seamless coordination ensures a smooth step toward your next career move.
                  </p>
                </div>
                <div className="absolute left-0 transform -translate-x-1/2 tracking-widest bg-gray-200 text-gray-700 text-xs font-bold py-4 px-8 rounded-full z-10 -top-6">
                  STEP 3
                </div>
                <div className="w-full">
                  <img
                    src="https://img.freepik.com/free-vector/choice-worker-concept_52683-43492.jpg?ga=GA1.1.2029762281.1750667458&semt=ais_items_boosted&w=740"
                    alt="Schedule Interview"
                    className="w-full object-contain px-6 h-72"
                  />
                </div>
              </div>
              {/* Completion */}
              <div className="relative w-[4%] z-10 flex flex-col items-center gap-10">
                <div className="bg-emerald-400 text-xs font-bold rounded-full size-12 flex items-center justify-center absolute -right-1 -top-6">
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