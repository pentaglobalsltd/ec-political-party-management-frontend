import { TFunction } from 'i18next';

import { IconHomeLine } from '@pentabd/icons';
import { Text } from '@pentabd/ui';
import { CENTER_OFFICER_MANAGEMENT } from '@constants/permissions/center-officer-management';
import Actions from './component/Actions';
import InstituteAction from './component/InstituteAction';
import { isPermitted } from '@helpers/permission';

export const centerBasedOfficerAllocationBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CENTER_BASED_OFFICER_ALLOCATION.CENTER_BASED_OFFICER_ALLOCATION'),
  },
];

export const centerAllocationTableColumns = (
  t: TFunction<'translation', undefined>,
  getDataOnSuccess?: any,
  permissionsArray?: string[],
) => {
  const permission = isPermitted(
    permissionsArray,
    CENTER_OFFICER_MANAGEMENT.POLLING_PERSONNEL_ALLOCATE_FULL_PERMISSION,
  );

  return [
    {
      id: 1,
      name: t('CENTER_BASED_OFFICER_ALLOCATION.NAME'),
      key: 'pollingPersonnelName',
    },
    {
      id: 2,
      name: t('CENTER_BASED_OFFICER_ALLOCATION.INSTITUTE_NAME'),
      key: 'agencyName',
    },
    {
      id: 3,
      name: t('CENTER_BASED_OFFICER_ALLOCATION.ASSIGNED_POSITION'),
      key: 'assignedDesignationName',
    },
    {
      id: 4,
      name: t('CENTER_BASED_OFFICER_ALLOCATION.BOOTH'),
      key: 'pollingPersonnelCenter',
      render: (data: any) => (
        <Text component="p" sizeType="fs" size="sm" weight="semibold">
          {data?.boothNo}
        </Text>
      ),
    },

    ...(permission
      ? [
          {
            id: 5,
            name: t('CENTER_BASED_OFFICER_ALLOCATION.PROCESS'),
            key: 'process',
            render: (data: any, raw: any) => {
              return (
                <InstituteAction
                  raw={raw}
                  getDataOnSuccess={getDataOnSuccess}
                />
              );
            },
          },
        ]
      : []),
  ];
};

export const instituteAllocationTableColumns = (
  t: TFunction<'translation', undefined>,
  pollingCenter?: string | number,
  permissionsArray?: string[],
  centerPollingPersonnelSummaryList?: any,
  getDataOnSuccess?: any,
) => {
  const permission = isPermitted(
    permissionsArray,
    CENTER_OFFICER_MANAGEMENT.POLLING_PERSONNEL_ALLOCATE_FULL_PERMISSION,
  );

  return [
    {
      id: 0,
      name: t('CENTER_BASED_OFFICER_ALLOCATION.SERIAL'),
      key: 'idx',
    },
    {
      id: 1,
      name: t('CENTER_BASED_OFFICER_ALLOCATION.NAME'),
      key: 'pollingPersonnelName',
    },
    {
      id: 2,
      name: t('CENTER_BASED_OFFICER_ALLOCATION.DESIGNATION'),
      key: 'pollingPersonnel',
      render: (data: any) => <Text>{data?.designation}</Text>,
    },
    {
      id: 3,
      name: t('CENTER_BASED_OFFICER_ALLOCATION.GRADE'),
      key: 'grade',
      render: (data: any, raw: any) => (
        <Text>
          {data}({raw?.pollingPersonnel?.payScale?.minValue}-
          {raw?.pollingPersonnel?.payScale?.maxValue})
        </Text>
      ),
    },
    {
      id: 4,
      name: t('CENTER_BASED_OFFICER_ALLOCATION.BASIC_SALARY'),
      key: 'pollingPersonnel',
      render: (data: any, raw: any) => <Text>{data?.basicSalary}</Text>,
    },
    {
      id: 5,
      name: t('CENTER_BASED_OFFICER_ALLOCATION.ASSIGNED_POSITION'),
      key: 'assignedDesignationName',
    },
    {
      id: 8,
      name: t('CENTER_BASED_OFFICER_ALLOCATION.ELECTION_SCHEDULE'),
      key: 'electionScheduleName',
    },
    {
      id: 6,
      name: t('CENTER_BASED_OFFICER_ALLOCATION.CENTER_NAME_COLUMN'),
      key: 'pollingCenterName',
    },
    ...(permission
      ? [
          {
            id: 7,
            name: t('CENTER_BASED_OFFICER_ALLOCATION.PROCESS'),
            key: 'pollingPersonnelCenter',
            render: (data: any, raw: any) => (
              <Actions
                data={data}
                raw={raw}
                pollingCenter={pollingCenter as number}
                centerPollingPersonnelSummaryList={
                  centerPollingPersonnelSummaryList
                }
                getDataOnSuccess={getDataOnSuccess}
              />
            ),
          },
        ]
      : []),
  ];
};

export const centerOfficerManagementSearch = {
  region: true,
  district: true,
  subDistrict: true,
  rmo: true,
  municipality: true,
  unionWard: true,
  instituteName: true,
  designationIncludingAll: true,
};

export const PRESIDING_OFFICER_CODE = '1011';
export const ASSISTANT_PRESIDING_OFFICER_CODE = '1012';
export const POLLING_OFFICER_CODE = '1013';

export const userTypeCodesPollingCenter = `${PRESIDING_OFFICER_CODE},${ASSISTANT_PRESIDING_OFFICER_CODE},${POLLING_OFFICER_CODE}`;
