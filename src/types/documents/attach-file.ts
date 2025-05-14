import { DocumentServiceType } from './document-service-type';

export interface AttachFileType {
  candidateImage?: DocumentServiceType;
  candidateVoterListReceipt?: DocumentServiceType;
  candidateHalafnama?: DocumentServiceType;
  candidatePoliticalNomination?: DocumentServiceType;
  candidateIncomeTax?: DocumentServiceType;
  candidateSupporters?: DocumentServiceType;
  candidateExpenditure?: DocumentServiceType;
  candidateEducationalCertificate?: DocumentServiceType;
  candidateUtilityBill?: DocumentServiceType;
  candidateOthers?: DocumentServiceType;
}

export interface AttachFileTableData {
  id: number | string;
  fileName: string;
  comment: string;
  procedure?: DocumentServiceType;
}

export interface DownloadFileIdType {
  documentId?: string;
  fileId?: string;
  formatId?: number | string;
  fileType?: string;
  generateLinkOnly?: boolean;
  filePath?: string | number;
}

export interface AttachFileTypeRes {
  data: AttachFileType;
  status?: number;
  statusText?: string;
}

export interface DownloadFileIdTypeRes {
  data: any;
  status?: number;
  statusText?: string;
}
