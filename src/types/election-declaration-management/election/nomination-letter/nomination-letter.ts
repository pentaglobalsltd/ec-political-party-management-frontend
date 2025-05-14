export interface NominationLetterListParams {
  page?: number;
  size?: number;
  electionTypeId: string | number;
  candidateTypeId: string | number;
}

export interface NominationLetterType {
  id: number;
  electionType: {
    electionTypeId: number;
    electionTypeNameEn: string;
    electionTypeNameBn: string;
  };
  candidateType: {
    candidateTypeId: number;
    candidateTypeNameEn: string;
    candidateTypeNameBn: string;
  };
  file: FileType;
  isActive: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface FileType {
  documentId: string;
  fileId?: string;
  filename?: string;
  fileType?: string;
}

export interface NominationLetterListType {
  page?: number;
  size?: number;
  total?: number;
  nominationForms?: NominationLetterType[];
}

export interface NominationLetterListResponse {
  data: NominationLetterListType;
  status: number;
  statusText: string;
}
