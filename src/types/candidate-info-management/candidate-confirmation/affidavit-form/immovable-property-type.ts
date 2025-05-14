import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';

export interface ImmovablePropertyType {
  immovableAssets?: ImmovablePropertyChildType[];
}
export interface ImmovablePropertyChildType {
  id?: number;
  serialNo?: number;
  label?: string;
  self?: string;
  spouse?: string;
  dependent?: string;
  jointOwnership?: string;
  shareInJointOwnership?: string;
}
export interface ImmovablePropertyPropType extends UrlIdTypes {
  data: {
    immovableAssets?: ImmovablePropertyChildType[];
  };
  status?: number;
  statusText?: string;
}
