import { ROUTES } from '@constants/routes';
import { IconHomeLine, IconPencil02 } from '@pentabd/icons';
import { TFunction } from 'i18next';
import { NavigateOptions, To } from 'react-router-dom';

export const TableBreadcrumbs = (t: TFunction<'translation', undefined>) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('INSTITUTION_TYPE.INSTITUTION_TYPE'),
  },
];

export const AddBreadcrumbs = (t: TFunction<'translation', undefined>) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('INSTITUTION_TYPE.INSTITUTION_TYPE'),
  },
  {
    label: t('INSTITUTION_TYPE.ADD_NEW_INSTITUTE_TITLE'),
  },
];

export const EditBreadcrumbs = (t: TFunction<'translation', undefined>) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('INSTITUTION_TYPE.INSTITUTION_TYPE'),
  },
  {
    label: t('INSTITUTION_TYPE.EDIT_INSTITUTE_TITLE'),
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
    name: t('INSTITUTION_TYPE.ID'),
    key: 'idx',
  },
  {
    id: 2,
    name: t('INSTITUTION_TYPE.INSTITUTION_TYPE_BANGLA'),
    key: 'nameBn',
  },
  {
    id: 3,
    name: t('INSTITUTION_TYPE.INSTITUTION_TYPE_ENGLISH'),
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
        onClick={() => navigate(ROUTES.EDIT_INSTITUTE_TYPE(id))}
      >
        <IconPencil02 size="20" fill="primary" />
      </div>
    ),
  },
];
