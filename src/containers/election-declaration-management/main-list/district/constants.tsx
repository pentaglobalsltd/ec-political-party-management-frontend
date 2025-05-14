import { TFunction } from 'i18next';
import { IconHomeLine, IconPencil02 } from '@pentabd/icons';
import { ROUTES } from '@constants/routes';
import { NavigateOptions, To } from 'react-router-dom';

export const districtTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('DISTRICT.MAIN_LIST'),
  },
  {
    label: t('DISTRICT.DISTRICT'),
  },
];

export const newDistrictBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('DISTRICT.MAIN_LIST'),
  },
  {
    label: t('DISTRICT.DISTRICT'),
  },
  {
    label: t('DISTRICT.ADD_NEW'),
  },
];

export const editDistrictBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('DISTRICT.MAIN_LIST'),
  },
  {
    label: t('DISTRICT.DISTRICT'),
  },
  {
    label: t('DISTRICT.CHANGE'),
  },
];

export const districtTableColumns = ({
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
    name: t('DISTRICT.DISTRICTS_NAME'),
    key: 'nameBn',
  },
  {
    id: 2,
    name: t('DISTRICT.DISTRICT_NAME_ENGLISH'),
    key: 'nameEn',
  },
  {
    id: 3,
    name: t('DISTRICT.GO_CODE'),
    key: 'zillaCode',
  },
  {
    id: 4,
    name: t('DISTRICT.DIVISION_NAME'),
    key: 'regionNameBn',
  },
  {
    id: 5,
    name: '',
    key: 'id',
    hide: isDownload,
    render: (id: any) => (
      <div
        className="pointer"
        onClick={() => navigate(ROUTES.EDIT_DISTRICT(id))}
      >
        <IconPencil02 size="20" fill="primary" />
      </div>
    ),
  },
];
