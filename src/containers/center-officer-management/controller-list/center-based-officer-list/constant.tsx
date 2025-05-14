import { TFunction } from 'i18next';

import { IconHomeLine, IconSearch } from '@pentabd/icons';
import { InputText } from '@pentabd/ui';

import { CENTER_OFFICER_MANAGEMENT } from '@constants/permissions/center-officer-management';
import DownloadIndividualFile from './Component/DownloadIndividualFile';
import { CenterOfficerManagementSearchProps } from '@type/search-types';
import { POLLING_PERSONNEL_LETTER_SEARCH } from '@validations/center-officer-management/controller-list/center-based-officer-list/centerBasedOfficerValidation';
import { FieldErrors } from 'react-hook-form';
import { isPermitted } from '@helpers/permission';
import { ReportRoSearchFiltersTypeNew } from '@hooks/candidate-info-management/report/useRoReportFiltersNew';

export const centerBasedOfficerListBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CENTER_BASED_OFFICER_LIST.CENTER_BASED_OFFICER_LIST'),
  },
];

export const centerBasedOfficerListTableHeader = {
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

export const centerBasedOfficerListTableCreatedColumns = ({
  t,
  permissionsArray,
  isDownload = false,
  roReportFilters,
  childFilters,
  trigger,
  errors,
}: {
  t: TFunction<'translation', undefined>;
  permissionsArray?: string[];
  isDownload?: boolean;
  roReportFilters: ReportRoSearchFiltersTypeNew;
  childFilters?: CenterOfficerManagementSearchProps;
  trigger: any;
  errors: FieldErrors;
}) => [
  {
    id: 0,
    name: t('CENTER_BASED_OFFICER_LIST.CENTER_NAME'),
    key: 'instituteName',
  },
  {
    id: 1,
    name: t('CENTER_BASED_OFFICER_LIST.TOTAL_BOOTH'),
    key: 'totalBooth',
  },
  {
    id: 2,
    name: t('CENTER_BASED_OFFICER_LIST.PRESIDING_OFFICER'),
    key: 'presidingOfficerAssignedNumber',
  },
  {
    id: 3,
    name: t('CENTER_BASED_OFFICER_LIST.ACTING_PRESIDING_OFFICER'),
    key: 'inchargePresidingOfficerAssignedNumber',
  },
  {
    id: 4,
    name: t('CENTER_BASED_OFFICER_LIST.ASSISTANT_PRESIDING_OFFICER'),
    key: 'assistantPresidingOfficerAssignedNumber',
  },
  {
    id: 5,
    name: t('CENTER_BASED_OFFICER_LIST.POLLING_OFFICER'),
    key: 'pollingOfficerAssignedNumber',
  },
  ...(isPermitted(
    permissionsArray,
    CENTER_OFFICER_MANAGEMENT.CENTER_WISE_POLLING_PERSONNEL_FULL_PERMISSION,
  )
    ? [
        ...(isDownload
          ? []
          : [
              {
                id: 6,
                name: t('CENTER_BASED_OFFICER_LIST.LETTER'),
                key: 'id',
                render: (data: number) => {
                  return (
                    <DownloadIndividualFile
                      id={data}
                      childFilters={childFilters}
                      roReportFilters={roReportFilters}
                      trigger={trigger}
                      errors={errors}
                    />
                  );
                },
              },
            ]),
      ]
    : []),
];

export const centerBasedOfficerListTableNonCreatedColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 0,
    name: t('CENTER_BASED_OFFICER_ALLOCATION.SERIAL'),
    key: 'serialNo',
  },
  {
    id: 1,
    name: t('CENTER_BASED_OFFICER_LIST.CENTER_NAME'),
    key: 'instituteName',
  },
  {
    id: 2,
    name: t('CENTER_BASED_OFFICER_LIST.TOTAL_BOOTH'),
    key: 'totalBooth',
  },
];

export const childFiltersArray = [
  POLLING_PERSONNEL_LETTER_SEARCH.NAME,
  POLLING_PERSONNEL_LETTER_SEARCH.DESIGNATION,
  POLLING_PERSONNEL_LETTER_SEARCH.GOODS_DISTRIBUTION_DATE_AND_TIME,
  POLLING_PERSONNEL_LETTER_SEARCH.GOODS_RECEIVED_DATE_AND_TIME,
  POLLING_PERSONNEL_LETTER_SEARCH.TRAINING_PLACE,
  POLLING_PERSONNEL_LETTER_SEARCH.TRAINING_DATE_AND_TIME,
  POLLING_PERSONNEL_LETTER_SEARCH.TRAINING_ROOM,
];
