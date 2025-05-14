import { Text } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import NoData from './NoData';

const NoDataFoundCard = () => {
  const { t } = useTranslation();
  return (
    <div className="container-width rounded-5 pie-chart w-100 me-6">
      <div className="d-grid grid-cols-2 gap-6 w-100">
        <div className="bg-primary-lightest border border-primary p-10 rounded-5 w-100">
          <div className="mb-10 text-center">
            <Text size="md" weight="bold" sizeType="display">
              {t('GRAPHICAL_OBSERVATION.CANDIDATE_VOTE_RATIO')}
            </Text>
          </div>
          <NoData />
        </div>

        <div className="bg-primary-lightest border border-primary p-10 rounded-5 w-100">
          <div className="mb-10 text-center">
            <Text size="md" weight="bold" sizeType="display">
              {t('GRAPHICAL_OBSERVATION.CANDIDATE_VOTE_COUNT')}
            </Text>
          </div>
          <NoData isPie={false} />
        </div>

        <div className="bg-primary-lightest border border-primary p-10 rounded-5 w-100">
          <div className="mb-10 text-center">
            <Text size="md" weight="bold" sizeType="display">
              {t('GRAPHICAL_OBSERVATION.RATIO_OF_VOTES')}
            </Text>
          </div>
          <NoData />
        </div>

        <div className="bg-primary-lightest border border-primary p-10 rounded-5 w-100">
          <div className="mb-10 text-center">
            <Text size="md" weight="bold" sizeType="display">
              {t('GRAPHICAL_OBSERVATION.MESSAGE_SHEET_STATUS_RATION')}
            </Text>
          </div>
          <NoData />
        </div>
      </div>
    </div>
  );
};

export default NoDataFoundCard;
