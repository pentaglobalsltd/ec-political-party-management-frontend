import { Pagination } from '@api/miscellaneous/types';
import { FileType } from '@type/candidate-info-management/nomination-list-type';

export interface ElectionSettingsDetailsById {
  id?: number;
  electionSettingsId?: number;
  firstMeetingDate?: string;
  firstMeetingFile?: FileType;
  swearDate?: string;
  swearFile?: FileType;
  gazettePublishDate?: string;
  gazettePublishFile?: FileType;
  isCaseAvailable?: boolean;
  caseLastInfo?: string;
  caseLastInfoFile?: FileType;
  electionAreaReorganized?: string;
  isVacant?: boolean;
  vacantDate?: string;
  vacantInfo?: string;
  vacantComment?: string;
  vacantFile?: FileType;
  matureDate?: string;
  resultPublishDate?: string;
  resultPublishFile?: FileType;
  nextDateOfElection?: string;
  nextDateOfReElection?: string;
  isActive?: boolean;
}
export interface ElectionSettingsDetailsProps {
  data: ElectionSettingsDetailsById;
  status?: number;
  statusText?: string;
}

export interface ElectionSettingsDetailsGet {
  id?: number;
  electionSettingsId?: number;
  electionScheduleNameBn?: string;
  zillaNameBn?: string;
  municipalityNameBn?: string;
  electionSettingsNameBn?: string;
  candidateTypeNameBn?: string;
  firstMeetingDate?: string;
  firstMeetingFile?: {
    documentId?: string;
    fileId?: string;
    filename?: string;
    fileType?: string;
    filePath?: string;
    category?: string;
  };
  swearDate?: string;
  swearFile?: {
    documentId?: string;
    fileId?: string;
    filename?: string;
    fileType?: string;
    filePath?: string;
    category?: string;
  };
  gazettePublishDate?: string;
  gazettePublishFile?: {
    documentId?: string;
    fileId?: string;
    filename?: string;
    fileType?: string;
    filePath?: string;
    category?: string;
  };
  isCaseAvailable?: boolean;
  caseLastInfo?: string;
  caseLastInfoFile?: {
    documentId?: string;
    fileId?: string;
    filename?: string;
    fileType?: string;
    filePath?: string;
    category?: string;
  };
  electionAreaReorganized?: string;
  isVacant?: boolean;
  vacantDate?: string;
  vacantInfo?: string;
  vacantComment?: string;
  vacantFile?: {
    documentId?: string;
    fileId?: string;
    filename?: string;
    fileType?: string;
    filePath?: string;
    category?: string;
  };
  matureDate?: string;
  resultPublishDate?: string;
  resultPublishFile?: {
    documentId?: string;
    fileId?: string;
    filename?: string;
    fileType?: string;
    filePath?: string;
    category?: string;
  };
  dateOfElection?: string;
  nextDateOfElection?: string;
  nextDateOfReElection?: string;
  constituency?: {
    id?: number;
    nameBn?: string;
    nameEn?: string;
    electionSettingsId?: number;
    candidateTypeId?: number;
    electionTypeId?: number;
    isActive?: boolean;
  };
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ElectionSettingsDetailsGetList extends Pagination {
  electionSettingsDetails: ElectionSettingsDetailsGet[];
}

export interface ElectionSettingsDetailsGetListProps {
  data: ElectionSettingsDetailsGetList;
  status?: number;
  statusText?: string;
}
