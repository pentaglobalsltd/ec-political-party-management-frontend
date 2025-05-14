import { DocumentServiceType } from '@type/documents/document-service-type';
import { MaritalStatusType } from './marital-statuses';

export interface ChildType {
  idx?: number | string;
  id?: number | string;
  name?: string;
  education?: string;
  dob?: string;
  occupationAndOfficeAddress?: string;
  maritalStatus?: string;
}

export interface CandidateChildrenType {
  maritalStatuses?: MaritalStatusType[];
  childrenInfo?: ChildType[];
}

export interface CandidatePersonalInformationType {
  name?: string;
  nid?: string;
  fatherName?: string;
  motherName?: string;
  spouseName?: string;
  dob?: string;
  age?: string;
  birthPlaceZillaId?: string | number;
  birthPlaceZilla?: {
    id?: number | string;
    nameBn?: string;
    nameEn?: string;
  };
  birthPlace?: string;
  birthPlaceAddress?: string;
  gender?: string;
  maritalStatus?: string;
  occupation?: string;
  spouseOccupation?: string;
  tin?: string;
  permanentAddress?: string;
  presentAddress?: string;
  mailingAddress?: string;
  phone?: string;
  telephone?: string;
  email?: string;
  occupationalAddress?: string;
  childrenInfo?: ChildType[];
  image?: DocumentServiceType;
}

export interface CandidatePersonalInformationTypeRes {
  data: CandidatePersonalInformationType;
  status?: number;
  statusText?: string;
}
