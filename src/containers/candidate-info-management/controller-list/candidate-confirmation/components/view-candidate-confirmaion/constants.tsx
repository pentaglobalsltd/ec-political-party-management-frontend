import { TFunction } from 'i18next';

import { Button, Text } from '@pentabd/ui';

import Download from '@containers/candidate-info-management/controller-list/candidate-management/components/Download';

import { LANGUAGE } from '@hooks/miscellaneous/custom-hook/useLanguage';
import { DocumentServiceType } from '@type/documents/document-service-type';
import { DownloadFileIdType } from '@type/documents/attach-file';
import { MaritalStatusType } from '@type/candidate-info-management/candidate-confirmation/marital-statuses';
import { getDigitBanglaFromEnglish } from '@utils';

export const candidateConfirmationAttachmentTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('CANDIDATE_MANAGEMENT.FILE_NAME'),
    key: 'fileName',
  },
  {
    id: 2,
    name: t('CANDIDATE_MANAGEMENT.COMMENT'),
    key: 'comment',
  },
  {
    id: 3,
    name: '',
    key: 'procedure',
    render: (data: DocumentServiceType, row: any) => {
      return data && Object.keys(data).length > 0 && data?.documentId ? (
        <Download data={data} isViewFile type={row.type} />
      ) : null;
    },
  },
];

export const candidateConfirmationAttachmentTableRows = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    fileName: t('CANDIDATE_MANAGEMENT.CANDIDATE_PICTURE'),
    comment: '-',
    procedure: '',
  },
  {
    id: 2,
    fileName: t('CANDIDATE_MANAGEMENT.INCOME_TAX_RETURN_COPY'),
    comment: '-',
    procedure: '',
  },
  {
    id: 3,
    fileName: t('CANDIDATE_MANAGEMENT.POLITICAL_PARTY_NOMINATION'),
    comment: '-',
    procedure: '',
  },
  {
    id: 4,
    fileName: t('CANDIDATE_MANAGEMENT.VOTER_SIGNATURE_LIST'),
    comment: '-',
    procedure: '',
  },
  {
    id: 5,
    fileName: t('CANDIDATE_MANAGEMENT.PAY_ORDER'),
    comment: '-',
    procedure: '',
  },
  {
    id: 6,
    fileName: t('CANDIDATE_MANAGEMENT.AFFIDAVIT'),
    comment: '-',
    procedure: 'pdf',
  },
  {
    id: 7,
    fileName: t('CANDIDATE_MANAGEMENT.EDUCATIONAL_CERTIFICATE'),
    comment: '-',
    procedure: '',
  },
  {
    id: 9,
    fileName: t('CANDIDATE_MANAGEMENT.NOMINATION_LETTER'),
    comment: '-',
    procedure: '',
  },
];

export const genderRadioOptions = (t: TFunction<'translation', undefined>) => [
  {
    id: 'male',
    label: t('CANDIDATE_CONFIRMATION.MALE'),
    value: 'MALE',
  },
  {
    id: 'female',
    label: t('CANDIDATE_CONFIRMATION.FEMALE'),
    value: 'FEMALE',
  },
  {
    id: 'thirdGender',
    label: t('CANDIDATE_CONFIRMATION.THIRD_GENDER'),
    value: 'NEUTRAL',
  },
];

export const maritalStatusRadioOptions = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 'unmarried',
    label: t('CANDIDATE_CONFIRMATION.UNMARRIED'),
    value: 'SINGLE',
  },
  {
    id: 'married',
    label: t('CANDIDATE_CONFIRMATION.MARRIED'),
    value: 'MARRIED',
  },
  {
    id: 'widowed',
    label: t('CANDIDATE_CONFIRMATION.WIDOWED'),
    value: 'WIDOW',
  },
  {
    id: 'divorced',
    label: t('CANDIDATE_CONFIRMATION.DIVORCED'),
    value: 'DIVORCED',
  },
];

