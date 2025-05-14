import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { CREATE_MOVABLE_PROPERTY, GET_MOVABLE_PROPERTY } from './types';

import {
  MovablePropertyPropType,
  MovablePropertyType,
} from '@type/candidate-info-management/operator-view/affidavit-form/movable-property';

export const createMovablePropertyRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
  data,
}: MovablePropertyPropType) => {
  return {
    type: CREATE_MOVABLE_PROPERTY.CREATE_MOVABLE_PROPERTY_REQUEST,
    payload: {
      data,
      electionSettingsId,
      candidateElectionDetailsId,
    } as const,
  };
};
export const createMovablePropertyInitialState = () => {
  return {
    type: CREATE_MOVABLE_PROPERTY.CREATE_MOVABLE_PROPERTY_INITIAL_STATE,
  };
};

export const createMovablePropertySuccess = (data: MovablePropertyType) => {
  return {
    type: CREATE_MOVABLE_PROPERTY.CREATE_MOVABLE_PROPERTY_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const createMovablePropertyFailed = () => {
  return {
    type: CREATE_MOVABLE_PROPERTY.CREATE_MOVABLE_PROPERTY_FAILED,
  } as const;
};

export const getMovablePropertyRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes) => {
  return {
    type: GET_MOVABLE_PROPERTY.GET_MOVABLE_PROPERTY_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
    },
  } as const;
};

export const getMovablePropertySuccess = (data: MovablePropertyType) => {
  return {
    type: GET_MOVABLE_PROPERTY.GET_MOVABLE_PROPERTY_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const getMovablePropertyFailed = () => {
  return {
    type: GET_MOVABLE_PROPERTY.GET_MOVABLE_PROPERTY_FAILED,
  } as const;
};

export type MovablePropertyActions =
  | ReturnType<typeof createMovablePropertyRequest>
  | ReturnType<typeof createMovablePropertySuccess>
  | ReturnType<typeof createMovablePropertyFailed>
  | ReturnType<typeof createMovablePropertyInitialState>
  | ReturnType<typeof getMovablePropertyRequest>
  | ReturnType<typeof getMovablePropertySuccess>
  | ReturnType<typeof getMovablePropertyFailed>;
