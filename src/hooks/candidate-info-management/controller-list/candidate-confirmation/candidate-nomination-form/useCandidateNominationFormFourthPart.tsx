import { useEffect, useState } from 'react';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { FourthPartType } from '@type/candidate-info-management/operator-view/candidate-nomination-form/fourth-part';
import { getCandidateNominationFormFourthPart } from '@api/candidate-info-management/candidate-confirmation/candidate-nomination-form/fourth-part';

export const useCandidateNominationFormFourthPart = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes) => {
  const { language } = useLanguage();
  const [
    candidateNominationFormFourthPartData,
    setCandidateNominationFormFourthPartData,
  ] = useState<FourthPartType>();

  useEffect(() => {
    try {
      getCandidateNominationFormFourthPart({
        electionSettingsId,
        candidateElectionDetailsId,
      }).then((response) => {
        const data: FourthPartType = {
          isElectedBefore: '',
        };
        data.isElectedBefore = response?.data?.data?.isElectedBefore;

        if (response?.data?.status === 200) {
          if (response?.data?.data?.candidatePastElectionInfo) {
            data.pastElectionName =
              response?.data?.data?.candidatePastElectionInfo?.pastElectionName;
            data.pastElectionInfo =
              response?.data?.data?.candidatePastElectionInfo?.pastElectionInfo;
          }
          if (response?.data?.data?.candidatePresentElectionInfo) {
            data.constituencyName =
              language === LANGUAGE.BANGLA
                ? response?.data?.data?.candidatePresentElectionInfo
                    ?.constituency?.nameBn
                : response?.data?.data?.candidatePresentElectionInfo
                    ?.constituency?.nameEn;
          }
          data.candidateName = response?.data?.data.candidateName;
          setCandidateNominationFormFourthPartData(data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [electionSettingsId, candidateElectionDetailsId, language]);
  return {
    candidateNominationFormFourthPartData,
  };
};
