import { TFunction } from 'i18next';
import { IconHomeLine, IconPencil02 } from '@pentabd/icons';

import { FORM_FIELDS } from '@constants/forms';
import { ROUTES } from '@constants/routes';
import { NavigateOptions, To } from 'react-router-dom';

const RESERVED_SEAT_LIST =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.RESERVED_SEAT_LIST
    .CREATE_RESERVED_SEAT_LIST;

export const reservedSeatListTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('RESERVED_SEAT_LIST.MAIN_LIST'),
  },
  {
    label: t('RESERVED_SEAT_LIST.RESERVED_SEAT_LIST'),
  },
];

export const newReservedSeatListBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('RESERVED_SEAT_LIST.MAIN_LIST'),
    link: '',
  },
  {
    label: t('RESERVED_SEAT_LIST.RESERVED_SEAT_LIST'),
    link: '',
  },
  {
    label: t('RESERVED_SEAT_LIST.ADD_NEW'),
  },
];

export const editedReservedSeatListBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('RESERVED_SEAT_LIST.MAIN_LIST'),
    link: '',
  },
  {
    label: t('RESERVED_SEAT_LIST.RESERVED_SEAT_LIST'),
    link: '',
  },
  {
    label: t('RESERVED_SEAT_LIST.CHANGE'),
  },
];

export const reservedSeatListTableColumns = ({
  t,
  isDownload,
  navigate,
}: {
  t: TFunction<'translation', undefined>;
  isDownload?: boolean;
  navigate: (to: To, options?: NavigateOptions) => void;
}) => [
  {
    id: 5,
    name: t('RESERVED_SEAT_LIST.MUNICIPALITY_OR_CITY_CORPORATION'),
    key: `${RESERVED_SEAT_LIST.MUNICIPALITY_BN}`,
  },
  {
    id: 1,
    name: t('RESERVED_SEAT_LIST.RESERVED_WARD'),
    key: `${RESERVED_SEAT_LIST.RESERVED_WARD_BN}`,
  },

  {
    id: 3,
    name: t('RESERVED_SEAT_LIST.RESERVED_WARD_NO'),
    key: `${RESERVED_SEAT_LIST.RESERVED_WARD_NO}`,
  },
  {
    id: 4,
    name: t('RESERVED_SEAT_LIST.INCLUSION'),
    key: `${RESERVED_SEAT_LIST.INCLUSION_GET}`,
  },
  {
    id: 7,
    name: '',
    key: 'id',
    hide: isDownload,
    render: (id: any) => (
      <div
        className="pointer"
        onClick={() => navigate(ROUTES.EDIT_RESERVED_SEAT_LIST(id))}
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
