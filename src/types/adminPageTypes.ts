// Admin Page related Types

export interface Candidate {
  candidateId: number;
  firstName: string;
  middleName: string | null;
  lastName: string;
  fullName: string;
  dob: string;
  gender: string;
  religion: string;
  caste: string;
  qualification: string;
  mobile: string;
  fklmela_no: number;
  melaName: string;
}

export interface Company {
  companyName: string;
  pklEntityId: number;
  roleId: number;
  companyEmail: string;
  companyMobile: string;
  organizationTypeId: number | null;
  organizationTypeName: string | null;
  userName: string;
  empTypeId: number | null;
  empTypeName: string | null;
  companyAddress: string | null;
  companyPinCode: string | null;
  createdAt: string | null;
  melaId: number;
}

export interface Job {
  companyName: string;
  jobName: string;
  jobId: number;
  vacancy: number;
  minimumQualification: string;
  qualificationId: number;
  selectionProcedure: string;
  appliedCandidateCount: number;
  pklEntityId: number;
  organizationTypeId: number | null;
  organizationTypeName: string | null;
  empTypeId: number | null;
  empTypeName: string | null;
  melaId: number;
}

export interface AppliedJob {
  job_id: number;
  post_name: string;
  vacancy: number;
  vsSelectionProcedure: string;
  fklmela_no: number;
  min_fklqualificationId: number;
  company_name: string;
  fklEmployerId: number;
  companyAddress: string;
  companyPinCode: number;
  createdAt: string;
  vsQualification: string;
  candidateId: number;
  candidateName: string;
}
