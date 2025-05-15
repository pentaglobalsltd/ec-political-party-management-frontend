import { IconHomeLine } from '@pentabd/icons';
import { Badge } from '@pentabd/ui';
import { TFunction } from 'i18next';
import { getDigitBanglaFromEnglish } from '@utils';

export const politicalPartyTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('POLITICAL_PARTY.POLITICAL_PARTY_LIST'),
  },
];

export const newPoliticalPartyBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('POLITICAL_PARTY.POLITICAL_PARTY_LIST'),
  },
  {
    label: t('POLITICAL_PARTY.NEW_PARTY_ADD'),
  },
];

export const editPoliticalPartyBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('POLITICAL_PARTY.POLITICAL_PARTY_LIST'),
  },
  {
    label: t('POLITICAL_PARTY.CHANGE_PARTY_DETAILS'),
  },
];

export const politicalPartyTableColumns = ({
  t,
}: {
  t: TFunction<'translation', undefined>;
}) => {
  return [
    {
      id: 1,
      name: t('POLITICAL_PARTY.REGISTRATION_NO'),
      key: `regNo`,
      render: (data: string) => getDigitBanglaFromEnglish(data),
    },
    {
      id: 2,
      name: t('POLITICAL_PARTY.PARTY_NAME'),
      key: `partyName`,
    },
    {
      id: 3,
      name: t('POLITICAL_PARTY.SYMBOL'),
      key: `symbolName`,
    },
    {
      id: 4,
      name: t('POLITICAL_PARTY.ADDRESS'),
      key: `address`,
    },

    {
      id: 6,
      name: t('POLITICAL_PARTY.CONDITION'),
      key: `isActive`,
      render: (data: any) => (
        <div className="d-flex">
          <Badge
            className="text-nowrap"
            size="sm"
            label={data === true ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
            type={data === true ? 'success' : 'warning'}
          />
        </div>
      ),
    },
  ];
};

export const statusOptions = [
  {
    label: 'Active',
    value: '1',
  },
  {
    label: 'Inactive',
    value: '2',
  },
];
