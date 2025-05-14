import { TFunction } from 'i18next';
import { IconHomeLine, IconSearch } from '@pentabd/icons';
import { DownloadButtons, InputText } from '@pentabd/ui';

import { ADVANCE_SEARCH } from '@components/application-search/SearchComponents';

export const systemLogTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('SYSTEM_LOG.OTHERS'),
  },
  {
    label: t('SYSTEM_LOG.SYSTEM_LOG'),
  },
];

export const systemLogTableHeader = {
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

export const systemLogTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('SYSTEM_LOG.LOGIN_ID'),
    key: 'loginId',
  },
  {
    id: 2,
    name: t('SYSTEM_LOG.DETAILS'),
    key: 'details',
  },
  {
    id: 3,
    name: t('SYSTEM_LOG.DEVICE'),
    key: 'device',
  },
  {
    id: 4,
    name: t('SYSTEM_LOG.ID_ADDRESS'),
    key: 'idAddress',
  },
  {
    id: 5,
    name: t('SYSTEM_LOG.TIME'),
    key: 'time',
  },
];

export const systemLogTableRows = [
  {
    id: 1,
    loginId: 'মোছাঃ আছিয়া খাতুন',
    details: 'No User Found',
    device: 'ems.ecs.gov.bd',
    idAddress: '172.24.26.65',
    time: 'April 26, 2023, 3:34 pm',
  },
];

export const searchStruct = [
  {
    fieldName: ADVANCE_SEARCH.LOG_TYPE,
  },
  {
    fieldName: ADVANCE_SEARCH.DATE_FROM,
  },
  {
    fieldName: ADVANCE_SEARCH.DATE_TO,
  },
];
