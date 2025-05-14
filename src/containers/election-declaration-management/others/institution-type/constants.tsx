import { TFunction } from 'i18next';
import { IconHomeLine, IconPencil02 } from '@pentabd/icons';
import { ROUTES } from '@constants/routes';
import { NavigateOptions, To } from 'react-router-dom';

export const TableBreadcrumbs = (t: TFunction<'translation', undefined>) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('INSTITUTION_BUILDING_TYPE.INSTITUTION_BUILDING_TYPE'),
  },
];

export const CreateBreadcrumbs = (t: TFunction<'translation', undefined>) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('INSTITUTION_BUILDING_TYPE.INSTITUTION_BUILDING_TYPE'),
  },
  {
    label: t('INSTITUTION_BUILDING_TYPE.ADD_NEW'),
  },
];

export const EditBreadcrumbs = (t: TFunction<'translation', undefined>) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('INSTITUTION_BUILDING_TYPE.INSTITUTION_BUILDING_TYPE'),
  },
  {
    label: t('INSTITUTION_BUILDING_TYPE.CHANGE'),
  },
];

export const Columns = ({
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
    name: t('INSTITUTION_BUILDING_TYPE.ID'),
    key: 'idx',
  },
  {
    id: 2,
    name: t('INSTITUTION_BUILDING_TYPE.INSTITUTION_BUILDING_TYPE_BANGLA'),
    key: 'nameBn',
  },
  {
    id: 3,
    name: t('INSTITUTION_BUILDING_TYPE.INSTITUTION_BUILDING_TYPE_ENGLISH'),
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
        onClick={() => navigate(ROUTES.EDIT_INSTITUTION_BUILDING_TYPE(id))}
      >
        <IconPencil02 size="20" fill="primary" />
      </div>
    ),
  },
];
