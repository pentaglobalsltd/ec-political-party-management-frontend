import { ROUTES } from '@constants/routes';
import { IconHomeLine, IconPencil02 } from '@pentabd/icons';
import { TFunction } from 'i18next';
import { NavigateOptions, To } from 'react-router-dom';

export const divisionTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('DIVISION.MAIN_LIST'),
  },
  {
    label: t('DIVISION.DIVISION'),
  },
];

export const newDivisionBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('DIVISION.MAIN_LIST'),
  },
  {
    label: t('DIVISION.DIVISION'),
  },
  {
    label: t('DIVISION.ADD_NEW'),
  },
];

export const editDivisionBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('DIVISION.MAIN_LIST'),
  },
  {
    label: t('DIVISION.DIVISION'),
  },
  {
    label: t('DIVISION.CHANGE'),
  },
];

export const divisionTableColumns = ({
  t,
  isDownload,
  navigate,
}: {
  t: TFunction<'translation', undefined>;
  isDownload?: boolean;
  navigate: (to: To, options?: NavigateOptions) => void;
}) => [
  {
    id: 1,
    name: t('DIVISION.DIVISIONS_NAME'),
    key: 'nameBn',
  },
  {
    id: 2,
    name: t('DIVISION.GO_CODE'),
    key: 'regionCode',
  },
  {
    id: 3,
    name: '',
    key: 'id',
    hide: isDownload,
    render: (id: any) => (
      <div
        className="pointer"
        onClick={() => navigate(ROUTES.EDIT_DIVISION(id))}
      >
        <IconPencil02 size="20" fill="primary" />
      </div>
    ),
  },
];
