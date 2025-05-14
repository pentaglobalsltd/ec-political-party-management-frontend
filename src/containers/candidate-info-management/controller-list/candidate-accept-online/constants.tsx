import { IconHomeLine, IconSearch } from '@pentabd/icons';
import { Badge, Button, DownloadButtons, InputText, Text } from '@pentabd/ui';
import { TFunction } from 'i18next';

import { dynamicColumnForElectionConstituency } from '@containers/candidate-info-management/helper/dynamicColumnForElectionConstituency';
import { NominationType } from '@type/candidate-info-management/nomination-list-type';
import { dynamicColumnForCandidateType } from '@containers/candidate-info-management/helper/dynamicColumnForCandidateType';

export const acceptBreadcrumbs = (t: TFunction<'translation', undefined>) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('ACCEPT.ACCEPT'),
  },
];

export const acceptTableHeader = {
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
  rightComponents: [<DownloadButtons key={1} fileName="test" />],
};

export const acceptTableColumns = ({
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
    name: t('CANDIDATE_APPLIED_ONLINE.CANDIDATE_NAME'),
    key: 'candidateName',
  },
  {
    id: 2,
    name: t('CANDIDATE_APPLIED_ONLINE.MOBILE'),
    key: 'phoneNumber',
  },
  {
    id: 3,
    name: t('CANDIDATE_APPLIED_ONLINE.EMAIL'),
    key: 'email',
  },
  ...dynamicColumnForElectionConstituency({ params, t, isAdmin }),

  ...dynamicColumnForCandidateType({ params, isAdmin }),

  {
    id: 5,
    name: t('CANDIDATE_APPLIED_ONLINE.ATTACHMENT'),
    key: 'attachment',
    hide: isDownload,
    render: () => (
      <Button isPadding={false}>
        <Text size="sm" weight="normal" className="text-primary-middark">
          {t('CANDIDATE_APPLIED_ONLINE.SEE_ATTACHMENT')}
        </Text>
      </Button>
    ),
  },
  {
    id: 6,
    name: t('CANDIDATE_APPLIED_ONLINE.NOMINATION_LETTER'),
    key: 'nominationLetter',
    hide: isDownload,
    render: () => (
      <Button isPadding={false}>
        <Text size="sm" weight="normal" className="text-primary-middark">
          {t('CANDIDATE_APPLIED_ONLINE.SEE_ATTACHMENT')}
        </Text>
      </Button>
    ),
  },
  {
    id: 7,
    name: t('CANDIDATE_APPLIED_ONLINE.NOMINATION_LETTER_FILLED_BY_CANDIDATE'),
    key: 'nominationLetterFilledByCandidate',
    hide: isDownload,
    render: () => (
      <Button isPadding={false}>
        <Text size="sm" weight="normal" className="text-primary-middark">
          {t('CANDIDATE_APPLIED_ONLINE.SEE_ATTACHMENT')}
        </Text>
      </Button>
    ),
  },

  {
    id: 8,
    name: t('CANDIDATE_APPLIED_ONLINE.STATUS'),
    key: 'nominationStatus',
    render: (data: any) => (
      <div className="d-flex">
        <Badge
          className="text-nowrap"
          size="sm"
          label={data as string}
          type="success"
        />
      </div>
    ),
  },

  {
    id: 11,
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

const NOMINATION_LETTER_RADIO_CODES = {
  ACCEPT: 5,
  REJECT: 6,
};

export const radioOptions = (t: TFunction<'translation', undefined>) => [
  {
    id: 'accept',
    value: NOMINATION_LETTER_RADIO_CODES.ACCEPT,
    label: t('CANDIDATE_APPLIED_ONLINE.ACCEPT'),
  },
  {
    id: 'reject',
    value: NOMINATION_LETTER_RADIO_CODES.REJECT,
    label: t('CANDIDATE_APPLIED_ONLINE.REJECT'),
  },
];

export const APPLICATION_STATUS = {
  VERIFY: 14,
  ONLINE_NOMINATION_SUBMIT: 2,
};
