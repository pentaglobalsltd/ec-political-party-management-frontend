import { useEffect, useState } from 'react';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { getCandidateNominationFormFirstPart } from '@api/candidate-info-management/candidate-confirmation/candidate-nomination-form/first-part';
import { FirstPartType } from '@type/candidate-info-management/operator-view/candidate-nomination-form/first-part';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
interface UseCandidateNominationFormFirstPart {
  candidateNominationFormFirstPartData: FirstPartType;
}

function mapCandidateNominationFormFirstPart(
  data: FirstPartType,
  lang: string | null,
) {
  return {
    ...data,

    proposer: {
      ...data?.proposer,
      zillaName:
        lang === LANGUAGE.BANGLA
          ? data?.proposer?.zilla?.nameBn
          : data?.proposer?.zilla?.nameEn,
      voterAreaName:
        lang === LANGUAGE.BANGLA
          ? data?.proposer?.voterArea?.nameBn
          : data?.proposer?.voterArea?.nameEn,
      regionId:
        lang === LANGUAGE.BANGLA
          ? data?.proposer?.region?.nameBn
          : data?.proposer?.region?.nameEn,
      constituencyName:
        lang === LANGUAGE.BANGLA
          ? data?.proposer?.constituency?.nameBn
          : data?.proposer?.constituency?.nameEn,
      upazilaName:
        lang === LANGUAGE.BANGLA
          ? data?.proposer?.upazila?.nameBn
          : data?.proposer?.upazila?.nameEn,
      rmoName:
        lang === LANGUAGE.BANGLA
          ? data?.proposer?.rmo?.nameBn
          : data?.proposer?.rmo?.nameEn,
      municipalityId:
        lang === LANGUAGE.BANGLA
          ? data?.proposer?.municiaplity?.nameBn
          : data?.proposer?.municiaplity?.nameEn,
      municipalityName:
        lang === LANGUAGE.BANGLA
          ? data?.proposer?.municiaplity?.nameBn
          : data?.proposer?.municiaplity?.nameEn,
      unionOrWardName:
        lang === LANGUAGE.BANGLA
          ? data?.proposer?.unionOrWard?.nameBn
          : data?.proposer?.unionOrWard?.nameEn,
      unionWardName:
        lang === LANGUAGE.BANGLA
          ? data?.proposer?.unionWard?.nameBn
          : data?.proposer?.unionWard?.nameEn,
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

export const useCandidateNominationFormFirstPart = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes): UseCandidateNominationFormFirstPart => {
  const { language } = useLanguage();
  const [
    candidateNominationFormFirstPartData,
    setCandidateNominationFormFirstPartData,
  ] = useState<FirstPartType>({
    proposer: {},
    candidateElectionAndPersonalDetails: {},
  });

  useEffect(() => {
    try {
      getCandidateNominationFormFirstPart({
        electionSettingsId,
        candidateElectionDetailsId,
      }).then((response) => {
        const data: any = mapCandidateNominationFormFirstPart(
          response?.data?.data as FirstPartType,
          language,
        );
        if (response?.data?.status === 200) {
          setCandidateNominationFormFirstPartData(data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [electionSettingsId, candidateElectionDetailsId, language]);

  return {
    candidateNominationFormFirstPartData,
  };
};
