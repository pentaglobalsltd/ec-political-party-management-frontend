import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import { Header, InputSelect } from '@pentabd/ui';
import { IconChevronDown } from '@pentabd/icons';

import PieChartCard from './component/PieChartCard';
import ChartLoading from './component/ChartLoading';
import NoDataFoundCard from './component/NoDataFoundCard';
import FinalBartaSheetTable from './component/FinalBartaSheetTable';
import { SearchComponents } from '@components/application-search/SearchComponents';

import { FORM_FIELDS } from '@constants/forms';
import { ELECTION_INFO } from '@constants/election-info';
import {
  allSelectedData,
  conditionalRequiredField,
  searchStructAdmin,
} from './searchConstants';
import {
  chartColors1,
  chartColors2,
  chartColors3,
  graphicalObservationTableBreadcrumbs,
} from './constants';
import { useGetMessageSendFinalList } from '@hooks/result-management/result-monitoring/graphical-observation/useGetMessageSendListFinal';
import { useGetGraphicalAnalysis } from '@hooks/result-management/result-monitoring/graphical-observation/useGetGraphicalAnalysis';
import useElectionSchedulesCandidateTypeZillas from '@hooks/miscellaneous/core-hook/zilla/useCandiateTypeZillas';
import { useGetGraphicalPollingCenterSummary } from '@hooks/result-management/result-monitoring/graphical-observation/useGetGraphicalPollingCenterSummary';
import { getParams } from '@utils';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

const APPLICATION_SEARCH = FORM_FIELDS.APPLICATION_SEARCH;

const GRAPH_REFRESH_TIME = 5 * 60 * 1000;

