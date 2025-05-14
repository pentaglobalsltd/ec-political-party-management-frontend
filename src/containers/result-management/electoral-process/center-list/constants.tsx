import { TFunction } from 'i18next';
import dayjs from 'dayjs';

import { IconHomeLine, IconSearch } from '@pentabd/icons';
import { InputText, Text } from '@pentabd/ui';

import { getDigitBanglaFromEnglish } from '@utils';
import Gender from './Gender';

export const centerListBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CENTER_LIST.CENTER_LIST'),
  },
];

export const centerListTableHeader = {
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
};

export const centerListTableColumns = ({
  t,
  isDownload = false,
}: {
  t: TFunction<'translation', undefined>;
  isDownload?: boolean;
}) => [
  {
    id: 1,
    name: t('CENTER_LIST.SERIAL'),
    key: 'idx',
  },
  {
    id: 2,
    name: t('CENTER_LIST.CENTER_NUMBER'),
    key: 'serial',
  },
  {
    id: 3,
    name: t('CENTER_LIST.CENTER_NAME'),
    key: 'pollingInstituteName',
  },
  {
    id: 4,
    name: t('CENTER_LIST.ADDRESS'),
    key: 'description',
  },
  {
    id: 5,
    name: t('CENTER_LIST.BOOTH_NUMBER'),
    key: 'numberOfBooth',
  },
  {
    id: 6,
    name: t('CENTER_LIST.MALE_VOTER_NUMBER'),
    key: 'totalMaleVoter',
  },
  {
    id: 7,
    name: t('CENTER_LIST.FEMALE_VOTER_NUMBER'),
    key: 'totalFemaleVoter',
  },
  {
    id: 11,
    name: t('CENTER_LIST.THIRD_GENDER_VOTER_NUMBER'),
    key: 'totalThirdGenderVoter',
  },
  {
    id: 8,
    name: t('CENTER_LIST.TOTAL_VOTER'),
    key: 'totalVoter',
  },

  {
    id: 9,
    name: t('CENTER_LIST.TYPE'),
    hide: !isDownload,
    key: 'voterTypeForDownload',
  },

  {
    id: 10,
    name: t('CENTER_LIST.TYPE'),
    key: 'voterType',
    hide: isDownload,
    render: (data: any) => <Gender data={data} />,
  },
  {
    id: 12,
    name: t('CENTER_LIST.TIME'),
    key: 'formattedCreatedAt',
    render: (data: any) => (
      <Text>
        {getDigitBanglaFromEnglish(
          data && dayjs(data.split('.')[0]).format('YYYY-MM-DD HH:mm'),
        )}
      </Text>
    ),
  },
];