export const childrenTableColumns = (
  t: TFunction<'translation', undefined>,
  maritalStatuses: any,
  lang: string | null,
) => [
  {
    id: 1,
    name: t('CANDIDATE_CONFIRMATION.CHILD_SERIAL'),
    key: 'id',
    render: (data: number) => {
      return <Text>{getDigitBanglaFromEnglish(data + 1)}</Text>;
    },
  },
  {
    id: 2,
    name: t('CANDIDATE_CONFIRMATION.CHILD_NAME'),
    key: 'name',
  },
  {
    id: 3,
    name: t('CANDIDATE_CONFIRMATION.CHILD_EDUCATIONAL_QUALIFICATION'),
    key: 'education',
  },
  {
    id: 4,
    name: t('CANDIDATE_CONFIRMATION.CHILD_DOB'),
    key: 'dob',
  },
  {
    id: 5,
    name: t('CANDIDATE_CONFIRMATION.CHILD_INSTITUTE_ADDRESS'),
    key: 'occupationAndOfficeAddress',
  },
  {
    id: 6,
    name: t('CANDIDATE_CONFIRMATION.CHILD_MARITAL_STATUS'),
    key: 'maritalStatus',
    render: (data: string) => {
      const status = maritalStatuses?.find((item: MaritalStatusType) => {
        return item?.nameEn === data;
      });

      return (
        <Text>
          {lang === LANGUAGE.BANGLA ? status?.nameBn : status?.nameEn || ''}
        </Text>
      );
    },
  },
];

export const claimedCaseTableColumns = (
  t: TFunction<'translation', undefined>,
  downloadAttachFileHandler: ({
    documentId,
    fileId,
  }: DownloadFileIdType) => void,
) => [
  {
    id: 1,
    name: t('CANDIDATE_CONFIRMATION.ID'),
    key: 'idx',
    render: (data: number) => getDigitBanglaFromEnglish(data),
  },
  {
    id: 2,
    name: t('CANDIDATE_CONFIRMATION.ACCUSED_CASE'),
    key: 'accusedCase',
  },
  {
    id: 3,
    name: t('CANDIDATE_CONFIRMATION.COURT_NAME'),
    key: 'courtName',
  },
  {
    id: 4,
    name: t('CANDIDATE_CONFIRMATION.CASE_NO'),
    key: 'caseNumber',
  },
  {
    id: 5,
    name: t('CANDIDATE_CONFIRMATION.CASE_STATUS'),
    key: 'caseStatus',
  },
  {
    id: 6,
    name: t('CANDIDATE_CONFIRMATION.FILE'),
    key: 'caseFile',
    render: (data: DocumentServiceType) => {
      return data && Object.keys(data).length > 0 ? (
        <div className="d-flex justify-content-end gap-7">
          <Button
            fill="fill"
            type="primary"
            htmlType="button"
            // disabled={documentLen === 0}
            onClick={() =>
              downloadAttachFileHandler({
                documentId: data?.documentId,
                fileId: data?.fileId,
                formatId: 2,
                fileType: data?.fileType,
                filePath: data?.filePath,
              })
            }
          >
            {t('CANDIDATE_MANAGEMENT.DOWNLOAD')}
          </Button>
        </div>
      ) : null;
    },
  },
];

export const dependentsEarningSourceTableColumns = (
  t: TFunction<'translation', undefined>,
  electionTypeKey?: string
) => [
  {
    id: 1,
    key: 'serialNo',
    name: t('CANDIDATE_CONFIRMATION.ID'),
    render: (data: number) => getDigitBanglaFromEnglish(data),
  },
  {
    id: 2,
    key: 'label',
    name: t('CANDIDATE_CONFIRMATION.INCOME_SOURCE_DETAILS'),
  },
  {
    id: 3,
    key: 'selfIncome',
    name: t(`CANDIDATE_CONFIRMATION.YEARLY_INCOME.${electionTypeKey}`),
  },
  {
    id: 4,
    key: 'dependentIncome',
    name: t('CANDIDATE_CONFIRMATION.DEPENDENT_EARNING'),
  },
];

export const movablePropertyTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    key: 'serialNo',
    name: t('CANDIDATE_CONFIRMATION.ID'),
    render: (data: number) => getDigitBanglaFromEnglish(data),
  },
  {
    id: 2,
    key: 'label',
    name: t('CANDIDATE_CONFIRMATION.PROPERTY_TYPE'),
  },
  {
    id: 3,
    key: 'self',
    name: t('CANDIDATE_CONFIRMATION.OWN'),
  },
  {
    id: 4,
    key: 'spouse',
    name: t('CANDIDATE_CONFIRMATION.HUSBAND_OR_WIFE'),
  },
  {
    id: 5,
    key: 'dependent',
    name: t('CANDIDATE_CONFIRMATION.DEPENDENT'),
  },
];