function GraphicalObservation() {
  const { t } = useTranslation();

  const [showZilla, setShowZilla] = useState<boolean>(false);
  const [slides1, setSlides1] = useState<any>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const params: any = getParams(searchParams);

  const {
    isSuccess: isSuccessGraphicalAnalysis,
    isLoading: isLoadingGraphicalAnalysis,
    graphicalAnalysis,
    getGraphicalAnalysis,
  } = useGetGraphicalAnalysis(chartColors1, chartColors2);

  const {
    isSuccess: isSuccessGraphicalPollingCenterSummary,
    isLoading: isLoadingGraphicalPollingCenterSummary,
    graphicalPollingCenterSummary,
    getGraphicalPollingCenterSummary,
  } = useGetGraphicalPollingCenterSummary(chartColors3);

  const {
    isSuccess: isSuccessGetZilla,
    candidateTypeDistrict,
    getElectionSchedulesCandidateTypeDistrictData,
  } = useElectionSchedulesCandidateTypeZillas();

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const {
    activePage,
    totalPage,
    loading,
    messageList,
    getMessageSendListFinal,
  } = useGetMessageSendFinalList();

  const graphRelatedApiCall = ({
    electionScheduleId,
    candidateTypeId,
    zillaId,
    upazilaId,
    municipalityId,
    unionOrWardId,
  }: {
    electionScheduleId: string | number;
    candidateTypeId: string | number;
    zillaId?: string | number;
    municipalityId?: string | number;
    upazilaId?: string | number;
    unionOrWardId?: string | number;
  }) => {
    getGraphicalAnalysis({
      electionScheduleId,
      candidateTypeId,
      zillaId,
      upazilaId,
      municipalityId,
      unionOrWardId,
    });
    getGraphicalPollingCenterSummary({
      electionScheduleId,
      candidateTypeId,
      zillaId,
      upazilaId,
      municipalityId,
      unionOrWardId,
    });
  };

  const apiCallWithMunicipality = ({
    electionScheduleId,
    candidateTypeId,
    zillaId,
    municipalityId,
  }: {
    electionScheduleId: string | number;
    candidateTypeId: string | number;
    zillaId?: string | number;
    municipalityId?: string | number;
  }) => {
    setShowZilla(false);
    graphRelatedApiCall({
      electionScheduleId,
      candidateTypeId,
      zillaId,
      municipalityId,
    });
    getMessageSendListFinal({
      page: 0,
      electionScheduleId: Number(electionScheduleId),
      candidateTypeId,
      zillaId,
      municipalityId,
    });
  };

  const onSubmitSearch = (data: any) => {
    const {
      electionScheduleId,
      candidateTypeId,
      electionTypeId,
      zillaId,
      upazilaId,
      municipalityId,
      unionOrWardId,
    } = data;

    switch (Number(electionTypeId)) {
      case ELECTION_INFO.NATIONAL.ID:
        getElectionSchedulesCandidateTypeDistrictData(
          electionScheduleId,
          candidateTypeId,
        );
        getMessageSendListFinal({
          page: 0,
          electionScheduleId: Number(electionScheduleId),
          candidateTypeId,
          zillaId,
          upazilaId,
          unionOrWardId,
        });
        setShowZilla(true);
        break;
      case ELECTION_INFO.CITY_CORPORATION.ID:
        apiCallWithMunicipality({
          electionScheduleId,
          candidateTypeId,
          zillaId,
          municipalityId,
        });
        break;
      case ELECTION_INFO.UPAZILLA.ID:
        setShowZilla(false);
        graphRelatedApiCall({
          electionScheduleId,
          candidateTypeId,
          zillaId,
          upazilaId,
        });
        getMessageSendListFinal({
          page: 0,
          electionScheduleId: Number(electionScheduleId),
          candidateTypeId,
          zillaId,
          upazilaId,
        });
        break;
      case ELECTION_INFO.UNION_PARISHAD.ID:
        setShowZilla(false);
        graphRelatedApiCall({
          electionScheduleId,
          candidateTypeId,
          zillaId,
          upazilaId,
          unionOrWardId,
        });
        getMessageSendListFinal({
          page: 0,
          electionScheduleId: Number(electionScheduleId),
          candidateTypeId,
          zillaId,
          upazilaId,
          unionOrWardId,
        });
        break;
      default:
        setShowZilla(false);
    }

    setSearchParams({
      ...data,
      page: '0',
    });
  };

  // only for national
  const handleSelectZilla = (zillaId: number) => {
    const { electionScheduleId, candidateTypeId } = params;
    graphRelatedApiCall({
      electionScheduleId,
      candidateTypeId,
      zillaId,
    });
    getMessageSendListFinal({
      electionScheduleId,
      candidateTypeId,
      zillaId,
    });
  };

  const setZillaToUrl = (zillaId: string | number) => {
    if (zillaId) {
      setSearchParams({
        ...params,
        zillaId: zillaId as string,
      });
    }
  };

  const refreshPage = useCallback(() => {
    const {
      electionTypeId,
      electionScheduleId,
      candidateTypeId,
      zillaId,
      municipalityId,
      upazilaId,
      unionOrWardId,
    } = params;

    if (electionTypeId && electionScheduleId && candidateTypeId) {
      switch (Number(electionTypeId)) {
        case ELECTION_INFO.NATIONAL.ID: {
          const currentZilla = zillaId
            ? zillaId
            : candidateTypeDistrict?.[0]?.value;
          graphRelatedApiCall({
            electionScheduleId,
            candidateTypeId,
            zillaId: currentZilla,
          });

          if (!zillaId) {
            setZillaToUrl(candidateTypeDistrict?.[0]?.value);
          }
          setShowZilla(true);
          break;
        }
        case ELECTION_INFO.CITY_CORPORATION.ID:
          setShowZilla(false);
          graphRelatedApiCall({
            electionScheduleId,
            candidateTypeId,
            zillaId,
            municipalityId,
          });
          break;
        case ELECTION_INFO.UPAZILLA.ID:
          setShowZilla(false);
          graphRelatedApiCall({
            electionScheduleId,
            candidateTypeId,
            zillaId,
            upazilaId,
          });
          break;
        case ELECTION_INFO.UNION_PARISHAD.ID:
          setShowZilla(false);
          graphRelatedApiCall({
            electionScheduleId,
            candidateTypeId,
            zillaId,
            upazilaId,
            unionOrWardId,
          });
          break;

        default:
          setShowZilla(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessGetZilla, params?.electionScheduleId, params?.zillaId]);

  useEffect(() => {
    if (isSuccessGetZilla) {
      refreshPage();
    }
  }, [isSuccessGetZilla, refreshPage]);

  useEffect(() => {
    if (
      isSuccessGetZilla ||
      isSuccessGraphicalAnalysis ||
      isSuccessGraphicalPollingCenterSummary
    ) {
      const maxTime = setInterval(async () => {
        refreshPage();
      }, GRAPH_REFRESH_TIME);

      return () => {
        clearInterval(maxTime);
      };
    }
  }, [
    isSuccessGetZilla,
    isSuccessGraphicalAnalysis,
    isSuccessGraphicalPollingCenterSummary,
    refreshPage,
  ]);

  useEffect(() => {
    if (Object.keys(params || {}).length !== 0) {
      const {
        candidateTypeId,
        electionTypeId,
        electionScheduleId,
        municipalityId,
        upazilaId,
        zillaId,
        unionOrWardId,
        page,
      } = params;

      getMessageSendListFinal({
        page: Number(page),
        electionScheduleId: Number(electionScheduleId),
        candidateTypeId,
        zillaId,
        municipalityId,
        upazilaId,
        unionOrWardId,
      });

      switch (Number(electionTypeId)) {
        case ELECTION_INFO.NATIONAL.ID:
          getElectionSchedulesCandidateTypeDistrictData(
            electionScheduleId,
            candidateTypeId,
          );
          setShowZilla(true);
          break;
        case ELECTION_INFO.CITY_CORPORATION.ID:
          setShowZilla(false);
          graphRelatedApiCall({
            electionScheduleId,
            candidateTypeId,
            zillaId,
            municipalityId,
          });
          break;
        case ELECTION_INFO.UPAZILLA.ID:
          setShowZilla(false);
          graphRelatedApiCall({
            electionScheduleId,
            candidateTypeId,
            zillaId,
            upazilaId,
          });
          break;
        case ELECTION_INFO.UNION_PARISHAD.ID:
          setShowZilla(false);
          graphRelatedApiCall({
            electionScheduleId,
            candidateTypeId,
            zillaId,
            upazilaId,
            unionOrWardId,
          });
          break;
        default:
          setShowZilla(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    /**
     * graphicalPollingCenterSummary => shows the bottom-right graph (ভোট কেন্দ্রের ফলাফল অবস্থা)
     * graphicalAnalysis => shows the rest of the 3 graphs
     */
    if (graphicalPollingCenterSummary?.length) {
      if (graphicalAnalysis?.length) {
        graphicalPollingCenterSummary?.forEach((obj1) => {
          const matchedObject = graphicalAnalysis?.find(
            (obj2) => obj2?.match === obj1?.match,
          );
          if (matchedObject) {
            obj1.candidateVotePercentage =
              matchedObject.candidateVotePercentage;
            obj1.voteCastStatus = matchedObject.voteCastStatus;
            obj1.candidateVoteNumber = matchedObject.candidateVoteNumber;
          }
        });
      }

      setSlides1(
        graphicalPollingCenterSummary?.map((item: any, index: number) => ({
          original: `${item.title}`,
          renderItem: () => (
            <PieChartCard key={index} data={item} options={options} />
          ),
        })),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphicalAnalysis, graphicalPollingCenterSummary]);

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('GRAPHICAL_OBSERVATION.GRAPHICAL_OBSERVATION'),
        }}
        breadcrumbs={graphicalObservationTableBreadcrumbs(t)}
      />

      <SearchComponents
        struct={searchStructAdmin}
        onSubmitHandler={onSubmitSearch}
        allSelectedData={allSelectedData}
        conditionalRequiredField={conditionalRequiredField}
      />

      {isSuccessGetZilla && showZilla ? (
        <>
          <div className="mb-12 bg-primary-lightest rounded-5 p-10">
            <InputSelect
              title={t('SEARCH.DISTRICT')}
              name={APPLICATION_SEARCH.DISTRICT}
              placeholder={t('PLACEHOLDER.SELECT')}
              defaultValue={
                candidateTypeDistrict?.length
                  ? candidateTypeDistrict[0].value
                  : 0
              }
              options={candidateTypeDistrict}
              suffix={<IconChevronDown size="20" fill="subtitle2" />}
              isSearchable
              disabled={!candidateTypeDistrict?.length}
              onSelectItem={(item) => {
                if (item) {
                  setZillaToUrl(item as any);
                  handleSelectZilla(item as any);
                }
              }}
              portal
            />
          </div>
        </>
      ) : null}

      {isSuccessGraphicalPollingCenterSummary && isSuccessGraphicalAnalysis ? (
        <div
          className={classNames('bg-white', {
            'chart-container': graphicalPollingCenterSummary?.length,
          })}
        >
          {isLoadingGraphicalAnalysis ||
          isLoadingGraphicalPollingCenterSummary ? (
            <ChartLoading />
          ) : graphicalPollingCenterSummary?.length > 0 ? (
            <Gallery
              items={slides1}
              showFullscreenButton={true}
              slideDuration={1000}
              autoPlay={false}
              lazyLoad
            />
          ) : (
            <NoDataFoundCard />
          )}
        </div>
      ) : null}

      <div className="mt-12">
        <FinalBartaSheetTable
          activePage={activePage}
          totalPage={totalPage}
          loading={loading}
          messageList={messageList}
          getMessageSendList={getMessageSendListFinal}
        />
      </div>
    </div>
  );
}

export default GraphicalObservation;
