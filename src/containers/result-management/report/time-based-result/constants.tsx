import { TFunction } from 'i18next';
import { IconHomeLine, IconSearch } from '@pentabd/icons';
import { DownloadButtons, InputText } from '@pentabd/ui';

export const timeBasedResultTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('TIME_BASED_RESULT.TIME_BASED_RESULT'),
  },
];

export const timeBasedResultTableHeader = {
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

export const timeBasedResultTableColumns = ({
  t,
}: {
  t: TFunction<'translation', undefined>;
  isDownload?: boolean;
}) => [
  {
    id: 2,
    name: t('TIME_BASED_RESULT.CENTER_SERIAL'),
    key: 'centerSerial',
  },
  {
    id: 3,
    name: t('TIME_BASED_RESULT.DISTRICT'),
    key: 'zillaNameBn',
  },
  {
    id: 4,
    name: t('TIME_BASED_RESULT.SUB_DISTRICT'),
    key: 'upazillaNameBn',
  },
  {
    id: 5,
    name: t('TIME_BASED_RESULT.UNION'),
    key: 'unionOrWardNameBn',
  },
  {
    id: 6,
    name: t('TIME_BASED_RESULT.CENTER_NAME'),
    key: 'centerNameBn',
  },
  {
    id: 7,
    name: t('TIME_BASED_RESULT.RESULT_SEND_TIME'),
    key: 'resultSubmitTime',
  },
  {
    id: 8,
    name: t('TIME_BASED_RESULT.RESULT_APPROVAL_TIME'),
    key: 'resultPublishTime',
  },
];
