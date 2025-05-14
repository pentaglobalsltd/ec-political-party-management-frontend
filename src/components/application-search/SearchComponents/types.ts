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
  userType?: string;
  allSelectedData?: RefreshDataType;
  title?: string;
  loading?: boolean;
}
