import { useEffect, useState } from 'react';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { ImmovablePropertyType } from '@type/candidate-info-management/candidate-confirmation/affidavit-form/immovable-property-type';
import { getImmovableProperty } from '@api/candidate-info-management/candidate-confirmation/affidavit-form/immovable-property';

export const useAffidavitImmovableProperty = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes) => {
  const [affidavitImmovablePropertyData, setAffidavitImmovablePropertyData] =
    useState<ImmovablePropertyType>();

  useEffect(() => {
    try {
      getImmovableProperty({
        electionSettingsId,
        candidateElectionDetailsId,
      }).then((response) => {
        if (response?.data?.status === 200) {
          setAffidavitImmovablePropertyData(response?.data?.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [electionSettingsId, candidateElectionDetailsId]);

  return {
    affidavitImmovablePropertyData,
  };
};
