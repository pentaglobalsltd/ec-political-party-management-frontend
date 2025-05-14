import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { DownloadButtons, Table } from '@pentabd/ui';

import { USER_TYPES } from '@constants/user-types';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { graphicalObservationTableHeader } from '../constants';
import { graphicalObservationTableColumns } from '../constants';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { useGetMessageSendFinalList } from '@hooks/result-management/result-monitoring/graphical-observation/useGetMessageSendListFinal';
import { getParams } from '@utils';

interface Props {
  activePage: number;
  totalPage: number;
  loading: boolean;
  messageList: any;
  getMessageSendList: any;
}

const FinalBartaSheetTable = ({
  activePage,
  totalPage,
  loading,
  messageList,
}: Props) => {
  const { t } = useTranslation();

  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);
  const { electionTypes: electionTypesRedux } = useFiltersRedux();

  const {
    loading: downloadLoading,
    messageList: downloadedMessageList,
    getMessageSendListFinal: downloadMessageList,
  } = useGetMessageSendFinalList();

  const getPaginatedMessageList = (page: number) => {
    const { electionScheduleId, candidateTypeId } = params;

    if (candidateTypeId && electionScheduleId) {
      setSearchParams({
        ...params,
        page: (page - 1).toString(),
      });
    }
  };

  const onClickDownload = () => {
    const {
      electionScheduleId,
      candidateTypeId,
      municipalityId,
      upazilaId,
      zillaId,
    } = params;

    if (candidateTypeId && electionScheduleId) {
      downloadMessageList({
        size: MAX_ROW_SIZE,
        electionScheduleId: Number(electionScheduleId),
        candidateTypeId: Number(candidateTypeId),
        zillaId: Number(zillaId),
        municipalityId: Number(municipalityId),
        upazilaId: Number(upazilaId),
      });
    }
  };

  return (
    <div className="mt-12">
      <Table
        headerExtension={{
          ...graphicalObservationTableHeader,
          rightComponents: [
            <DownloadButtons
              key={1}
              fileName="graphical-observation-list"
              columns={graphicalObservationTableColumns({
                t,
                electionTypeId:
                  userType === USER_TYPES.ADMIN
                    ? Number(params?.electionTypeId)
                    : electionTypesRedux?.[0]?.value,
                candidateTypeId: Number(params?.candidateTypeId),
                isDownload: true,
              })}
              rows={downloadedMessageList}
              onClickDownload={onClickDownload}
              downloadLoading={downloadLoading}
            />,
          ],
        }}
        rows={messageList}
        columns={graphicalObservationTableColumns({
          t,
          electionTypeId:
            userType === USER_TYPES.ADMIN
              ? Number(params?.electionTypeId)
              : electionTypesRedux?.[0]?.value,
          candidateTypeId: Number(params?.candidateTypeId),
        })}
        pagination={{
          language: 'bn',
          activePage: activePage,
          totalPage: totalPage,
          onClick: getPaginatedMessageList,
        }}
        loading={loading}
        tableType="primary"
      />
    </div>
  );
};

export default FinalBartaSheetTable;
