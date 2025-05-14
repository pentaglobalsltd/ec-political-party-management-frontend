import { TFunction } from 'i18next';
import { IconHomeLine, IconPencil02 } from '@pentabd/icons';
import { ROUTES } from '@constants/routes';
import { NavigateOptions, To } from 'react-router-dom';

export const electionTypeTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('ELECTION_TYPE.ELECTION_TYPE'),
  },
];

export const newElectionTypeBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('ELECTION_TYPE.ELECTION_TYPE'),
  },
  {
    label: t('ELECTION_TYPE.ADD_NEW'),
  },
];

export const editElectionTypeBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('ELECTION_TYPE.ELECTION_TYPE'),
  },
  {
    label: t('ELECTION_TYPE.EDIT'),
  },
];

export const electionTypeTableColumns = ({
  t,
  navigate,
  isDownload,
}: {
  t: TFunction<'translation', undefined>;
  isDownload?: boolean;
  navigate: (to: To, options?: NavigateOptions) => void;
}) => [
  {
    id: 1,
    name: t('ELECTION_TYPE.ID'),
    key: 'id',
  },
  {
    id: 2,
    name: t('ELECTION_TYPE.ELECTION_TYPE_BANGLA'),
    key: 'nameBn',
  },
  {
    id: 3,
    name: t('ELECTION_TYPE.ELECTION_TYPE_ENGLISH'),
    key: 'nameEn',
  },
  {
    id: 4,
    name: '',
    key: 'id',
    hide: isDownload,
    render: (id: any) => (
      <div
        className="pointer"
        onClick={() => navigate(ROUTES.EDIT_ELECTION_TYPE(id))}
      >
        <IconPencil02 size="20" fill="primary" />
      </div>
    ),
  },
];
