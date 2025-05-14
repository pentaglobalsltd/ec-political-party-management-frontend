import { IconHomeLine, IconPencil02 } from '@pentabd/icons';
import { Badge, Button, Text } from '@pentabd/ui';
import { TFunction } from 'i18next';

import { dynamicColumnForElectionConstituency } from '@containers/candidate-info-management/helper/dynamicColumnForElectionConstituency';
import { NominationType } from '@type/candidate-info-management/nomination-list-type';
import { USER_TYPES } from '@constants/user-types';
import { dynamicColumnForCandidateType } from '@containers/candidate-info-management/helper/dynamicColumnForCandidateType';
import { dynamicColumnForElectionScheduleName } from '@containers/candidate-info-management/helper/dynamicColumnForElectionName';

export const candidateAppliedOnlineBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CANDIDATE_APPLIED_ONLINE.CANDIDATE_APPLIED_ONLINE'),
  },
];

export const candidateAppliedUpdateBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CANDIDATE_APPLIED_ONLINE.ACCEPT'),
  },
  {
    label: t('CANDIDATE_APPLIED_ONLINE.CANDIDATE_APPLIED_ONLINE_UPDATE'),
  },
];

export const candidateAppliedOnlineTableColumns = ({
  t,
  handleButton,
  handleSummary,
  stepId,
  isAccessible,
  handleAttachmentView,
  params,
  isDownload = false,
  userType,
  isAdmin,
}: {
  t: TFunction<'translation', undefined>;
  handleButton: (row: NominationType) => void;
  handleSummary: (row: NominationType) => void;
  stepId: number;
  isAccessible: any;
  handleAttachmentView: (row: NominationType) => void;
  params: { [x: string]: string };
  isDownload?: boolean;
  userType?: string;
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

  ...dynamicColumnForElectionScheduleName({ params, t, isAdmin }),

  ...dynamicColumnForElectionConstituency({ params, t }),

  ...dynamicColumnForCandidateType({ params, isAdmin }),

  // ------------------------------

  {
    id: 6,
    name: t('CANDIDATE_APPLIED_ONLINE.ATTACHMENT'),
    key: 'attachment',
    hide: isDownload,
    render: (_: any, row: NominationType) => (
      <Button isPadding={false} onClick={() => handleAttachmentView(row)}>
        <Text
          size="sm"
          weight="normal"
          className="text-primary-middark text-underline"
        >
          {t('CANDIDATE_APPLIED_ONLINE.SEE_ATTACHMENT')}
        </Text>
      </Button>
    ),
  },

  {
    id: 9,
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
    id: 10,
    name: t('CANDIDATE_APPLIED_ONLINE.OPERATIONS'),
    key: 'id',
    hide: isDownload,
    render: (data: any, raw: NominationType) => (
      <Button type="info" onClick={() => handleButton(raw)} disabled={!stepId}>
        {t('CANDIDATE_CONFIRMATION.SEE')}
      </Button>
    ),
  },
  ...(userType !== USER_TYPES.RETURNING_OFFICER
    ? [
        {
          id: 11,
          name: t('CANDIDATE_APPLIED_ONLINE.UPDATE'),
          key: 'id',
          hide: !isAccessible && isDownload,
          render: (data: any, raw: NominationType) => (
            <div className="pointer" onClick={() => handleSummary(raw)}>
              <IconPencil02 size="20" fill="primary" />
            </div>
          ),
        },
      ]
    : []),

  // ------------------------------
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
  ACKNOWLEDGE: 4,
  ONLINE_NOMINATION_SUBMIT: 2,
};

export const submittedByRadioOptions = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 'candidate',
    value: 'CANDIDATE',
    label: t('CANDIDATE_APPLIED_ONLINE.CANDIDATE'),
  },
  {
    id: 'proposer',
    value: 'PROPOSER',
    label: t('CANDIDATE_APPLIED_ONLINE.PROPOSER'),
  },
  {
    id: 'supporter',
    value: 'SUPPORTER',
    label: t('CANDIDATE_APPLIED_ONLINE.SUPPORTER'),
  },
];
