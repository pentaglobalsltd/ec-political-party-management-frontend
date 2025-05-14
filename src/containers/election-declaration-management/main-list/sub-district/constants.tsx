import { TFunction } from 'i18next';

import { IconHomeLine, IconPencil02 } from '@pentabd/icons';
import { Badge } from '@pentabd/ui';
import { ROUTES } from '@constants/routes';
import { NavigateOptions, To } from 'react-router-dom';

export const subDistrictBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('SUB_DISTRICT.MAIN_LIST'),
  },

  {
    label: t('SUB_DISTRICT.SUB_DISTRICT'),
  },
];

export const subDistrictTableColumns = ({
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
    name: t('SUB_DISTRICT.SUB_DISTRICT_NAME_BN'),
    key: 'nameBn',
  },
  {
    id: 2,
    name: t('SUB_DISTRICT.SUB_DISTRICT_NAME_EN'),
    key: 'nameEn',
  },
  {
    id: 3,
    name: t('SUB_DISTRICT.GO_CODE'),
    key: 'upazilaCode',
  },
  {
    id: 4,
    name: t('SUB_DISTRICT.DISTRICT_NAME'),
    key: 'zillaName',
  },
  {
    id: 5,
    name: t('SUB_DISTRICT.IS_THANA'),
    key: 'isThana',
    render: (data: any) => {
      return (
        <div className="d-flex">
          <Badge
            className="text-nowrap"
            size="sm"
            label={data}
            type={data === true ? 'success' : 'warning'}
          />
        </div>
      );
    },
  },
  {
    id: 7,
    name: '',
    key: 'id',
    hide: isDownload,
    render: (id: any) => (
      <div className="pointer" onClick={() => navigate(ROUTES.EDIT_UNION(id))}>
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

export const addSubDistrictBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('SUB_DISTRICT.MAIN_LIST'),
  },

  {
    label: t('SUB_DISTRICT.SUB_DISTRICT'),
  },
  {
    label: t('SUB_DISTRICT.ADD_SUB_DISTRICT'),
  },
];

export const editSubDistrictBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('SUB_DISTRICT.MAIN_LIST'),
  },

  {
    label: t('SUB_DISTRICT.SUB_DISTRICT'),
  },
  {
    label: t('SUB_DISTRICT.EDIT_SUB_DISTRICT'),
  },
];
