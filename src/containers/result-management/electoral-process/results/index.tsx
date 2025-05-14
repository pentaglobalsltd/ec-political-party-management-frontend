import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button, Header } from '@pentabd/ui';

import { FORM_FIELDS } from '@constants/forms';
import { resultsTableBreadcrumbs } from './constants';

import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';

import ElectionSpecificCenterSummary from './election-specfic-center-summary';

import { ElectionSpecificSearchAndTable } from './election-specific-search-table';
import { ROUTES } from '@constants/routes';
import { getParams } from '@utils';

export const RESULT = FORM_FIELDS.RESULT_MANAGEMENT.RESULT;

function Results() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);
  const navigate = useNavigate();

  const { electionSchedules, electionTypes } = useFiltersRedux();
  const scheduleId = electionSchedules?.[0]?.value;
  const electionScheduleLabel = electionSchedules?.[0]?.label;
  const electionTypeId = electionTypes?.[0]?.value;
  // handle Candidate type Select

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('RESULTS.ELECTION_RESULTS', {
            NAME: electionScheduleLabel,
          }),
        }}
        breadcrumbs={resultsTableBreadcrumbs(t)}
      />
      {params ? (
        <Button
          fill="outline"
          type="light"
          className="my-16"
          onClick={() =>
            navigate(`/${ROUTES.RESULT_MANAGEMENT}`, { replace: true })
          }
        >
          {t('RESULTS.RETURN_BUTTON')}
        </Button>
      ) : null}
      <ElectionSpecificCenterSummary
        t={t}
        scheduleId={scheduleId}
        electionType={electionTypes}
      />

      <ElectionSpecificSearchAndTable electionTypeId={electionTypeId} />
    </div>
  );
}

export default Results;
