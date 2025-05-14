import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import FormSelect from '@components/inputs/FormSelect';

import { useMunicipalityConstituenciesSelect } from '@hooks/miscellaneous/core-hook/constituency/useMunicipalityConstituenciesSelect';
import { useMunicipalitiesByScheduleCandidateZilla } from '@hooks/miscellaneous/core-hook/municipality/useMunicipalitiesByScheduleCandidateZilla';

import { FORM_FIELDS } from '@constants/forms';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import { GenericProps } from '../../types';

const NOMINATION =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM
    .ADD_NEW_NOMINATION.NOMINATION;

const ReservedCounselor = ({
  watch,
  electionScheduleId,
  candidateTypeId,
  zillaId,
}: GenericProps) => {
  const { t } = useTranslation();
  const watchMunicipality = watch(NOMINATION.MUNICIPALITY);
  const { municipalityConstituencies, getMunicipalityConstituenciesSelect } =
    useMunicipalityConstituenciesSelect();

  const { municipalities, getMunicipalitiesByScheduleCandidateZilla } =
    useMunicipalitiesByScheduleCandidateZilla();

  const isCounselorElection = () =>
    candidateTypeId === CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID;

  // get municipality
  useEffect(() => {
    if (
      isCounselorElection() &&
      electionScheduleId &&
      zillaId &&
      candidateTypeId
    ) {
      getMunicipalitiesByScheduleCandidateZilla({
        electionScheduleId: electionScheduleId,
        candidateTypeId: candidateTypeId,
        zillaId: zillaId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleId, zillaId, candidateTypeId]);

  // get municipality constituencies
  useEffect(() => {
    if (
      isCounselorElection() &&
      watchMunicipality &&
      electionScheduleId &&
      zillaId &&
      candidateTypeId
    ) {
      getMunicipalityConstituenciesSelect({
        electionScheduleId: electionScheduleId,
        candidateTypeId: candidateTypeId,
        zillaId: zillaId,
        municipalityId: watchMunicipality,
        getElectionSettings: true,
        isActive: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchMunicipality, electionScheduleId, zillaId, candidateTypeId]);

  return (
    <>
      {/* সিটি কর্পোরেশন / পৌরসভা */}
      <FormSelect
        title="REGISTRATION.MUNICIPALITY"
        name={NOMINATION.MUNICIPALITY}
        options={municipalities}
        placeholder={t('PLACEHOLDER.SELECT')}
      />

      {/* ইউনিয়ন / ওয়ার্ড*/}
      <FormSelect
        title="REGISTRATION.UNION_WARD"
        name={NOMINATION.CONSTITUENCY}
        options={municipalityConstituencies}
        placeholder={t('PLACEHOLDER.SELECT')}
      />
    </>
  );
};

export default ReservedCounselor;
