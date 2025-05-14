import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import FormSelect from '@components/inputs/FormSelect';

import { useUpazilasOrThanas } from '@hooks/miscellaneous/core-hook/upazila/useUpazilasOrThanas';
import { useUpazilaThanaConstituenciesSelect } from '@hooks/miscellaneous/core-hook/constituency/useUpazilaThanaConstituenciesSelect';
import { useMunicipalitiesByScheduleCandidateZilla } from '@hooks/miscellaneous/core-hook/municipality/useMunicipalitiesByScheduleCandidateZilla';

import { FORM_FIELDS } from '@constants/forms';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import { GenericProps } from '../../types';

const NOMINATION =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM
    .ADD_NEW_NOMINATION.NOMINATION;

const Counselor = ({
  watch,
  electionScheduleId,
  candidateTypeId,
  zillaId,
}: GenericProps) => {
  const { t } = useTranslation();
  const { upazilasOrThanas, getUpazilasOrThanas } = useUpazilasOrThanas();
  const { municipalities, getMunicipalitiesByScheduleCandidateZilla } =
    useMunicipalitiesByScheduleCandidateZilla();

  const {
    upazilaOrThanaConstituencies,
    getUpazilaOrThanaConstituenciesSelect,
  } = useUpazilaThanaConstituenciesSelect();

  const watchMunicipality = watch(NOMINATION.MUNICIPALITY);
  const watchUpazilaOrThana = watch(NOMINATION.UPAZILLA);

  const isCounselorElection = () =>
    candidateTypeId === CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID;

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

  // get upazilas thanas
  useEffect(() => {
    if (
      isCounselorElection() &&
      watchMunicipality &&
      electionScheduleId &&
      zillaId &&
      candidateTypeId
    ) {
      getUpazilasOrThanas({
        electionScheduleId: electionScheduleId,
        candidateTypeId: candidateTypeId,
        zillaId: zillaId,
        municipalityId: watchMunicipality,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchMunicipality, electionScheduleId, zillaId, candidateTypeId]);

  // get upazila/thana constituencies
  useEffect(() => {
    if (
      isCounselorElection() &&
      watchMunicipality &&
      electionScheduleId &&
      zillaId &&
      candidateTypeId &&
      watchUpazilaOrThana
    ) {
      getUpazilaOrThanaConstituenciesSelect({
        electionScheduleId: electionScheduleId,
        candidateTypeId: candidateTypeId,
        zillaId: zillaId,
        municipalityId: watchMunicipality,
        upazilaThanaId: watchUpazilaOrThana,
        getElectionSettings: true,
        isActive: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    watchMunicipality,
    electionScheduleId,
    zillaId,
    candidateTypeId,
    watchUpazilaOrThana,
  ]);

  return (
    <>
      {/* সিটি কর্পোরেশন / পৌরসভা */}
      <FormSelect
        title="REGISTRATION.MUNICIPALITY"
        name={NOMINATION.MUNICIPALITY}
        options={municipalities}
        placeholder={t('PLACEHOLDER.SELECT')}
      />

      {/* উপজেলা / থানা */}
      <FormSelect
        title="REGISTRATION.UPAZILLA"
        name={NOMINATION.UPAZILLA}
        options={upazilasOrThanas}
        placeholder={t('PLACEHOLDER.SELECT')}
      />

      {/* ইউনিয়ন / ওয়ার্ড*/}
      <FormSelect
        title="REGISTRATION.UNION_WARD"
        name={NOMINATION.CONSTITUENCY}
        options={upazilaOrThanaConstituencies}
        placeholder={t('PLACEHOLDER.SELECT')}
      />
    </>
  );
};

export default Counselor;
