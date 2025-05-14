import Input from '@components/inputs/Input';
import { FORM_FIELDS } from '@constants/forms';
import { useTranslation } from 'react-i18next';

const POLLING_PERSONNEL_LETTER_SEARCH =
  FORM_FIELDS.POLLING_PERSONNEL_LETTER_SEARCH;

export const UpazilaElection = () => {
  const { t } = useTranslation();
  return (
    <div className="d-grid grid-cols-1 grid-cols-lg-12 gap-6 align-items-end">
      <div className="col-span-1 col-span-lg-3">
        <Input
          registerName={POLLING_PERSONNEL_LETTER_SEARCH.NAME}
          title={t('SEARCH.NAME')}
          required
        />
      </div>
      <div className="col-span-1 col-span-lg-3">
        <Input
          registerName={POLLING_PERSONNEL_LETTER_SEARCH.DESIGNATION}
          title={t('SEARCH.DESIGNATION')}
          required
        />
      </div>
    </div>
  );
};
