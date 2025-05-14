import { TFunction } from 'i18next';
import { ErrorMessage } from '@hookform/error-message';
import dayjs from 'dayjs';

import {
  IconHomeLine,
  IconSearch,
  IconCheck,
  IconX,
  IconPdf,
} from '@pentabd/icons';
import { Button, DownloadButtons, InputText, Text } from '@pentabd/ui';
import { NominationType } from '@type/candidate-info-management/nomination-list-type';
import { dynamicColumnForElectionConstituency } from '@containers/candidate-info-management/helper/dynamicColumnForElectionConstituency';
import { dynamicColumnForCandidateType } from '@containers/candidate-info-management/helper/dynamicColumnForCandidateType';

export const candidateVerifyTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('VERIFY.CANDIDATE_VERIFY_TITLE'),
  },
];

export const ViewCandidateVerifyTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('VERIFY.CANDIDATE_VERIFY_TITLE'),
  },
  {
    label: t('VERIFY.VIEW_CANDIDATE_VERIFY_TITTLE'),
  },
];

export const candidateVerifyTableHeader = {
  leftComponents: [
    <InputText
      key={1}
      name="pre-input"
      outline
      placeholder="Search"
      prefix={<IconSearch size="20" />}
      size="md"
      type="text"
      status="default"
    />,
  ],
  rightComponents: [<DownloadButtons key={1} fileName={'test'} />],
};

export const candidateVerifyTableColumns = ({
  t,
  handleButton,
  stepId,
  params,
  isDownload = false,
  isAdmin,
}: {
  t: any;
  handleButton: any;
  stepId: any;
  params: any;
  isDownload?: boolean;
  isAdmin: boolean;
}) => [
  {
    id: 1,
    name: t('VERIFY.CANDIDATE_NAME'),
    key: 'candidateName',
  },
  ...dynamicColumnForCandidateType({ params, isAdmin }),
  ...dynamicColumnForElectionConstituency({ params, t }),

  {
    id: 5,
    name: t('VERIFY.CANDIDATE_VOTER_NUMBER'),
    key: 'voterNumber',
  },

  {
    id: 6,
    name: t('VERIFY.VOTER_LIST'),
    key: 'voterListFile',
    hide: isDownload,
    render: (data: any) => (data ? <IconPdf fill="none" size={32} /> : <></>),
  },

  {
    id: 7,
    name: t('VERIFY.IS_CANDIDATE_VOTER_NUMBER'),
    key: 'candidateVoterNoCorrectForDownload',
    hide: !isDownload,
  },
  {
    id: 8,
    name: t('VERIFY.IS_CANDIDATE_VOTER_NUMBER'),
    key: 'candidateVoterNoCorrect',
    hide: isDownload,
    render: (data: any) =>
      data ? (
        <IconCheck size="26" fill="success" />
      ) : (
        <IconX size="26" fill="danger" />
      ),
  },

  {
    id: 9,
    name: t('VERIFY.IS_PROPOSER_VOTER_NUMBER'),
    key: 'proposerVoterNoCorrectForDownload',
    hide: !isDownload,
  },
  {
    id: 10,
    name: t('VERIFY.IS_PROPOSER_VOTER_NUMBER'),
    key: 'proposerVoterNoCorrect',
    hide: isDownload,
    render: (data: any) =>
      data ? (
        <IconCheck size="26" fill="success" />
      ) : (
        <IconX size="26" fill="danger" />
      ),
  },

  {
    id: 11,
    name: t('VERIFY.IS_SUPPORTER_VOTER_NUMBER'),
    key: 'supporterVoterNoCorrectForDownload',
    hide: !isDownload,
  },

  {
    id: 12,
    name: t('VERIFY.IS_SUPPORTER_VOTER_NUMBER'),
    key: 'supporterVoterNoCorrect',
    hide: isDownload,
    render: (data: any) =>
      data ? (
        <IconCheck size="26" fill="success" />
      ) : (
        <IconX size="26" fill="danger" />
      ),
  },

  {
    id: 13,
    name: t('CANDIDATE_APPLIED_ONLINE.OPERATIONS'),
    key: 'id',
    hide: isDownload,
    render: (data: any, raw: NominationType) => (
      <Button type="info" onClick={() => handleButton(raw)} disabled={!stepId}>
        {t('CANDIDATE_CONFIRMATION.SEE')}
      </Button>
    ),
  },
];

