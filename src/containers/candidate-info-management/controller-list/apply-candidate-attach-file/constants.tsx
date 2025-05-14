import { TFunction } from 'i18next';
import { IconHomeLine, IconPencil02 } from '@pentabd/icons';
import { dynamicColumnForElectionConstituency } from '@containers/candidate-info-management/helper/dynamicColumnForElectionConstituency';
export const attachmentBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('ATTACH_FILE.PAGE_TITLE'),
  },
];

export const attachmentTableColumns = ({
  t,
  editAttachmentHandler,
  params,
  isDownload,
}: {
  t: TFunction<'translation', undefined>;
  editAttachmentHandler: (row: any) => void;
  params?: any;
  isDownload?: boolean;
}) => [
  {
    id: 1,
    name: t('ATTACH_FILE.CANDIDATE_NAME'),
    key: 'candidateName',
  },
  {
    id: 2,
    name: t('ATTACH_FILE.NID'),
    key: 'nid',
  },

  ...dynamicColumnForElectionConstituency({ params, t }),

  {
    id: 3,
    name: t('ATTACH_FILE.POST_NAME'),
    key: 'candidateType',
  },
  {
    id: 4,
    name: t('ATTACH_FILE.DISTRICT'),
    key: 'electionZilla',
  },

  ...(!isDownload
    ? [
        {
          id: 5,
          name: t('ATTACH_FILE.PROCESS'),
          key: 'process',
          render: (data: any, raw: any) => (
            <div className="pointer" onClick={() => editAttachmentHandler(raw)}>
              <IconPencil02 size="20" fill="primary" />
            </div>
          ),
        },
      ]
    : []),
];
