const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 text-center mt-auto">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
        <a href="#" className="hover:text-white transition flex items-center gap-2"><i className="bi bi-house-door"></i><span>Home</span></a>
        <a href="#" className="hover:text-white transition flex items-center gap-2"><i className="bi bi-question-circle"></i><span>How it Works</span></a>
        <a href="#" className="hover:text-white transition flex items-center gap-2"><i className="bi bi-calendar-event"></i><span>Upcoming Job Melas</span></a>
        <a href="#" className="hover:text-white transition flex items-center gap-2"><i className="bi bi-headset"></i><span>Support</span></a>
      </div>
      <p className="text-xs border-t pt-6">&copy; 2025 Assam Skill Development Mission. All rights reserved.</p>
    </div>
  </footer>
  )
}

export default Footer