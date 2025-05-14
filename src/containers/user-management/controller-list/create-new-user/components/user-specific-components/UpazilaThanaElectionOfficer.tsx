import { useEffect } from 'react';
import FormSelect from '@components/inputs/FormSelect';
import { FORM_FIELDS } from '@constants/forms';
import { useZillas } from '@hooks/miscellaneous/master-hook/zilla/useZillasRegion';
import { useRegionListSelect } from '@hooks/election-schedule-management/main-list/region/useRegionListSelect';
import { useSubDistrictListSelect } from '@hooks/election-schedule-management/main-list/sub-district/useSubDistrictListSelect';

import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const SYSTEM_USER = FORM_FIELDS.USER_MANAGEMENT.CREATE_SYSTEM_USER;

export const UpazilaThanaElectionOfficer = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const { regions, getRegionListSelect } = useRegionListSelect();
  const { zillas, getZilla } = useZillas();
  const { upazilas, getSubDistrictListSelect } = useSubDistrictListSelect();

  const regionWatch = watch(SYSTEM_USER.UPAZILA_THANA_ELECTION_OFFICER.REGION);
  const zillaWatch = watch(SYSTEM_USER.UPAZILA_THANA_ELECTION_OFFICER.ZILLA);

  // Regions
  useEffect(() => {
    getRegionListSelect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Districts/Zillas
  useEffect(() => {
    if (regionWatch) {
      getZilla(regionWatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionWatch]);

  // Subdistricts/Upazillas
  useEffect(() => {
    if (zillaWatch) {
      getSubDistrictListSelect(zillaWatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zillaWatch]);

  return (
    <div>
      <div className="border mb-9"></div>
      <FormSelect
        title={t('ELECTION_USER.UPAZILA_THANA_ELECTION_OFFICER.DEPARTMENT')}
        name={SYSTEM_USER.UPAZILA_THANA_ELECTION_OFFICER.REGION}
        options={regions}
        isSearchable
      />

      <FormSelect
        title={t('ELECTION_USER.UPAZILA_THANA_ELECTION_OFFICER.DISTRICT')}
        name={SYSTEM_USER.UPAZILA_THANA_ELECTION_OFFICER.ZILLA}
        disabled={!regionWatch}
        options={zillas}
        isSearchable
      />

      <FormSelect
        title={t('ELECTION_USER.UPAZILA_THANA_ELECTION_OFFICER.UPAZILA')}
        name={SYSTEM_USER.UPAZILA_THANA_ELECTION_OFFICER.UPAZILA}
        disabled={!zillaWatch}
        options={upazilas}
        isSearchable
        isMulti
        numberOfSelection={1}
      />
    </div>
  );
};
