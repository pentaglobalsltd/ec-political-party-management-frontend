import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FORM_FIELDS } from '@constants/forms';
import FormInput from '@components/inputs/FormInput';
import { electionNameMapping } from '@helpers/election-type';

const CANDIDATE_PERSONAL_INFO =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.THIRD_PART
    .CANDIDATE_PERSONAL_INFO;

const ThirdPartInputFields = () => {
  const { t } = useTranslation();

  const { electionTypeId } = useParams();

  const electionTypeKey = electionNameMapping(Number(electionTypeId));

  return (
    <>
      <FormInput
        title={`THIRD_PART.CANDIDATE_NAME.${electionTypeKey}`}
        registerName={`candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.NAME}`}
        placeholder={t('PLACEHOLDER.ENTER')}
        required
        // disabled
      />
      <FormInput
        title="THIRD_PART.NID_NO"
        registerName={`candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.NID_NO}`}
        placeholder={t('PLACEHOLDER.ENTER')}
        required
        // disabled
      />
      <FormInput
        title="THIRD_PART.FATHER_OR_HUSBAND_NAME"
        registerName={`candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.FATHER_OR_HUSBAND_NAME}`}
        placeholder={t('PLACEHOLDER.ENTER')}
        required
        // disabled
      />
      <FormInput
        title="THIRD_PART.MOTHER_NAME"
        registerName={`candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.MOTHER_NAME}`}
        placeholder={t('PLACEHOLDER.ENTER')}
        required
        // disabled
      />
      <FormInput
        title="THIRD_PART.CANDIDATE_ADDRESS"
        registerName={`candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.PERMANENT_ADDRESS}`}
        placeholder={t('PLACEHOLDER.ENTER')}
        required
        // disabled
      />
      <FormInput
        title="THIRD_PART.CANDIDATE_VOTER_NUMBER"
        registerName={`candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.VOTER_NUMBER}`}
        placeholder={t('PLACEHOLDER.ENTER')}
        required
        // disabled
      />
      <FormInput
        title="THIRD_PART.SERIAL_NUMBER"
        registerName={`candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.SERIAL_NUMBER}`}
        placeholder={t('PLACEHOLDER.ENTER')}
        required
      />
    </>
  );
};

export default ThirdPartInputFields;
