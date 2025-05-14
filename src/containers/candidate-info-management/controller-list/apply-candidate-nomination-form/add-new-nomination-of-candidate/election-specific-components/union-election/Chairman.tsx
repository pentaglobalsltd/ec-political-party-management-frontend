import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import FormSelect from '@components/inputs/FormSelect';
import { FORM_FIELDS } from '@constants/forms';
import { GenericProps } from '../../types';
import { useUpazilasByElectionScheduleCandidateTypesZillas } from '@hooks/miscellaneous/core-hook/upazila/useUpazilasByElectionScheduleCandidateTypesZillas';
import useElectionSchedulesCandidateTypeConstituencies from '@hooks/miscellaneous/core-hook/constituency/useCandidateTypeConstituencies';

const NOMINATION =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM
    .ADD_NEW_NOMINATION.NOMINATION;

export const UnionChairman = ({
  watch,
  electionScheduleId,
  candidateTypeId,
  zillaId,
}: GenericProps) => {
  const { t } = useTranslation();
  const { upazilas, getUpazilasByElectionScheduleCandidateTypesZillas } =
    useUpazilasByElectionScheduleCandidateTypesZillas();

  const {
    constituencies,
    getElectionSchedulesCandidateTypeConstituenciesData,
  } = useElectionSchedulesCandidateTypeConstituencies();

  const isChairmanElection = () =>
    candidateTypeId === CANDIDATE_INFO.UNION_PARISHAD_CHAIRMAN.ID;
  const upazilaWatch = watch(NOMINATION.UPAZILLA);

  useEffect(() => {
    if (
      isChairmanElection() &&
      electionScheduleId &&
      candidateTypeId &&
      zillaId
    ) {
      getUpazilasByElectionScheduleCandidateTypesZillas({
        electionScheduleId,
        candidateTypeId,
        zillaId,
      });
    }
  }, [electionScheduleId, candidateTypeId, zillaId]);

  useEffect(() => {
    if (
      isChairmanElection() &&
      electionScheduleId &&
      candidateTypeId &&
      upazilaWatch &&
      zillaId
    ) {
      getElectionSchedulesCandidateTypeConstituenciesData({
        electionSchedulesId: electionScheduleId,
        electionSchedulesZillaId: zillaId,
        candidateTypeId: candidateTypeId,
        upazillaId: upazilaWatch,
        getElectionSettings: true,
      });
    }
  }, [electionScheduleId, candidateTypeId, zillaId, upazilaWatch]);

  return (
    <div>
      <FormSelect
        title={`REGISTRATION.UPAZILLA_ELECTION`}
        name={NOMINATION.UPAZILLA}
        options={upazilas}
        placeholder={t('PLACEHOLDER.SELECT')}
        testId="constituency-input"
      />
      <FormSelect
        title={`REGISTRATION.UNION`}
        name={NOMINATION.CONSTITUENCY}
        options={constituencies}
        placeholder={t('PLACEHOLDER.SELECT')}
        testId="constituency-input"
      />
    </div>
  );
};
