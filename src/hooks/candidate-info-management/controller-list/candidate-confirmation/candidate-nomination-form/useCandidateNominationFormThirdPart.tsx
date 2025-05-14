import { useEffect, useState } from 'react';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { ThirdPartType } from '@type/candidate-info-management/operator-view/candidate-nomination-form/third-part';
import { getCandidateNominationFormThirdPart } from '@api/candidate-info-management/candidate-confirmation/candidate-nomination-form/third-part';

function mapCandidateNominationFormThirdPart(
  data: ThirdPartType,
  lang: string | null,
) {
  return {
    candidatePersonalInfo: {
      ...data?.candidatePersonalInfo,
      regionName:
        lang === LANGUAGE.BANGLA
          ? data?.candidatePersonalInfo?.region?.nameBn
          : data?.candidatePersonalInfo?.region?.nameEn,
      zillaName:
        lang === LANGUAGE.BANGLA
          ? data?.candidatePersonalInfo?.zilla?.nameBn
          : data?.candidatePersonalInfo?.zilla?.nameEn,
      voterAreaName:
        lang === LANGUAGE.BANGLA
          ? data?.candidatePersonalInfo?.voterArea?.nameBn
          : data?.candidatePersonalInfo?.voterArea?.nameEn,
      upazilaName:
        lang === LANGUAGE.BANGLA
          ? data?.candidatePersonalInfo?.upazila?.nameBn
          : data?.candidatePersonalInfo?.upazila?.nameEn,
      rmoName:
        lang === LANGUAGE.BANGLA
          ? data?.candidatePersonalInfo?.rmo?.nameBn
          : data?.candidatePersonalInfo?.rmo?.nameEn,
      unionOrWardName:
        lang === LANGUAGE.BANGLA
          ? data?.candidatePersonalInfo?.unionOrWard?.nameBn
          : data?.candidatePersonalInfo?.unionOrWard?.nameEn,
      unionWardName:
        lang === LANGUAGE.BANGLA
          ? data?.candidatePersonalInfo?.unionWard?.nameBn
          : data?.candidatePersonalInfo?.unionWard?.nameEn,
      bankAccountNo: data?.candidatePersonalInfo?.bank?.accountNo,
      bankName:
        lang === LANGUAGE.BANGLA
          ? data?.candidatePersonalInfo?.bank?.nameBn
          : data?.candidatePersonalInfo?.bank?.nameEn,
      bankBranchName: data?.candidatePersonalInfo?.bank?.bankBranchName,
    },
    candidatePoliticalInfo: {
      ...data?.candidatePoliticalInfo,
      politicalPartyName:
        lang === LANGUAGE.BANGLA
          ? data?.candidatePoliticalInfo?.politicalParty?.nameBn
          : data?.candidatePoliticalInfo?.politicalParty?.nameEn,
      preferredSymbolName:
        lang === LANGUAGE.BANGLA
          ? data?.candidatePoliticalInfo?.politicalParty?.preferredSymbolNameBn
          : data?.candidatePoliticalInfo?.politicalParty?.preferredSymbolNameEn,
      symbolName:
        lang === LANGUAGE.BANGLA
          ? data?.candidatePoliticalInfo?.politicalParty?.symbolNameBn
          : data?.candidatePoliticalInfo?.politicalParty?.symbolNameEn,
    },
  };
}

export const useCandidateNominationFormThirdPart = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes) => {
  const { language } = useLanguage();
  const [
    candidateNominationFormThirdPartData,
    setCandidateNominationFormThirdPartData,
  ] = useState<ThirdPartType>();

  useEffect(() => {
    try {
      getCandidateNominationFormThirdPart({
        electionSettingsId,
        candidateElectionDetailsId,
      }).then((response) => {
        const data: any = mapCandidateNominationFormThirdPart(
          response?.data?.data,
          language,
        );
        if (response?.data?.status === 200) {
          setCandidateNominationFormThirdPartData(data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [electionSettingsId, candidateElectionDetailsId, language]);

  return {
    candidateNominationFormThirdPartData,
  };
};
