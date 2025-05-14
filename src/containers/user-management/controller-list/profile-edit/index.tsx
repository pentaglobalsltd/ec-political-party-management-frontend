import { useEffect } from 'react';
import CreateSystemUser from '../create-new-user';
import { usePollingCentersOpAroOpListSelect } from '@hooks/result-management/submit-results/usePollingCentersOpAroOp';
import { Header } from '@pentabd/ui';
import { userProfileTableBreadcrumbs } from '../constants';
import { useTranslation } from 'react-i18next';
import useRoReportFiltersNew from '@hooks/candidate-info-management/report/useRoReportFiltersNew';

const ProfileEdit = () => {
  const { t } = useTranslation();

  const { roReportFilters, subject: userId } = useRoReportFiltersNew();

  const {
    electionSchedules: electionSchedulesRedux,
    electionSettings: electionSettingsRedux,
  } = roReportFilters;

  const { pollingCenters, getPollingCentersListSelect } =
    usePollingCentersOpAroOpListSelect();

  useEffect(() => {
    const scheduleId = electionSchedulesRedux?.[0]?.value;
    const electionSettingsId =
      electionSettingsRedux?.[0]?.extra?.electionSettingsId;

    if (scheduleId && electionSettingsId && userId) {
      getPollingCentersListSelect({
        scheduleId,
        electionSettingsId,
        userId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionSchedulesRedux, electionSettingsRedux, userId]);

  return (
    <div>
      <Header
        className="my-5 py-5"
        breadcrumbs={userProfileTableBreadcrumbs(t)}
      />

      <CreateSystemUser viewProfile={true} />

      <div className="container-96 ">
        <Header
          headerText={{
            header: t('ELECTION_USER.COLORED_VOTE_CENTERS'),
          }}
        />
        <div className="d-grid grid-cols-lg-9 gap-10">
          {pollingCenters?.map((item: any) => (
            <div className="my-6 col-span-3">{item?.customComponent}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
