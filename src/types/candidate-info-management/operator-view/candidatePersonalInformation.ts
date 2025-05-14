import { UrlIdTypes } from '../candidate-confirmation/url-id-types';

export interface CandidateChildUrlType extends UrlIdTypes {
  childId?: string | number;
}

export interface CreateCandidateInfoPropsType extends UrlIdTypes {
  data: CandidatePersonalInformationType;
}

export interface CandidateChildPropsType extends UrlIdTypes {
  childId?: string | number;
}

export interface UpdateCandidatePropsType extends UrlIdTypes {
  data: ChildType;
  childId?: string | number;
}

export interface PersonalInformation {
  name?: string;
  nid?: string;
  fatherName?: string;
  motherName?: string;
  spouseName?: string;
  dob?: string;
  age?: string;
  birthPlace?: number;
  birthPlaceAddress?: string;
  gender?: string;
  maritalStatus?: string;
  occupation?: string;
  spouseOccupation?: string;
  tin?: string;
  permanentAddress?: string;
  mailingAddress?: string;
  phone?: string;
  telephone?: string;
  email?: string;
  occupationalAddress?: string;
}

export interface ChildType {
  idx?: number | string;
  id?: number | string;
  name?: string;
  childName?: string;
  education?: string;
  dob?: string;
  childDob?: string;
  occupationAndOfficeAddress?: string;
  maritalStatus?: string;
  childMaritalStatus?: string;
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
}

export interface CandidateChildrenType {
  childrens: ChildType[];
}
