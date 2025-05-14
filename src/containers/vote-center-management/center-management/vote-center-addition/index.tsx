import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Text, Table, Header, DownloadButtons } from '@pentabd/ui';

import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { VOTE_CENTER_MANAGEMENT as FORM_FIELDS } from '@constants/forms/vote-center-management/vote-center-management';

import usePollingCentersAggregated from '@hooks/vote-center-management/center-management/polling-center/usePollingCentersAggregated';

import { getDigitBanglaFromEnglish, getParams } from '@utils';
import {
  voteCenterAdditionTableBreadcrumbs,
  voteCenterAdditionTableColumns,
} from './constants';
import CreateButton from './components/CreateButton';
import SearchInput from './components/SearchInput';
import AdvanceSearch from './components/AdvanceSearch';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { GetPollingCenterAggregated } from '@api/vote-center-management/center-management/polling-center-list/polling-centers-aggregated';

const { SEARCH_VOTE_CENTER } =
  FORM_FIELDS.CENTER_MANAGEMENT.VOTE_CENTER_ADDITION.NEW_CENTER;

function VoteCenterAddition() {
  const { t } = useTranslation();
  const { userType } = useFiltersRedux();

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const methods = useForm();

  const { watch } = methods;
  const searchCenterWatch = watch(SEARCH_VOTE_CENTER);

  const {
    pollingCentersAggregated,
    getPollingCenterAggregatedData,
    loading,
    activePage,
    totalPage,
    totalCount,
  } = usePollingCentersAggregated();

  const {
    pollingCentersAggregated: downloadPollingCentersAggregated,
    getPollingCenterAggregatedData: downloadGetPollingCenterAggregatedData,
    loading: downloadLoading,
  } = usePollingCentersAggregated();

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      getPollingCenterAggregatedData({
        page: params?.page as unknown as number,
        queryParams: params,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //for download
  const onClickDownload = () => {
    if (Object.keys(params).length > 0) {
      downloadGetPollingCenterAggregatedData({
        queryParams: {
          ...params,
        },
        size: MAX_ROW_SIZE,
      });
    }
  };

  const submitHandler = (dataObj: GetPollingCenterAggregated) => {
    if (dataObj?.queryParams && searchCenterWatch)
      dataObj.queryParams.pollingInstituteNameBn = searchCenterWatch;
    getPollingCenterAggregatedData(dataObj);

    const queryParams: any = { ...dataObj.queryParams };

    Object.keys(queryParams).forEach(
      (key) => queryParams?.[key] === undefined && delete queryParams?.[key],
    );
  };

  const tablePagination = (page: number) => {
    getPollingCenterAggregatedData({
      page: page - 1,
      queryParams: params,
    });
    setSearchParams({ ...params, page: (page - 1).toString() });
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{ header: t('VOTE_CENTER_ADDITION.VOTE_CENTER_LIST') }}
        breadcrumbs={voteCenterAdditionTableBreadcrumbs(t)}
        actions={[<CreateButton />]}
      />

      <AdvanceSearch
        submitHandler={submitHandler}
        loading={loading}
        setSearchParams={setSearchParams}
      />

      <Table
        headerExtension={{
          leftComponents: [
            <div key={2} className="d-flex gap-12 align-items-center">
              <FormProvider {...methods} key={3}>
                <SearchInput
                  getPollingCenterAggregatedData={
                    getPollingCenterAggregatedData
                  }
                />
                <Text size="md">
                  {t('CENTER_BASED_OFFICER_ALLOCATION.TOTAL_CENTERS')}:{' '}
                  {getDigitBanglaFromEnglish(totalCount)}
                </Text>
              </FormProvider>
            </div>,
          ],
          rightComponents: [
            <DownloadButtons
              key={4}
              fileName="added vote center table"
              columns={voteCenterAdditionTableColumns({
                t,
                isDownload: true,
              })}
              rows={downloadPollingCentersAggregated || []}
              onClickDownload={onClickDownload}
              downloadLoading={downloadLoading}
            />,
          ],
        }}
        rows={pollingCentersAggregated || []}
        columns={voteCenterAdditionTableColumns({
          t,
          getPollingCenterAggregatedData,
          userType,
        })}
        pagination={{
          language: 'bn',
          totalPage: totalPage,
          activePage: activePage,
          onClick: tablePagination,
        }}
        loading={loading}
        loadingItemCount={10}
      />
    </div>
  );
}

export default VoteCenterAddition;
