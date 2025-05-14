import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { DocumentServiceType } from './document-service-type';

export interface AttachFileType {
  candidateImage?: DocumentServiceType;
  candidateHalafnama?: DocumentServiceType;
  candidateIncomeTax?: DocumentServiceType;
  candidateSupporters?: DocumentServiceType;
  candidateExpenditure?: DocumentServiceType;
  candidateEducationalCertificate?: DocumentServiceType;
  candidateUtilityBill?: DocumentServiceType;
  candidateOthers?: DocumentServiceType;
}

export interface CreateAttachFileProp extends UrlIdTypes {
  data: AttachFileType;
}
