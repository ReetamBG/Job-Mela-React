"use client";

import { useState } from "react";
import type { District, Qualification, Mela } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GetCompaniesParams } from "@/hooks/useCompanies";

interface FilterFormProps {
  districts: District[] | [];
  qualifications: Qualification[] | [];
  melas: Mela[] | [];
  handleFilterFormSubmit: (filters: GetCompaniesParams) => void;
}

const FilterForm = ({
  districts,
  qualifications,
  melas,
  handleFilterFormSubmit,
}: FilterFormProps) => {
  const [district, setDistrict] = useState("");
  const [qualification, setQualification] = useState("");
  const [mela, setMela] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterFormSubmit({
      district,
      qualification_id: qualification,
      fklmela_no: mela,
      interview_mode: type,
    });
  };

  const handleResetFilter = () => {
    setDistrict("");
    setMela("");
    setQualification("");
    setType("");
    handleFilterFormSubmit({
      district: "",
      qualification_id: "",
      fklmela_no: "",
      interview_mode: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 text-sm text-gray-700"
    >
      {/* District */}
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

      {/* Qualification */}
      <p className="font-bold mb-3">Minimum Qualification</p>
      <Select onValueChange={setQualification} value={qualification}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Minimum Qualification" />
        </SelectTrigger>
        <SelectContent>
          {qualifications.map((q) => (
            <SelectItem
              key={q.pklQualificationId}
              value={String(q.pklQualificationId)}
            >
              {q.vsQualification}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Mela */}
      <p className="font-bold mb-3">Select Mela</p>
      <Select onValueChange={setMela} value={mela}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Mela" />
        </SelectTrigger>
        <SelectContent>
          {melas.map((m) => (
            <SelectItem key={m.pklMelaId} value={String(m.pklMelaId)}>
              {m.vsVenueName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Type */}
      <p className="font-bold mb-3">Interview</p>
      <Select onValueChange={setType} value={type}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Interview Type" />
        </SelectTrigger>
        <SelectContent>
          {["online", "offline"].map((t) => (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Submit */}
      <div>
        <button
          type="submit"
          className="text-xs font-medium inline-flex items-center justify-center gap-2 text-gray-700 py-3 px-6 bg-emerald-400 hover:bg-emerald-400/80 rounded-full hover:shadow-lg hover:shadow-emerald-900/50 transition-all duration-300 w-full"
        >
          Apply Filters
        </button>
        {(district || qualification || mela || type) && (
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

export default FilterForm;
