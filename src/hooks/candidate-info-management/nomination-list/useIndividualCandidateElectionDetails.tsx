import { useEffect, useState } from 'react';
import { NominationType } from '@type/candidate-info-management/nomination-list-type';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { getIndividualElectionDetails } from '@api/candidate-info-management/nomination-list/individual-candidate-election-details';

interface Props {
  getNominationListData: () => void;
  candidateDetails: NominationType;
  loading: boolean;
}

export const useIndividualCandidateElectionDetails = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes): Props => {
  const [candidateDetails, setCandidateDetails] = useState<NominationType>({});
  const [loading, setLoading] = useState(false);
  const getNominationListData = async () => {
    try {
      const response = await getIndividualElectionDetails({
        electionSettingsId,
        candidateElectionDetailsId,
      });
      if (response?.data?.status === 200) {
        setCandidateDetails(response?.data?.data);

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNominationListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionSettingsId, candidateElectionDetailsId]);

  return {
    getNominationListData,
    loading,
    candidateDetails,
  };
};
