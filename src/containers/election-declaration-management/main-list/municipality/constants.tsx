import { TFunction } from 'i18next';
import { IconHomeLine, IconPencil02 } from '@pentabd/icons';
import { NavigateOptions, To } from 'react-router-dom';
import { ROUTES } from '@constants/routes';

export const municipalityTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('MUNICIPALITY.MAIN_LIST'),
  },
  {
    label: t('MUNICIPALITY.MUNICIPALITY'),
  },
];

export const newMunicipalityBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('MUNICIPALITY.MAIN_LIST'),
  },
  {
    label: t('MUNICIPALITY.MUNICIPALITY'),
  },
  {
    label: t('MUNICIPALITY.ADD_NEW'),
  },
];

export const editMunicipalityBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('MUNICIPALITY.MAIN_LIST'),
  },
  {
    label: t('MUNICIPALITY.MUNICIPALITY'),
  },
  {
    label: t('MUNICIPALITY.CHANGE'),
  },
];

export const municipalityTableColumns = ({
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
    name: t('MUNICIPALITY.MUNICIPALITY_NAME'),
    key: 'nameBn',
  },
  {
    id: 2,
    name: t('MUNICIPALITY.MUNICIPALITY_NAME_ENGLISH'),
    key: 'nameEn',
  },
  {
    id: 3,
    name: t('MUNICIPALITY.RMO'),
    key: 'rmoBn',
  },
  {
    id: 4,
    name: t('MUNICIPALITY.DISTRICT_NAME'),
    key: 'zillaNameBn',
  },
  {
    id: 5,
    name: t('MUNICIPALITY.SUB_DISTRICT'),
    key: 'upazilaNameBn',
  },
  {
    id: 6,
    name: t('MUNICIPALITY.GO_CODE'),
    key: 'municipalityCode',
  },
  {
    id: 7,
    name: '',
    key: 'id',
    hide: isDownload,
    render: (id: any) => (
      <div
        className="pointer"
        onClick={() => navigate(ROUTES.EDIT_MUNICIPALITY(id))}
      >
        <IconPencil02 size="20" fill="primary" />
      </div>
    ),
  },
];

export const options = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
];
