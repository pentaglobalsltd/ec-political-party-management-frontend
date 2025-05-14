import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';
import { Button } from '@pentabd/ui';
import { dynamicColumnForElectionConstituency } from '@containers/candidate-info-management/helper/dynamicColumnForElectionConstituency';

export const affidavitBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('AFFIDAVIT.AFFIDAVIT'),
  },
];

export const affidavitTableColumns = ({
  t,
  editAffidavitHandler,
  params,
  isDownload = false,
  isRemoveEditButton = false,
}: {
  t: TFunction<'translation', undefined>;
  editAffidavitHandler: (row: any) => void;
  params?: any;
  isDownload?: boolean;
  isRemoveEditButton?: boolean;
}) => [
  {
    id: 1,
    name: t('AFFIDAVIT.CANDIDATE_NAME'),
    key: 'candidateName',
  },
  {
    id: 2,
    name: t('AFFIDAVIT.NID'),
    key: 'nid',
  },
  ...dynamicColumnForElectionConstituency({ params, t }),
  {
    id: 3,
    name: t('AFFIDAVIT.POST_NAME'),
    key: 'candidateType',
  },
  {
    id: 4,
    name: t('AFFIDAVIT.DISTRICT'),
    key: 'electionZilla',
  },

  ...(!isDownload && !isRemoveEditButton
    ? [
        {
          id: 6,
          name: t('AFFIDAVIT.PROCESS'),
          key: 'process',
          render: (data: any, raw: any) => (
            <Button
              type="info"
              fill="outline"
              onClick={() => editAffidavitHandler(raw)}
            >
              {t('AFFIDAVIT.UPDATE_AFFIDAVIT_BUTTON')}
            </Button>
          ),
        },
      ]
    : []),
];
