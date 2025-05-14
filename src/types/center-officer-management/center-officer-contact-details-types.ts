import { Pagination } from '@api/miscellaneous/types';

export interface CenterOfficerContactDetailsSearchProps {
  electionScheduleId?: string | number;
  zillaId?: string | number;
  upazilaId?: string | number;
  unionOrWardId?: string | number;
  voterType?: string;
  userTypeCode?: string;
  isPersonnelExists?: boolean;
  searchValue?: string;
}

export interface PollingCenterTypes {
  id?: number;
  pollingCenterName?: string;
  pollingCenterSerial?: string;
  pollingCenterDescription?: string;
  pollingPersonnelName?: string;
  pollingPersonnelPhone?: string;
  pollingPersonnelDesignation?: string;
  pollingPersonnelBasicSalary?: number;
  pollingPersonnelNID?: string;
  pollingPersonnelPermanentAddress?: string;
  pollingPersonnelCenterId?: number;
  pollingPersonnelType?: string;
  isCredentialSent?: boolean;
  createdAt?: string;
}

export interface CenterOfficerContactDetails extends Pagination {
  pollingCenters: PollingCenterTypes[];
}

export interface GetCenterOfficerContactDetailsProps {
  data: CenterOfficerContactDetails;
  status?: number;
  statusText?: string;
}
