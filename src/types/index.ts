export interface Company {
  company_name: string;
  comDesc: string;
  district: string;
  fklEmployerId: number;
  fklmela_no: number;
  venue_name: string;
  vsQualification: string;
  phone_no: string
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