// view candidate verify table

export const ViewCandidateVerifyTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('VERIFY.SUBJECT'),
    key: 'subject',
  },
  {
    id: 2,
    name: t('VERIFY.NOMINATION_INFO'),
    key: 'nominationEntry',
  },
  {
    id: 3,
    name: t('VERIFY.VOTER_INFO'),
    key: 'voterDatabase',
  },
];

export const ViewCandidateVerifyTableRows = (
  t: TFunction<'translation', undefined>,
  candidateDetails: NominationType,
) => {
  let age;
  if (candidateDetails?.dob) {
    const date1 = dayjs();
    age = date1.diff(dayjs(candidateDetails?.dob), 'year');
  }
  return [
    {
      id: 1,
      subject: t('VERIFY.VERIFY_TABLE_ROWS.CANDIDATE_NAME'),
      nominationEntry: candidateDetails?.candidateName,
      voterDatabase: candidateDetails?.candidateName,
    },
    {
      id: 2,
      subject: t('VERIFY.VERIFY_TABLE_ROWS.CANDIDATE_AGE'),
      nominationEntry: age,
      voterDatabase: age,
    },
    {
      id: 3,
      subject: t('VERIFY.VERIFY_TABLE_ROWS.CANDIDATE_VOTER_NUMBER'),
      nominationEntry: candidateDetails?.voterNo,
      voterDatabase: candidateDetails?.voterNo,
    },
    {
      id: 3,
      subject: t('VERIFY.VERIFY_TABLE_ROWS.CANDIDATE_VOTER_SEQUENCE'),
      nominationEntry: candidateDetails?.serialNo,
      voterDatabase: candidateDetails?.serialNo,
    },
    {
      id: 4,
      subject: t('VERIFY.VERIFY_TABLE_ROWS.CANDIDATE_VOTER_AREA'),
      nominationEntry: candidateDetails?.voterArea,
      voterDatabase: candidateDetails?.voterArea,
    },
    {
      id: 5,
      subject: t('VERIFY.VERIFY_TABLE_ROWS.PROPOSER_NAME'),
      nominationEntry: candidateDetails?.proposerName,
      voterDatabase: candidateDetails?.proposerName,
    },
    {
      id: 6,
      subject: t('VERIFY.VERIFY_TABLE_ROWS.PROPOSER_VOTER_NO'),
      nominationEntry: candidateDetails?.proposerVoterNo,
      voterDatabase: candidateDetails?.proposerVoterNo,
    },
    {
      id: 7,
      subject: t('VERIFY.VERIFY_TABLE_ROWS.PROPOSER_VOTER_SEQUENCE'),
      nominationEntry: candidateDetails?.proposerSerialNo,
      voterDatabase: candidateDetails?.proposerSerialNo,
    },
    {
      id: 8,
      subject: t('VERIFY.VERIFY_TABLE_ROWS.PROPOSER_VOTER_AREA'),
      nominationEntry: candidateDetails?.proposerVoterArea,
      voterDatabase: candidateDetails?.proposerVoterArea,
    },
    {
      id: 9,
      subject: t('VERIFY.VERIFY_TABLE_ROWS.SUPPORTER_NAME'),
      nominationEntry: candidateDetails?.supporterName,
      voterDatabase: candidateDetails?.supporterName,
    },
    {
      id: 10,
      subject: t('VERIFY.VERIFY_TABLE_ROWS.SUPPORTER_VOTER_NO'),
      nominationEntry: candidateDetails?.supporterVoterNo,
      voterDatabase: candidateDetails?.supporterVoterNo,
    },
    {
      id: 11,
      subject: t('VERIFY.VERIFY_TABLE_ROWS.SUPPORTER_VOTER_SEQUENCE'),
      nominationEntry: candidateDetails?.supporterSerialNo,
      voterDatabase: candidateDetails?.supporterSerialNo,
    },
    {
      id: 12,
      subject: t('VERIFY.VERIFY_TABLE_ROWS.SUPPORTER_VOTER_AREA'),
      nominationEntry: candidateDetails?.supporterVoterArea,
      voterDatabase: candidateDetails?.supporterVoterArea,
    },
  ];
};

