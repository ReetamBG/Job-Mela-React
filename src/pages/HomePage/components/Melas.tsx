import { Link } from "react-router-dom";
import useMelas from "@/hooks/useMelas";
import MelaCard from "@/components/customComponents/MelaCard";

const Melas = () => {
  const { melas } = useMelas();
  return (
    <section className=" py-12 xl:py-12 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* <!-- Section Header --> */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Job Melas</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Connect with top employers and job seekers. Register now and explore
            opportunities with ease.
          </p>
        </div>

        {/* <!-- Filter Tags --> */}
        {/* <div className="flex flex-wrap justify-center gap-2 mb-10"> */}
        {/*   <span className="px-4 py-1 text-sm rounded-full bg-emerald-100 text-emerald-700 font-medium cursor-pointer">In-Person</span> */}
        {/*   <span className="px-4 py-1 text-sm rounded-full bg-blue-100 text-blue-700 font-medium cursor-pointer">Online</span> */}
        {/*   <span className="px-4 py-1 text-sm rounded-full bg-purple-100 text-purple-700 font-medium cursor-pointer">AI/ML</span> */}
        {/*   <span className="px-4 py-1 text-sm rounded-full bg-pink-100 text-pink-700 font-medium cursor-pointer">Design</span> */}
        {/*   <span className="px-4 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700 font-medium cursor-pointer">Tech</span> */}
        {/* </div> */}

        {/* <!-- Mela Cards Grid --> */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-10">
          {melas.slice(0, 3).map((mela, idx) => (
            <MelaCard key={idx} mela={mela} />
          ))}
        </div>

        {/* <!-- View All Melas CTA --> */}
        <div className="flex justify-center mt-12">
          <Link
            to="/all-melas"
            className="text-xs font-medium inline-flex items-center gap-2 text-gray-600 border border-gray-300 py-2 px-4 hover:bg-gray-100/80 rounded-full mt-12 hover:shadow-lg transition-all duration-300"
          >
            View All Melas
          </Link>
        </div>
      </div>
    </section>
  );
  // return (
  //   <section>
  //     <div className="max-w-7xl mx-auto px-4 py-12 xl:py-24">
  //       <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-12">
  //         <div className="md:col-span-2 xl:col-span-1 row-span-2">
  //           <p className="text-center xl:text-left text-3xl lg:text-5xl mb-4">
  //             Job Melas
  //           </p>
  //           <p className="text-center xl:text-left mt-2 text-gray-700 mb-12 max-w-xl mx-auto xl:mx-0 text-sm lg:text-base">
  //             Connect with top employers and job seekers effortlessly. Register
  //             now to explore opportunities and schedule interviews with ease.
  //           </p>
  //         </div>
  //         {melas.slice(0, 4).map((mela) => (
  //           <MelaCard key={mela.pklMelaId} mela={mela} />
  //         ))}
  //       </div>
  //       {/* No Mela */}
  //       {melas.length === 0 && (
  //         <div className="text-center py-12">
  //           <img
  //             src="./assets/images/nf.png"
  //             alt="No Job Melas"
  //             className="mx-auto h-44 mb-6"
  //           />
  //           <p className="text-2xl font-semibold text-gray-800">
  //             No Upcoming Job Melas
  //           </p>
  //           <p className="text-gray-700 mt-2">
  //             Stay tuned! New events will be announced soon.
  //           </p>
  //         </div>
  //       )}
  //
  //       <div className="flex items-start justify-center">
  //         <Link
  //           to="/all-melas"
  //           className="text-xs font-medium inline-flex items-center gap-2 text-gray-600 border border-gray-300 py-2 px-4 hover:bg-gray-300/80 rounded-full mt-12 hover:shadow-lg hover:shadow-shadow transition-all duration-300"
  //         >
  //           <span>View All Melas</span>
  //         </Link>
  //       </div>
  //     </div>
  //   </section>
  // );
};

export default Melas;
