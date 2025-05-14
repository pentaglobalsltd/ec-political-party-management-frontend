import { Button, Header, Tab, Text } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import { submitResultsDashboardTableBreadcrumbs } from './constants';
import { TotalVoteCenter } from './components/total-vote-center/totalVoteCenter';
import { IconDownloadCloud02 } from '@pentabd/icons';
import { useEffect, useState } from 'react';
import { CandidateWiseComponent } from './candidateWiseComponent';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { usePollingCenterResultDashboardMetrics } from '@hooks/result-management/submit-results/usePollingCenterResultDashboardSummaryForOp';
import { CandidateTypeWisePollingCenterCount } from '@type/result-management/electoral-process/submit-results/submitResults';
import { mapDashboardSettingsSubTitle } from './helpers';
import { ELECTION_INFO } from '@constants/election-info';

export const SubmitResultDashboard = () => {
  const { t } = useTranslation();
  const handleActiveTab = (tabIndex: any) => setCurrentTab(tabIndex);
  const {
    name,
    electionSchedules,
    electionSettings,
    candidateTypes,
    electionTypes,
  } = useFiltersRedux();
  const [currentTab, setCurrentTab] = useState(0);
  const showElectionSettings =
    electionSettings &&
    electionSettings?.length > 0 &&
    electionTypes?.[0]?.value !== ELECTION_INFO.UNION_PARISHAD.ID;

  const { getPollingCenterResultDashboardMetrics, resultDashboardMetrics } =
    usePollingCenterResultDashboardMetrics();

  useEffect(() => {
    if (electionSchedules?.[0]?.value) {
      getPollingCenterResultDashboardMetrics({
        electionScheduleId: electionSchedules?.[0]?.value,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionSchedules?.[0]?.value]);

  useEffect(() => {
    if (candidateTypes?.[0]?.value) {
      setCurrentTab(Number(candidateTypes?.[0]?.value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateTypes?.[0]?.value]);

  return (
    <div>
      <Header
        className="mb-3 pt-7 border-none"
        breadcrumbs={submitResultsDashboardTableBreadcrumbs(t)}
      />
      <div className="py-10 border-bottom">
        <div className="d-flex justify-content-between">
          <div>
            {name && (
              <Text weight="semibold" size="xs" sizeType="display">
                {name}
              </Text>
            )}
            <br />
            {showElectionSettings ? (
              <div>
                <Text>{t('SUBMIT_RESULTS.CONSTITUENCY_AREA')}</Text>

                <Text weight="bold">
                  {mapDashboardSettingsSubTitle(
                    Number(electionTypes?.[0]?.value),
                    electionSettings,
                  )}
                </Text>
              </div>
            ) : null}
          </div>
          <div>
            <Button fill="outline" type="light">
              <IconDownloadCloud02 size="20" fill="dark" />
              <Text weight="semibold" size="sm">
                Report
              </Text>
            </Button>
          </div>
        </div>
        <div className="pt-10 d-grid gap-6 grid-cols-lg-12 grid-cols-md-12">
          {resultDashboardMetrics?.candidateTypeWisePollingCenterCount?.map(
            (item: CandidateTypeWisePollingCenterCount, index: number) => (
              <TotalVoteCenter data={item} key={index} />
            ),
          )}
        </div>
      </div>
      <div>
        {resultDashboardMetrics?.candidateTypeWisePollingCenterCount &&
          resultDashboardMetrics?.candidateTypeWisePollingCenterCount?.length >
            0 && (
            <Tab active={currentTab} setActiveTab={handleActiveTab} compact>
              <Tab.Heads>
                {resultDashboardMetrics?.candidateTypeWisePollingCenterCount?.map(
                  (item: any) => (
                    <Tab.Item
                      index={item?.candidateTypeId}
                      label={item?.candidateTypeNameBn}
                      key={item?.candidateTypeId}
                    />
                  ),
                )}
              </Tab.Heads>

              <Tab.ContentWrapper>
                {resultDashboardMetrics?.candidateTypeWisePollingCenterCount?.map(
                  (item: CandidateTypeWisePollingCenterCount) => (
                    <Tab.Content
                      index={item?.candidateTypeId}
                      key={item?.candidateTypeId}
                    >
                      <CandidateWiseComponent
                        data={item}
                        electionTypeId={electionTypes?.[0]?.value}
                        electionScheduleId={electionSchedules?.[0]?.value}
                        electionSettings={electionSettings?.filter(
                          (settings) => {
                            return (
                              item?.candidateTypeId ===
                              settings?.extra?.candidateTypeId
                            );
                          },
                        )}
                        notifications={resultDashboardMetrics?.resubmittedPollingCenters?.filter(
                          (center) =>
                            center?.candidateTypeId === item?.candidateTypeId,
                        )}
                      />
                    </Tab.Content>
                  ),
                )}
              </Tab.ContentWrapper>
            </Tab>
          )}
      </div>
    </div>
  );
};
