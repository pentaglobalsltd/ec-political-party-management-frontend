import { Badge } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';

function State({ data }: { data: any }) {
  const { t } = useTranslation();

  return (
    <div className="d-flex">
      {data === true ? (
        <Badge
          className="text-nowrap"
          size="sm"
          label={t('SCHEDULE_DECLARATION.ACTIVE') as string}
          type="success"
        />
      ) : (
        <Badge
          className="text-nowrap"
          size="sm"
          label={
            t(
              'SCHEDULE_DECLARATION.SCHEDULE_INFORMATION_FORM.ONLINE_NOMINATION_OPTIONS.INACTIVE',
            ) as string
          }
          type="warning"
        />
      )}
    </div>
  );
}

export default State;
