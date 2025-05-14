import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import FormSelect from '@components/inputs/FormSelect';

import { FORM_FIELDS } from '@constants/forms';
import { GenericNominationSecondPartProps } from '../types';
import useUnionParishadFields from './useUnionParishadFields';

const SECOND_PART =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.SECOND_PART
    .SUPPORTER;

const UnionParishadElection = (props: GenericNominationSecondPartProps) => {
  const { zillaId, candidateNominationFormSecondPart } = props;
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
    candidateNominationFormSecondPart,
  });

  return (
    <>
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

      {/* ইউনিয়ন পরিষদ ওয়ার্ড */}
      <FormSelect
        title="SECOND_PART.WARD"
        subtitle="SECOND_PART.WARD_SUBTITLE"
        name={`supporter.${SECOND_PART.UP_WARD_ID}`}
        options={upWards}
        placeholder={t('PLACEHOLDER.SELECT')}
        isSearchable
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

export default UnionParishadElection;
