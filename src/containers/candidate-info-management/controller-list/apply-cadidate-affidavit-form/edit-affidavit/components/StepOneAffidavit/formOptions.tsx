import { TFunction } from 'i18next';
import { Text, Input } from '@pentabd/ui';

import { IncomeSourceType } from '@type/candidate-info-management/operator-view/affidavit-form/affidavit-step-one';

export const claimedCaseTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('AFFIDAVIT_STEP_ONE.ID'),
  },
  {
    id: 2,
    name: t('AFFIDAVIT_STEP_ONE.ACCUSED_CASE'),
  },
  {
    id: 3,
    name: t('AFFIDAVIT_STEP_ONE.COURT_NAME'),
  },
  {
    id: 4,
    name: t('AFFIDAVIT_STEP_ONE.CASE_NO'),
  },
  {
    id: 5,
    name: t('AFFIDAVIT_STEP_ONE.CASE_STATUS'),
  },
  {
    id: 6,
    name: t('AFFIDAVIT_STEP_ONE.CASE_FILE'),
  },
  {
    id: 7,
    name: '',
  },
];

export const dependentsEarningSourceTableColumns = (
  t: TFunction<'translation', undefined>,
  register: any,
  electionTypeKey?: string,
) => [
  {
    id: 1,
    key: 'serialNo',
    name: t('AFFIDAVIT_STEP_ONE.ID'),
    render: (data: string) => (
      <Text weight="normal" color="subtitle1" size="sm">
        {data}
      </Text>
    ),
  },
  {
    id: 2,
    key: 'label',
    name: t('AFFIDAVIT_STEP_ONE.INCOME_SOURCE_DETAILS'),
    render: (data: string) => (
      <Text weight="normal" color="subtitle1" size="sm">
        {data}
      </Text>
    ),
  },
  {
    id: 3,
    key: 'selfIncome',
    name: t(`AFFIDAVIT_STEP_ONE.YEARLY_INCOME.${electionTypeKey}`),
    render: (data: string, raw: IncomeSourceType) => {
      return (
        <Input
          type="text"
          minWidth
          {...register(`incomeSourcePostData.selfIncome_${raw.serialNo}`)}
          placeholder={t('PLACEHOLDER.ENTER')}
          defaultValue={data}
        />
      );
    },
  },
  {
    id: 4,
    key: 'dependentIncome',
    name: t('AFFIDAVIT_STEP_ONE.DEPENDENT_EARNING'),
    render: (data: string, raw: IncomeSourceType) => (
      <Input
        type="text"
        minWidth
        {...register(`incomeSourcePostData.dependentIncome_${raw.serialNo}`)}
        placeholder={t('PLACEHOLDER.ENTER')}
        defaultValue={data}
      />
    ),
  },
];
