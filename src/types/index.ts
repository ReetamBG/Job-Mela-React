export interface Company {
  company_name: string;
  comDesc: string;
  district: string;
  fklEmployerId: number;
  fklmela_no: number;
  venue_name: string;
  vsQualification: string;
  phone_no: string;
  vsSelectionProcedure: "online" | "offline";
}

export interface District {
  pklDistrictId: number;
  fklStateId: number;
  vsDistrictName: string;
}

export interface Qualification {
  pklQualificationId: number;
  vsQualification: string;
}

export interface Mela {
  sl_no: number;
  venue_name: string;
  address: string;
  district: string;
  end_date: string;
  melaDesc: string;
  start_date: string;
  venueType?: "In Person" | "Online";
}

export interface CandidateData {
  firstName: string;
  middleName: string | null;
  lastName: string;
  gender: string;
  dob: string;
  mobile: string;
  caste: string;
  religion: string;
  qualification: string;
}

export interface EmployerData {
  companyName: string;
  contactPerson: string;
  email: string;
  mobile: string;
}

export interface CandidateUser  {
  type: "candidate";
  data: CandidateData;
};

export interface EmployerUser {
  type: "employer";
  data: EmployerData;
};

export type User = CandidateUser | EmployerUser;