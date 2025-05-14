export interface CandidateTypeTypes {
  id?: number;
  name?: string;
  nameBn?: string;
  nameEn?: string;
  electionTypeId?: number;
  electionTypeNameBn?: string;
  electionTypeNameEn?: string;
  priorityLevel?: number;
  jamanatAmount?: number;
  nominationPaper?: {
    documentId?: string;
    fileId?: string;
    filename?: string;
    fileType?: string;
  };
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetCandidateTypeResponseTypes {
  data?: CandidateTypeTypes;
  status?: number;
  statusText?: string;
}
