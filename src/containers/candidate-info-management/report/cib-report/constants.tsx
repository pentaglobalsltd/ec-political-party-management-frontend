import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';
import { Text } from '@pentabd/ui';

export const CIBReportTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CIB_REPORT.CIB_REPORT_TITLE'),
  },
];

export const CIBReportTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('CIB_REPORT.CIB_REPORT_COLUMN.SERIAL_NO'),
    key: 'idx',
  },
  {
    id: 2,
    name: t('CIB_REPORT.CIB_REPORT_COLUMN.NOMINATION_NAME'),
    key: 'candidateName',
    render: (data: any, row: any) => {
      return (
        <div>
          <Text>{row?.candidateName}</Text>
          <br />
          <Text>{row?.candidateNameEn}</Text>
        </div>
      );
    },
  },
  {
    id: 3,
    name: t('CIB_REPORT.CIB_REPORT_COLUMN.HUSBAND_NAME'),
    key: 'fatherName',
    render: (data: any, row: any) => {
      return (
        <div>
          <Text>{row?.fatherName}</Text>
          <br />
          <Text>{row?.fatherNameEn}</Text>
        </div>
      );
    },
  },
  {
    id: 4,
    name: t('CIB_REPORT.CIB_REPORT_COLUMN.MOTHER_NAME'),
    key: 'motherName',
    render: (data: any, row: any) => {
      return (
        <div>
          <Text>{row?.motherName}</Text>
          <br />
          <Text>{row?.motherNameEn}</Text>
        </div>
      );
    },
  },
  {
    id: 4.1,
    name: t('CIB_REPORT.CIB_REPORT_COLUMN.SPOUSE_NAME'),
    key: 'spouseName',
    render: (data: any, row: any) => {
      const isWomanMarried =
        row?.gender === 'FEMALE' && row?.maritalStatus === 'MARRIED';

      return (
        isWomanMarried && (
          <div>
            <Text>{row?.spouseName}</Text>
            <br />
            <Text>{row?.spouseNameEn}</Text>
          </div>
        )
      );
    },
  },
  {
    id: 5,
    name: t('CIB_REPORT.CIB_REPORT_COLUMN.NID_NO'),
    key: 'nid17Digit',
  },
  {
    id: 6,
    name: t('CIB_REPORT.CIB_REPORT_COLUMN.TIN_NO'),
    key: 'tin',
  },
  {
    id: 7,
    name: t('CIB_REPORT.CIB_REPORT_COLUMN.DATE_OF_BIRTH'),
    key: 'dob',
  },
  {
    id: 8,
    name: t('CIB_REPORT.CIB_REPORT_COLUMN.PRESENT_ADDRESS'),
    key: 'presentAddress',
  },
  {
    id: 9,
    name: t('CIB_REPORT.CIB_REPORT_COLUMN.PERMANENT_ADDRESS'),
    key: 'permanentAddress',
  },

  {
    id: 10,
    name: t('CIB_REPORT.CIB_REPORT_COLUMN.MOBILE_NUMBER'),
    key: 'phone',
  },
];
