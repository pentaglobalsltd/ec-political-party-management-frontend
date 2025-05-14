import { useEffect, useState } from 'react';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { MovablePropertyType } from '@type/candidate-info-management/candidate-confirmation/affidavit-form/movable-property-type';
import { getMovableProperty } from '@api/candidate-info-management/candidate-confirmation/affidavit-form/movable-property';

export const useAffidavitMovableProperty = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes) => {
  const [affidavitMovablePropertyData, setAffidavitMovablePropertyData] =
    useState<MovablePropertyType>();

  useEffect(() => {
    try {
      getMovableProperty({
        electionSettingsId,
        candidateElectionDetailsId,
      }).then((response) => {
        if (response?.data?.status === 200) {
          setAffidavitMovablePropertyData(response?.data?.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [electionSettingsId, candidateElectionDetailsId]);

  return {
    affidavitMovablePropertyData,
  };
};
