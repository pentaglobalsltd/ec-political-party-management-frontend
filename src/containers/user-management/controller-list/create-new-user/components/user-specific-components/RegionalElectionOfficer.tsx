import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FormSelect from '@components/inputs/FormSelect';
import { FORM_FIELDS } from '@constants/forms';
import { useRegionListSelect } from '@hooks/election-schedule-management/main-list/region/useRegionListSelect';

const SYSTEM_USER = FORM_FIELDS.USER_MANAGEMENT.CREATE_SYSTEM_USER;

export const RegionalElectionOfficer = () => {
  const { t } = useTranslation();
  const { regions, getRegionListSelect } = useRegionListSelect();

  // Regions
  useEffect(() => {
    getRegionListSelect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="border mb-9"></div>
      <FormSelect
        title={t('ELECTION_USER.DISTRICT_ELECTION_OFFICER.DEPARTMENT')}
        name={SYSTEM_USER.REGIONAL_ELECTION_OFFICER.REGION}
        options={regions}
        isSearchable
      />
    </div>
  );
};
