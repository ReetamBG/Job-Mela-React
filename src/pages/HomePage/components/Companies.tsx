import { Link } from "react-router-dom";
import useCompanies from "@/hooks/useCompanies";
import CompanyCard from "@/pages/AllCompaniesPage/components/CompanyCard";

const Companies = () => {
  const { companies } = useCompanies();
  return (
    <section className="py-12 xl:py-24 relative overflow-hidden">
      <div className="absolute block w-full h-[60rem] bg-[url('/images/grid1.png')] -z-10 top-0 bg-no-repeat bg-cover rotate-180"></div>

      <div className="max-w-7xl mx-auto">
        <div className="px-4">
          <p className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Companies Participating
          </p>
          <p className="mt-2 text-gray-700 mb-12 text-center max-w-xl mx-auto text-sm lg:text-base">
            Meet the top companies hiring at our Job Mela events. Explore roles
            and apply today.
          </p>
        </div>
        {/* <!-- Horizontal Scrollable Cards --> */}
        <div className="flex overflow-x-auto gap-4 scroll-smooth pb-6 px-6 hide-scrollbar cursor-grab active:cursor-grabbing select-none">
          {companies.map((company, idx: number) => (
            <CompanyCard company={company} key={idx} />
          ))}
        </div>

        {/* <!-- View All Button --> */}
        <div className="flex items-start justify-center">
          <Link
            to="/all-companies"
            className="text-xs font-medium inline-flex items-center gap-2 text-gray-600 border border-gray-300 py-2 px-4 hover:bg-gray-100/80 rounded-full mt-12 hover:shadow-lg transition-all duration-300"
          >
            <span>View All Companies</span>
          </Link>
        </div>
      </div>
    </section>
  );

  // return (
  //   <section className="py-12 xl:py-24 bg-white">
  //     <div className="max-w-7xl mx-auto px-4">
  //       <p className="text-3xl lg:text-5xl text-center mb-4">
  //         Explore Exciting Job Opportunities
  //       </p>
  //       <p className="mt-2 text-gray-700 mb-12 text-center max-w-xl mx-auto text-sm lg:text-base">
  //         Explore exciting job opportunities at our Job Mela. Find the right role and apply now!
  //       </p>
  //
  //       {/* 🔄 Auto-Scroll Carousel */}
  //       <AutoScrollCarousel speed={20}>
  //         {companies.map((company, idx: number) => (
  //           <div
  //             key={idx}
  //             className="w-[15rem] mx-4 sm:w-[20rem] flex-shrink-0 bg-white border border-gray-400 shadow-card shadow-gray-600 hover:bg-gray-100 text-center px-6 py-8"
  //           >
  //             <img
  //               src={`https://dummyimage.com/80x80/${Math.floor(
  //                 Math.random() * 16777215
  //               ).toString(16)}/ffffff&text=${company.companyName.slice(
  //                 0,
  //                 1
  //               )}`}
  //               alt={company.companyName}
  //               className="mx-auto mb-4"
  //               height={80}
  //               width={80}
  //             />
  //             <h3 className="text-base font-medium">{company.companyName}</h3>
  //             {company.comDesc && (
  //               <p className="text-sm text-gray-600 mb-4 line-clamp-6">
  //                 {company.comDesc}
  //               </p>
  //             )}
  //             <p className="text-base text-black font-medium line-clamp-3">
  //               Mela: {company.vsVenueName}
  //             </p>
  //           </div>
  //         ))}
  //       </AutoScrollCarousel>
  //
  //       {/* View All */}
  //       <div className="flex items-start justify-center">
  //         <Link
  //           to="/all-companies"
  //           className="text-xs font-medium inline-flex items-center gap-2 text-gray-600 border border-gray-300 py-2 px-4 hover:bg-gray-300/80 rounded-full mt-12 hover:shadow-lg hover:shadow-shadow transition-all duration-300"
  //         >
  //           <span>View All Companies</span>
  //         </Link>
  //       </div>
  //     </div>
  //   </section>
  // );
};

export default Companies;
