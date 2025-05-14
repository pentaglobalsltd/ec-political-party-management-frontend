import { ELECTION_INFO } from '@constants/election-info';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { IconHomeLine } from '@pentabd/icons';
import { TFunction } from 'i18next';
import Actions from './components/Actions';
import { GetPollingPollingInstitutes } from '@api/vote-center-management/center-management/polling-institute/polling-institutes';

export const pollingInstituteBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('POLLING_INSTITUTE.INSTITUTE_LIST_BREADCRUMB'),
  },
];

export const pollingInstituteTableColumns = ({
  t,
  isDownload = false,
  getPollingInstitutesList,
}: {
  t: TFunction<'translation', undefined>;
  isDownload?: boolean;
  getPollingInstitutesList?: (obj: GetPollingPollingInstitutes) => void;
}) => [
  {
    id: 0,
    name: t('POLLING_INSTITUTE.TABLE_SERIAL_NO'),
    key: 'serialNo',
  },
  {
    id: 1,
    name: t('POLLING_INSTITUTE.TABLE_COL_ZILA'),
    key: 'zillaName',
  },
  {
    id: 2,
    name: t('POLLING_INSTITUTE.TABLE_COL_UPAZILA'),
    key: 'upazilaName',
  },
  {
    id: 3,
    name: t('POLLING_INSTITUTE.TABLE_COL_UNION_WARD'),
    key: 'unionOrWardName',
  },
  {
    id: 4,
    name: t('POLLING_INSTITUTE.TABLE_COL_INSTITUTE_NAME'),
    key: 'name',
  },
  {
    id: 5,
    name: t('POLLING_INSTITUTE.TABLE_COL_ADDRESS'),
    key: 'address',
  },

  {
    id: 6,
    name: '',
    key: 'action',
    // hide: !isDownload,
    hide: isDownload,
    render: (data: any, row: any) => (
      <Actions raw={row} getPollingInstitutesList={getPollingInstitutesList} />
    ),
  },
];

export function MunicipalityApiCall() {
  const { electionTypes } = useFiltersRedux();
  const electionType = electionTypes?.[0]?.value || 0;
  switch (electionType) {
    case ELECTION_INFO.CITY_CORPORATION.ID:
      return false;
    case ELECTION_INFO.MUNICIPALITY.ID:
      return false;
    default:
      return true;
  }
}
