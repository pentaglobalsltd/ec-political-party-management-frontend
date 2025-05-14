import { FirstStepAffidavitFormValidationSchemaType } from '@validations/candidate-info-management/operator/affidavit/firstStepAffidavitFormValidation';

export interface GenericAffidavitFirstPartProps {
  electionTypeKey?: string;
  candidateTypeKey?: string;
  affidavitFormStepOne?: FirstStepAffidavitFormValidationSchemaType;
  submitData?: boolean;
  openCaseEditModal: (caseId?: string | number, caseType?: string) => void;
  handleButtonDisable: (value: boolean) => void;
}
