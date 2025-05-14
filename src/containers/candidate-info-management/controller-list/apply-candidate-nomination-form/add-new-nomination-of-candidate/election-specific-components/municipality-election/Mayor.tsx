import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import FormSelect from '@components/inputs/FormSelect';

import useElectionSchedulesCandidateTypeConstituencies from '@hooks/miscellaneous/core-hook/constituency/useCandidateTypeConstituencies';

import { FORM_FIELDS } from '@constants/forms';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import { GenericProps } from '../../types';

interface Props extends GenericProps {
  settingsLabel: string;
}

const NOMINATION =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM
    .ADD_NEW_NOMINATION.NOMINATION;

const Mayor = ({
  electionScheduleId,
  candidateTypeId,
  zillaId,
  settingsLabel,
}: Props) => {
  const { t } = useTranslation();
  const {
    constituencies,
    getElectionSchedulesCandidateTypeConstituenciesData,
  } = useElectionSchedulesCandidateTypeConstituencies();

  const isMayorElection = () =>
    candidateTypeId === CANDIDATE_INFO.MUNICIPALITY_MAYOR.ID;

  useEffect(() => {
    if (isMayorElection() && electionScheduleId && zillaId && candidateTypeId) {
      getElectionSchedulesCandidateTypeConstituenciesData({
        electionSchedulesId: electionScheduleId,
        electionSchedulesZillaId: zillaId,
        candidateTypeId: candidateTypeId,
        getElectionSettings: true,
        isActive: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleId, zillaId, candidateTypeId]);

  return (
    <FormSelect
      title={`REGISTRATION.${settingsLabel}`}
      name={NOMINATION.CONSTITUENCY}
      options={constituencies}
      placeholder={t('PLACEHOLDER.SELECT')}
    />
  );
};

export default Mayor;
