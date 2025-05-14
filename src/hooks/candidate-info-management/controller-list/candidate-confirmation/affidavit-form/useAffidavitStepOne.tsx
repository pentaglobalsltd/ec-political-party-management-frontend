import { useEffect, useState } from 'react';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { AffidavitStepOneType } from '@type/candidate-info-management/candidate-confirmation/affidavit-form/affidavit-step-one-type';
import { getAffidavitStepOne } from '@api/candidate-info-management/candidate-confirmation/affidavit-form/affidavit-step-one';
import {
  PastCaseType,
  PresentCaseType,
} from '@type/candidate-info-management/operator-view/affidavit-form/affidavit-step-one';

const mapAffidavitStepOneData = (data: AffidavitStepOneType) => {
  return {
    ...data,

    pastCases: data?.pastCases?.map(
      (pastCase: PastCaseType, index: number) => ({
        ...pastCase,
        idx: index + 1,
      }),
    ),
    presentCases: data?.presentCases?.map(
      (presentCase: PresentCaseType, index: number) => ({
        ...presentCase,
        idx: index + 1,
      }),
    ),
  };
};

export const useAffidavitStepOne = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes) => {
  const [affidavitStepOneData, setAffidavitStepOneData] =
    useState<AffidavitStepOneType>();

  useEffect(() => {
    try {
      getAffidavitStepOne({
        electionSettingsId,
        candidateElectionDetailsId,
      }).then((response) => {
        if (response?.data?.status === 200) {
          const mappedData = mapAffidavitStepOneData(response?.data?.data);

          setAffidavitStepOneData(mappedData);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [electionSettingsId, candidateElectionDetailsId]);

  return {
    affidavitStepOneData,
  };
};
