import { TFunction } from 'i18next';

import { IconHomeLine } from '@pentabd/icons';
import { Badge } from '@pentabd/ui';

import { DownloadFileIdType } from '@type/documents/attach-file';
import DownloadFile from './DownloadFile';

export const manualShipmentTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('MANUAL_SHIPMENT_INFO.MANUAL_SHIPMENT_INFO'),
  },
];

export const manualShipmentTableColumns = ({
  t,
  isDownload = false,
}: {
  t: TFunction<'translation', undefined>;
  isDownload?: boolean;
}) => [
  {
    id: 1,
    name: t(
      'MANUAL_SHIPMENT_INFO.MANUAL_SHIPMENT_INFO_TABLE_COLUMN.CANDIDATE_NAME',
    ),
    key: 'candidateName',
  },
  {
    id: 2,
    name: t(
      'MANUAL_SHIPMENT_INFO.MANUAL_SHIPMENT_INFO_TABLE_COLUMN.CANDIDATE_PHONE_NUMBER',
    ),
    key: 'phoneNumber',
  },
  {
    id: 3,
    name: t(
      'MANUAL_SHIPMENT_INFO.MANUAL_SHIPMENT_INFO_TABLE_COLUMN.CANDIDATE_EMAIL',
    ),
    key: 'email',
  },
  {
    id: 4,
    name: t('MANUAL_SHIPMENT_INFO.MANUAL_SHIPMENT_INFO_TABLE_COLUMN.TAKA'),
    key: 'jamanatAmount',
  },
  {
    id: 5,
    name: t(
      'MANUAL_SHIPMENT_INFO.MANUAL_SHIPMENT_INFO_TABLE_COLUMN.SHIPMENT_NO',
    ),
    key: 'chalanNumber',
  },
  {
    id: 6,
    name: t(
      'MANUAL_SHIPMENT_INFO.MANUAL_SHIPMENT_INFO_TABLE_COLUMN.SHIPMENT_DATE',
    ),
    key: 'chalanDate',
  },
  {
    id: 7,
    name: t(
      'MANUAL_SHIPMENT_INFO.MANUAL_SHIPMENT_INFO_TABLE_COLUMN.SHIPMENT_TYPE',
    ),
    key: 'paymentType',
  },
  {
    id: 8,
    name: t('MANUAL_SHIPMENT_INFO.MANUAL_SHIPMENT_INFO_TABLE_COLUMN.REGION'),
    key: 'chalanRegion',
  },
  {
    id: 9,
    name: t('MANUAL_SHIPMENT_INFO.MANUAL_SHIPMENT_INFO_TABLE_COLUMN.BANK'),
    key: 'bankName',
  },
  {
    id: 10,
    name: t('MANUAL_SHIPMENT_INFO.MANUAL_SHIPMENT_INFO_TABLE_COLUMN.BRANCH'),
    key: 'bankBranchName',
  },
  {
    id: 11,
    name: t('MANUAL_SHIPMENT_INFO.MANUAL_SHIPMENT_INFO_TABLE_COLUMN.STATUS'),
    key: 'chalanStatus',
    render: (data: string) => (
      <div className="d-flex">
        <Badge
          className="text-nowrap"
          size="sm"
          label={data}
          type={data === 'success' ? 'success' : 'danger'}
        />
      </div>
    ),
  },

  {
    id: 12,
    name: t('MANUAL_SHIPMENT_INFO.MANUAL_SHIPMENT_INFO_TABLE_COLUMN.ATTACH'),
    key: 'chalanFile',
    hide: isDownload,
    render: (data: DownloadFileIdType) => <DownloadFile data={data} />,
  },
];

export const MANUAL_PAYMENT_TYPE = 'MANUAL';
