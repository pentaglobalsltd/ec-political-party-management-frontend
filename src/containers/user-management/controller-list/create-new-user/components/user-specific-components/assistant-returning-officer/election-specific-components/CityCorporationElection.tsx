import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import FormSelect from '@components/inputs/FormSelect';
import { Checkboxes } from '../../../checkboxes';

import { USER_TYPES } from '@constants/user-types';
import { FORM_FIELDS } from '@constants/forms';
import { USER_ACTION } from '@containers/user-management/controller-list/constants';
import useElectionSchedulesZillas from '@hooks/miscellaneous/core-hook/zilla/useElecionScheduleZillas';
import { useGetAvailablePollingCenters } from '@hooks/user-management/useGetAvailablePolllingCenters';
import useMunicipalitiesBySchedulesZillas from '@hooks/miscellaneous/core-hook/municipality/useMunicipalitiesBySchedulesZillas';
import { useUnionOrWardsByMunicipalitiesZilla } from '@hooks/miscellaneous/core-hook/union-or-ward/useUnionOrWardsByMunicipalitiesZilla';
import { SelectOptionArray } from '@type/selection-option-type';
import { CreateNewAroType } from './types';

const ELECTION_USER = FORM_FIELDS.USER_MANAGEMENT.CREATE_ELECTION_USER;

const CityCorporationElection = (props: CreateNewAroType) => {
  const { t } = useTranslation();
  const { watch } = useFormContext();

  const {
    electionScheduleWatch,
    params,
    viewProfile,
    userId,
    userProfileById,
    userRoleWatch,
  } = props;

  const { electionSchedulesZillas, getElectionSchedulesDistrictData } =
    useElectionSchedulesZillas();
  const { municipalities, getMunicipalityBySchedulesZillasData } =
    useMunicipalitiesBySchedulesZillas();
  const {
    unionsOrWards,
    getUnionsOrWardsData,
    success: unionOrWardIdsSuccess,
  } = useUnionOrWardsByMunicipalitiesZilla();
  const {
    availablePollingCenters,
    getAvailablePollingCentersData,
    success: availablePollingCentersSuccess,
  } = useGetAvailablePollingCenters();

  const districtWatch = watch(
    ELECTION_USER.ASSISTANT_RETURNING_OFFICER.DISTRICT,
  );
  const municipalityWatch = watch(
    ELECTION_USER.ASSISTANT_RETURNING_OFFICER.MUNICIPALITY,
  );
  const unionWatch = watch(ELECTION_USER.ASSISTANT_RETURNING_OFFICER.UNION);

  useEffect(() => {
    if (electionScheduleWatch) {
      getElectionSchedulesDistrictData(electionScheduleWatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleWatch]);

  useEffect(() => {
    if (electionScheduleWatch && districtWatch) {
      getMunicipalityBySchedulesZillasData({
        electionScheduleId: electionScheduleWatch,
        zillaId: districtWatch,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleWatch, districtWatch]);

  useEffect(() => {
    if (electionScheduleWatch && districtWatch && municipalityWatch) {
      getUnionsOrWardsData({
        electionScheduleId: electionScheduleWatch,
        zillaId: districtWatch,
        municipalityId: municipalityWatch,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleWatch, districtWatch, municipalityWatch]);

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
        disabled={
          !electionScheduleWatch ||
          params?.userType === USER_TYPES.ARO_OP ||
          viewProfile
        }
        options={electionSchedulesZillas}
        isSearchable
      />

      <FormSelect
        title={t('ELECTION_USER.ASSISTANT_RETURNING_OFFICER.MUNICIPALITY')}
        name={ELECTION_USER.ASSISTANT_RETURNING_OFFICER.MUNICIPALITY}
        disabled={
          (!districtWatch && !electionScheduleWatch) ||
          params?.userType === USER_TYPES.ARO_OP ||
          viewProfile
        }
        options={municipalities}
        isMulti
        numberOfSelection={1}
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

export default CityCorporationElection;
