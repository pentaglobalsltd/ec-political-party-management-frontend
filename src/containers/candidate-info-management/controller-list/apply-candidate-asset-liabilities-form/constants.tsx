import { TFunction } from 'i18next';
import { Button } from '@pentabd/ui';
import { IconHomeLine } from '@pentabd/icons';

import { dynamicColumnForElectionConstituency } from '@containers/candidate-info-management/helper/dynamicColumnForElectionConstituency';

export const assetLiabilitiesBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('ASSET_LIABILITIES.ASSET_LIABILITIES'),
  },
];

export const assetLiabilitiesTableColumns = ({
  t,
  editHandler,
  params,
  isDownload = false,
}: {
  t: TFunction<'translation', undefined>;
  editHandler: (row: any) => void;
  params?: any;
  isDownload?: boolean;
}) => [
  {
    id: 1,
    name: t('ASSET_LIABILITIES.CANDIDATE_NAME'),
    key: 'candidateName',
  },
  ...dynamicColumnForElectionConstituency({ params, t }),
  {
    id: 2,
    name: t('ASSET_LIABILITIES.POST_NAME'),
    key: 'candidateType',
  },
  {
    id: 3,
    name: t('ASSET_LIABILITIES.DISTRICT'),
    key: 'electionZilla',
  },

  ...(!isDownload
    ? [
        {
          id: 5,
          name: t('ASSET_LIABILITIES.PROCESS'),
          key: 'process',
          render: (data: any, raw: any) => (
            <Button type="info" fill="outline" onClick={() => editHandler(raw)}>
              {t('ASSET_LIABILITIES.ROW_EDIT_BUTTON')}
            </Button>
          ),
        },
      ]
    : []),
];
