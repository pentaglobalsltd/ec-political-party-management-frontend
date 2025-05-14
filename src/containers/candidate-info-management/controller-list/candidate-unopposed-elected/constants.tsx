import { TFunction } from 'i18next';
import { Button } from '@pentabd/ui';
import { IconHomeLine } from '@pentabd/icons';

import { NominationType } from '@type/candidate-info-management/nomination-list-type';
import { isUnopposedElect } from './helper';
import { dynamicColumnForElectionConstituency } from '@containers/candidate-info-management/helper/dynamicColumnForElectionConstituency';

// for Breadcrumbs
export const unopposedElectedBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('UNOPPOSED_ELECTED.UNOPPOSED_ELECTED'),
  },
];

// for Table
export const unopposedElectedTableColumns = ({
  t,
  isDownload = false,
  onClickDelete,
  onClickElectUnopposed,
  updateLoading,
  params,
}: {
  t: TFunction<'translation', undefined>;
  isDownload?: boolean;
  onClickDelete: (row: NominationType) => void;
  onClickElectUnopposed: (row: NominationType) => void;
  updateLoading?: boolean;
  params: any;
}) => [
  {
    id: 1,
    name: t('UNOPPOSED_ELECTED.TABLE_COLUMNS.CANDIDATE_NAME'),
    key: 'candidateName',
  },
  {
    id: 2,
    name: t('UNOPPOSED_ELECTED.TABLE_COLUMNS.NID'),
    key: 'nid',
  },
  {
    id: 3,
    name: t('UNOPPOSED_ELECTED.TABLE_COLUMNS.CANDIDATE_TYPE'),
    key: 'candidateType',
  },

  ...dynamicColumnForElectionConstituency({ params, t }),

  ...(isDownload
    ? []
    : [
        {
          id: 5,
          name: t('UNOPPOSED_ELECTED.TABLE_COLUMNS.ACTION'),
          key: 'nominationStatusCode',
          render: (data: number, row: NominationType) =>
            isUnopposedElect(data) ? (
              <Button
                type="info"
                loading={updateLoading}
                onClick={() => onClickElectUnopposed(row)}
              >
                {t('UNOPPOSED_ELECTED.ACTION_BUTTON_LABEL.ELECT_CANDIDATE')}
              </Button>
            ) : (
              <Button
                type="danger"
                loading={updateLoading}
                onClick={() => onClickDelete(row)}
              >
                {t('UNOPPOSED_ELECTED.ACTION_BUTTON_LABEL.DELETE')}
              </Button>
            ),
        },
      ]),
];
