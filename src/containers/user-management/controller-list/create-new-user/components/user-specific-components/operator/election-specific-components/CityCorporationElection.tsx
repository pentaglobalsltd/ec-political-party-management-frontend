import { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import FormSelect from '@components/inputs/FormSelect';
import FormSwitch from '@components/inputs/FormSwitch';
import { ConstituencyContext } from '@containers/user-management/controller-list/create-new-user';

import { FORM_FIELDS } from '@constants/forms';
import useElectionSchedulesZillas from '@hooks/miscellaneous/core-hook/zilla/useElecionScheduleZillas';
import useReservedWardsWithSettings from '@hooks/miscellaneous/core-hook/reserve-ward/useReservedWardsWithSettings';
import useMunicipalitiesBySchedulesZillas from '@hooks/miscellaneous/core-hook/municipality/useMunicipalitiesBySchedulesZillas';
import { CreateNewOpType } from './types';

const ELECTION_USER = FORM_FIELDS.USER_MANAGEMENT.CREATE_ELECTION_USER;

const CityCorporationElection = (props: CreateNewOpType) => {
  const { t } = useTranslation();
  const {
    setElectionSettingsFromContext,
    electionSettingsForMunicipalityExists,
  } = useContext(ConstituencyContext)!;

  const {
    electionScheduleWatch,
    electionTypeWatch,
    userRoleWatch,
    userId,
    viewProfile,
    reeditNomination,
    setUserRoleValidation,
    postReeditNominationPermission,
  } = props;

  const { electionSchedulesZillas, getElectionSchedulesDistrictData } =
    useElectionSchedulesZillas();
  const { municipalities, getMunicipalityBySchedulesZillasData } =
    useMunicipalitiesBySchedulesZillas();
  const {
    reservedWards,
    electionSettingsList,
    hasElectionSettingsForMunicipality,
    electionSettingsForMunicipality,
    getReservedWardsWithSettingsData,
  } = useReservedWardsWithSettings();
  const { watch, setValue } = useFormContext();

  const districtWatch = watch(ELECTION_USER.DATA_ENTRY_OPERATOR.DISTRICT);
  const municipalityIdWatch = watch(
    ELECTION_USER.DATA_ENTRY_OPERATOR.MUNICIPALITY,
  );
  const unionWardWatch = watch(ELECTION_USER.DATA_ENTRY_OPERATOR.UNION_WARD);

  // জেলা
  useEffect(() => {
    if (electionScheduleWatch) {
      getElectionSchedulesDistrictData(electionScheduleWatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleWatch]);

  // পৌরসভা/সিটি কর্পোরেশন
  useEffect(() => {
    if (electionScheduleWatch && districtWatch) {
      getMunicipalityBySchedulesZillasData({
        electionScheduleId: electionScheduleWatch,
        zillaId: districtWatch,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleWatch, districtWatch]);

  // সংরক্ষিত ইউনিয়ন/ওয়ার্ড
  useEffect(() => {
    if (electionScheduleWatch && districtWatch && municipalityIdWatch) {
      getReservedWardsWithSettingsData({
        electionScheduleId: electionScheduleWatch,
        electionSchedulesZillaId: districtWatch,
        municipalityId: municipalityIdWatch,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    electionScheduleWatch,
    districtWatch,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(municipalityIdWatch),
  ]);

  // set electionSettingsForMunicipality value in Context
  useEffect(() => {
    if (electionSettingsForMunicipality) {
      setElectionSettingsFromContext(electionSettingsForMunicipality?.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionSettingsForMunicipality]);

  // Filter নির্বাচন সেটিংস values
  useEffect(() => {
    if (unionWardWatch?.length && electionSettingsList?.length) {
      let filterData: any = [];
      unionWardWatch?.forEach((reservedWardItemId: any) => {
        const newElectionSettings = electionSettingsList?.filter(
          (settingsItem: any) => {
            return settingsItem?.reservedWardId === reservedWardItemId;
          },
        );
        filterData = [...filterData, ...newElectionSettings];
        const ids = filterData?.map((items: any) => items.id);

        setValue(ELECTION_USER.DATA_ENTRY_OPERATOR.ELECTION_SETTINGS, ids);
      });
    } else {
      setValue(ELECTION_USER.DATA_ENTRY_OPERATOR.ELECTION_SETTINGS, []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unionWardWatch, electionSettingsList]);

  // Dynamic Validation for edit users on first render, with switch enabled
  useEffect(() => {
    if (userId) {
      setUserRoleValidation({
        hasElectionSettingsMunicipalitySelected:
          electionSettingsForMunicipalityExists,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, electionSettingsForMunicipalityExists]);

  return (
    <>
      <FormSelect
        title={t('ELECTION_USER.DATA_ENTRY_OPERATOR.DISTRICT')}
        name={ELECTION_USER.DATA_ENTRY_OPERATOR.DISTRICT}
        disabled={!electionScheduleWatch || viewProfile}
        options={electionSchedulesZillas}
        isSearchable
      />

      <FormSelect
        title={t('ELECTION_USER.DATA_ENTRY_OPERATOR.MUNICIPALITY')}
        name={ELECTION_USER.DATA_ENTRY_OPERATOR.MUNICIPALITY}
        disabled={(!electionScheduleWatch && !districtWatch) || viewProfile}
        options={municipalities}
        numberOfSelection={1}
        isMulti
        isSearchable
      />

      {hasElectionSettingsForMunicipality ? (
        <FormSwitch
          title={t(
            'ELECTION_USER.DATA_ENTRY_OPERATOR.ELECTION_SETTINGS_FOR_MUNICIPALITY',
          )}
          id={
            ELECTION_USER.DATA_ENTRY_OPERATOR.ELECTION_SETTINGS_FOR_MUNICIPALITY
          }
          name={
            ELECTION_USER.DATA_ENTRY_OPERATOR.ELECTION_SETTINGS_FOR_MUNICIPALITY
          }
          controlling
          handler={(e) => {
            // Dynamic validation for নির্বাচন সেটিংস field
            setUserRoleValidation({
              userRoleWatch,
              electionTypeWatch,
              hasElectionSettingsMunicipalitySelected: e.target.checked,
            });
          }}
          defaultChecked={
            userId ? electionSettingsForMunicipalityExists : false
          }
        />
      ) : null}

      <FormSelect
        title={t('ELECTION_USER.DATA_ENTRY_OPERATOR.UNION')}
        name={ELECTION_USER.DATA_ENTRY_OPERATOR.UNION_WARD}
        disabled={
          (!electionScheduleWatch && !districtWatch && !municipalityIdWatch) ||
          viewProfile
        }
        options={reservedWards}
        isSearchable
        isMulti
      />

      <FormSelect
        title={t('ELECTION_USER.DATA_ENTRY_OPERATOR.ELECTION_SETTINGS')}
        name={ELECTION_USER.DATA_ENTRY_OPERATOR.ELECTION_SETTINGS}
        placeholder=""
        options={electionSettingsList}
        disabled
        isMulti
      />

      <FormSwitch
        title={t('ELECTION_USER.DATA_ENTRY_OPERATOR.RE_EDIT')}
        id="permission"
        name="permission"
        checked={reeditNomination}
        controlling
        onChange={(e) => {
          if (userId) {
            postReeditNominationPermission({
              userId: userId,
              isActive: e.target.checked,
            });
          }
        }}
      />
    </>
  );
};

export default CityCorporationElection;
