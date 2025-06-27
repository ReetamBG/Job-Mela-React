import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <section className="sticky top-0 bg-white/30 backdrop-blur-md shadow-md z-[99]">
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="flex gap-8 items-center justify-between py-4">
          <Link to="/" className="flex gap-2 items-center flex-shrink-0">
            <img src="/images/logo-demo.png" alt="Logo" className="h-10 xl:h-14" />
              <div className="">
                <p className="text-sm xl:text-2xl font-medium">Assam Skill Developement Mission</p>
                <p className="text-xs xl:text-sm text-gray-700 font-medium">Digital Skill Center</p>
              </div>
          </Link>
          <button type="button" className="font-medium rounded-full border-gray-300 size-6 flex items-center justify-center xl:hidden" id="navTogglerBtn"><i className="bi bi-list text-lg"></i></button>
          <div className="xl:flex flex-row gap-2 hidden">
            <a href="https://public-registration.skillmissionassam.org/register?redirect=https://job-mela.skillmissionassam.org/" className="text-sm font-medium flex items-center gap-2 text-gray-700 hover:underline py-4 xl:bg-emerald-400 xl:hover:bg-emerald-400/80 xl:rounded-full xl:border-gray-300 px-8 xl:px-4 xl:py-2.5 xl:no-underline xl:hover:no-underline"><i className="bi bi-box-arrow-in-right xl:hidden"></i><span>Register</span></a>
            <a href="https://public-registration.skillmissionassam.org/login?redirect=https://job-mela.skillmissionassam.org/" className="text-sm font-medium flex items-center gap-2 text-gray-700 hover:underline py-4  xl:bg-black xl:hover:bg-black/80 xl:text-white xl:rounded-full xl:border-gray-300 px-8 xl:px-4 xl:py-2.5 xl:no-underline xl:hover:no-underline"><i className="bi bi-box-arrow-in-right xl:hidden"></i><span>Login</span></a>
          </div>
        </div>
        <div className=" overflow-hidden max-h-0 xl:max-h-[99rem] transition-all duration-300 ease-linear" id="navItemsCon">
          <nav className="flex flex-col xl:flex-row gap-4 xl:gap-8 mx-auto border-t border-emerald-400 pl-3 xl:pl-0">
            <a href="#" className="hover:underline decoration-emerald-500 decoration-2 text-sm text-gray-700 flex items-center gap-3 py-3 has-[&:hover]:[&>i]:text-emerald-500"><i className="bi bi-bullseye"></i><span>Schemes / Programs</span></a>
            <a href="#" className="hover:underline decoration-emerald-500 decoration-2 text-sm text-gray-700 flex items-center gap-3 py-3 has-[&:hover]:[&>i]:text-emerald-500"><i className="bi bi-chat-left-heart"></i><span>Recommendations</span></a>
            <a href="<?= $base_url ?>pages/skill-course-sector.php" className="hover:underline decoration-emerald-500 decoration-2 text-sm text-gray-700 flex items-center gap-3 py-3 has-[&:hover]:[&>i]:text-emerald-500"><i className="bi bi-mortarboard"></i><span>Skill Courses</span></a>
            <a href="#" className="hover:underline decoration-emerald-500 decoration-2 text-sm text-gray-700 flex items-center gap-3 py-3 has-[&:hover]:[&>i]:text-emerald-500"><i className="bi bi-briefcase"></i><span>Job Search</span></a>
            <a href="#" className="hover:underline decoration-emerald-500 decoration-2 text-sm text-gray-700 flex items-center gap-3 py-3 has-[&:hover]:[&>i]:text-emerald-500"><i className="bi bi-geo-alt"></i><span>Skill Centers</span></a>
            <a href="#" className="hover:underline decoration-emerald-500 decoration-2 text-sm text-gray-700 flex items-center gap-3 py-3 has-[&:hover]:[&>i]:text-emerald-500"><i className="bi bi-calendar-event"></i><span>Job Melas</span></a>
            <a href="#" className="hover:underline decoration-emerald-500 decoration-2 text-sm text-gray-700 flex items-center gap-3 py-3 has-[&:hover]:[&>i]:text-emerald-500"><i className="bi bi-headset"></i><span>Support</span></a>
            <a href="#" className="hover:underline decoration-emerald-500 decoration-2 text-sm text-gray-700 flex items-center gap-3 py-3 has-[&:hover]:[&>i]:text-emerald-500 xl:hidden"><i className="bi bi-input-cursor"></i><span>Register</span></a>
            <a href="#" className="hover:underline decoration-emerald-500 decoration-2 text-sm text-gray-700 flex items-center gap-3 py-3 has-[&:hover]:[&>i]:text-emerald-500 xl:hidden"><i className="bi bi-box-arrow-in-right"></i><span>Login</span></a>
          </nav>
        </div>
      </div>
    </section>
  )
}

export default Navbar