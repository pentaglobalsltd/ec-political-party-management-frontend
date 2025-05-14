import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';

export interface MovablePropertyType {
  movableAssets?: MovablePropertySingleType[];
}
export interface MovablePropertySingleType {
  id?: number;
  serialNo?: number;
  label?: string;
  self?: string;
  spouse?: string;
  dependent?: string;
}
export interface MovablePropertyPropType extends UrlIdTypes {
  data: {
    movableAssets?: MovablePropertySingleType[];
  };
}
export interface MovablePropertySingleType {
  id?: number;
  serialNo?: number;
  label?: string;
  self?: string;
  spouse?: string;
  dependent?: string;
}
