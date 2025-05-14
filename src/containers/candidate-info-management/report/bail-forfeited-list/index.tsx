import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { Header, Table } from '@pentabd/ui';

import HeaderExtension from './components/HeaderExtension';
import TablePagination from './components/Pagination';
import { SearchComponents } from '@components/application-search/SearchComponents';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useBailForfeitedList } from '@hooks/candidate-info-management/report/useBailForfeitedList';

import { USER_TYPES } from '@constants/user-types';
import {
  BailForfeitedListBreadcrumbs,
  BailForfeitedListTableColumns,
} from './constants';
import {
  requiredFields,
  allSelectedData,
  searchStructAdmin,
  searchStructElectionUser,
} from './searchConstants';
import { getParams } from '@utils';
import { BailForfeitedOnSubmitSearchPropsType } from '@type/candidate-info-management/report/get-bail-forfeited-list-types';

const BailForfeitedList = () => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    getBailForfeitedListData,
    bailForfeitedList,
    isLoading,
    activePage,
    totalPage,
  } = useBailForfeitedList();

  const onSubmitSearch = (data: BailForfeitedOnSubmitSearchPropsType) => {
    if (data?.electionScheduleId) {
      getBailForfeitedListData({
        electionScheduleId: data?.electionScheduleId,
        candidateTypeId: data?.candidateTypeId,
        zillaId: data?.zillaId,
        constituencyId: data?.constituencyId,
      });
    }
  };

  useEffect(() => {
    if (params?.electionScheduleId) {
      getBailForfeitedListData({
        page: Number(params?.page),
        electionScheduleId: Number(params?.electionScheduleId),
        candidateTypeId: Number(params?.candidateTypeId),
        zillaId: Number(params?.zillaId),
        constituencyId: Number(params?.constituencyId),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-96 mb-24 mb-20">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('BAIL_FORFEITED_LIST.BAIL_FORFEITED_LIST'),
        }}
        breadcrumbs={BailForfeitedListBreadcrumbs(t)}
      />

      {userType === USER_TYPES.ADMIN ? (
        <SearchComponents
          struct={searchStructAdmin}
          allSelectedData={allSelectedData}
          onSubmitHandler={onSubmitSearch}
          requiredField={requiredFields}
          selectAny
        />
      ) : null}

      {userType !== USER_TYPES.ADMIN ? (
        <SearchComponents
          struct={searchStructElectionUser}
          allSelectedData={allSelectedData}
          onSubmitHandler={onSubmitSearch}
          requiredField={requiredFields}
        />
      ) : null}

      <Table
        headerExtension={HeaderExtension()}
        columns={BailForfeitedListTableColumns({
          t,
          electionTypeId: params?.electionTypeId,
          candidateTypeId: params?.candidateTypeId,
        })}
        rows={bailForfeitedList}
        loading={isLoading}
        loadingItemCount={4}
        pagination={TablePagination({
          getBailForfeitedListData,
          activePage,
          totalPage,
        })}
      />
    </div>
  );
};

export default BailForfeitedList;
