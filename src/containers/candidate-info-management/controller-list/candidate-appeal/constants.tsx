import { TFunction } from 'i18next';

import { Badge, DownloadButtons, InputText } from '@pentabd/ui';
import { IconHomeLine, IconSearch } from '@pentabd/icons';

import { dynamicColumnForElectionConstituency } from '@helpers/dynamicColumnForElectionConstituency';
import { dynamicColumnForCandidateType } from '@containers/candidate-info-management/helper/dynamicColumnForCandidateType';

export const appealBreadcrumbs = (t: TFunction<'translation', undefined>) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('APPEAL.APPEAL'),
  },
];

export const appealTableHeader = {
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
  rightComponents: [<DownloadButtons key={2} fileName={'test'} />],
};

export const appealTableColumns = ({
  t,
  params,
  isDownload = false,
  isAdmin,
}: {
  t: TFunction<'translation', undefined>;
  params: any;
  isDownload?: boolean;
  isAdmin: boolean;
}) => [
  {
    id: 1,
    name: t('APPEAL.SERIAL'),
    key: 'idx',
  },
  {
    id: 2,
    name: t('APPEAL.CANDIDATE_NAME'),
    key: 'candidateName',
  },
  {
    id: 3,
    name: t('APPEAL.NID'),
    key: 'nid',
  },
  ...dynamicColumnForCandidateType({ params, isAdmin }),

  ...dynamicColumnForElectionConstituency({ params, t, isAdmin }),
  {
    id: 12,
    name: t('CANDIDACY_WITHDRAWAL.PRESENT_NOMINATION_STATUS'),
    key: 'nominationStatus',
  },
  ...(!isDownload
    ? [
        {
          id: 6,
          name: t('APPEAL.APPEAL_TYPE'),
          key: 'appealType',
        },
        {
          id: 7,
          name: t('APPEAL.DETAILS'),
          key: 'details',
        },
        {
          id: 8,
          name: t('APPEAL.ATTACHMENT'),
          key: 'status',
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
          id: 9,
          name: t('APPEAL.FILE'),
          key: 'file',
        },
        {
          id: 10,
          name: t('APPEAL.OPERATION'),
          key: 'operation',
        },
      ]
    : []),
];
