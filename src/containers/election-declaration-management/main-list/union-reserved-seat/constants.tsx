import { TFunction } from 'i18next';
import { IconHomeLine, IconSearch } from '@pentabd/icons';
import { DownloadButtons, InputText } from '@pentabd/ui';
import TableRowActions from './components/TableRowActions';
import { ReserveUnionWardQueryParams } from '@api/election-schedule-management/main-list/union-reserved-seat/fetch-union-reserved-seat-listing';

export const unionReservedSeatBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('UNION_RESERVED_SEAT.BREADCRUMB_MAIN_LIST'),
  },

  {
    label: t('UNION_RESERVED_SEAT.BREADCRUMB_UNION_RESERVED_SEAT'),
  },
];

export const unionReservedSeatTableHeader = {
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

export const unionReservedSeatTableColumns = ({
  t,
  getReserveUnionWardList,
}: {
  t: TFunction<'translation', undefined>;
  getReserveUnionWardList: (queryParams: ReserveUnionWardQueryParams) => void;
}) => [
  {
    id: 1,
    name: t('UNION_RESERVED_SEAT.RESERVED_WARD_NAMEBN'),
    key: 'nameBn',
  },
  {
    id: 2,
    name: t('UNION_RESERVED_SEAT.RESERVED_WARD_NAMEEN'),
    key: 'nameEn',
  },
  {
    id: 3,
    name: t('UNION_RESERVED_SEAT.RESERVED_WARD_NUMBER'),
    key: 'reservedSeatNumber',
  },
  {
    id: 4,
    name: t('UNION_RESERVED_SEAT.INCLUDES'),
    key: 'unionWardsName',
  },

  {
    id: 5,
    name: '',
    key: 'actions',
    // hide: isDownload,
    render: (data: any, row: any) => (
      <TableRowActions
        row={row}
        getReserveUnionWardList={getReserveUnionWardList}
      />
    ),
  },
];
