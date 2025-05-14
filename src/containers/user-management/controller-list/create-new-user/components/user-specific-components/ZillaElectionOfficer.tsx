import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormSelect from '@components/inputs/FormSelect';
import { FORM_FIELDS } from '@constants/forms';
import { useZillas } from '@hooks/miscellaneous/master-hook/zilla/useZillasRegion';
import { useRegionListSelect } from '@hooks/election-schedule-management/main-list/region/useRegionListSelect';

const SYSTEM_USER = FORM_FIELDS.USER_MANAGEMENT.CREATE_SYSTEM_USER;

export const ZillaElectionOfficer = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const { regions, getRegionListSelect } = useRegionListSelect();
  const { zillas, getZilla } = useZillas();

  const regionWatch = watch(SYSTEM_USER.ZILLA_ELECTION_OFFICER.REGION);

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

  return (
    <div>
      <div className="border mb-9"></div>
      <FormSelect
        title={t('ELECTION_USER.DISTRICT_ELECTION_OFFICER.DEPARTMENT')}
        name={SYSTEM_USER.ZILLA_ELECTION_OFFICER.REGION}
        options={regions}
        isSearchable
      />

      <FormSelect
        title={t('ELECTION_USER.DISTRICT_ELECTION_OFFICER.DISTRICT')}
        name={SYSTEM_USER.ZILLA_ELECTION_OFFICER.ZILLA}
        disabled={!regionWatch}
        options={zillas}
        isSearchable
      />
    </div>
  );
};
