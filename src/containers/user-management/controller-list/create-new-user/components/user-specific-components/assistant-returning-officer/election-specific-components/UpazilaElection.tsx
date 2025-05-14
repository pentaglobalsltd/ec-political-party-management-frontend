import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import FormSelect from '@components/inputs/FormSelect';
import { Checkboxes } from '../../../checkboxes';

import { FORM_FIELDS } from '@constants/forms';
import { USER_TYPES } from '@constants/user-types';
import { USER_ACTION } from '@containers/user-management/controller-list/constants';
import useElectionSchedulesZillas from '@hooks/miscellaneous/core-hook/zilla/useElecionScheduleZillas';
import useUpazilasByZillas from '@hooks/miscellaneous/core-hook/upazila/useUpazilasByZillas';
import { useUnionsOrWards } from '@hooks/miscellaneous/master-hook/union-or-ward/useUnionsOrWardsSelect';

import { useGetAvailablePollingCenters } from '@hooks/user-management/useGetAvailablePolllingCenters';
import { SelectOptionArray } from '@type/selection-option-type';
import { CreateNewAroType } from './types';

const ELECTION_USER = FORM_FIELDS.USER_MANAGEMENT.CREATE_ELECTION_USER;

const UpazilaElection = (props: CreateNewAroType) => {
  const {
    params,
    electionTypeWatch,
    electionScheduleWatch,
    userId,
    viewProfile,
    userRoleWatch,
    userProfileById,
  } = props;
  const { t } = useTranslation();
  const { watch } = useFormContext();

  const { electionSchedulesZillas, getElectionSchedulesDistrictData } =
    useElectionSchedulesZillas();
  const { upazilas, getUpazilasByZillasData } = useUpazilasByZillas();
  const {
    unionsOrWards,
    getUnionsOrWardsData,
    success: unionOrWardIdsSuccess,
  } = useUnionsOrWards();
  const {
    availablePollingCenters,
    getAvailablePollingCentersData,
    success: availablePollingCentersSuccess,
  } = useGetAvailablePollingCenters();

  const districtWatch = watch(ELECTION_USER.RETURNING_OFFICER.DISTRICT);
  const upazilaWatch = watch(ELECTION_USER.ASSISTANT_RETURNING_OFFICER.UPAZILA);
  const unionWatch = watch(ELECTION_USER.ASSISTANT_RETURNING_OFFICER.UNION);

  useEffect(() => {
    if (electionScheduleWatch) {
      getElectionSchedulesDistrictData(electionScheduleWatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleWatch]);

  useEffect(() => {
    if (electionTypeWatch && electionScheduleWatch && districtWatch) {
      getUpazilasByZillasData({
        electionTypeId: electionTypeWatch,
        electionScheduleId: electionScheduleWatch,
        zillaId: districtWatch,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionTypeWatch, electionScheduleWatch, districtWatch]);

  useEffect(() => {
    if (upazilaWatch) {
      getUnionsOrWardsData({ upazilaId: upazilaWatch });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upazilaWatch]);

  useEffect(() => {
    if (
      electionScheduleWatch &&
      userRoleWatch &&
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
  }, [JSON.stringify(unionWatch)]);

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
        disabled={!electionScheduleWatch || viewProfile}
        options={electionSchedulesZillas}
        isSearchable
      />

      <FormSelect
        title={t('ELECTION_USER.ASSISTANT_RETURNING_OFFICER.UPAZILA')}
        name={ELECTION_USER.ASSISTANT_RETURNING_OFFICER.UPAZILA}
        disabled={(!electionScheduleWatch && !districtWatch) || viewProfile}
        options={upazilas}
        numberOfSelection={1}
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
          disabled={isAroOpEditDisable()}
          selectAll
          removeAll
        />
      )}
    </>
  );
};

export default UpazilaElection;
