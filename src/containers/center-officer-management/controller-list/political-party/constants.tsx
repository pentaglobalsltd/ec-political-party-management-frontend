import { NavigateOptions, To } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import { IconHomeLine, IconPencil02 } from '@pentabd/icons';
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
  isDownload = false,
  navigate,
}: {
  t: TFunction<'translation', undefined>;
  isDownload?: boolean;
  navigate: (to: To, options?: NavigateOptions) => void;
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
      id: 5,
      name: t('POLITICAL_PARTY.CONDITION'),
      hide: !isDownload,
      key: `status`,
    },
    {
      id: 6,
      name: t('POLITICAL_PARTY.CONDITION'),
      key: `isActive`,
      hide: isDownload,
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
    {
      id: 7,
      name: '',
      key: 'regNo',
      hide: isDownload,
      render: (data: any, row: any) => (
        <div
          className="pointer"
          onClick={() => navigate(ROUTES.EDIT_POLITICAL_PARTY(row?.id))}
        >
          <IconPencil02 size="20" fill="primary" />
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
