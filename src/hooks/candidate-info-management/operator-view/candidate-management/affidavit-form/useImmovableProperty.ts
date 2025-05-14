import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  ImmovablePropertyPropType,
  ImmovablePropertyType,
} from '@type/candidate-info-management/operator-view/affidavit-form/immovable-property';

import {
  createImmovablePropertyRequest,
  getImmovablePropertyRequest,
} from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/immovable-property-actions';
import { useAppSelector } from '@helpers/redux';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { ImmovablePropertyState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/affidavit-form/immovable-property-state';
import { getImmovablePropertyState } from '@selectors/candidate-info-management/operator-view/candidate-management/affidavit-form/immovable-property-selector';

interface UseImmovableProperty {
  isCreateRequested: boolean;
  isCreateSuccess: boolean;
  isUpdateRequested: boolean;
  isUpdateSuccess: boolean;
  immovableProperty: ImmovablePropertyType;
  createAffidavitImmovableProperty: (event: ImmovablePropertyPropType) => void;
}
export const useImmovableProperty = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes): UseImmovableProperty => {
  const dispatch = useDispatch();
  const {
    createImmovableProperty,
    getImmovableProperty,
    updateImmovableProperty,
  } = useAppSelector<ImmovablePropertyState>(getImmovablePropertyState);

  const isCreateRequested = Boolean(createImmovableProperty?.request);
  const isCreateSuccess = Boolean(createImmovableProperty?.success);

  const isUpdateRequested = Boolean(updateImmovableProperty?.request);

  const isUpdateSuccess = Boolean(updateImmovableProperty?.success);

  const immovableProperty = getImmovableProperty?.data || {};

  useEffect(() => {
    if (electionSettingsId && candidateElectionDetailsId) {
      dispatch(
        getImmovablePropertyRequest({
          electionSettingsId,
          candidateElectionDetailsId,
        }),
      );
    }
  }, [dispatch, electionSettingsId, candidateElectionDetailsId]);

  const createAffidavitImmovableProperty = ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
  }: ImmovablePropertyPropType) => {
    dispatch(
      createImmovablePropertyRequest({
        electionSettingsId,
        candidateElectionDetailsId,
        data,
      }),
    );
  };

  return {
    isCreateRequested,
    isCreateSuccess,
    isUpdateRequested,
    isUpdateSuccess,
    immovableProperty,
    createAffidavitImmovableProperty,
  };
};
