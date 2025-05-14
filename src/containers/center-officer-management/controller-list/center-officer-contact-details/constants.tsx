import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';
import { CENTER_OFFICER_MANAGEMENT } from '@constants/permissions/center-officer-management';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { SendSmsAction } from './SendSms';
import { isPermitted } from '@helpers/permission';

export const centerOfficerContactDetailsBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CENTER_OFFICER_CONTACT_DETAILS.CENTER_OFFICER_CONTACT_DETAILS'),
  },
];

export const centerOfficerContactDetailsTableColumns = ({
  t,
  getDataOnSuccess,
  permissionsArray,
  isDownload = false,
}: {
  t: TFunction<'translation', undefined>;
  getDataOnSuccess?: () => void;
  permissionsArray?: string[];
  isDownload?: boolean;
}) => {
  const permission = isPermitted(
    permissionsArray,
    CENTER_OFFICER_MANAGEMENT.POLLING_PERSONNEL_ALLOCATE_FULL_PERMISSION,
  );

  return [
    {
      id: 1,
      name: t('CENTER_OFFICER_CONTACT_DETAILS.TABLE_COLUMNS.SERIAL'),
      key: 'idx',
    },

    {
      id: 11,
      name: t('CENTER_OFFICER_CONTACT_DETAILS.TABLE_COLUMNS.UPAZILA'),
      key: 'upazilaNameBn',
      // hide: isDownload, // TODO
    },
    {
      id: 12,
      name: t('CENTER_OFFICER_CONTACT_DETAILS.TABLE_COLUMNS.UNION_OR_WARD'),
      key: 'unionOrWardNameBn',
      // hide: isDownload, // TODO
    },

    {
      id: 2,
      name: t('CENTER_OFFICER_CONTACT_DETAILS.TABLE_COLUMNS.CENTER_NAME'),
      key: 'pollingCenterName',
    },
    {
      id: 3,
      name: t('CENTER_OFFICER_CONTACT_DETAILS.TABLE_COLUMNS.CENTER_NO'),
      key: 'pollingCenterSerial',
    },
    {
      id: 4,
      name: t('CENTER_OFFICER_CONTACT_DETAILS.TABLE_COLUMNS.NAME'),
      key: 'pollingPersonnelName',
    },
    {
      id: 5,
      name: t(
        'CENTER_OFFICER_CONTACT_DETAILS.TABLE_COLUMNS.INSTITUTION_DESIGNATION',
      ),
      key: 'pollingPersonnelDesignation',
    },
    {
      id: 6,
      name: t(
        'CENTER_OFFICER_CONTACT_DETAILS.TABLE_COLUMNS.CENTER_DESIGNATION',
      ),
      key: 'pollingPersonnelType',
    },
    {
      id: 7,
      name: t('CENTER_OFFICER_CONTACT_DETAILS.TABLE_COLUMNS.CONTACT_NO'),
      key: 'pollingPersonnelPhone',
    },
    {
      id: 8,
      name: t('CENTER_OFFICER_CONTACT_DETAILS.TABLE_COLUMNS.NID_NO'),
      key: 'pollingPersonnelNID',
    },
    {
      id: 9,
      name: t('CENTER_OFFICER_CONTACT_DETAILS.TABLE_COLUMNS.CREATED_AT'),
      key: 'createdAt',
    },
    {
      id: 10,
      name: t('CENTER_BASED_OFFICER_ALLOCATION.PROCESS'),
      key: 'process',
      hide: !permission,
      render: (data: any, raw: any) => {
        return <SendSmsAction raw={raw} getDataOnSuccess={getDataOnSuccess} />;
      },
    },
  ];
};

export const adminRequiredFields = [
  SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
  SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
  SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
  SEARCH_FIELD_REQUIRED.ELECTION_SETTINGS_IDS,
];

export const electionUserRequiredFields = [
  SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
  SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
  SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
  SEARCH_FIELD_REQUIRED.ELECTION_SETTINGS_IDS,
  SEARCH_FIELD_REQUIRED.UPAZILA_ID,
];

export const PRESIDING_OFFICER = 'প্রিজাইডিং অফিসার';
