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
import { useGetPollingCenterListForAro } from '@hooks/result-management/electoral-process/results/useGetPollingCenterListForAro';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { RESULT } from '../..';
import Select from '@components/inputs/Select';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { getParams } from '@utils';
import { ROUTES } from '@constants/routes';
import { CANDIDATE_INFO } from '@constants/candidate-info';

export default function DefaultElection() {
  const methods = useForm({});
  const { setValue } = methods;

  const [wards, setWards] = useState<any>([]);
  const [selectedSettings, setSelectedSettings] = useState<number>();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);
  const navigate = useNavigate();
  const { candidateTypes, electionSettings, electionSchedules } =
    useFiltersRedux();
  const scheduleId = electionSchedules?.[0]?.value;
  const {
    activePage: activePageWaiting,
    totalPage: totalPageWaiting,
    loading: loadingWaiting,
    pollingCenterList: pollingCenterListWaiting,
    getPollingCenterListForAro: getPollingCenterListWaiting,
  } = useGetPollingCenterListForAro();

  const {
    activePage: activePageTested,
    totalPage: totalPageTested,
    loading: loadingTested,
    pollingCenterList: pollingCenterListTested,
    getPollingCenterListForAro: getPollingCenterListTested,
  } = useGetPollingCenterListForAro();

  const {
    loading: downloadWaiting,
    pollingCenterList: downloadedWaitingList,
    getPollingCenterListForAro: downloadWaitingList,
  } = useGetPollingCenterListForAro();

  const {
    loading: downloadTested,
    pollingCenterList: downloadedTestedList,
    getPollingCenterListForAro: downloadTestedList,
  } = useGetPollingCenterListForAro();

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

    switch (candidateTypeId) {
      case CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID: // city corporation - councillor
        return getPollingCenterListForCouncillor(candidateTypeId);

      case CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID: // city corporation woman councillor
        return getPollingCenterListForCouncillor(candidateTypeId);

      case CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID: // municipality - councillor
        return getPollingCenterListForCouncillor(candidateTypeId);

      case CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID: // municipality - woman
        return getPollingCenterListForCouncillor(candidateTypeId);

      default:
        setWards([]);
        if (candidateTypeId) getPollingCenterListForOthers(candidateTypeId);
    }
  };

  // handle union or ward Select
  const handleWardOrUnionSelect = (settingsId: number) => {
    setValue(RESULT.UNION_OR_WARD, settingsId);
    setSearchParams({ ...params, unionOrWardId: settingsId.toString() });
    setSelectedSettings(settingsId as number);

    if (settingsId && scheduleId) {
      getPollingCenterListWaiting({
        electionSettings: settingsId,
        scheduleId: scheduleId as number,
        status: RESULT_STATUS.FORWARDED_BY_OP,
      });
      getPollingCenterListTested({
        electionSettings: settingsId,
        scheduleId: scheduleId as number,
        status: GET_POLLING_LIST_TESTED_STATUS,
      });
    }
  };

  // polling center list for others
  const getPollingCenterListForOthers = (candidateTypeId: number) => {
    const settingsObj = electionSettings?.find(
      (item: any) => item?.extra?.candidateTypeId === candidateTypeId,
    );

    const settingsId = settingsObj?.extra?.electionSettingsId;

    setSelectedSettings(settingsId as number);

    if (settingsId && scheduleId) {
      getPollingCenterListWaiting({
        electionSettings: settingsId,
        scheduleId: scheduleId as number,
        status: RESULT_STATUS.FORWARDED_BY_OP,
      });
      getPollingCenterListTested({
        electionSettings: settingsId,
        scheduleId: scheduleId as number,
        status: GET_POLLING_LIST_TESTED_STATUS,
      });
    }
  };
  // polling center list for city - councillor and woman councillor
  const getPollingCenterListForCouncillor = (candidateTypeId: number) => {
    const foundItems = electionSettings?.filter(
      (item: any) => item?.extra?.candidateTypeId === candidateTypeId,
    );

    setWards(foundItems);
  };

  useEffect(() => {
    if (
      params?.candidateTypeId &&
      electionSettings &&
      electionSettings?.length > 0
    ) {
      setValue(RESULT.CANDIDATE_TYPE, Number(params?.candidateTypeId));

      if (params?.unionOrWardId) {
        handleWardOrUnionSelect(Number(params?.unionOrWardId));
      }

      switch (Number(params?.candidateTypeId)) {
        case CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID: // city corporation - councillor
          return getPollingCenterListForCouncillor(
            Number(params?.candidateTypeId),
          );

        case CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID: // city corporation woman councillor
          return getPollingCenterListForCouncillor(
            Number(params?.candidateTypeId),
          );

        case CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID: // municipality - councillor
          return getPollingCenterListForCouncillor(
            Number(params?.candidateTypeId),
          );

        case CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID: // municipality - councillor
          return getPollingCenterListForCouncillor(
            Number(params?.candidateTypeId),
          );

        default:
          setWards([]);
          getPollingCenterListForOthers(Number(params?.candidateTypeId));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionSettings]);

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
          {wards && wards?.length > 0 && (
            <div className="col-span-12 col-span-md-6 col-span-lg-3">
              <Select
                title="RESULTS.UNION_OR_WARD"
                name={RESULT.UNION_OR_WARD}
                options={wards}
                onSelectItem={(value) =>
                  handleWardOrUnionSelect(value as number)
                }
              />
            </div>
          )}
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
