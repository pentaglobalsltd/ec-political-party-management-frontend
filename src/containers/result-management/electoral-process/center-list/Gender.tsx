import { Badge } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';

const VOTER_TYPE = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
};

function Gender({ data }: { data: any }) {
  const { t } = useTranslation();
  if (data === VOTER_TYPE.MALE) {
    return (
      <div className="d-flex">
        <Badge
          className="text-nowrap"
          size="sm"
          label={t('CENTER_LIST.MALE')}
          type="warning"
        />
      </div>
    );
  } else if (data === VOTER_TYPE.FEMALE) {
    return (
      <div className="d-flex">
        <Badge
          className="text-nowrap"
          size="sm"
          label={t('CENTER_LIST.FEMALE')}
          type="danger"
        />
      </div>
    );
  } else {
    return (
      <div className="d-flex">
        <Badge
          className="text-nowrap"
          size="sm"
          label={t('CENTER_LIST.BOTH')}
          type="info"
        />
      </div>
    );
  }
}

export default Gender;
