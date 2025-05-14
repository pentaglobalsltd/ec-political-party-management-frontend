import { Trans, useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { SectionHeader, Table, Text } from '@pentabd/ui';
import {
  commitmentAchievementTableColumns,
  liabilitiesTableColumns,
  loanInformationColumns,
} from '../constants';
import { FORM_FIELDS } from '@constants/forms';
import FormInput from '@components/inputs/FormInput';
import { useParams } from 'react-router-dom';
import { useAffidavitLiabilities } from '@hooks/candidate-info-management/controller-list/candidate-confirmation/affidavit-form/useLiabilities';
import { useDownloadAttachFile } from '@hooks/miscellaneous/documents/useDownloadAttachFIle';
import { electionNameMapping } from '@helpers/election-type';
import { ELECTION_INFO } from '@constants/election-info';
import { getDigitBanglaFromEnglish } from '@utils';

const LIABILITY_LOAN_OATH =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_CONFIRMATION
    .LIABILITY_LOAN_OATH;

const Liability = () => {
  const { t } = useTranslation();
  const { electionSettingsId, candidateElectionDetailsId, electionTypeId } =
    useParams();
  const electionTypeKey = electionNameMapping(Number(electionTypeId));
  const { downloadAttachFileHandler } = useDownloadAttachFile();
  const { affidavitLiabilities } = useAffidavitLiabilities({
    electionSettingsId,
    candidateElectionDetailsId,
  });
  const methods = useForm({
    values: affidavitLiabilities,
  });
  const { getValues, register } = methods;
  const selectedBefore = getValues('notElectedBefore');
  const receivedLoans = getValues('notReceivedLoans');

  return (
    <FormProvider {...methods}>
      <form className="container">
        <div className="py-10 border-top">
          <SectionHeader title={t('CANDIDATE_CONFIRMATION.LIABILITY')} />
          <div className="d-flex flex-column gap-9 pt-10">
            <Text size="sm" weight="medium" color="title">
              {t(
                `CANDIDATE_CONFIRMATION.DESCRIPTION_LIABILITY.${electionTypeKey}`,
              )}
            </Text>
            <Table
              columns={liabilitiesTableColumns(
                t,
                downloadAttachFileHandler,
                electionTypeKey,
              )}
              rows={affidavitLiabilities?.liabilities || []}
            />
          </div>
          <div className="d-flex flex-column gap-9 py-9 border-bottom">
            {/* only show for national Election */}
            {Number(electionTypeId) === ELECTION_INFO.NATIONAL.ID ? (
              selectedBefore === true ? (
                <div className="p-9 bg-primary-50 rounded-4 d-flex flex-column gap-9">
                  <div className="row g-0">
                    <div className="col-xl-4">
                      <Text weight="medium" size="sm" color="title">
                        {t('CANDIDATE_CONFIRMATION.NOT_SELECTED')}
                      </Text>
                      <br />
                      <Text weight="medium" size="sm" color="subtitle2">
                        {t('CANDIDATE_CONFIRMATION.MARK_SIGN')}
                      </Text>
                    </div>
                    <div className="col-xl-8">
                      <input
                        type="checkbox"
                        id={'notElectedBefore'}
                        {...register('notElectedBefore')}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className=" d-flex flex-column gap-9">
                  <div className="p-9 bg-primary-50 rounded-4">
                    <Text weight="medium" size="sm" color="title">
                      {t('CANDIDATE_CONFIRMATION.SELECTED')}
                    </Text>
                  </div>
                  <Table
                    columns={commitmentAchievementTableColumns(t)}
                    rows={affidavitLiabilities?.commitmentAchievements || []}
                  />
                </div>
              )
            ) : null}

            {/* ----serial change----- */}
            {receivedLoans === true ? (
              <div className="d-flex flex-column gap-9 bg-primary-50 rounded-4 p-9">
                <div className="row g-9">
                  <div className="col-xl-8">
                    <Text weight="medium" size="sm" color="title">
                      {Number(electionTypeId) ===
                      ELECTION_INFO.UNION_PARISHAD.ID
                        ? getDigitBanglaFromEnglish(7)
                        : null}
                      .
                      <Trans
                        i18nKey={`CANDIDATE_CONFIRMATION.NOT_TAKEN.${electionTypeKey}`}
                        values={{
                          sectionSerial:
                            Number(electionTypeId) === ELECTION_INFO.NATIONAL.ID
                              ? getDigitBanglaFromEnglish(8)
                              : getDigitBanglaFromEnglish(7),
                        }}
                      ></Trans>
                    </Text>
                    <br />
                    <Text weight="medium" size="sm" color="title">
                      {t('CANDIDATE_CONFIRMATION.MARK_SIGN')}
                    </Text>
                  </div>
                  <div className="col-xl-4">
                    <input
                      type="checkbox"
                      id={'notReceivedLoans'}
                      {...register('notReceivedLoans')}
                      disabled
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column gap-9">
                <div className="bg-primary-50 rounded-4 p-9">
                  <Text weight="medium" size="sm" color="title">
                    {Number(electionTypeId) === ELECTION_INFO.UNION_PARISHAD.ID
                      ? getDigitBanglaFromEnglish(7)
                      : null}
                    .
                    <Trans
                      i18nKey={`CANDIDATE_CONFIRMATION.TAKEN.${electionTypeKey}`}
                      values={{
                        sectionSerial:
                          Number(electionTypeId) === ELECTION_INFO.NATIONAL.ID
                            ? getDigitBanglaFromEnglish(8)
                            : getDigitBanglaFromEnglish(7),
                      }}
                    ></Trans>
                  </Text>
                </div>
                <Table
                  columns={loanInformationColumns(t, electionTypeKey)}
                  rows={affidavitLiabilities?.loans || []}
                />
              </div>
            )}
          </div>
          <div className="d-flex flex-column gap-9 pb-9">
            <div className="p-9 mt-8 bg-primary-50 rounded-4">
              <Text size="sm" weight="normal" color="title">
                {t(`CANDIDATE_CONFIRMATION.OATH.${electionTypeKey}`)}
              </Text>
            </div>
            <div>
              <FormInput
                title="CANDIDATE_CONFIRMATION.CANDIDATE"
                registerName={`oath.candidateInfo.${LIABILITY_LOAN_OATH.OATH.CANDIDATE_INFO.NAME}`}
                placeholder=" "
                disabled
              />
              <FormInput
                title="CANDIDATE_CONFIRMATION.FATHER_OR_HUSBAND_NAME"
                registerName={`oath.candidateInfo.${LIABILITY_LOAN_OATH.OATH.CANDIDATE_INFO.FATHER_OR_HUBAND_NAME}`}
                placeholder=" "
                disabled
              />
              <FormInput
                title="CANDIDATE_CONFIRMATION.MOTHER_NAME"
                registerName={`oath.candidateInfo.${LIABILITY_LOAN_OATH.OATH.CANDIDATE_INFO.MOTHER_NAME}`}
                placeholder=" "
                disabled
              />
              <FormInput
                title="CANDIDATE_CONFIRMATION.CANDIDATE_ADDRESS"
                registerName={`oath.candidateInfo.${LIABILITY_LOAN_OATH.OATH.CANDIDATE_INFO.ADDRESS}`}
                placeholder=" "
                disabled
              />
              <FormInput
                title="CANDIDATE_CONFIRMATION.IDENTIFIER_NAME"
                registerName={`oath.identifierInfo.${LIABILITY_LOAN_OATH.OATH.IDENTIFIER_INFO.NAME}`}
                placeholder=" "
                disabled
              />
              <FormInput
                title="CANDIDATE_CONFIRMATION.IDENTIFIER_ADDRESS"
                registerName={`oath.identifierInfo.${LIABILITY_LOAN_OATH.OATH.IDENTIFIER_INFO.ADDRESS}`}
                placeholder=" "
                disabled
              />
              <FormInput
                title="CANDIDATE_CONFIRMATION.IDENTIFY_DATE"
                registerName={`oath.${LIABILITY_LOAN_OATH.OATH.HOLOFNAMA_SUBMISSION_DATE}`}
                placeholder=" "
                disabled
              />
              <FormInput
                title="CANDIDATE_CONFIRMATION.MAGISTRATE_NAME"
                registerName={`oath.magistrateNotaryPublic.${LIABILITY_LOAN_OATH.OATH.MAGISTRATE_NOTARY_PUBLIC.NAME}`}
                placeholder=" "
                disabled
              />
              <FormInput
                title="CANDIDATE_CONFIRMATION.MAGISTRATE_SIGN_DATE"
                registerName={`oath.magistrateNotaryPublic.${LIABILITY_LOAN_OATH.OATH.MAGISTRATE_NOTARY_PUBLIC.SIGNING_DATE}`}
                placeholder=" "
                disabled
              />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
export default Liability;
