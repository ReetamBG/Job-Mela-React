const Hero = () => {
  // Hero Section
  return (
      <section>
        <div className="absolute block w-full h-[60rem] bg-[url('/images/bg-asset.png')] -z-10 top-0 bg-no-repeat bg-cover rotate-180" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-5xl mx-auto py-12 xl:py-24 flex flex-col items-center justify-center">
            <p className="text-center text-3xl md:text-4xl lg:text-6xl font-medium leading-snug flex-grow">
              Find Your Dream Job or Your Ideal Candidate — All in One Place!
            </p>
            <p className="text-center text-base lg:text-xl mt-4 md:max-w-2xl lg:max-w-3xl mx-auto flex-grow">
              Register with Job Mela, get matched with the right opportunities, and schedule interviews in just a few clicks!
            </p>
            <a
              href="https://public-registration.skillmissionassam.org/register?redirect=https://job-mela.skillmissionassam.org/"
              className="text-sm font-medium inline-flex items-center gap-2 py-4 px-8 bg-black hover:bg-black/80 text-white rounded-full mt-12 hover:shadow-lg hover:shadow-shadow transition-all duration-300"
            >
              <span>Register Now</span><i className="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>
  )
}

export default Hero