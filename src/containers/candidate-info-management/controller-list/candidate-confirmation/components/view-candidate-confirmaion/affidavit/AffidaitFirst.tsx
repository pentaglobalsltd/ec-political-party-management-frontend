import { FormProvider, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { SectionHeader, Table, Text } from '@pentabd/ui';
import FormInput from '@components/inputs/FormInput';
import { FORM_FIELDS } from '@constants/forms';
import {
  claimedCaseTableColumns,
  dependentsEarningSourceTableColumns,
} from '../constants';
import { useAffidavitStepOne } from '@hooks/candidate-info-management/controller-list/candidate-confirmation/affidavit-form/useAffidavitStepOne';
import { useDownloadAttachFile } from '@hooks/miscellaneous/documents/useDownloadAttachFIle';
import { ELECTION_INFO } from '@constants/election-info';
import FormDate from '@components/inputs/FormDate';
import { IconCalendar } from '@pentabd/icons';
import dayjs from 'dayjs';
import { candidateNameMapping } from '@helpers/candidate-type';
import { electionNameMapping } from '@helpers/election-type';
import FormTextArea from '@components/inputs/FormTextArea';

const AFFIDAVIT =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_CONFIRMATION
    .AFFIDAVIT.AFFIDAVIT;

const AffidavitFirst = () => {
  const { t } = useTranslation();
  const {
    electionSettingsId,
    candidateElectionDetailsId,
    electionTypeId,
    candidateTypeId,
  } = useParams();

  const candidateTypeKey = candidateNameMapping(Number(candidateTypeId));
  const electionTypeKey = electionNameMapping(Number(electionTypeId));

  const { downloadAttachFileHandler } = useDownloadAttachFile();
  const { affidavitStepOneData } = useAffidavitStepOne({
    electionSettingsId,
    candidateElectionDetailsId,
  });
  const methods = useForm({
    values: affidavitStepOneData,
  });

  const { register, getValues } = methods;
  const presentCase = getValues('candidatePersonalInfo.noPresentCriminalCase');
  const pastCase = getValues('candidatePersonalInfo.noPastCriminalCase');

  return (
    <FormProvider {...methods}>
      <form className="container">
        <div className="py-12">
          <div className="py-12 border-top">
            <SectionHeader
              title={t('CANDIDATE_CONFIRMATION.AFFIDAVIT')}
              subtitle={t('CANDIDATE_CONFIRMATION.CANDIDATE_FILL_UP')}
            />
          </div>
          <FormInput
            title={`CANDIDATE_CONFIRMATION.CANDIDATE_NAME.${electionTypeKey}`}
            registerName={`candidatePersonalInfo.${AFFIDAVIT.CANDIDATE_NAME}`}
            placeholder=" "
            disabled
          />

          {Number(electionTypeId) === ELECTION_INFO.UNION_PARISHAD.ID ? (
            
            <FormDate
              name="CANDIDATE_CONFIRMATION.DATE_OF_BIRTH"
              title="CANDIDATE_CONFIRMATION.DATE_OF_BIRTH"
              registerName={`candidatePersonalInfo.${AFFIDAVIT.DATE_OF_BIRTH}`}
              prefix={<IconCalendar size="20" fill="subtitle2" />}
              placeholder={t('CANDIDATE_CONFIRMATION.DATE_OF_BIRTH')}
              maximumDate={dayjs()}
              disabled
          />
          ) : null}

          <FormInput
            title="CANDIDATE_CONFIRMATION.FATHER_OR_HUSBAND_NAME"
            registerName={`candidatePersonalInfo.${AFFIDAVIT.FATHER_HUSBAND_NAME}`}
            placeholder=" "
            disabled
          />
          <FormInput
            title="CANDIDATE_CONFIRMATION.MOTHER_NAME"
            registerName={`candidatePersonalInfo.${AFFIDAVIT.MOTHER_NAME}`}
            placeholder=" "
            disabled
          />

          {
            Number(electionTypeId) != ELECTION_INFO.UNION_PARISHAD.ID ? 
              <FormInput
                title="CANDIDATE_CONFIRMATION.CANDIDATE_ADDRESS"
                registerName={`candidatePersonalInfo.${AFFIDAVIT.CANDIDATE_ADDRESS}`}
                placeholder=" "
                disabled
              />
            : <>
              <FormInput
                title="CANDIDATE_CONFIRMATION.PRESENT_ADDRESS"
                registerName={`candidatePersonalInfo.${AFFIDAVIT.PRESENT_ADDRESS}`}
                placeholder=" "
                disabled
              />
              <FormInput
                title="CANDIDATE_CONFIRMATION.PERMANENT_ADDRESS"
                registerName={`candidatePersonalInfo.${AFFIDAVIT.PERMANENT_ADDRESS}`}
                placeholder=" "
                disabled
              />
            </>
          }


          {Number(electionTypeId) === ELECTION_INFO.CITY_CORPORATION.ID ||
          Number(electionTypeId) === ELECTION_INFO.UPAZILLA.ID ||
          Number(electionTypeId) === ELECTION_INFO.MUNICIPALITY.ID ? (
            <FormDate
              name="CANDIDATE_CONFIRMATION.DATE_OF_BIRTH"
              title="CANDIDATE_CONFIRMATION.DATE_OF_BIRTH"
              registerName={`candidatePersonalInfo.${AFFIDAVIT.DATE_OF_BIRTH}`}
              prefix={<IconCalendar size="20" fill="subtitle2" />}
              placeholder={t('CANDIDATE_CONFIRMATION.DATE_OF_BIRTH')}
              maximumDate={dayjs()}
              disabled
            />
          ) : null}
          <div className="border-top py-12">
            <div className="bg-primary-50 rounded-4 p-9">
              <Text weight="medium" size="sm" color="title">
                <Trans
                  i18nKey={`AFFIDAVIT_STEP_ONE.VOTE_CONTENT.${electionTypeKey}.${candidateTypeKey}`}
                  values={{
                    ELECTION_TYPE:
                      affidavitStepOneData?.candidatePersonalInfo?.electionType,
                    CANDIDATE_TYPE:
                      affidavitStepOneData?.candidatePersonalInfo
                        ?.candidateType,
                    CONSTITUENCY:
                      affidavitStepOneData?.candidatePersonalInfo?.constituency,
                    MUNICIPALITY:
                      affidavitStepOneData?.candidatePersonalInfo
                        ?.municipalityName,
                  }}
                ></Trans>
              </Text>
            </div>
          </div>
          <FormInput
            title="CANDIDATE_CONFIRMATION.CANDIDATE_HIGHER_DEGREE"
            subtitle="CANDIDATE_CONFIRMATION.DEGREE_NAME"
            registerName={`candidatePersonalInfo.${AFFIDAVIT.CANDIDATES_HIGHER_DEGREE}`}
            placeholder=" "
            disabled
          />
          {presentCase === true ? (
            <div className="row g-0 border-top py-10">
              <div className="col-xl-4">
                <Text weight="medium" size="sm" color="title">
                  {t('CANDIDATE_CONFIRMATION.CURRENT_NO_CASE')}
                </Text>
                <br />
                <Text weight="medium" size="sm" color="title">
                  {t('CANDIDATE_CONFIRMATION.MARK_SIGN')}
                </Text>
              </div>
              <div className="col-xl-8">
                <input
                  type="checkbox"
                  id={'candidatePersonalInfo.noPresentCriminalCase'}
                  {...register('candidatePersonalInfo.noPresentCriminalCase')}
                  disabled
                />
              </div>
            </div>
          ) : (
            <div className="py-10">
              <div className="mb-10">
                <Text weight="medium" size="sm" color="title">
                  {t('CANDIDATE_CONFIRMATION.CLAIMED_PRESENT_CASE_DESCRIPTION')}
                </Text>
              </div>

              <Table
                rows={affidavitStepOneData?.presentCases || []}
                columns={claimedCaseTableColumns(t, downloadAttachFileHandler)}
              />
            </div>
          )}
          {pastCase === true ? (
            <div className="row g-0 border-top py-10">
              <div className="col-xl-4">
                <Text weight="medium" size="sm" color="title">
                  {t('CANDIDATE_CONFIRMATION.PAST_NO_CASE')}
                </Text>
                <br />
                <Text weight="medium" size="sm" color="title">
                  {t('CANDIDATE_CONFIRMATION.MARK_SIGN')}
                </Text>
              </div>
              <div className="col-xl-8">
                <input
                  type="checkbox"
                  id={AFFIDAVIT.NO_PAST_CRIMINAL_CASE_BEFORE}
                  {...register('candidatePersonalInfo.noPastCriminalCase')}
                  disabled
                />
              </div>
            </div>
          ) : (
            <div className="py-10">
              <div className="mb-10">
                <Text weight="medium" size="sm" color="title">
                  {t('CANDIDATE_CONFIRMATION.CLAIMED_PAST_CASE_DESCRIPTION')}
                </Text>
              </div>

              <Table
                rows={affidavitStepOneData?.pastCases || []}
                columns={claimedCaseTableColumns(t, downloadAttachFileHandler)}
              />
            </div>
          )}
          <FormTextArea
            title={Number(electionTypeId) === ELECTION_INFO.UNION_PARISHAD.ID ? "CANDIDATE_CONFIRMATION.OCCUPATION_BUSINESS" : "CANDIDATE_CONFIRMATION.OCCUPATION_DETAILS"}
            registerName={`candidatePersonalInfo.${AFFIDAVIT.OCCUPATION}`}
            maxCharacters={500}
            placeholder=" "
            disabled
          />
          <div className="pb-10">
            <Text weight="medium" size="sm" color="title">
              {t('CANDIDATE_CONFIRMATION.DEPENDENTS_EARNING_SOURCE')}
            </Text>
          </div>
          <Table
            rows={affidavitStepOneData?.incomeSources || []}
            columns={dependentsEarningSourceTableColumns(t,electionTypeKey)}
          />
        </div>
      </form>
    </FormProvider>
  );
};
export default AffidavitFirst;
