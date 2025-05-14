import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IconPlus, IconSearch } from '@pentabd/icons';
import { Button, DownloadButtons, Header, InputText, Table } from '@pentabd/ui';

import MainListSearch from '@components/application-search/MainListSearch';

import { ROUTES } from '@constants/routes';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { unionTableBreadcrumbs, unionTableColumns } from './constants';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { useGetAndUpdateUnions } from '@hooks/election-schedule-management/main-list/union/useGetAndUpdateUnions';
import { GetUnionOrWardsParamsData } from '@type/election-declaration-management/main-list/union/union-type';
import { getParams } from '@utils';

function Union() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    getUnionsOrWards,
    unionsOrWardsList,
    loading,
    totalPage,
    activePage,
  } = useGetAndUpdateUnions({});

  // for download
  const {
    getUnionsOrWards: downloadGetUnionsOrWards,
    unionsOrWardsList: downloadUnionsOrWardsList,
    loading: downloadLoading,
  } = useGetAndUpdateUnions({});

  const [currentSearchData, setCurrentSearchData] =
    useState<GetUnionOrWardsParamsData>({});

  const onSubmitSearch = (data: GetUnionOrWardsParamsData) => {
    if (!loading) {
      setCurrentSearchData(data);
      getUnionsOrWards({ ...data, page: 0 });
    }
  };

  const onClickDownload = () => {
    const queryParams: GetUnionOrWardsParamsData = {
      UnionOrWardCode: params?.UnionOrWardCode,
      upazilaId: Number(params?.upazilaId),
      regionId: Number(params?.regionId),
      nameEn:
        language === LANGUAGE.ENGLISH ? params?.unionOrWardName || '' : '',
      nameBn: language === LANGUAGE.BANGLA ? params?.unionOrWardName || '' : '',
      size: MAX_ROW_SIZE,
    };
    downloadGetUnionsOrWards(queryParams);
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{ header: t('UNION.UNION_OR_WARD_LIST') }}
        breadcrumbs={unionTableBreadcrumbs(t)}
        actions={[
          <Button
            key={1}
            type="primary"
            htmlType="button"
            size="sm"
            onClick={() => navigate(ROUTES.CREATE_UNION)}
          >
            <IconPlus size="20" fill="light" /> {t('UNION.ADD_NEW')}
          </Button>,
        ]}
      />

      <MainListSearch
        totalCol="grid-cols-lg-12"
        colSpan="col-span-3"
        inputs={{
          region: true,
          district: true,
          subDistrict: true,
          goCode: true,
          unionOrWardName: true,
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
              size="md"
              type="text"
              status="default"
            />,
          ],
          rightComponents: [
            <DownloadButtons
              key={1}
              fileName="union-or-ward-list"
              columns={unionTableColumns({
                t,
                language,
                navigate,
                isDownload: true,
              })}
              rows={
                downloadUnionsOrWardsList
                  ? downloadUnionsOrWardsList.unionsOrWards
                  : []
              }
              onClickDownload={onClickDownload}
              downloadLoading={downloadLoading}
            />,
          ],
        }}
        rows={unionsOrWardsList ? unionsOrWardsList.unionsOrWards : []}
        columns={unionTableColumns({ t, language, navigate })}
        pagination={{
          language: 'bn',
          totalPage: totalPage,
          activePage: activePage,
          onClick: (futurePage: number) => {
            getUnionsOrWards({ ...currentSearchData, page: futurePage - 1 });
          },
        }}
        loading={loading}
      />
    </div>
  );
}

export default Union;
