import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { CREATE_IMMOVABLE_PROPERTY, GET_IMMOVABLE_PROPERTY } from './types';

import {
  ImmovablePropertyPropType,
  ImmovablePropertyType,
} from '@type/candidate-info-management/operator-view/affidavit-form/immovable-property';

export const createImmovablePropertyRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
  data,
}: ImmovablePropertyPropType) => {
  return {
    type: CREATE_IMMOVABLE_PROPERTY.CREATE_IMMOVABLE_PROPERTY_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
      data,
    } as const,
  };
};
export const createImmovablePropertyInitialState = () => {
  return {
    type: CREATE_IMMOVABLE_PROPERTY.CREATE_IMMOVABLE_PROPERTY_INITIAL_STATE,
  };
};
export const createImmovablePropertySuccess = (data: ImmovablePropertyType) => {
  return {
    type: CREATE_IMMOVABLE_PROPERTY.CREATE_IMMOVABLE_PROPERTY_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const createImmovablePropertyFailed = () => {
  return {
    type: CREATE_IMMOVABLE_PROPERTY.CREATE_IMMOVABLE_PROPERTY_FAILED,
  } as const;
};

export const getImmovablePropertyRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes) => {
  return {
    type: GET_IMMOVABLE_PROPERTY.GET_IMMOVABLE_PROPERTY_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
    },
  } as const;
};

export const getImmovablePropertySuccess = (data: ImmovablePropertyType) => {
  return {
    type: GET_IMMOVABLE_PROPERTY.GET_IMMOVABLE_PROPERTY_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const getImmovablePropertyFailed = () => {
  return {
    type: GET_IMMOVABLE_PROPERTY.GET_IMMOVABLE_PROPERTY_FAILED,
  } as const;
};

export type ImmovablePropertyActions =
  | ReturnType<typeof createImmovablePropertyRequest>
  | ReturnType<typeof createImmovablePropertySuccess>
  | ReturnType<typeof createImmovablePropertyFailed>
  | ReturnType<typeof createImmovablePropertyInitialState>
  | ReturnType<typeof getImmovablePropertyRequest>
  | ReturnType<typeof getImmovablePropertySuccess>
  | ReturnType<typeof getImmovablePropertyFailed>;
