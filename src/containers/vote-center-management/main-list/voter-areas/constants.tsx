import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';

import Actions from './components/Actions';
import { ElectionDetailsListProps } from '@hooks/vote-center-management/main-list/voter-areas/useVoterAreaGetList';
import BulkEditAction from './components/BulkEditAction';
import { isPermitted } from '@helpers/permission';
import { VOTE_CENTER_MANAGEMENT } from '@constants/permissions/vote-center-management';

export const columns = ({
  t,
  isDownload = false,
  getVoterAreaListData,
}: {
  t: TFunction<'translation', undefined>;
  isDownload?: boolean;
  getVoterAreaListData?: (data: ElectionDetailsListProps) => void;
}) => {
  return [
    {
      id: 1,
      name: t('VOTER_AREA.ID'),
      key: 'idx',
    },
    {
      id: 2,
      name: t('VOTER_AREA.DISTRICT'),
      key: 'zillaName',
    },
    {
      id: 3,
      name: t('VOTER_AREA.UPAZILA'),
      key: 'upazillaName',
    },
    {
      id: 4,
      name: t('VOTER_AREA.CITY_CORPORATION'),
      key: 'municipalityName',
    },
    {
      id: 5,
      name: t('VOTER_AREA.UNION_OR_WARD'),
      key: 'unionOrWardName',
    },
    {
      id: 6,
      name: t('VOTER_AREA.UNION_PARISHAD_WARD'),
      key: 'unionWardName',
    },
    {
      id: 7,
      name: t('VOTER_AREA.VOTER_AREA_CODE'),
      key: 'areaCode',
    },
    {
      id: 8,
      name: t('VOTER_AREA.VOTER_AREA'),
      key: 'nameBn',
    },
    {
      id: 9,
      name: t('VOTER_AREA.MALE_VOTER'),
      key: 'maleVoter',
    },
    {
      id: 10,
      name: t('VOTER_AREA.FEMALE_VOTER'),
      key: 'femaleVoter',
    },
    {
      id: 11,
      name: t('VOTER_AREA.THIRD_GENDER_VOTER'),
      key: 'thirdGenderVoter',
    },
    {
      id: 12,
      name: t('VOTER_AREA.LAST_UPDATED'),
      key: 'updatedAt',
    },
    ...(isDownload
      ? []
      : [
          {
            id: 13,
            name: t('VOTER_AREA.PROCESS'),
            key: 'process',
            render: (data: any, raw: any) => (
              <Actions raw={raw} getVoterAreaListData={getVoterAreaListData} />
            ),
          },
        ]),
  ];
};

export const bulkEditColumn = ({
  t,
}: {
  t: TFunction<'translation', undefined>;
}) => {
  return [
    {
      id: 1,
      name: t('VOTER_AREA.ID'),
      key: 'idx',
    },
    {
      id: 2,
      name: t('VOTER_AREA.DISTRICT'),
      key: 'zillaName',
    },
    {
      id: 3,
      name: t('VOTER_AREA.UPAZILA'),
      key: 'upazillaName',
    },
    {
      id: 4,
      name: t('VOTER_AREA.CITY_CORPORATION'),
      key: 'municipalityName',
    },
    {
      id: 5,
      name: t('VOTER_AREA.UNION_OR_WARD'),
      key: 'unionOrWardName',
    },
    {
      id: 6,
      name: t('VOTER_AREA.VOTER_AREA_CODE'),
      key: 'areaCode',
    },
    {
      id: 7,
      name: t('VOTER_AREA.VOTER_AREA'),
      key: 'nameBn',
    },

    {
      id: 8,
      name: t('VOTER_AREA.UNION_PARISHAD_WARD'),
      key: 'process',
      render: (data: any, row: any) => <BulkEditAction data={row} />,
    },
  ];
};
export const voterAreaBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('VOTER_AREA.BREADCRUMB_MAIN_LIST'),
  },

  {
    label: t('VOTER_AREA.BREADCRUMB_VOTER_AREA'),
  },
];

export const ELECTION_CLASS_NATIONAL = 'NATIONAL';

export const voterAreaPermissionList = (
  permission: string,
  permissionsArray?: string[],
) => {
  if (
    permissionsArray?.includes(
      VOTE_CENTER_MANAGEMENT.MAIN_LIST_VOTER_AREA_FULL_PERMISSION,
    )
  ) {
    return true;
  }
  return isPermitted(permissionsArray, permission);
};
