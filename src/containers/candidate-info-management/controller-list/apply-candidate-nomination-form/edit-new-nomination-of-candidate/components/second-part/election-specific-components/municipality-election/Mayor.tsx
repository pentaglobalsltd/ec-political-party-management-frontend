import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import FormSelect from '@components/inputs/FormSelect';
import { useUpazilas } from '@hooks/miscellaneous/master-hook/upazilas/useUpazillas';
import { useVoterAreas } from '@hooks/candidate-info-management/controller-list/useVoterAreas';
import { useUnionByUpazila } from '@hooks/miscellaneous/master-hook/union-or-ward/useUnionByUpazila';
import { useMunicipalitiesByScheduleCandidateZilla } from '@hooks/miscellaneous/core-hook/municipality/useMunicipalitiesByScheduleCandidateZilla';

import { FORM_FIELDS } from '@constants/forms';
import { GenericNominationSecondPartProps } from '../types';

const SECOND_PART =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.SECOND_PART
    .SUPPORTER;

const Mayor = (props: GenericNominationSecondPartProps) => {
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

  const { upazilas, getUpazila } = useUpazilas();

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
    if (watchMunicipality && zillaId) {
      getUpazila({
        zillaId,
        municipalityId: watchMunicipality as number,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchMunicipality, zillaId, electionTypeId]);

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
      if (municipalityId && zillaId) {
        getUpazila({
          zillaId,
          municipalityId,
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
        title="SECOND_PART.MUNICIPALITY"
        subtitle="SECOND_PART.MUNICIPALITY_SUBTITLE"
        name={`supporter.${SECOND_PART.MUNICIPALITY}`}
        options={municipalities}
        placeholder={t('PLACEHOLDER.SELECT')}
        isSearchable
        required
      />

      {/* উপজেলা / থানা */}
      <FormSelect
        title="SECOND_PART.UPAZILA"
        subtitle="SECOND_PART.UPAZILA_SUBTITLE"
        name={`supporter.${SECOND_PART.UPAZILA_ID}`}
        options={upazilas}
        placeholder={t('PLACEHOLDER.SELECT')}
        isSearchable
        required
      />

      {/* ইউনিয়ন / ওয়ার্ড*/}
      <FormSelect
        title="SECOND_PART.UNION_WARD"
        subtitle="SECOND_PART.UNION_WARD_SUBTITLE"
        name={`supporter.${SECOND_PART.UNION_OR_WARD_ID}`}
        options={unionByUpazila}
        placeholder={t('PLACEHOLDER.SELECT')}
        isSearchable
        required
      />

      {/* Voter Area */}
      <FormSelect
        title="SECOND_PART.CONSTITUENCY_AREA"
        subtitle="SECOND_PART.CONSTITUENCY_AREA_SUBTITLE"
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

export default Mayor;
