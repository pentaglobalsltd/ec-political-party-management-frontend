import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router-dom';

import { Header, Table } from '@pentabd/ui';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { useBartaSheetHistory } from '@hooks/result-management/electoral-process/barta-sheet-history/useBartaSheetHistory';

import {
  messageBoardHistoryBreadcrumbs,
  messageBoardHistoryTableColumns,
} from '../constants';
import { USER_TYPES } from '@constants/user-types';
import { getParams } from '@utils';
import { ELECTION_INFO } from '@constants/election-info';

export const MessageSendListHistory = () => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;

  const { scheduleId, bartaSheetId, electionTypeId, candidateTypeId } =
    useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { electionTypes: electionTypesRedux } = useFiltersRedux();
  const electionTypeValue =
    userType === USER_TYPES.ADMIN
      ? Number(electionTypeId)
      : Number(electionTypesRedux?.[0]?.value);

  const isShowFileByAro = [ELECTION_INFO.UNION_PARISHAD.ID].includes(
    electionTypeValue,
  );

  const {
    getBartaSheetHistoryListData,
    bartaSheetHistoryList,
    activePage,
    totalPage,
    isBartaSheetHistoryLoading,
  } = useBartaSheetHistory();

  useEffect(() => {
    if (scheduleId && bartaSheetId)
      getBartaSheetHistoryListData({
        scheduleId,
        bartaSheetId,
        page: params?.page ?? 0,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleId, bartaSheetId, params?.page]);

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t(
            'ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.BARTA_SHEET_HISTORY',
          ),
        }}
        breadcrumbs={messageBoardHistoryBreadcrumbs(t)}
      />

      <Table
        rows={bartaSheetHistoryList || []}
        columns={messageBoardHistoryTableColumns({
          t,
          isAdmin: userType === USER_TYPES.ADMIN,
          electionTypeId: electionTypeValue,
          candidateTypeId: Number(candidateTypeId),
          isShowFileByAro,
        })}
        pagination={{
          language: 'bn',
          totalPage,
          activePage,
          onClick: (page) => {
            setSearchParams({ ...params, page: (page - 1).toString() });
          },
        }}
        loading={isBartaSheetHistoryLoading}
      />
    </div>
  );
};
