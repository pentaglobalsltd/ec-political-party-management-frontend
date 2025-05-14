import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import FormSelect from '@components/inputs/FormSelect';
import FormInput from '@components/inputs/FormInput';

import { useUpazilas } from '@hooks/miscellaneous/master-hook/upazilas/useUpazillas';
import { useVoterAreas } from '@hooks/candidate-info-management/controller-list/useVoterAreas';
import { useUnionByUpazila } from '@hooks/miscellaneous/master-hook/union-or-ward/useUnionByUpazila';
import { useMunicipalitiesByScheduleCandidateZilla } from '@hooks/miscellaneous/core-hook/municipality/useMunicipalitiesByScheduleCandidateZilla';
import { FORM_FIELDS } from '@constants/forms';
import { GenericNominationFirstPartProps } from '../types';

const PROPOSER =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.FIRST_PART
    .PROPOSER;
const CANDIDATE_ELECTION_DETAILS =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.FIRST_PART
    .CANDIDATE_ELECTION_DETAILS;

const Mayor = (props: GenericNominationFirstPartProps) => {
  const { zillaId, candidateNominationFormFirstPart } = props;
  const { watch } = useFormContext();
  const { t } = useTranslation();

  const {
    scheduleId: electionScheduleId,
    candidateTypeId,
    electionTypeId,
  } = useParams();

  const watchMunicipality = watch(`proposer.${PROPOSER.MUNICIPALITY}`);
  const watchUpazilasOrThanas = watch(`proposer.${PROPOSER.UPAZILA_ID}`);
  const watchUnionOrWard = watch(`proposer.${PROPOSER.UNION_OR_WARD_ID}`);

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

  // get upazilas for mayor
  useEffect(() => {
    if (watchMunicipality && zillaId) {
      getUpazila({
        zillaId,
        municipalityId: watchMunicipality as number,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionTypeId, watchMunicipality, zillaId]);

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
    if (candidateNominationFormFirstPart?.proposer) {
      const { zillaId, municipalityId, upazilaId, unionOrWardId } =
        candidateNominationFormFirstPart?.proposer;

      // get municipality
      if (electionScheduleId && zillaId && candidateTypeId) {
        getMunicipalitiesByScheduleCandidateZilla({
          electionScheduleId: electionScheduleId,
          candidateTypeId: candidateTypeId,
          zillaId: zillaId,
        });
      }

      // get upazilas for mayor
      if (watchMunicipality && zillaId) {
        getUpazila({
          zillaId,
          municipalityId: municipalityId as number,
        });
      }

      // get union-or-wards
      if (upazilaId && municipalityId) {
        getUnionByUpazila({ upazilaId, municipalityId });
      }

      // voter areacandidateNominationFormFirstPart?.proposer?.upazilaId,
      if (zillaId && upazilaId && unionOrWardId) {
        getVoterArea(zillaId, upazilaId, unionOrWardId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateNominationFormFirstPart?.proposer]);

  return (
    <div>
      {/* সিটি কর্পোরেশন / পৌরসভা */}
      <FormSelect
        title="FIRST_PART.MUNICIPALITY"
        subtitle="FIRST_PART.MUNICIPALITY_SUBTITLE"
        name={`proposer.${PROPOSER.MUNICIPALITY}`}
        options={municipalities}
        placeholder={t('PLACEHOLDER.SELECT')}
        required
      />

      {/* উপজেলা / থানা */}
      <FormSelect
        title="FIRST_PART.UPAZILA"
        subtitle="FIRST_PART.UPAZILA_SUBTITLE"
        name={`proposer.${PROPOSER.UPAZILA_ID}`}
        // options={upazillaByZillasMunicipalities}
        options={upazilas}
        placeholder={t('PLACEHOLDER.SELECT')}
        required
      />

      {/* ইউনিয়ন / ওয়ার্ড*/}
      <FormSelect
        title="FIRST_PART.UNION_WARD"
        subtitle="FIRST_PART.UNION_WARD_SUBTITLE"
        name={`proposer.${PROPOSER.UNION_OR_WARD_ID}`}
        options={unionByUpazila}
        placeholder={t('PLACEHOLDER.SELECT')}
        required
      />

      {/* Voter Area */}
      <FormSelect
        title="FIRST_PART.CONSTITUENCY_AREA"
        subtitle="FIRST_PART.CONSTITUENCY_AREA_SUBTITLE"
        name={`proposer.${PROPOSER.VOTER_AREA_ID}`}
        disabled={
          zillaId && watchUpazilasOrThanas && watchUnionOrWard ? false : true
        }
        options={voterArea}
        placeholder={t('PLACEHOLDER.SELECT')}
        required
      />

      {/* candidate info ------------------- */}

      <div className="border-top pt-9">
        <FormInput
          title="FIRST_PART.CANDIDATE_NAME"
          registerName={`candidateElectionAndPersonalDetails.${CANDIDATE_ELECTION_DETAILS.NAME}`}
          placeholder="PLACEHOLDER.ENTER"
          disabled
        />
      </div>
      <FormInput
        title="FIRST_PART.CANDIDATE_ADDRESS"
        registerName={`candidateElectionAndPersonalDetails.${CANDIDATE_ELECTION_DETAILS.ADDRESS}`}
        placeholder="PLACEHOLDER.ENTER"
        required
      />
      <FormInput
        title="FIRST_PART.CANDIDATE_VOTER_NUMBER"
        registerName={`candidateElectionAndPersonalDetails.${CANDIDATE_ELECTION_DETAILS.VOTER_NUMBER}`}
        placeholder="PLACEHOLDER.ENTER"
        disabled
      />

      {/* add municipality */}
      <FormInput
        title="FIRST_PART.CANDIDATE_MUNICIPALITY"
        registerName={`candidateElectionAndPersonalDetails.${CANDIDATE_ELECTION_DETAILS.CONSTITUENCY_NAME}`}
        placeholder="PLACEHOLDER.ENTER"
        disabled
      />
    </div>
  );
};

export default Mayor;
