"use client";

import { useState } from "react";
import type { District, Qualification } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MelaFilters } from "@/hooks/useMelas";

interface MelaFilterFormProps {
  districts: District[] | [];
  qualifications: Qualification[] | [];
  handleFilterFormSubmit: (filters: MelaFilters) => void;
}

const MelaFilterForm = ({
  districts,
  // qualifications,
  handleFilterFormSubmit,
}: MelaFilterFormProps) => {
  const [venueName, setVenueName] = useState("");
  const [district, setDistrict] = useState("");
  const [qualification, setQualification] = useState("");
  const [sortByStartDate, setSortByStartDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterFormSubmit({
      vsVenueName: venueName || null,
      vsDistrict: district || null,
      qualification: qualification || null,
      sortByStartDate: (sortByStartDate as "asc" | "desc") || null,
    });
  };

  const handleResetFilter = () => {
    setVenueName("");
    setDistrict("");
    setQualification("");
    setSortByStartDate("");
    handleFilterFormSubmit({
      vsVenueName: null,
      vsDistrict: null,
      qualification: null,
      sortByStartDate: null,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 text-sm text-gray-700"
    >
      {/* Venue Name */}
      <div>
        <p className="font-bold mb-3">Venue Name</p>
        <input
          type="text"
          placeholder="Search by name..."
          value={venueName}
          onChange={(e) => setVenueName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      {/* District */}
      <div>
        <p className="font-bold mb-3">District</p>
        <Select onValueChange={setDistrict} value={district}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select District" />
          </SelectTrigger>
          <SelectContent>
            {districts.map((d) => (
              <SelectItem key={d.pklDistrictId} value={String(d.vsDistrictName)}>
                {d.vsDistrictName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Minimum Qualification */}
      {/* <div>
        <p className="font-bold mb-3">Minimum Qualification</p>
        <Select onValueChange={setQualification} value={qualification}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Qualification" />
          </SelectTrigger>
          <SelectContent>
            {qualifications.map((q) => (
              <SelectItem
                key={q.pklQualificationId}
                value={String(q.vsQualification)}
              >
                {q.vsQualification}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div> */}

      {/* Sort by Start Date */}
      <div>
        <p className="font-bold mb-3">Sort by Start Date</p>
        <Select onValueChange={setSortByStartDate} value={sortByStartDate}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select sorting order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Earliest First</SelectItem>
            <SelectItem value="desc">Latest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          className="text-xs font-medium inline-flex items-center justify-center gap-2 text-gray-700 py-3 px-6 bg-emerald-400 hover:bg-emerald-400/80 rounded-full hover:shadow-lg hover:shadow-emerald-900/50 transition-all duration-300 w-full"
        >
          Apply Filters
        </button>
        {(venueName || district || qualification || sortByStartDate) && (
          <button
            type="reset"
            className="text-xs font-medium inline-flex items-center justify-center gap-2 text-white mt-3 py-3 px-6 bg-black hover:bg-black/90 rounded-full hover:shadow-lg hover:shadow-emerald-900/50 transition-all duration-300 w-full"
            onClick={handleResetFilter}
          >
            Reset All Filters
          </button>
        )}
      </div>
    </form>
  );
};

export default MelaFilterForm;
