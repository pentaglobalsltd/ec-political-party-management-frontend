import { ReactNode } from 'react';

export interface allDataProps {
  [key: string]: any;
}
export interface RefreshDataType {
  [key: string]: boolean | undefined;
}
export interface StructTypes {
  fieldName: string;
  title?: string;
  apiService?: string;
  pathParamsDependency?: allDataProps;
  displayDependency?: {
    value?: string[] | number[];
    watchId?: string;
  }[];
  queryParamsDependency?: allDataProps;
  refreshData?: RefreshDataType;
  nonRefreshData?: RefreshDataType;
  notDisplay?: boolean;
  userTypeCode?: string;
  dependentDefaultValue?: {
    dependentOn: string;
    dependentOnValue: string | number;
    ownDefaultValue: string | number;
  }[];
  titleElement?: string | React.ReactNode;
  electionUserDataUsingApi?: boolean;
  optionalQueryParams?: boolean;
}
export interface SearchComponentProps {
  struct: StructTypes[];
  onSubmitHandler?: (data: any) => void;
  totalCol?: string;
  colSpan?: string;
  requiredField?: string[];
  conditionalRequiredField?: {
    fieldName: string;
    value?: string[] | number[];
    watchId?: string;
  }[];
  isActiveElectionSchedule?: boolean;
  userType?: string;
  allSelectedData?: RefreshDataType;
  submitButtonDisabled?: boolean;
  nominationStatusCodes?: string;
  paymentType?: string;
  title?: string;
  customClass?: string;
  loading?: boolean;
  selectAny?: boolean;
  isSetSearchParams?: boolean;
  isPublishButton?: boolean;
  getElectionSettingsIdForAdmin?: boolean;
  isDetailedButton?: boolean;
  isBriefButton?: boolean;
  showSubmitButton?: boolean;
  isBriefButtonOptions?: any;
  isDetailedButtonOptions?: any;
  nonVisibleCandidateType?: number[];
  defaultFromDate?: string;
  defaultToDate?: string;
  titleElement?: string | React.ReactNode;
  isBriefButtonLabel?: string;
  isDetailedButtonLabel?: string;
  ignoreOnlineDraft?: boolean;
  children?: ReactNode;
  userTypeCodesIncludingAll?: boolean;
  isGetWatch?: boolean;
  getScheduleDate?: boolean;
  handleSearchWatch?: (data: any) => void;
  defaultYear?: string;
  defaultMonth?: number;
}
