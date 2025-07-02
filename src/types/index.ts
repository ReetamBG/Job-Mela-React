// Mela related Types
export interface Mela {
  pklMelaId: number;
  vsVenueName: string;
  vsAddress: string;
  vsDistrict: string;
  bActive: boolean;
  vsDescription: string;
  dtStartDate: string;
  dtEndDate: string;
  dtSlotStartTime: string;
  dtSlotEndTime: string;
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

// User data related Types
export interface CandidateData {
  pklCandidateId: number;
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

export interface CandidateUser {
  type: "candidate";
  data: CandidateData;
}

export interface EmployerUser {
  type: "employer";
  data: EmployerData;
}

export type User = CandidateUser | EmployerUser;

// Company related Types
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

export interface JobPosting {
  address: string;
  comDesc: string;
  company_name: string;
  district: string;
  email: string;
  end_date: string;
  fklEmployerId: number;
  fklmela_no: number;
  isVarified: number;
  job_id: number;
  min_fklqualificationId: number;
  phone_no: string;
  post_name: string;
  registration_no: string;
  remarks: string | null;
  sl_no: number;
  start_date: string;
  vacancy: number;
  venue_name: string;
  vsQualification: string;
  isApplied?: number;
  isEligible?: number;
  vsSelectionProcedure: "online" | "offline";
}
