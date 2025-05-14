import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import FormSelect from '@components/inputs/FormSelect';
import FormInput from '@components/inputs/FormInput';

import { FORM_FIELDS } from '@constants/forms';
import { GenericNominationFirstPartProps } from '../types';
import useUnionParishadFields from './useUnionParishadFields';

const PROPOSER =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.FIRST_PART
    .PROPOSER;

const CANDIDATE_ELECTION_DETAILS =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.FIRST_PART
    .CANDIDATE_ELECTION_DETAILS;

const UnionParishadElection = (props: GenericNominationFirstPartProps) => {
  const { zillaId, candidateNominationFormFirstPart } = props;
  const { watch } = useFormContext();
  const { t } = useTranslation();

  const {
    unionByUpazila,
    upazilas,
    upWards,
    voterArea,
    watchUnionOrWard,
    watchUpazilasOrThanas,
  } = useUnionParishadFields({
    watch,
    zillaId,
    candidateNominationFormFirstPart,
  });

  return (
    <>
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

      {/* ইউনিয়ন পরিষদ ওয়ার্ড */}
      <FormSelect
        title="FIRST_PART.WARD"
        subtitle="FIRST_PART.WARD_SUBTITLE"
        name={`proposer.${PROPOSER.UP_WARD_ID}`}
        options={upWards}
        placeholder={t('PLACEHOLDER.SELECT')}
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
        title="FIRST_PART.CANDIDATE_UNION"
        registerName={`candidateElectionAndPersonalDetails.${CANDIDATE_ELECTION_DETAILS.CONSTITUENCY_NAME}`}
        placeholder="PLACEHOLDER.ENTER"
        disabled
      />
    </>
  );
};

export default UnionParishadElection;
