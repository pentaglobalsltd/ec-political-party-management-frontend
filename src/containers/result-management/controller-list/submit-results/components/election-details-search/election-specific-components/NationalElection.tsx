import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { IconChevronDown } from '@pentabd/icons';

import Select from '@components/inputs/Select';
import { FORM_FIELDS } from '@constants/forms';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { OptionType } from '@pentabd/ui/build/atoms/select/types';
import { usePollingCentersOpAroOpListSelect } from '@hooks/result-management/submit-results/usePollingCentersOpAroOp';
import { SubmitResultContext } from '@containers/result-management/controller-list/submit-results/context/submitResultContext';
import { resetSubmitResultContextDataForCandidate } from '../helper/reset-context-data-for-candidate';
import { getParams } from '@utils';

const SUBMIT_RESULTS = FORM_FIELDS.RESULT_MANAGEMENT.SUBMIT_RESULTS;

const NationalElection = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    isAdmin,
    electionSettings,
    candidateTypes,
    electionSchedules,
    subject: userIdElectionUser,
  } = useFiltersRedux();
  const { watch, setValue } = useFormContext();

  const scheduleIdWatch = watch(SUBMIT_RESULTS.SCHEDULE);

  const { setContextData } = useContext(SubmitResultContext)!;

  const { getPollingCentersListSelect } =
    usePollingCentersOpAroOpListSelect(setContextData);

  useEffect(() => {
    if (
      electionSettings?.[0]?.extra?.electionSettingsId &&
      candidateTypes?.[0]?.value &&
      scheduleIdWatch &&
      userIdElectionUser
    ) {
      setValue(SUBMIT_RESULTS.CONSTITUENCY, electionSettings?.[0]?.value);
      setValue(SUBMIT_RESULTS.CANDIDATE_TYPE, candidateTypes?.[0]?.value);

      getPollingCentersListSelect({
        scheduleId: scheduleIdWatch as number,
        electionSettingsId: electionSettings?.[0]?.extra?.electionSettingsId,
        userId: isAdmin ? params?.userId : (userIdElectionUser as string),
      });

      resetSubmitResultContextDataForCandidate({
        candidateType: candidateTypes?.[0]?.value as number,
        setContextData,
        electionSettings,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionSettings, candidateTypes, scheduleIdWatch, userIdElectionUser]);

  return (
    <>
      <div className="col-span-lg-5">
        <Select
          title={t('SUBMIT_RESULTS.ELECTION_ONLY_TITLE')}
          name={SUBMIT_RESULTS.SCHEDULE}
          options={electionSchedules as OptionType[]}
          suffix={<IconChevronDown size="20" fill="subtitle2" />}
          disabled
        />
      </div>
      <div className="col-span-lg-5">
        <div className="d-grid grid-cols-1 grid-cols-md-6 gap-6">
          <div className="col-span-3">
            <Select
              title={t('SUBMIT_RESULTS.FOR_POST')}
              name={SUBMIT_RESULTS.CANDIDATE_TYPE}
              options={candidateTypes as OptionType[]}
              suffix={<IconChevronDown size="20" fill="subtitle2" />}
              disabled
            />
          </div>
          <div className="col-span-3">
            <Select
              title={t('SUBMIT_RESULTS.ELECTION_SEAT')}
              name={SUBMIT_RESULTS.CONSTITUENCY}
              options={electionSettings as OptionType[]}
              suffix={<IconChevronDown size="20" fill="subtitle2" />}
              disabled
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NationalElection;
