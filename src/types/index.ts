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
  pklEntityId: number;
  companyName: string;
  roleId: number;
  userName: string;
  companyAddress: string;
  companyEmail: string;
  companyMobile: string;
  companyPinCode: string;
  empTypeId: number;
  organizationTypeId: number | null;
  organizationTypeName: string | null;
}

export interface MelaAdminData {
  fklMelaId: number;
  pklLoginId: number;
  pklRoleId: number;
  venueName: string;
  vsLoginName: string;
  vsPassword: string;
  vsRoleName: string;
}

export interface CandidateUser {
  type: "candidate";
  data: CandidateData;
}

export interface EmployerUser {
  admin_id: number;
  login_name: string;
  type: "Employer";
  data: EmployerData[];
}

export interface MelaAdmin {
  type: "Mela Admin";
  admin_id: number;
  login_name: string;
  data: MelaAdminData;
}

export type User = CandidateUser | EmployerUser | MelaAdmin;

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
