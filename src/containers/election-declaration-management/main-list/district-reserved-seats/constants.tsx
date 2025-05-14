import { TFunction } from 'i18next';
import { IconHomeLine, IconPencil02, IconSearch } from '@pentabd/icons';
import { DownloadButtons, InputText } from '@pentabd/ui';

import { FORM_FIELDS } from '@constants/forms';
import { ROUTES } from '@constants/routes';
import { NavigateOptions, To } from 'react-router-dom';

const DISTRICT_RESERVED_SEATS =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.DISTRICT_RESERVED_SEATS
    .CREATE_DISTRICT_RESERVED_SEATS;

export const districtReservedSeatsTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('DISTRICT_RESERVED_SEATS.MAIN_LIST'),
  },
  {
    label: t('DISTRICT_RESERVED_SEATS.DISTRICT_RESERVED_SEATS'),
  },
];

export const districtReservedSeatsTableHeader = {
  leftComponents: [
    <InputText
      key={1}
      name="pre-input"
      outline
      placeholder="Search"
      prefix={<IconSearch size="20" />}
      size="md"
      type="text"
      status="default"
    />,
  ],
  rightComponents: [<DownloadButtons key={1} fileName={'test'} />],
};

export const districtReservedSeatsTableColumns = ({
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
    name: t('DISTRICT_RESERVED_SEATS.RESERVED_WARD_BANGLA'),
    key: `${DISTRICT_RESERVED_SEATS.RESERVED_WARD_BN}`,
  },
  {
    id: 2,
    name: t('DISTRICT_RESERVED_SEATS.RESERVED_WARD_ENGLISH'),
    key: `${DISTRICT_RESERVED_SEATS.RESERVED_WARD_EN}`,
  },
  {
    id: 3,
    name: t('DISTRICT_RESERVED_SEATS.RESERVED_WARD_NO'),
    key: `${DISTRICT_RESERVED_SEATS.RESERVED_WARD_NO}`,
  },
  {
    id: 4,
    name: t('DISTRICT_RESERVED_SEATS.INCLUSION'),
    key: `${DISTRICT_RESERVED_SEATS.INCLUSION}`,
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

export const districtReservedSeatsTableRows = [
  {
    id: 1,
    reservedWardBn: 'সংরক্ষিত মহিলা আসন - ১',
    reservedWardEn: 'Reserved Women Ward - 1',
    reservedWardNo: '৩০',
    inclusion: 'ওয়ার্ড নং-০১, ওয়ার্ড নং-০২, ওয়ার্ড নং-০৩',
  },
];

export const newDistrictReservedSeatsBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('DISTRICT_RESERVED_SEATS.MAIN_LIST'),
    link: '',
  },
  {
    label: t('DISTRICT_RESERVED_SEATS.RESERVED_SEAT_LIST'),
    link: '',
  },
  {
    label: t('DISTRICT_RESERVED_SEATS.ADD_NEW_DISTRICT_RESERVED_SEAT'),
  },
];

export const editedDistrictReservedSeatsBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('DISTRICT_RESERVED_SEATS.MAIN_LIST'),
    link: '',
  },
  {
    label: t('DISTRICT_RESERVED_SEATS.DISTRICT_RESERVED_SEATS'),
    link: '',
  },
  {
    label: t('DISTRICT_RESERVED_SEATS.CHANGE'),
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
