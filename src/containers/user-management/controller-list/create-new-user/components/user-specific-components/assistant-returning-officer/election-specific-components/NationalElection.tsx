import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import FormSelect from '@components/inputs/FormSelect';
import { Checkboxes } from '../../../checkboxes';
import { ConstituencyContext } from '../../../..';

import { USER_TYPES } from '@constants/user-types';
import { FORM_FIELDS } from '@constants/forms';
import { USER_ACTION } from '@containers/user-management/controller-list/constants';
import { useConstituencyUpazila } from '@hooks/miscellaneous/master-hook/constituency/useConstituencyUpazilas';
import useElectionSchedulesZillas from '@hooks/miscellaneous/core-hook/zilla/useElecionScheduleZillas';
import { useGetAvailablePollingCenters } from '@hooks/user-management/useGetAvailablePolllingCenters';
import useElectionSchedulesConstituencies from '@hooks/miscellaneous/core-hook/constituency/useElectionScheduleConstituency';
import { useUnionsOrWardsSelectByConstituencyUpazilla } from '@hooks/miscellaneous/master-hook/union-or-ward/useUnionsOrWardsSelectByConstituencyUpazilla';
import { SelectOptionArray } from '@type/selection-option-type';
import { CreateNewAroType } from './types';

const ELECTION_USER = FORM_FIELDS.USER_MANAGEMENT.CREATE_ELECTION_USER;

