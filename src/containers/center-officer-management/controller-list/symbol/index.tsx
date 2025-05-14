import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';

import { Button, Header, Table, Text } from '@pentabd/ui';
import { IconPlus } from '@pentabd/icons';

import { SearchComponents } from '@components/application-search/SearchComponents';

import { ROUTES } from '@constants/routes';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import {
  allSelectedData,
  inputs,
  symbolBreadcrumbs,
  symbolTableColumns,
} from './constants';

import { useGetSymbolList } from '@hooks/center-officer-management/controller-list/symbol/useGetSymbolList';
import { getParams } from '@utils';
import InputSearch from './components/InputSearch';

const Symbol = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { symbolList, getSymbolList, loading, activePage, totalPage } =
    useGetSymbolList();

  // for download
  const {
    symbolList: downloadSymbolList,
    getSymbolList: downloadGetSymbolList,
    loading: downloadLoading,
  } = useGetSymbolList();

  const methods = useForm();

  const onSubmitSearch = (data: any) => {
    const { candidateTypeId } = data;
    getSymbolList({ page: 0, candidateTypeId: candidateTypeId });
  };

  useEffect(() => {
    getSymbolList({ page: 0, ...params });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // download function
  const onClickDownload = () => {
    downloadGetSymbolList({
      page: 0,
      size: MAX_ROW_SIZE,
      candidateTypeId: Number(params?.candidateTypeId),
    });
  };

  const onClickPagination = (page: number) => {
    const { candidateTypeId } = params;
    if (candidateTypeId) {
      getSymbolList({
        page: page - 1,
        candidateTypeId: candidateTypeId,
      });
    } else {
      getSymbolList({
        page: page - 1,
      });
    }
    setSearchParams({ ...params, page: (page - 1).toString() });
  };

  return (
    <div className="container-96 mb-24">
      <Header
        headerText={{ header: t('SYMBOL.SYMBOL_LIST') }}
        breadcrumbs={symbolBreadcrumbs(t)}
        actions={[
          <Link to={ROUTES.CREATE_SYMBOL}>
            <Button type="primary" htmlType="button" size="sm">
              <IconPlus size="20" fill="light" />
              <Text weight="semibold" size="sm">
                {t('SYMBOL.ADD_NEW_BUTTON')}
              </Text>
            </Button>
          </Link>,
        ]}
        className="mb-10 pt-10"
      />
      <SearchComponents
        totalCol="grid-cols-lg-9"
        colSpan="col-span-4"
        struct={inputs}
        onSubmitHandler={onSubmitSearch}
        allSelectedData={allSelectedData}
      />

      <Table
        headerExtension={{
          leftComponents: [
            <FormProvider {...methods} key={2}>
              <InputSearch getSymbolList={getSymbolList} />
            </FormProvider>,
          ],
        }}
        download={{
          fileName: 'symbol-list',
          columns: symbolTableColumns({
            t,
            isDownload: true,
          }),
          rows: downloadSymbolList,
          onClickDownload: onClickDownload,
          downloadLoading: downloadLoading,
        }}
        rows={symbolList}
        columns={symbolTableColumns({ t })}
        loading={loading}
        pagination={{
          language: 'bn',
          totalPage: totalPage,
          activePage: activePage,
          onClick: (page: number) => onClickPagination(page),
        }}
      />
    </div>
  );
};

export default Symbol;
