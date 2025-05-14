import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import { FORM_FIELDS } from '@constants/forms';
import { GenericProps } from '../../types';
import { useUpazilasByElectionScheduleCandidateTypesZillas } from '@hooks/miscellaneous/core-hook/upazila/useUpazilasByElectionScheduleCandidateTypesZillas';
import { useUnionOrWardsByElectionScheduleCandidateTypesZillaUpazilas } from '@hooks/miscellaneous/core-hook/upazila/useUnionOrWardsByElectionScheduleCandidateTypesZillaUpazilas';
import { useConstituenciesByElectionScheduleCandidateTypeZillaUpazilaUnionOrWards } from '@hooks/miscellaneous/core-hook/constituency/useConstituenciesByElectionScheduleCandidateTypeZillaUpazilaUnionOrWards';
import FormSelect from '@components/inputs/FormSelect';

const NOMINATION =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM
    .ADD_NEW_NOMINATION.NOMINATION;

export const UnionGeneralAndReservedMember = ({
  watch,
  electionScheduleId,
  candidateTypeId,
  zillaId,
}: GenericProps) => {
  const { t } = useTranslation();
  const { upazilas, getUpazilasByElectionScheduleCandidateTypesZillas } =
    useUpazilasByElectionScheduleCandidateTypesZillas();

  const {
    unionsOrWards,
    getUnionOrWardsByElectionScheduleCandidateTypesZillaUpazilas,
  } = useUnionOrWardsByElectionScheduleCandidateTypesZillaUpazilas();

  const {
    constituencies,
    getConstituenciesByElectionScheduleCandidateTypeZillaUpazilaUnionOrWards,
  } =
    useConstituenciesByElectionScheduleCandidateTypeZillaUpazilaUnionOrWards();

  const upazilaWatch = watch(NOMINATION.UPAZILLA);
  const unionOrWardsWatch = watch(NOMINATION.UNION_WARD);
  const isGeneralMember =
    candidateTypeId === CANDIDATE_INFO.UNION_PARISHAD_GENERAL_MEMBER.ID;
  const isReservedMember =
    candidateTypeId === CANDIDATE_INFO.UNION_PARISHAD_RESERVED_MEMBER.ID;

  useEffect(() => {
    if (
      (isGeneralMember || isReservedMember) &&
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
      (isGeneralMember || isReservedMember) &&
      electionScheduleId &&
      candidateTypeId &&
      upazilaWatch &&
      zillaId
    ) {
      getUnionOrWardsByElectionScheduleCandidateTypesZillaUpazilas({
        electionScheduleId,
        zillaId,
        candidateTypeId,
        upazilaId: upazilaWatch,
      });
    }
  }, [electionScheduleId, candidateTypeId, zillaId, upazilaWatch]);

  useEffect(() => {
    if (
      (isGeneralMember || isReservedMember) &&
      electionScheduleId &&
      candidateTypeId &&
      upazilaWatch &&
      zillaId &&
      unionOrWardsWatch
    ) {
      getConstituenciesByElectionScheduleCandidateTypeZillaUpazilaUnionOrWards({
        electionScheduleId,
        zillaId,
        candidateTypeId,
        upazilaId: upazilaWatch,
        unionOrWardsId: unionOrWardsWatch,
        isActive: true,
        getElectionSettings: true,
      });
    }
  }, [
    electionScheduleId,
    candidateTypeId,
    zillaId,
    upazilaWatch,
    unionOrWardsWatch,
  ]);

  return (
    <div>
      <FormSelect
        title={`REGISTRATION.UPAZILLA_ELECTION`}
        name={NOMINATION.UPAZILLA}
        options={upazilas}
        placeholder={t('PLACEHOLDER.SELECT')}
      />
      <FormSelect
        title={`REGISTRATION.UNION`}
        name={NOMINATION.UNION_WARD}
        options={unionsOrWards}
        placeholder={t('PLACEHOLDER.SELECT')}
      />
      <FormSelect
        title={
          isGeneralMember
            ? 'REGISTRATION.UNION_PARISHAD_WARD'
            : 'REGISTRATION.UNION_PARISHAD_RESERVED_WARD'
        }
        name={NOMINATION.CONSTITUENCY}
        options={constituencies}
        placeholder={t('PLACEHOLDER.SELECT')}
      />
    </div>
  );
};
