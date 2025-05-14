import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import FormSelect from '@components/inputs/FormSelect';

import useElectionSchedulesCandidateTypeConstituencies from '@hooks/miscellaneous/core-hook/constituency/useCandidateTypeConstituencies';

import { FORM_FIELDS } from '@constants/forms';
import { ELECTION_INFO } from '@constants/election-info';
import { GenericProps } from '../../types';

const NOMINATION =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM
    .ADD_NEW_NOMINATION.NOMINATION;

const UpazillaElection = (props: GenericProps) => {
  const { t } = useTranslation();
  const { electionId, electionScheduleId, candidateTypeId, zillaId } = props;
  const {
    constituencies: upazilasOrThanas,
    getElectionSchedulesCandidateTypeConstituenciesData,
  } = useElectionSchedulesCandidateTypeConstituencies();

  useEffect(() => {
    if (
      electionId === ELECTION_INFO.UPAZILLA.ID &&
      electionScheduleId &&
      zillaId &&
      candidateTypeId
    ) {
      getElectionSchedulesCandidateTypeConstituenciesData({
        electionSchedulesId: electionScheduleId,
        electionSchedulesZillaId: zillaId,
        candidateTypeId: candidateTypeId,
        getElectionSettings: true,
        isActive: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionId, electionScheduleId, zillaId, candidateTypeId]);

  return (
    <FormSelect
      title="REGISTRATION.UPAZILLA"
      name={NOMINATION.CONSTITUENCY}
      options={upazilasOrThanas}
      placeholder={t('PLACEHOLDER.SELECT')}
    />
  );
};

export default UpazillaElection;
