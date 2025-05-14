export interface ModalStates {
  isErrorModalOpen?: boolean;
  isSubmitModalOpen?: boolean;
  isPreviewModalOpen?: boolean;
  errorText?: string;
}

export interface ButtonStates {
  disableButton?: boolean;
  isSubmitBtnLoading?: boolean;
  submittedData?: any;
}
