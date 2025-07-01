import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface CompanyDetails {
  pklEmployerId: number;
  company_name: string;
  vsSectors: string;
  vsDescription: string;
  Turnover: number;
  spocName: string;
  spocContactNo: string;
  spocEmaail: string;
  registration_no: string;
  phone_no: string;
  address: string;
  email: string;
  isVarified: string;
  verify_date: string;
}

const CompanyDetailsPage = () => {
  const { phoneNo } = useParams<{ phoneNo: string }>();
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(
    null
  );

  // fetch company details
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      const url = import.meta.env.VITE_BASE_URL + "/v1/company/";
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone_no: phoneNo,
          }),
        });
        if (!res.ok) throw new Error("Could not fetch company details");
        const data = await res.json();
        setCompanyDetails(data.company[0]);
        console.log(data.company[0]);
      } catch (error) {
        console.error(error);
        setCompanyDetails(null);
      }
    };

    if (phoneNo) fetchCompanyDetails();
  }, [phoneNo]);

  if (!companyDetails) return <p className="text-center py-10">Loading Details ...</p>;

  return (
    <section className="max-w-4xl mx-auto px-6 py-12 mb-10">
      <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={`https://dummyimage.com/100x100/${Math.floor(
              Math.random() * 16777215
            ).toString(16)}/ffffff&text=${companyDetails.company_name
              .charAt(0)
              .toUpperCase()}`}
            alt={companyDetails.company_name}
            className="rounded-full border border-gray-300 shadow w-[100px] h-[100px] object-cover"
            height={100}
            width={100}
          />
        </div>

        {/* Header Info */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            {companyDetails.company_name}
          </h2>
          <p className="text-sm text-gray-500 mb-2">
            Registration No: {companyDetails.registration_no}
          </p>
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
            {companyDetails.isVarified}
          </span>
        </div>
      </div>

      <hr className="my-8" />

      {/* Description */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          About the Company
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {companyDetails.vsDescription || "No description available."}
        </p>
      </div>

      <hr className="my-8" />

      {/* Main Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <Info label="Sector" value={companyDetails.vsSectors} />
        <Info
          label="Turnover"
          value={`₹${companyDetails.Turnover.toLocaleString()}`}
        />
        <Info label="Address" value={companyDetails.address} />
        <Info label="Email" value={companyDetails.email} />
        <Info label="Phone Number" value={companyDetails.phone_no} />
        <Info
          label="Verification Date"
          value={new Date(companyDetails.verify_date).toLocaleDateString()}
        />
      </div>

      

      <hr className="my-8" />

      {/* SPOC */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Point of Contact (SPOC)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <Info label="Name" value={companyDetails.spocName} />
          <Info label="Email" value={companyDetails.spocEmaail} />
          <Info label="Contact Number" value={companyDetails.spocContactNo} />
        </div>
      </div>
    </section>
  );
};

const Info = ({ label, value }: { label: string; value: string | number }) => (
  <div>
    <p className="text-gray-500 font-medium mb-1">{label}</p>
    <p className="text-gray-800">{value}</p>
  </div>
);

export default CompanyDetailsPage;
