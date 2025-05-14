import { TFunction } from 'i18next';
import { Text } from '@pentabd/ui';

export const centerModalTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('RESULT_AND_SITUATION_REVIEW.CENTER_MODAL_COL_SERIAL'),
    key: 'serial',
    render: (data: any) => <Text size="xs">{data}</Text>,
  },
  {
    id: 2,
    name: t('RESULT_AND_SITUATION_REVIEW.CENTER_MODAL_COL_UNION'),
    key: 'union',
    render: (data: any) => <Text>{data}</Text>,
  },
  {
    id: 3,
    name: t('RESULT_AND_SITUATION_REVIEW.CENTER_MODAL_COL_CENTER_NAME'),
    key: 'centerName',
    render: (data: any) => <Text>{data}</Text>,
  },
  {
    id: 4,
    name: t('RESULT_AND_SITUATION_REVIEW.CENTER_MODAL_COL_CENTER_NO'),
    key: 'centerNo',
    render: (data: any) => <Text size="xs">{data}</Text>,
  },
];

export const centerModalTableRows = [
  {
    id: 1,
    serial: '1',
    union: 'ওয়ার্ড নং - ১',
    centerName: 'জামুরকি উচ্চ বিদ্যালয়',
    centerNo: '5',
  },
  {
    id: 2,
    serial: '2',
    union: 'ওয়ার্ড নং - ১',
    centerName: 'আগধল্যা সরকারি প্রাথমিক বিদ্যালয়',
    centerNo: '6',
  },
  {
    id: 3,
    serial: '3',
    union: 'ওয়ার্ড নং - ১',
    centerName: 'হাট ফতেপুর উচ্চ বিদ্যালয়',
    centerNo: '7',
  },
  {
    id: 4,
    serial: '4',
    union: 'ওয়ার্ড নং - ১',
    centerName: 'জোনাকি উচ্চ বিদ্যালয়',
    centerNo: '8',
  },
];

export const centerResultModalTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('RESULT_AND_SITUATION_REVIEW.CENTER_RESULT_MODAL_COL_SERIAL'),
    key: 'serial',
    render: (data: any) => <Text size="xs">{data}</Text>,
  },
  {
    id: 2,
    name: t('RESULT_AND_SITUATION_REVIEW.CENTER_RESULT_MODAL_COL_UNION'),
    key: 'union',
    render: (data: any) => <Text>{data}</Text>,
  },
  {
    id: 3,
    name: t('RESULT_AND_SITUATION_REVIEW.CENTER_RESULT_MODAL_COL_CENTER_NAME'),
    key: 'centerName',
    render: (data: any) => <Text>{data}</Text>,
  },
  {
    id: 4,
    name: t('RESULT_AND_SITUATION_REVIEW.CENTER_RESULT_MODAL_COL_CENTER_NO'),
    key: 'centerNo',
    render: (data: any) => <Text size="xs">{data}</Text>,
  },
  {
    id: 5,
    name: t('RESULT_AND_SITUATION_REVIEW.CENTER_RESULT_MODAL_COL_VOTER_NO'),
    key: 'voterNo',
    render: (data: any) => <Text size="xs">{data}</Text>,
  },
  {
    id: 6,
    name: t(
      'RESULT_AND_SITUATION_REVIEW.CENTER_RESULT_MODAL_COL_PRESENT_PERCENTAGE',
    ),
    key: 'presentPercentage',
    render: (data: any) => <Text size="xs">{data}</Text>,
  },
];

export const centerResultModalTableRows = [
  {
    id: 1,
    serial: '1',
    union: 'ওয়ার্ড নং - ১',
    centerName: 'জামুরকি উচ্চ বিদ্যালয়',
    centerNo: '5',
    voterNo: '5646',
    presentPercentage: '89.21',
  },
  {
    id: 2,
    serial: '2',
    union: 'ওয়ার্ড নং - ১',
    centerName: 'আগধল্যা সরকারি প্রাথমিক বিদ্যালয়',
    centerNo: '6',
    voterNo: '5646',
    presentPercentage: '89.21',
  },
  {
    id: 3,
    serial: '3',
    union: 'ওয়ার্ড নং - ১',
    centerName: 'হাট ফতেপুর উচ্চ বিদ্যালয়',
    centerNo: '7',
    voterNo: '5646',
    presentPercentage: '89.21',
  },
  {
    id: 4,
    serial: '4',
    union: 'ওয়ার্ড নং - ১',
    centerName: 'জোনাকি উচ্চ বিদ্যালয়',
    centerNo: '8',
    voterNo: '5646',
    presentPercentage: '89.21',
  },
];
