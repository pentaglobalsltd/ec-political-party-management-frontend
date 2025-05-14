import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';

import FormSelect from '@components/inputs/FormSelect';
import { FORM_FIELDS } from '@constants/forms';
import { GenericNominationSecondPartProps } from '../types';

import { useMunicipalitiesByScheduleCandidateZilla } from '@hooks/miscellaneous/core-hook/municipality/useMunicipalitiesByScheduleCandidateZilla';
import { useVoterAreas } from '@hooks/candidate-info-management/controller-list/useVoterAreas';
import { useUpazilasOrThanas } from '@hooks/miscellaneous/core-hook/upazila/useUpazilasOrThanas';
import { useUnionByUpazila } from '@hooks/miscellaneous/master-hook/union-or-ward/useUnionByUpazila';

const SECOND_PART =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.SECOND_PART
    .SUPPORTER;
const Councillor = (props: GenericNominationSecondPartProps) => {
  const { zillaId, candidateNominationFormSecondPart } = props;
  const { watch } = useFormContext();
  const { t } = useTranslation();

  const {
    scheduleId: electionScheduleId,
    electionTypeId,
    candidateTypeId,
  } = useParams();

  const watchMunicipality = watch(`supporter.${SECOND_PART.MUNICIPALITY}`);
  const watchUpazilasOrThanas = watch(`supporter.${SECOND_PART.UPAZILA_ID}`);
  const watchUnionOrWard = watch(`supporter.${SECOND_PART.UNION_OR_WARD_ID}`);

  const { municipalities, getMunicipalitiesByScheduleCandidateZilla } =
    useMunicipalitiesByScheduleCandidateZilla();

  const { upazilasOrThanas, getUpazilasOrThanas } = useUpazilasOrThanas();

  const { unionByUpazila, getUnionByUpazila } = useUnionByUpazila();

  const { voterArea, getVoterArea } = useVoterAreas();

  // get municipality
  useEffect(() => {
    if (electionScheduleId && zillaId && candidateTypeId) {
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
    if (watchMunicipality && electionScheduleId && zillaId && candidateTypeId) {
      getUpazilasOrThanas({
        electionScheduleId: electionScheduleId,
        candidateTypeId: candidateTypeId,
        zillaId: zillaId,
        municipalityId: watchMunicipality as number,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    watchMunicipality,
    electionScheduleId,
    zillaId,
    candidateTypeId,
    electionTypeId,
  ]);

  // get union
  useEffect(() => {
    if (watchUpazilasOrThanas && watchMunicipality) {
      getUnionByUpazila({
        upazilaId: watchUpazilasOrThanas as number,
        municipalityId: watchMunicipality as number,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchUpazilasOrThanas, watchMunicipality]);

  // get voter area
  useEffect(() => {
    if (zillaId && watchUpazilasOrThanas && watchUnionOrWard) {
      getVoterArea(
        zillaId,
        watchUpazilasOrThanas as number,
        watchUnionOrWard as number,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zillaId, watchUpazilasOrThanas, watchUnionOrWard]);

  // Edit
  useEffect(() => {
    if (candidateNominationFormSecondPart?.supporter) {
      const { zillaId, municipalityId, upazilaId, unionOrWardId } =
        candidateNominationFormSecondPart?.supporter;

      // get municipality
      if (electionScheduleId && zillaId && candidateTypeId) {
        getMunicipalitiesByScheduleCandidateZilla({
          electionScheduleId: electionScheduleId,
          candidateTypeId: candidateTypeId,
          zillaId: zillaId,
        });
      }

      // get upazilas thanas
      if (electionScheduleId && candidateTypeId && zillaId && municipalityId) {
        getUpazilasOrThanas({
          electionScheduleId: electionScheduleId,
          candidateTypeId: candidateTypeId,
          zillaId: zillaId,
          municipalityId: municipalityId,
        });
      }

      // get union-or-wards
      if (upazilaId && municipalityId) {
        getUnionByUpazila({ upazilaId, municipalityId });
      }

      // voter area
      if (zillaId && upazilaId && unionOrWardId) {
        getVoterArea(zillaId, upazilaId, unionOrWardId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateNominationFormSecondPart?.supporter]);

  return (
    <>
      {/* সিটি কর্পোরেশন / পৌরসভা */}
      <FormSelect
        title="REGISTRATION.MUNICIPALITY"
        name={`supporter.${SECOND_PART.MUNICIPALITY}`}
        options={municipalities}
        placeholder={t('PLACEHOLDER.SELECT')}
        isSearchable
        required
      />

      {/* উপজেলা / থানা */}
      <FormSelect
        title="REGISTRATION.UPAZILLA"
        name={`supporter.${SECOND_PART.UPAZILA_ID}`}
        options={upazilasOrThanas}
        placeholder={t('PLACEHOLDER.SELECT')}
        isSearchable
        required
      />

      {/* ইউনিয়ন / ওয়ার্ড*/}
      <FormSelect
        title="REGISTRATION.UNION_WARD"
        name={`supporter.${SECOND_PART.UNION_OR_WARD_ID}`}
        options={unionByUpazila}
        placeholder={t('PLACEHOLDER.SELECT')}
        isSearchable
        required
      />

      {/* Voter Area */}
      <FormSelect
        title="FIRST_PART.CONSTITUENCY_AREA"
        subtitle="FIRST_PART.CONSTITUENCY_AREA_SUBTITLE"
        name={`supporter.${SECOND_PART.VOTER_AREA_ID}`}
        disabled={
          zillaId && watchUpazilasOrThanas && watchUnionOrWard ? false : true
        }
        options={voterArea}
        placeholder={t('PLACEHOLDER.SELECT')}
        isSearchable
        required
      />
    </>
  );
};

export default Councillor;
