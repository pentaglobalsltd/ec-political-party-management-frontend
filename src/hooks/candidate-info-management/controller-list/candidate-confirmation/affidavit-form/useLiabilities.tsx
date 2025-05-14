import { useEffect, useState } from 'react';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { LiabilitiesType } from '@type/candidate-info-management/candidate-confirmation/affidavit-form/liabilities-type';
import { getLiabilities } from '@api/candidate-info-management/candidate-confirmation/affidavit-form/liabilities';

export const useAffidavitLiabilities = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes) => {
  const [affidavitLiabilities, setAffidavitLiabilities] =
    useState<LiabilitiesType>();

  useEffect(() => {
    try {
      getLiabilities({
        electionSettingsId,
        candidateElectionDetailsId,
      }).then((response) => {
        if (response?.data?.status === 200) {
          setAffidavitLiabilities(response?.data?.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [electionSettingsId, candidateElectionDetailsId]);

  return {
    affidavitLiabilities,
  };
};
