import { useEffect, useState } from 'react';
import { getCandidatePersonalInformation } from '@api/candidate-info-management/candidate-confirmation/personal-info';
import {
  CandidatePersonalInformationType,
  ChildType,
} from '@type/candidate-info-management/candidate-confirmation/persona-info';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { getAge } from '@utils/age-calculation';

interface UseCandidatePersonalInfoPropType {
  candidatePersonalInfo: CandidatePersonalInformationType;
}

function mapCandidateChildrenInfo(
  data: CandidatePersonalInformationType,
  lang: string | null,
) {
  return {
    ...data,
    birthPlaceZillaId:
      lang === LANGUAGE.BANGLA
        ? data?.birthPlaceZilla?.nameBn
        : data?.birthPlaceZilla?.nameEn,
    age: getAge(data?.dob),
    childrenInfo: data?.childrenInfo?.map((item: ChildType, index) => ({
      ...item,
      id: index + 1,
    })),
  };
}

export const useCandidatePersonalInfo = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes): UseCandidatePersonalInfoPropType => {
  const { language } = useLanguage();

  const [candidatePersonalInfo, setCandidatePersonalInfo] =
    useState<CandidatePersonalInformationType>({});

  useEffect(() => {
    try {
      getCandidatePersonalInformation({
        electionSettingsId,
        candidateElectionDetailsId,
      }).then((response) => {
        const data = mapCandidateChildrenInfo(response?.data?.data, language);
        if (response?.data?.status === 200) {
          setCandidatePersonalInfo(data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [candidateElectionDetailsId, electionSettingsId, language]);

  return {
    candidatePersonalInfo,
  };
};
