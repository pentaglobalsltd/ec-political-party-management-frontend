import { TFunction } from 'i18next';
import { IconHomeLine, IconPencil02 } from '@pentabd/icons';

import { dynamicColumnForElectionConstituency } from '@containers/candidate-info-management/helper/dynamicColumnForElectionConstituency';

export const candidatePersonalInfoBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CANDIDATE_PERSONAL_INFO.CANDIDATE_PERSONAL_INFO'),
  },
];

export const candidatePersonalInfoTableColumns = ({
  t,
  editHandler,
  params,
  isDownload = false,
}: {
  t: TFunction<'translation', undefined>;
  editHandler: (id: any) => void;
  params?: any;
  isDownload?: boolean;
}) => [
  {
    id: 1,
    name: t('CANDIDATE_PERSONAL_INFO.CANDIDATE_NAME'),
    key: 'candidateName',
  },
  {
    id: 2,
    name: t('CANDIDATE_PERSONAL_INFO.NID'),
    key: 'nid',
  },

  ...dynamicColumnForElectionConstituency({ params, t }),

  {
    id: 3,
    name: t('CANDIDATE_PERSONAL_INFO.POST_NAME'),
    key: 'candidateType',
  },
  {
    id: 4,
    name: t('CANDIDATE_PERSONAL_INFO.DISTRICT'),
    key: 'electionZilla',
  },

  ...(!isDownload
    ? [
        {
          id: 6,
          name: t('CANDIDATE_PERSONAL_INFO.OPERATIONS'),
          key: 'operations',
          render: (data: any, raw: any) => (
            <div className="pointer" onClick={() => editHandler(raw)}>
              <IconPencil02 size="20" fill="primary" />
            </div>
          ),
        },
      ]
    : []),
];
