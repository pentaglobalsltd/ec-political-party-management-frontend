import { DocumentServiceType } from '@type/documents/document-service-type';
import { UrlIdTypes } from './url-id-types';

export interface candidatePersonalInfoType {
  nameEn?: string;
  nameBn?: string;
  candidateTypeNameEn?: string;
  candidateTypeNameBn?: string;
  constituencyNameBn?: string;
  constituencyNameEn?: string;
  scheduleNameEn?: string;
  scheduleNameBn?: string;
  amount?: number;
}

export interface ManualPaymentType {
  id?: string | number;
  amount?: number;
  chalanNumber?: string;
  chalanNo?: string;
  chalanDate?: string;
  depositedIn?: string;
  depositedType?: string;
  zilla?: {
    id?: number;
    nameBn?: string;
    nameEn?: string;
  };
  region?: {
    id?: number;
    nameBn?: string;
    nameEn?: string;
  };
  regionId?: number;
  bank?: {
    id?: number;
    nameBn?: string;
    nameEn?: string;
  };
  bankId?: number;
  branchName?: string;
  file?: DocumentServiceType;
  electionScheduleId?: string;
  electionScheduleName?: string;
}

export interface SpgPaymentType {
  id?: number | string;
  status?: string;
  msg?: string;
  tranId?: string;
  tranDate?: string;
  invoiceNo?: string;
  invoiceDate?: string;
  applicationName?: string;
  applicationContactNo?: string;
  totalAmount?: number;
  paymentStatus?: string;
  payMode?: string;
  payAmount?: number;
  vat?: number;
  commission?: number;
  scrollNo?: string;
  paymentInitiatorServiceId?: number;
  paymentInitiatorServiceType?: string;
  paymentGatewayType?: string;
  candidateMobileNumber?: string;
  candidateName?: string;
  candidatePoliticalParty: string;
  electionScheduleId?: string;
  electionScheduleName?: string;
}

export interface SslPaymentType {
  id?: number | string;
  status?: string;
  tranId?: string;
  tranDate?: string;
  amount?: number;
  storeAmount?: number;
  cardNo?: string;
  cardType?: string;
  currency?: string;
  bankTranId?: string;
  cardIssuer?: string;
  cardBrand?: string;
  cardIssuerCountry?: string;
  cardIssuerCountryCode?: string;
  currencyType?: string;
  currencyAmount?: number;
  valueA?: string;
  riskTitle?: string;
  paymentInitiatorServiceId?: number;
  paymentInitiatorServiceType?: string;
  paymentGatewayType?: string;
  electionScheduleId?: string;
  electionScheduleName?: string;
}

export interface AChalanPaymentType {
  id?: number | string;
  status?: string;
  transactionId?: string;
  electionScheduleId?: string;
  electionScheduleName?: string;
  message?: string;
  paymentId?: string;
  challanNo?: string;
  paidAmount?: string;
  entryDate?: string;
  paymentDate?: string;
  tin?: symbol;
  bin?: string;
  clientName?: string;
  mobileNo?: string;
  email?: string;
  address?: string;
  bankName?: string;
  routingNo?: string;
  usedFlag?: string;
  paymentGatewayType?: string;
  paymentInitiatorServiceId?: number;
  paymentInitiatorServiceType?: string;
}

export interface JamanatType {
  paymentType?: string;
  manualPayment?: ManualPaymentType;
}

export interface CollateralFormType {
  [key: string]: string;
}

export interface GetJamanatPropsType {
  alreadyPaid?: boolean;
  paymentType?: string;
  candidatePersonalInfo?: candidatePersonalInfoType;
  spgPayment?: SpgPaymentType[];
  sslPayment?: SslPaymentType[];
  achallanPayment?: AChalanPaymentType[];
  manualPayment?: ManualPaymentType;
}

export interface UpdateJamanatPropsType extends UrlIdTypes {
  data: ManualPaymentType;
}