export const immovablePropertyTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    key: 'serialNo',
    name: t('CANDIDATE_CONFIRMATION.ID'),
    render: (data: number) => getDigitBanglaFromEnglish(data),
  },
  {
    id: 2,
    key: 'label',
    name: t('CANDIDATE_CONFIRMATION.PROPERTY_DESCRIPTION'),
  },
  {
    id: 3,
    key: 'self',
    name: t('CANDIDATE_CONFIRMATION.OWN'),
  },
  {
    id: 4,
    key: 'spouse',
    name: t('CANDIDATE_CONFIRMATION.HUSBAND_OR_WIFE'),
  },
  {
    id: 5,
    key: 'dependent',
    name: t('CANDIDATE_CONFIRMATION.DEPENDENT'),
  },
  {
    id: 6,
    key: 'jointOwnership',
    name: t('CANDIDATE_CONFIRMATION.JOIN_OWNERSHIP'),
  },
  {
    id: 7,
    key: 'shareInJointOwnership',
    name: t('CANDIDATE_CONFIRMATION.CANDIDATE_SHARE'),
  },
];

export const liabilitiesTableColumns = (
  t: TFunction<'translation', undefined>,
  downloadAttachFileHandler: ({
    documentId,
    fileId,
  }: DownloadFileIdType) => void,
  electionTypeKey?: string
) => [
  {
    id: 1,
    name: t(`CANDIDATE_CONFIRMATION.LIABILITIES_TYPE.${electionTypeKey}`),
    key: 'natureLiabilitiesDebts',
  },
  {
    id: 2,
    name: t('CANDIDATE_CONFIRMATION.LIABILITIES_AMOUNT'),
    key: 'amount',
  },
  {
    id: 3,
    key: 'file',
    name: t('CANDIDATE_CONFIRMATION.FILE'),
    render: (data: DocumentServiceType) => {
      return data && Object.keys(data).length > 0 ? (
        <div className="d-flex justify-content-end gap-7">
          <Button
            fill="fill"
            type="primary"
            htmlType="button"
            // disabled={documentLen === 0}
            onClick={() =>
              downloadAttachFileHandler({
                documentId: data?.documentId,
                fileId: data?.fileId,
                formatId: 2,
                fileType: data?.fileType,
                filePath: data?.filePath,
              })
            }
          >
            {t('CANDIDATE_MANAGEMENT.DOWNLOAD')}
          </Button>
        </div>
      ) : null;
    },
  },
];

export const commitmentAchievementTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('CANDIDATE_CONFIRMATION.ID'),
    key: 'id',
    render: (data: number) => getDigitBanglaFromEnglish(data),
  },
  {
    id: 2,
    name: t('CANDIDATE_CONFIRMATION.PROMISES'),
    key: 'promises',
  },
  {
    id: 3,
    name: t('CANDIDATE_CONFIRMATION.ACHIEVEMENTS'),
    key: 'achievements',
  },
];

export const loanInformationColumns = (
  t: TFunction<'translation', undefined>,
  electionTypeKey: string | undefined,
) => [
  {
    id: 1,
    key: 'loanType',
    name: t('CANDIDATE_CONFIRMATION.LOAN_TYPE'),
  },
  {
    id: 2,
    key: 'FinancialInstitutionName',
    name: t(`CANDIDATE_CONFIRMATION.BANK_NAME.${electionTypeKey}`),
  },
  {
    id: 3,
    key: 'LoanAmount',
    name: t('CANDIDATE_CONFIRMATION.LOAN_AMOUNT'),
  },
  {
    id: 4,
    key: 'DefaultedLoanAmount',
    name: t('CANDIDATE_CONFIRMATION.DEFAULTED_LOAN'),
  },
  {
    id: 5,
    key: 'RescheduledLoanDate',
    name: t(`CANDIDATE_CONFIRMATION.SCHEDULED_DATE.${electionTypeKey}`),
  },
];
