import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { t } from 'i18next';
import { DownloadButtons, Table, Text } from '@pentabd/ui';

import {
  GET_POLLING_LIST_TESTED_STATUS,
  RESULT_STATUS,
  resultsTableHeader,
  testedResultsTableColumns,
  waitingResultsTableColumns,
} from '../../constants';
import { useGetPollingCenterListForRo } from '@hooks/result-management/electoral-process/results/useGetPollingCenterListForRo';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { RESULT } from '../..';
import Select from '@components/inputs/Select';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { getParams } from '@utils';
import { ROUTES } from '@constants/routes';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import { getWardsForMembers } from '@helpers/get-wards-for-members';
import { getUnionOrWardsForChairman } from '@helpers/get-union-or-wards-for-chairman';
import { getUnionOrWardsForMembers } from '@helpers/get-union-or-wards-for-members';

export default function UnionParishadElection() {
  const [wardsforMember, setWadsForMember] = useState<any>([]);
  const [wards, setWards] = useState<any>([]);
  const [selectedSettings, setSelectedSettings] = useState<number>();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);
  const navigate = useNavigate();
  const { candidateTypes, electionSettings, electionSchedules, unionOrWards } =
    useFiltersRedux();
  const scheduleId = electionSchedules?.[0]?.value;
  const {
    activePage: activePageWaiting,
    totalPage: totalPageWaiting,
    loading: loadingWaiting,
    pollingCenterList: pollingCenterListWaiting,
    getPollingCenterListForRo: getPollingCenterListWaiting,
  } = useGetPollingCenterListForRo();

  const {
    activePage: activePageTested,
    totalPage: totalPageTested,
    loading: loadingTested,
    pollingCenterList: pollingCenterListTested,
    getPollingCenterListForRo: getPollingCenterListTested,
  } = useGetPollingCenterListForRo();

  const {
    loading: downloadWaiting,
    pollingCenterList: downloadedWaitingList,
    getPollingCenterListForRo: downloadWaitingList,
  } = useGetPollingCenterListForRo();

  const {
    loading: downloadTested,
    pollingCenterList: downloadedTestedList,
    getPollingCenterListForRo: downloadTestedList,
  } = useGetPollingCenterListForRo();

  const methods = useForm({});
  const { setValue } = methods;

  const electionScheduleId = electionSchedules?.[0]?.value;

  const chairman =
    Number(params?.candidateTypeId) ===
    CANDIDATE_INFO.UNION_PARISHAD_CHAIRMAN.ID;

  const generalMember =
    Number(params?.candidateTypeId) ===
    CANDIDATE_INFO.UNION_PARISHAD_GENERAL_MEMBER.ID;

  const reservedMember =
    Number(params?.candidateTypeId) ===
    CANDIDATE_INFO.UNION_PARISHAD_RESERVED_MEMBER.ID;

  // Downloads waiting results
  const handleDownloadWaitingList = () => {
    if (scheduleId && selectedSettings) {
      downloadWaitingList({
        electionSettings: selectedSettings,
        scheduleId,
        status: RESULT_STATUS.FORWARDED_BY_OP,
        size: MAX_ROW_SIZE,
      });
    }
  };

  // Downloads tested results
  const handleDownloadTestedList = () => {
    if (scheduleId && selectedSettings) {
      downloadTestedList({
        electionSettings: selectedSettings,
        scheduleId,
        status: GET_POLLING_LIST_TESTED_STATUS,
        size: MAX_ROW_SIZE,
      });
    }
  };

  const handleNavigate = (id: number) => {
    if (params?.candidateTypeId)
      navigate(ROUTES.RESULTS_PUBLISHED(Number(params?.candidateTypeId), id));
  };

  const handleCandidateTypeSelect = (candidateTypeId: number) => {
    setSearchParams({ candidateTypeId: candidateTypeId.toString() });
    setValue(RESULT.UNION_OR_WARD, undefined);
    setValue(RESULT.ELECTION_SETTINGS, undefined);

    switch (candidateTypeId) {
      case CANDIDATE_INFO.UNION_PARISHAD_CHAIRMAN.ID:
        setWards(
          getUnionOrWardsForChairman({
            electionSettings,
            candidateType: candidateTypeId,
          }),
        );
        break;
      default:
        setWards(
          getUnionOrWardsForMembers({
            electionSettings: electionSettings,
            candidateType: candidateTypeId,
            unionOrWardsRedux: unionOrWards,
          }),
        );
    }
  };

  const handleUnionOrWardMember = (unionOrWardId: number) => {
    setValue(RESULT.ELECTION_SETTINGS, undefined);
    setSearchParams({ ...params, unionOrWardId: unionOrWardId.toString() });
    setWadsForMember(
      getWardsForMembers({
        candidateType: Number(params?.candidateTypeId),
        electionSettings: electionSettings,
        unionOrWardId: unionOrWardId,
      }),
    );
  };

  const handleSettings = (settingsId: number) => {
    setSearchParams({ ...params, electionSettingsId: settingsId.toString() });
    setSelectedSettings(settingsId as number);

    if (settingsId && electionScheduleId) {
      getPollingCenterListWaiting({
        electionSettings: settingsId,
        scheduleId: electionScheduleId as number,
        status: RESULT_STATUS.FORWARDED_BY_OP,
      });
      getPollingCenterListTested({
        electionSettings: settingsId,
        scheduleId: electionScheduleId as number,
        status: GET_POLLING_LIST_TESTED_STATUS,
      });
    }
  };

  useEffect(() => {
    if (
      params?.candidateTypeId &&
      electionSettings &&
      electionSettings?.length > 0
    ) {
      setValue(RESULT.CANDIDATE_TYPE, Number(params?.candidateTypeId));
      setValue(RESULT.UNION_OR_WARD, Number(params?.unionOrWardId));
      setValue(RESULT.ELECTION_SETTINGS, Number(params?.electionSettingsId));
      if (params?.electionSettingsId) {
        handleSettings(Number(params?.electionSettingsId));
      }

      switch (Number(params?.candidateTypeId)) {
        case CANDIDATE_INFO.UNION_PARISHAD_CHAIRMAN.ID:
          setWards(
            getUnionOrWardsForChairman({
              electionSettings,
              candidateType: Number(params?.candidateTypeId),
            }),
          );
          break;
        default:
          setWards(
            getUnionOrWardsForMembers({
              electionSettings,
              candidateType: Number(params?.candidateTypeId),
              unionOrWardsRedux: unionOrWards,
            }),
          );
          setWadsForMember(
            getWardsForMembers({
              candidateType: Number(params?.candidateTypeId),
              electionSettings,
              unionOrWardId: Number(params?.unionOrWardId),
            }),
          );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FormProvider {...methods}>
        <div className="py-4 d-grid gap-5 grid-cols-12">
          <div className="col-span-12 col-span-md-6 col-span-lg-3">
            <Select
              title="RESULTS.CANDIDATE_TYPE"
              name={RESULT.CANDIDATE_TYPE}
              options={candidateTypes || []}
              onSelectItem={(value) =>
                handleCandidateTypeSelect(value as number)
              }
            />
          </div>
          {chairman ? (
            <div className="col-span-12 col-span-md-6 col-span-lg-3">
              <Select
                title="RESULTS.UNION_OR_WARD"
                name={RESULT.ELECTION_SETTINGS}
                options={wards}
                onSelectItem={(value) => handleSettings(value as number)}
              />
            </div>
          ) : generalMember || reservedMember ? (
            <>
              <div className="col-span-12 col-span-md-6 col-span-lg-3">
                <Select
                  title="RESULTS.UNION_OR_WARD"
                  name={RESULT.UNION_OR_WARD}
                  options={wards}
                  onSelectItem={(value) =>
                    handleUnionOrWardMember(value as number)
                  }
                />
              </div>
              <div className="col-span-12 col-span-md-6 col-span-lg-3">
                <Select
                  title="RESULTS.UNION_PARISHAD_WARD"
                  name={RESULT.ELECTION_SETTINGS}
                  options={wardsforMember}
                  onSelectItem={(value) => handleSettings(value as number)}
                />
              </div>
            </>
          ) : null}
        </div>
      </FormProvider>
      <div className="pb-16">
        <div className="pb-10">
          <Text size="lg" weight="bold">
            {t('RESULTS.WAITING_ELECTION_RESULTS')}
          </Text>
        </div>
        <Table
          headerExtension={{
            ...resultsTableHeader,
            rightComponents: [
              <DownloadButtons
                key={5}
                fileName="download-active-centers"
                columns={waitingResultsTableColumns(t, handleNavigate)}
                rows={downloadedWaitingList}
                onClickDownload={handleDownloadWaitingList}
                downloadLoading={downloadWaiting}
              />,
            ],
          }}
          rows={pollingCenterListWaiting}
          columns={waitingResultsTableColumns(t, handleNavigate)}
          loading={loadingWaiting}
          pagination={{
            language: 'bn',
            totalPage: totalPageWaiting,
            activePage: activePageWaiting,
            onClick: (page: number) => {
              getPollingCenterListWaiting({
                electionSettings: selectedSettings,
                scheduleId: scheduleId as number,
                status: RESULT_STATUS.FORWARDED_BY_OP,
                page: page - 1,
              });
            },
          }}
        />
      </div>

      <div className="pb-16">
        <div className="pb-10">
          <Text size="lg" weight="bold">
            {t('RESULTS.TESTED_ELECTION_RESULTS')}
          </Text>
        </div>
        <Table
          headerExtension={{
            ...resultsTableHeader,
            rightComponents: [
              <DownloadButtons
                key={5}
                fileName="download-tested-centers"
                columns={testedResultsTableColumns(t, handleNavigate)}
                rows={downloadedTestedList}
                onClickDownload={handleDownloadTestedList}
                downloadLoading={downloadTested}
              />,
            ],
          }}
          rows={pollingCenterListTested}
          columns={testedResultsTableColumns(t, handleNavigate)}
          loading={loadingTested}
          pagination={{
            language: 'bn',
            totalPage: totalPageTested,
            activePage: activePageTested,
            onClick: (page: number) => {
              getPollingCenterListTested({
                electionSettings: selectedSettings,
                scheduleId: scheduleId as number,
                status: GET_POLLING_LIST_TESTED_STATUS,
                page: page - 1,
              });
            },
          }}
        />
      </div>
    </>
  );
}
