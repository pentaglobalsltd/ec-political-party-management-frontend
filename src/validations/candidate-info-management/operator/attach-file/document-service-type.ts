export interface DocumentServiceType {
  documentId?: string;
  fileId?: string;
  filename?: string;
  fileType?: string;
}
export interface DocumentServiceTypeResponse {
  data: DocumentServiceType;
  status: number;
}

export interface GetDocumentServiceTypeProp {
  docId: string;
  fileId: string;
  formatId?: number | string;
}
export interface GetImageTypeResponse {
  data: string;
  status?: number;
  statusText?: string;
}
