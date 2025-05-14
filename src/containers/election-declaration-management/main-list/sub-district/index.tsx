import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  Button,
  DownloadButtons,
  Header,
  InputText,
  Table,
  Text,
} from '@pentabd/ui';
import { IconPlus, IconSearch } from '@pentabd/icons';

import MainListSearch from '@components/application-search/MainListSearch';

import { ROUTES } from '@constants/routes';
import { subDistrictBreadcrumbs, subDistrictTableColumns } from './constants';
import { SubDistrictSearchProps } from '@type/election-declaration-management/main-list/sub-district/sub-district-types';
import useSubDistricts from '@hooks/election-schedule-management/main-list/sub-district/useSubDistricts';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';

const SubDistrict = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isGetSearchItem, setIsGetSearchItem] = useState<boolean>(false);
  const [searchItems, setSearchItems] = useState<SubDistrictSearchProps>({});

  const {
    getSubDistrictData,
    subDistrictList,
    loading,
    activePage,
    totalPage,
  } = useSubDistricts({ searchItems, isGetSearchItem });

  // for download
  const {
    getSubDistrictData: downloadGetSubDistrictData,
    subDistrictList: downloadSubDistrictList,
    loading: downloadLoading,
  } = useSubDistricts({ searchItems, isGetSearchItem, size: MAX_ROW_SIZE });

  const onSubmitSearch = (data: SubDistrictSearchProps) => {
    setIsGetSearchItem(true);
    setSearchItems(data);
  };

  const onClickDownload = () => {
    downloadGetSubDistrictData(0);
  };

  return (
    <div className="container-96 mb-24">
      <Header
        headerText={{ header: t('SUB_DISTRICT.LIST_OF_SUB_DISTRICT') }}
        breadcrumbs={subDistrictBreadcrumbs(t)}
        actions={[
          <Link to={ROUTES.CREATE_SUB_DISTRICT}>
            <Button type="primary" htmlType="button" size="sm">
              <IconPlus size="20" fill="light" />
              <Text weight="semibold" size="sm">
                {t('SUB_DISTRICT.ADD_NEW_BUTTON')}
              </Text>
            </Button>
          </Link>,
        ]}
        className="mb-10 pt-10"
      />

      <MainListSearch
        totalCol="grid-cols-lg-10"
        colSpan="col-span-3"
        inputs={{
          region: true,
          district: true,
          subDistrict: true,
        }}
        onSubmitHandler={onSubmitSearch}
      />

      <Table
        headerExtension={{
          leftComponents: [
            <InputText
              key={1}
              name="pre-input"
              outline
              placeholder="Search"
              prefix={<IconSearch size="20" />}
              type="text"
              status="default"
            />,
          ],
          rightComponents: [
            <DownloadButtons
              key={2}
              fileName="sub-district-list"
              columns={subDistrictTableColumns({
                t,
                navigate,
                isDownload: true,
              })}
              rows={downloadSubDistrictList}
              onClickDownload={onClickDownload}
              downloadLoading={downloadLoading}
            />,
          ],
        }}
        rows={subDistrictList}
        columns={subDistrictTableColumns({ t, navigate })}
        pagination={{
          language: 'bn',
          totalPage: totalPage,
          activePage: activePage,
          onClick: (page: number) => getSubDistrictData(page - 1),
        }}
        loading={loading}
        loadingItemCount={10}
      />
    </div>
  );
};

export default SubDistrict;
