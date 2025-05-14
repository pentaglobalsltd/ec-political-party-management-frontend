import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  createMovablePropertyRequest,
  getMovablePropertyRequest,
} from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/movable-property-actions';
import { useAppSelector } from '@helpers/redux';
import {
  MovablePropertyPropType,
  MovablePropertyType,
} from '@type/candidate-info-management/operator-view/affidavit-form/movable-property';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { MovablePropertyState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/affidavit-form/movable-property-state';
import { getMovablePropertyState } from '@selectors/candidate-info-management/operator-view/candidate-management/affidavit-form/movable-property-selector';

interface UseMovableProperty {
  isCreateRequested: boolean;
  isCreateSuccess: boolean;
  isUpdateRequested: boolean;
  isUpdateSuccess: boolean;
  movableProperty: MovablePropertyType;
  createAffidavitMovableProperty: (event: MovablePropertyPropType) => void;
}

export const useMovableProperty = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes): UseMovableProperty => {
  const dispatch = useDispatch();
  const { createMovableProperty, getMovableProperty, updateMovableProperty } =
    useAppSelector<MovablePropertyState>(getMovablePropertyState);

  const isCreateRequested = Boolean(createMovableProperty?.request);
  const isCreateSuccess = Boolean(createMovableProperty?.success);

  const isUpdateRequested = Boolean(updateMovableProperty?.request);

  const isUpdateSuccess = Boolean(updateMovableProperty?.success);

  const movableProperty = getMovableProperty?.data || {};

  useEffect(() => {
    if (electionSettingsId && candidateElectionDetailsId) {
      dispatch(
        getMovablePropertyRequest({
          electionSettingsId,
          candidateElectionDetailsId,
        }),
      );
    }
  }, [dispatch, electionSettingsId, candidateElectionDetailsId]);

  const createAffidavitMovableProperty = ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
  }: MovablePropertyPropType) => {
    dispatch(
      createMovablePropertyRequest({
        data,
        electionSettingsId,
        candidateElectionDetailsId,
      }),
    );
  };

  return {
    isCreateRequested,
    isCreateSuccess,
    isUpdateRequested,
    isUpdateSuccess,
    movableProperty: movableProperty,
    createAffidavitMovableProperty,
  };
};
