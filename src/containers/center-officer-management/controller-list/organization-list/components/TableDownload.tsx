import { useTranslation } from 'react-i18next';
import { organizationListTableColumns } from '../constants';
import {
  AgencyListProps,
  useAgencyList,
} from '@hooks/center-officer-management/controller-list/organization-list/useGetAgencyList';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { useSearchParams } from 'react-router-dom';
import { getParams } from '@utils';

export const TableDownload = ({
  getAgencyListData,
}: {
  getAgencyListData: ({ searchItems, size, page }: AgencyListProps) => void;
}) => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    agencyList: downloadAgencyList,
    getAgencyListData: downloadGetAgencyListData,
    loading: downloadLoading,
  } = useAgencyList();

  const onClickDownload = () => {
    downloadGetAgencyListData({
      searchItems: { ...params },
      size: MAX_ROW_SIZE,
    });
  };

  return {
    fileName: 'organization-list',
    columns: organizationListTableColumns({
      t,
      getAgencyListData,
    }),
    rows: downloadAgencyList,
    onClickDownload: onClickDownload,
    downloadLoading: downloadLoading,
  };
};
