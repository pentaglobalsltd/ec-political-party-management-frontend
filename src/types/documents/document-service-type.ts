export interface DocumentServiceType {
  [key: string]: any;
  documentId?: string;
  fileId?: string;
  filename?: string;
  fileType?: string;
  fileSize?: number;
}
export interface DocumentServiceTypeResponse {
  data: DocumentServiceType;
  status: number;
}

export interface GetDocumentServiceTypeProp {
  docId: string;
  fileId: string;
}
