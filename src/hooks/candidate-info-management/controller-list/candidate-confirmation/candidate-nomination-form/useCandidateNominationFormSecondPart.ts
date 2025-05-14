import { useEffect, useState } from 'react';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SecondPartType } from '@type/candidate-info-management/operator-view/candidate-nomination-form/second-part';
import { getCandidateNominationFormSecondPart } from '@api/candidate-info-management/candidate-confirmation/candidate-nomination-form/second-part';

function mapCandidateNominationFormSecondPart(
  data: SecondPartType,
  lang: string | null,
) {
  return {
    ...data,

    supporter: {
      ...data?.supporter,
      zillaName:
        lang === LANGUAGE.BANGLA
          ? data?.supporter?.zilla?.nameBn
          : data?.supporter?.zilla?.nameEn,
      voterAreaName:
        lang === LANGUAGE.BANGLA
          ? data?.supporter?.voterArea?.nameBn
          : data?.supporter?.voterArea?.nameEn,
      regionId:
        lang === LANGUAGE.BANGLA
          ? data?.supporter?.region?.nameBn
          : data?.supporter?.region?.nameEn,
      constituencyName:
        lang === LANGUAGE.BANGLA
          ? data?.supporter?.constituency?.nameBn
          : data?.supporter?.constituency?.nameEn,
      upazilaName:
        lang === LANGUAGE.BANGLA
          ? data?.supporter?.upazila?.nameBn
          : data?.supporter?.upazila?.nameEn,
      rmoName:
        lang === LANGUAGE.BANGLA
          ? data?.supporter?.rmo?.nameBn
          : data?.supporter?.rmo?.nameEn,
      municipalityName:
        lang === LANGUAGE.BANGLA
          ? data?.supporter?.municiaplity?.nameBn
          : data?.supporter?.municiaplity?.nameEn,
      unionOrWardName:
        lang === LANGUAGE.BANGLA
          ? data?.supporter?.unionOrWard?.nameBn
          : data?.supporter?.unionOrWard?.nameEn,
      unionWardName:
        lang === LANGUAGE.BANGLA
          ? data?.supporter?.unionWard?.nameBn
          : data?.supporter?.unionWard?.nameEn,
    },
    candidateElectionAndPersonalDetails: {
      ...data?.candidateElectionAndPersonalDetails,
      zillaName:
        lang === LANGUAGE.BANGLA
          ? data?.candidateElectionAndPersonalDetails?.zilla?.nameBn
          : data?.candidateElectionAndPersonalDetails?.zilla?.nameEn,
      constituencyName:
        lang === LANGUAGE.BANGLA
          ? data?.candidateElectionAndPersonalDetails?.constituency?.nameBn
          : data?.candidateElectionAndPersonalDetails?.constituency?.nameEn,
      candidateTypeName:
        lang === LANGUAGE.BANGLA
          ? data?.candidateElectionAndPersonalDetails?.candidateType?.nameBn
          : data?.candidateElectionAndPersonalDetails?.candidateType?.nameEn,
      municipalityName:
        lang === LANGUAGE.BANGLA
          ? data?.candidateElectionAndPersonalDetails?.municipality?.nameBn
          : data?.candidateElectionAndPersonalDetails?.municipality?.nameEn,
    },
  };
}

export const useCandidateNominationFormSecondPart = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes) => {
  const { language } = useLanguage();
  const [
    candidateNominationFormSecondPartData,
    setCandidateNominationFormSecondPartData,
  ] = useState<SecondPartType>({
    supporter: {},
    candidateElectionAndPersonalDetails: {},
  });

  useEffect(() => {
    try {
      getCandidateNominationFormSecondPart({
        electionSettingsId,
        candidateElectionDetailsId,
      }).then((response) => {
        const data: any = mapCandidateNominationFormSecondPart(
          response?.data?.data,
          language,
        );
        if (response?.data?.status === 200) {
          setCandidateNominationFormSecondPartData(data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [electionSettingsId, candidateElectionDetailsId, language]);
  return {
    candidateNominationFormSecondPartData,
  };
};
