import { Trans, useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';

import { Text } from '@pentabd/ui';
import { IconCalendar } from '@pentabd/icons';

import FormDate from '@components/inputs/FormDate';
import FormInput from '@components/inputs/FormInput';
import FormTextArea from '@components/inputs/FormTextArea';
import ClaimedCaseDescriptionTable from '../../components/ClaimedCaseDescriptionTable';
import DependentsEarningSourceTable from '../../components/DependentsEarningSourceTable';

import { FIRST_STEP_AFFIDAVIT } from '@validations/candidate-info-management/operator/affidavit/firstStepAffidavitFormValidation';
import { GenericAffidavitFirstPartProps } from '../GenericAffidavitFirstPartProps';

const GeneralWardCouncillor = ({
  electionTypeKey,
  candidateTypeKey,
  affidavitFormStepOne,
  submitData,
  openCaseEditModal,
  handleButtonDisable,
}: GenericAffidavitFirstPartProps) => {
  const { t } = useTranslation();
  const { register, watch } = useFormContext();

  const presentCaseChecked = watch(
    `candidatePersonalInfo.${FIRST_STEP_AFFIDAVIT.NO_PRESENT_CRIMINAL_CASE}`,
  );
  const pastCaseChecked = watch(
    `candidatePersonalInfo.${FIRST_STEP_AFFIDAVIT.NO_PAST_CRIMINAL_CASE_BEFORE}`,
  );

  return (
    <>
      <FormInput
        title={`AFFIDAVIT_STEP_ONE.CANDIDATE_NAME.${electionTypeKey}`}
        registerName={`candidatePersonalInfo.${FIRST_STEP_AFFIDAVIT.CANDIDATE_NAME}`}
        subtitle={`AFFIDAVIT_STEP_ONE.CANDIDATE_NAME_SUBTITLE.${electionTypeKey}`}
        placeholder="PLACEHOLDER.ENTER"
        disabled
      />

      <FormDate
        name="AFFIDAVIT_STEP_ONE.DATE_OF_BIRTH"
        title="AFFIDAVIT_STEP_ONE.DATE_OF_BIRTH"
        registerName={`candidatePersonalInfo.${FIRST_STEP_AFFIDAVIT.DATE_OF_BIRTH}`}
        prefix={<IconCalendar size="20" fill="subtitle2" />}
        placeholder={t('AFFIDAVIT_STEP_ONE.DATE_OF_BIRTH')}
        maximumDate={dayjs()}
        disabled
      />

      <FormInput
        title="AFFIDAVIT_STEP_ONE.FATHER_HUSBAND_NAME"
        registerName={`candidatePersonalInfo.${FIRST_STEP_AFFIDAVIT.FATHER_HUSBAND_NAME}`}
        placeholder="PLACEHOLDER.ENTER"
        disabled
      />

      <FormInput
        title="AFFIDAVIT_STEP_ONE.MOTHER_NAME"
        registerName={`candidatePersonalInfo.${FIRST_STEP_AFFIDAVIT.MOTHER_NAME}`}
        placeholder="PLACEHOLDER.ENTER"
        disabled
      />

      <FormInput
        title="AFFIDAVIT_STEP_ONE.PERMANENT_ADDRESS"
        registerName={`candidatePersonalInfo.${FIRST_STEP_AFFIDAVIT.PERMANENT_ADDRESS}`}
        placeholder="PLACEHOLDER.ENTER"
        disabled
      />

      <FormInput
        title="AFFIDAVIT_STEP_ONE.PRESENT_ADDRESS"
        registerName={`candidatePersonalInfo.${FIRST_STEP_AFFIDAVIT.PRESENT_ADDRESS}`}
        placeholder="PLACEHOLDER.ENTER"
        disabled
      />

      <div className="border-top pt-8">
        <div className="p-9 bg-primary-50 rounded-4">
          <Trans
            i18nKey={`AFFIDAVIT_STEP_ONE.VOTE_CONTENT.${electionTypeKey}.${candidateTypeKey}`}
            values={{
              ELECTION_TYPE:
                affidavitFormStepOne?.candidatePersonalInfo?.electionType,
              CANDIDATE_TYPE:
                affidavitFormStepOne?.candidatePersonalInfo?.candidateType,
              CONSTITUENCY:
                affidavitFormStepOne?.candidatePersonalInfo?.constituency,
              MUNICIPALITY:
                affidavitFormStepOne?.candidatePersonalInfo?.municipalityName,
            }}
          ></Trans>
        </div>
      </div>

      <FormInput
        title="AFFIDAVIT_STEP_ONE.CANDIDATE_HIGHER_DEGREE"
        subtitle="AFFIDAVIT_STEP_ONE.PASSES_CANDIDATE_NAME"
        registerName={`candidatePersonalInfo.${FIRST_STEP_AFFIDAVIT.CANDIDATES_HIGHER_DEGREE}`}
        placeholder="PLACEHOLDER.ENTER"
        additionalText="AFFIDAVIT_STEP_ONE.CANDIDATE_HIGHER_DEGREE_INFO"
      />

      <div className="row g-0 border-top pt-8">
        <div className="col-xl-6">
          <Text weight="medium" size="sm" color="title">
            {t('AFFIDAVIT_STEP_ONE.CURRENT_NO_CASE')}
          </Text>
          <br />
          <Text weight="medium" size="sm" color="title">
            {t('AFFIDAVIT_STEP_ONE.MARK_SIGN')}
          </Text>
        </div>
        <div className="col-xl-6">
          <input
            type="checkbox"
            id={`candidatePersonalInfo.${FIRST_STEP_AFFIDAVIT.NO_PRESENT_CRIMINAL_CASE}`}
            {...register(
              `candidatePersonalInfo.${FIRST_STEP_AFFIDAVIT.NO_PRESENT_CRIMINAL_CASE}`,
            )}
          />
        </div>
      </div>

      {!presentCaseChecked && (
        <ClaimedCaseDescriptionTable
          presentCaseChecked={presentCaseChecked as boolean}
          submitData={submitData}
          tableName="presentCases"
          openCaseEditModal={openCaseEditModal}
          handleButtonDisable={handleButtonDisable}
        />
      )}

      <div className="row g-0">
        <div className="col-xl-6">
          <Text weight="medium" size="sm" color="title">
            {t('AFFIDAVIT_STEP_ONE.PAST_NO_CASE')}
          </Text>
          <br />
          <Text weight="medium" size="sm" color="title">
            {t('AFFIDAVIT_STEP_ONE.MARK_SIGN')}
          </Text>
        </div>
        <div className="col-xl-6">
          <input
            type="checkbox"
            id={`candidatePersonalInfo.${FIRST_STEP_AFFIDAVIT.NO_PAST_CRIMINAL_CASE_BEFORE}`}
            {...register(
              `candidatePersonalInfo.${FIRST_STEP_AFFIDAVIT.NO_PAST_CRIMINAL_CASE_BEFORE}`,
            )}
          />
        </div>
      </div>

      {!pastCaseChecked && (
        <ClaimedCaseDescriptionTable
          pastCaseChecked={pastCaseChecked as boolean}
          submitData={submitData}
          tableName="pastCases"
          openCaseEditModal={openCaseEditModal}
          handleButtonDisable={handleButtonDisable}
        />
      )}

      <FormTextArea
        title="AFFIDAVIT_STEP_ONE.OCCUPATION"
        registerName={`candidatePersonalInfo.${FIRST_STEP_AFFIDAVIT.OCCUPATION}`}
        placeholder="PLACEHOLDER.ENTER"
        maxCharacters={500}
      />

      <DependentsEarningSourceTable rowsArrayData={affidavitFormStepOne} />
    </>
  );
};

export default GeneralWardCouncillor;
