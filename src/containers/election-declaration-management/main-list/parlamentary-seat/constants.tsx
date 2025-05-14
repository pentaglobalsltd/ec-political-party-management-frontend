import { TFunction } from 'i18next';
import { IconHomeLine, IconPencil02 } from '@pentabd/icons';
import { NavigateOptions, To } from 'react-router-dom';
import { ROUTES } from '@constants/routes';

export const parliamentarySeatTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('PARLIAMENTARY_SEAT.MAIN_LIST'),
  },
  {
    label: t('PARLIAMENTARY_SEAT.PARLIAMENTARY_SEAT'),
  },
];

export const newParliamentarySeatBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('PARLIAMENTARY_SEAT.MAIN_LIST'),
  },
  {
    label: t('PARLIAMENTARY_SEAT.PARLIAMENTARY_SEAT'),
  },
  {
    label: t('PARLIAMENTARY_SEAT.ADD_NEW'),
  },
];

export const editParliamentarySeatBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('PARLIAMENTARY_SEAT.MAIN_LIST'),
  },
  {
    label: t('PARLIAMENTARY_SEAT.PARLIAMENTARY_SEAT'),
  },
  {
    label: t('PARLIAMENTARY_SEAT.CHANGE'),
  },
];

export const parliamentarySeatTableColumns = ({
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
    name: t('PARLIAMENTARY_SEAT.DIVISION'),
    key: 'regionNameBn',
  },
  {
    id: 2,
    name: t('PARLIAMENTARY_SEAT.DISTRICT'),
    key: 'zillaNameBn',
  },
  {
    id: 3,
    name: t('PARLIAMENTARY_SEAT.PARLIAMENTARY_SEAT_NAME'),
    key: 'constituencyNameBn',
  },
  {
    id: 4,
    name: t('PARLIAMENTARY_SEAT.SUB_DISTRICT'),
    key: 'upazilaNameBn',
  },

  {
    id: 5,
    name: t('PARLIAMENTARY_SEAT.UNION'),
    key: 'unionOrWardNameBn',
  },
  {
    id: 7,
    name: '',
    key: 'id',
    hide: isDownload,
    render: (id: any) => (
      <div
        className="pointer"
        onClick={() => navigate(ROUTES.EDIT_PARLIAMENTARY_SEAT(id))}
      >
        <IconPencil02 size="20" fill="primary" />
      </div>
    ),
  },
];

export const parliamentarySeatTableRows = [
  {
    id: 1,
    district: '',
    parliamentarySeat: '',
    goCode: '',
    subDistrict: '',
    union: '',
    condition: 'Active',
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
