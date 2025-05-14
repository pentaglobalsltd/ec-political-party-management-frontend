import { TFunction } from 'i18next';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';

import { IconCalendar } from '@pentabd/icons';
import { Input, InputDate, Text } from '@pentabd/ui';

import { LoansType } from '@type/candidate-info-management/operator-view/affidavit-form/liabilities';

interface MapLiabilitiesType {
  idx?: string | number;
  id?: string | number;
  natureLiabilitiesDebts?: string;
  amount?: string;
  documentId?: string;
  fileId?: string;
  filePath?: string;
  fileName?: string;
}

export const liabilitiesTableColumns = ({
  t,
  electionTypeKey,
}: {
  t: TFunction<'translation', undefined>;
  electionTypeKey?: string;
}) => [
  {
    id: 1,
    name: t(`AFFIDAVIT_LIABILITIES.LIABILITIES_TYPE.${electionTypeKey}`),
  },
  {
    id: 2,
    name: t('AFFIDAVIT_LIABILITIES.LIABILITIES_AMOUNT'),
  },
  {
    id: 3,
    name: t('AFFIDAVIT_LIABILITIES.FILE'),
  },
  {
    id: 4,
    name: '',
  },
];

export const commitmentAchievementTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('AFFIDAVIT_LIABILITIES.ID'),
  },
  {
    id: 2,
    name: t('AFFIDAVIT_LIABILITIES.PROMISES'),
  },
  {
    id: 3,
    name: t('AFFIDAVIT_LIABILITIES.ACHIEVEMENTS'),
  },
  {
    id: 4,
    name: '',
  },
];

export const loanInformationColumns = (
  t: TFunction<'translation', undefined>,
  register: any,
  control: any,
  electionTypeKey: string | undefined
) => [
  {
    id: 1,
    key: 'loanType',
    name: t('AFFIDAVIT_LIABILITIES.LOAN_TYPE'),
    render: (data: string) => (
      <Text weight="normal" color="subtitle1" size="sm">
        {data}
      </Text>
    ),
  },
  {
    id: 2,
    key: 'FinancialInstitutionName',
    name: t('AFFIDAVIT_LIABILITIES.BANK_NAME'),
    render: (data: string, row: LoansType) => (
      <Input
        type="text"
        {...register(`loans.FinancialInstitutionName${row.serialNo}`)}
        defaultValue={data}
        placeholder={t('PLACEHOLDER.ENTER')}
      />
    ),
  },
  {
    id: 3,
    key: 'LoanAmount',
    name: t('AFFIDAVIT_LIABILITIES.LOAN_AMOUNT'),
    render: (data: string, row: LoansType) => (
      <Input
        type="text"
        {...register(`loans.LoanAmount${row.serialNo}`)}
        defaultValue={data}
        placeholder={t('PLACEHOLDER.ENTER')}
      />
    ),
  },
  {
    id: 4,
    key: 'DefaultedLoanAmount',
    name: t('AFFIDAVIT_LIABILITIES.DEFAULTED_LOAN'),
    render: (data: string, row: LoansType) => (
      <Input
        type="text"
        {...register(`loans.DefaultedLoanAmount${row.serialNo}`)}
        defaultValue={data}
        placeholder={t('PLACEHOLDER.ENTER')}
      />
    ),
  },
  {
    id: 5,
    key: 'RescheduledLoanDate',
    name: t(`AFFIDAVIT_LIABILITIES.SCHEDULED_DATE.${electionTypeKey}`),
    render: (data: string, row: LoansType) => (
      <Controller
        control={control}
        name={`loans.RescheduledLoanDate${row.serialNo}`}
        render={({ field }) => {
          return (
            <InputDate
              name={`loans.RescheduledLoanDate${row.serialNo}`}
              placeholder={t('PLACEHOLDER.SELECT')}
              onSelectDate={(date) => field.onChange(date)}
              defaultValue={data}
              value={field.value as string}
              prefix={<IconCalendar size="20" fill="subtitle2" />}
              portal
              minWidth
              maximumDate={dayjs()}
            />
          );
        }}
      />
    ),
  },
];

export function mapLiabilitiesFiles(arr: MapLiabilitiesType[]) {
  return arr.map((obj) => {
    const { documentId, fileId, filePath, fileName, ...rest } = obj;
    return { ...rest, file: { documentId, fileId, filePath, fileName } };
  });
}