// view candidate verify name table

export const ViewCandidateVerifyNameTableColumns = (
  t: TFunction<'translation', undefined>,
  register: any,
  errors: any,
) => {
  return [
    {
      id: 1,
      name: t('VERIFY.CANDIDATE_NAME'),
      key: 'candidateName',
    },
    {
      id: 2,
      name: t('VERIFY.INFO'),
      key: 'info',
      render: (data: string, rows: any) => {
        return (
          <>
            <input
              type="checkbox"
              {...register(rows?.info)}
              onChange={(e) => e.target.checked}
            />
            {Object.keys(errors).length !== 0 && (
              <div className="py-3">
                <ErrorMessage
                  errors={errors}
                  name={rows?.info}
                  render={({ message }) => (
                    <Text color="danger">{t(message)}</Text>
                  )}
                />
              </div>
            )}
          </>
        );
      },
    },
  ];
};

export const ViewCandidateVerifyNameTableRows = (
  t: TFunction<'translation', undefined>,
) => {
  return [
    {
      id: 1,
      candidateName: t(
        'VERIFY.VERIFY_CANDIDATE_NAME_TABLE_ROWS.CANDIDATE_INFO',
      ),
      info: 'isCandidateInfoCorrect',
    },
    {
      id: 2,
      candidateName: t('VERIFY.VERIFY_CANDIDATE_NAME_TABLE_ROWS.PROPOSER_INFO'),
      info: 'isProposerInfoCorrect',
    },
    {
      id: 3,
      candidateName: t('VERIFY.VERIFY_CANDIDATE_NAME_TABLE_ROWS.VERIFIER_INFO'),
      info: 'isVerifierInfoCorrect',
    },
    {
      id: 3,
      candidateName: t(
        'VERIFY.VERIFY_CANDIDATE_NAME_TABLE_ROWS.CANDIDATE_PERSONAL_INFO',
      ),
      info: 'isCandidatePersonalInfoCorrect',
    },
    {
      id: 4,
      candidateName: t('VERIFY.VERIFY_CANDIDATE_NAME_TABLE_ROWS.HOLOFNAMA'),
      info: 'isHalafnamaCorrect',
    },
    {
      id: 5,
      candidateName: t('VERIFY.VERIFY_CANDIDATE_NAME_TABLE_ROWS.ATTACHED'),
      info: 'isAttachmentCorrect',
    },
    {
      id: 6,
      candidateName: t('VERIFY.VERIFY_CANDIDATE_NAME_TABLE_ROWS.CANDIDATE_AGE'),
      info: 'isCandidateAgeCorrect',
    },
    {
      id: 7,
      candidateName: t(
        'VERIFY.VERIFY_CANDIDATE_NAME_TABLE_ROWS.CANDIDATE_VOTER_NO',
      ),
      info: 'isCandidateVoterNoCorrect',
    },
    {
      id: 8,
      candidateName: t(
        'VERIFY.VERIFY_CANDIDATE_NAME_TABLE_ROWS.PROPOSER_VOTER_NO',
      ),
      info: 'isProposerVoterNoCorrect',
    },
    {
      id: 9,
      candidateName: t(
        'VERIFY.VERIFY_CANDIDATE_NAME_TABLE_ROWS.SUPPORTER_VOTER_NO',
      ),
      info: 'isSupporterVoterNoCorrect',
    },
  ];
};