const NationalElection = (props: CreateNewAroType) => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const { setConstituencyFromContext } = useContext(ConstituencyContext)!;

  const {
    electionScheduleWatch,
    params,
    viewProfile,
    userId,
    userProfileById,
    userRoleWatch,
  } = props;

  const { constituencies, getElectionSchedulesConstituenciesData } =
    useElectionSchedulesConstituencies();
  const { electionSchedulesZillas, getElectionSchedulesDistrictData } =
    useElectionSchedulesZillas();
  const { upazilas, getConstituenciesUpazilaData } = useConstituencyUpazila();
  const {
    unionsOrWards,
    getUnionsOrWardsData,
    success: unionOrWardIdsSuccess,
    resetUnionsOrWards,
  } = useUnionsOrWardsSelectByConstituencyUpazilla();
  const {
    availablePollingCenters,
    getAvailablePollingCentersData,
    success: availablePollingCentersSuccess,
  } = useGetAvailablePollingCenters();

  const constituencyWatch = watch(
    ELECTION_USER.ASSISTANT_RETURNING_OFFICER.ELECTION_SETTINGS,
  );
  const districtWatch = watch(
    ELECTION_USER.ASSISTANT_RETURNING_OFFICER.DISTRICT,
  );
  const subDistrictWatch = watch(
    ELECTION_USER.ASSISTANT_RETURNING_OFFICER.UPAZILA,
  );
  const unionWatch = watch(ELECTION_USER.ASSISTANT_RETURNING_OFFICER.UNION);

  function setConstituencyDataInContext(data: SelectOptionArray[]) {
    setConstituencyFromContext(data);
  }

  useEffect(() => {
    if (electionScheduleWatch) {
      getElectionSchedulesDistrictData(electionScheduleWatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleWatch]);

  useEffect(() => {
    if (electionScheduleWatch && districtWatch) {
      const electionSettingsValue = true;
      getElectionSchedulesConstituenciesData(
        electionScheduleWatch,
        districtWatch,
        electionSettingsValue,
        setConstituencyDataInContext,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleWatch, districtWatch]);

  useEffect(() => {
    if (constituencyWatch) {
      const constituency = constituencies?.find(
        (item) => item.value === constituencyWatch[0],
      );

      if (constituency) {
        getConstituenciesUpazilaData(constituency?.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [constituencyWatch, constituencies]);

  useEffect(() => {
    if (constituencyWatch && subDistrictWatch) {
      const constituency = constituencies?.find(
        (item) => item.value === constituencyWatch[0],
      );

      if (constituency?.id && subDistrictWatch?.length > 0) {
        getUnionsOrWardsData({
          constituencyId: constituency?.id,
          upazilaIds: subDistrictWatch,
        });
      } else if (subDistrictWatch?.length === 0) resetUnionsOrWards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subDistrictWatch]);

  useEffect(() => {
    if (
      electionScheduleWatch &&
      unionWatch &&
      Array.isArray(unionWatch) &&
      unionWatch?.length > 0
    ) {
      getAvailablePollingCentersData({
        id: electionScheduleWatch,
        userId: userId,
        unionOrWardIds: unionWatch,
        userTypeCode: userRoleWatch,
        appendSelected: userId ? true : false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleWatch, unionWatch]);

  const filteredAvailablePollingCenters =
    unionWatch?.length > 0
      ? availablePollingCenters?.filter(
          (item: SelectOptionArray) =>
            item?.isSelected === false ||
            (item?.isSelected &&
              Array.isArray(userProfileById?.pollingCenterIds) &&
              item?.value &&
              userProfileById?.pollingCenterIds?.includes(item?.value)),
        )
      : [];

  const isAroOpEditDisable = () => {
    return (
      params?.userType === USER_TYPES.ARO_OP &&
      params?.action !== USER_ACTION.EDIT
    );
  };

  return (
    <>
      <FormSelect
        title={t('ELECTION_USER.ASSISTANT_RETURNING_OFFICER.DISTRICT')}
        name={ELECTION_USER.ASSISTANT_RETURNING_OFFICER.DISTRICT}
        disabled={
          !electionScheduleWatch ||
          params?.userType === USER_TYPES.ARO_OP ||
          viewProfile
        }
        options={electionSchedulesZillas}
        isSearchable
      />
      <FormSelect
        title={t('ELECTION_USER.ASSISTANT_RETURNING_OFFICER.ELECTION_SETTINGS')}
        name={ELECTION_USER.ASSISTANT_RETURNING_OFFICER.ELECTION_SETTINGS}
        disabled={
          (!districtWatch && !electionScheduleWatch) ||
          params?.userType === USER_TYPES.ARO_OP ||
          viewProfile
        }
        options={constituencies}
        isSearchable
        isMulti
      />
      <FormSelect
        title={t('ELECTION_USER.ASSISTANT_RETURNING_OFFICER.UPAZILA')}
        name={ELECTION_USER.ASSISTANT_RETURNING_OFFICER.UPAZILA}
        options={upazilas}
        disabled={
          !constituencyWatch ||
          params?.userType === USER_TYPES.ARO_OP ||
          viewProfile
        }
        isSearchable
        isMulti
      />
      <Checkboxes
        name={ELECTION_USER.ASSISTANT_RETURNING_OFFICER.UNION}
        title={t('ELECTION_USER.ASSISTANT_RETURNING_OFFICER.UNION')}
        data={unionsOrWards}
        success={unionOrWardIdsSuccess}
        noDataMessage={t(
          'ELECTION_USER.ASSISTANT_RETURNING_OFFICER.NO_UNION_FOUND',
        )}
        selectAll
        removeAll
        disabled={isAroOpEditDisable() || viewProfile}
      />
      {!viewProfile && (
        <Checkboxes
          title={t('ELECTION_USER.ASSISTANT_RETURNING_OFFICER.CENTER')}
          name={ELECTION_USER.ASSISTANT_RETURNING_OFFICER.CENTER}
          data={filteredAvailablePollingCenters}
          success={availablePollingCentersSuccess}
          noDataMessage={t(
            'ELECTION_USER.ASSISTANT_RETURNING_OFFICER.NO_CENTER_FOUND',
          )}
          addAllOnMount={
            availablePollingCentersSuccess && !userId ? true : false
          }
          selectAll
          removeAll
          disabled={isAroOpEditDisable()}
        />
      )}
    </>
  );
};

export default NationalElection;
