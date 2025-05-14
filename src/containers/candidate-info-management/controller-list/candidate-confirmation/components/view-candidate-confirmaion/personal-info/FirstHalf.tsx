import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import { SectionHeader, Text } from '@pentabd/ui';

import FormInput from '@components/inputs/FormInput';
import FormRadio from '@components/inputs/FormRadio';
import CandidateImage from './CandidateImage';

import { FORM_FIELDS } from '@constants/forms';
import { ELECTION_INFO } from '@constants/election-info';
import { CandidatePersonalInformationType } from '@type/candidate-info-management/candidate-confirmation/persona-info';
import { genderRadioOptions, maritalStatusRadioOptions } from '../constants';

const PERSONAL =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_CONFIRMATION
    .PERSONAL;

const FirstHalf = ({ image }: CandidatePersonalInformationType) => {
  const { t } = useTranslation();
  const { electionTypeId } = useParams();

  const isNotUpazillaOrUnionParishadElection = Number(electionTypeId) !== ELECTION_INFO.UPAZILLA.ID && Number(electionTypeId) !== ELECTION_INFO.UNION_PARISHAD.ID 

  return (
    <div className="pt-12">
      <div className="py-12 border-top">
        <SectionHeader
          title={t('CANDIDATE_CONFIRMATION.PERSONAL_INFORMATION')}
        />
      </div>
      <div className="d-grid grid-cols-12 mb-12">
        <div className="col-span-3">
          <Text weight="semibold" size="sm" color="title">
            {t('CANDIDATE_CONFIRMATION.CANDIDATE_IMAGE')}
          </Text>
        </div>
        <div className="col-span-9 col-span-lg-5">
          <div className="confirmation-candidate-image border border-2 border-primary rounded-4">
            {image ? (
              <CandidateImage image={image} />
            ) : (
              <img src="/person.png" alt="candidate" className="border w-100" />
            )}
          </div>
        </div>
      </div>
      <FormInput
        title="CANDIDATE_CONFIRMATION.CANDIDATES_NAME"
        registerName={PERSONAL.PERSONAL_INFO.CANDIDATE_NAME}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.CANDIDATES_NAME_EN"
        registerName={PERSONAL.PERSONAL_INFO.CANDIDATE_NAME_EN}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.NATIONAL_ID"
        registerName={PERSONAL.PERSONAL_INFO.NATIONAL_ID}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.FATHER_NAME"
        registerName={PERSONAL.PERSONAL_INFO.FATHER_NAME}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.FATHER_NAME_EN"
        registerName={PERSONAL.PERSONAL_INFO.FATHER_NAME_EN}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.MOTHER_NAME"
        registerName={PERSONAL.PERSONAL_INFO.MOTHER_NAME}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.MOTHER_NAME_EN"
        registerName={PERSONAL.PERSONAL_INFO.MOTHER_NAME_EN}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.SPOUSE_NAME"
        registerName={PERSONAL.PERSONAL_INFO.SPOUSE_NAME}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.SPOUSE_NAME_EN"
        registerName={PERSONAL.PERSONAL_INFO.SPOUSE_NAME_EN}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.DATE_OF_BIRTH"
        registerName={PERSONAL.PERSONAL_INFO.DATE_OF_BIRTH}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.AGE"
        registerName={PERSONAL.PERSONAL_INFO.AGE}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.PLACE_OF_BIRTH"
        registerName={PERSONAL.PERSONAL_INFO.PLACE_OF_BIRTH}
        disabled
      />

      {isNotUpazillaOrUnionParishadElection ? (
        <FormInput
          title="CANDIDATE_CONFIRMATION.ADDRESS_OF_PLACE_OF_BIRTH"
          registerName={PERSONAL.PERSONAL_INFO.ADDRESS_OF_PLACE_OF_BIRTH}
          disabled
        />
      ) : null}

      <FormRadio
        options={genderRadioOptions(t)}
        title="CANDIDATE_CONFIRMATION.GENDER"
        name={PERSONAL.PERSONAL_INFO.GENDER}
        id={PERSONAL.PERSONAL_INFO.GENDER}
        disabled
      />
      <FormRadio
        options={maritalStatusRadioOptions(t)}
        title="CANDIDATE_CONFIRMATION.MARITAL_STATUS"
        name={PERSONAL.PERSONAL_INFO.MARITAL_STATUS}
        id={PERSONAL.PERSONAL_INFO.MARITAL_STATUS}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.OCCUPATION"
        registerName={PERSONAL.PERSONAL_INFO.OCCUPATION}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.SPOUSE_OCCUPATION"
        registerName={PERSONAL.PERSONAL_INFO.SPOUSE_OCCUPATION}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.CANDIDATE_TIN_NUMBER"
        registerName={PERSONAL.PERSONAL_INFO.CANDIDATE_TIN_NUMBER}
        disabled
      />
      <Text
        component="p"
        sizeType="fs"
        size="md"
        weight="semibold"
        className="mb-12"
      >
        {t('CANDIDATE_CONFIRMATION.ADDRESS')}
      </Text>
      <FormInput
        title="CANDIDATE_CONFIRMATION.PERMANENT_ADDRESS"
        registerName={PERSONAL.ADDRESS.PERMANENT_ADDRESS}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.PRESENT_ADDRESS"
        registerName={PERSONAL.ADDRESS.PRESENT_ADDRESS}
        disabled
      />
    </div>
  );
};
export default FirstHalf;
