import { TFunction } from 'i18next';
import { Button } from '@pentabd/ui';
import { IconHomeLine } from '@pentabd/icons';

import { dynamicColumnForElectionConstituency } from '@containers/candidate-info-management/helper/dynamicColumnForElectionConstituency';

export const incomeSourceDetailsBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('INCOME_SOURCE_DETAILS.HEADING'),
  },
];

export const incomeSourceDetailsTableColumns = ({
  t,
  editHandler,
  params,
  isDownload,
}: {
  t: TFunction<'translation', undefined>;
  editHandler: (row: any) => void;
  params?: any;
  isDownload?: boolean;
}) => [
  {
    id: 1,
    name: t('INCOME_SOURCE_DETAILS.CANDIDATE_NAME'),
    key: 'candidateName',
  },
  {
    id: 2,
    name: t('INCOME_SOURCE_DETAILS.NID'),
    key: 'nid',
  },

  ...dynamicColumnForElectionConstituency({ params, t }),

  {
    id: 3,
    name: t('INCOME_SOURCE_DETAILS.POST_NAME'),
    key: 'candidateType',
  },
  {
    id: 4,
    name: t('INCOME_SOURCE_DETAILS.DISTRICT'),
    key: 'electionZilla',
  },

  ...(!isDownload
    ? [
        {
          id: 5,
          name: t('INCOME_SOURCE_DETAILS.PROCESS'),
          key: 'process',
          render: (data: any, raw: any) => (
            <Button type="info" fill="outline" onClick={() => editHandler(raw)}>
              {t('INCOME_SOURCE_DETAILS.ROW_EDIT_BUTTON')}
            </Button>
          ),
        },
      ]
    : []),
];
