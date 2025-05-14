import { useTranslation } from 'react-i18next';

import { Table, Text } from '@pentabd/ui';

import { latestResultsObtainedTableColumns } from '../../constants/constants';
import { getDigitBanglaFromEnglish } from '@utils';
import {
  BartaSheetCandidateVoteCountsType,
  LatestResultsType,
} from '@type/result-management/result-monitoring/latest-results-obtained/latest-results-obtained-types';
import classNames from 'classnames';

interface Props {
  latestResults?: LatestResultsType;
  isLoading?: boolean;
  rows?: BartaSheetCandidateVoteCountsType[];
  isActiveFullScreen: boolean;
}

const TableComponent = ({
  latestResults,
  isLoading,
  rows,
  isActiveFullScreen,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div
      className={classNames('px-20 mx-20', {
        'vh-100 w-100 d-flex align-items-center justify-content-center':
          isActiveFullScreen,
      })}
    >
      <div
        className={classNames({
          'w-75': isActiveFullScreen,
          'w-100': !isActiveFullScreen,
        })}
      >
        <Table
          tableType="primary"
          headerExtension={{
            leftComponents: [
              <div
                key={1}
                className="d-flex flex-column justify-content-start gap-4"
              >
                <Text
                  className="d-flex justify-content-center"
                  size="xl"
                  weight="bold"
                >
                  {latestResults?.candidateTypeNameBn}
                </Text>
                <Text size="md">
                  {t('LATEST_RESULTS_OBTAINED.TOTAL_CENTER_AMOUNT')}:{' '}
                  {getDigitBanglaFromEnglish(
                    latestResults?.totalCenterCount?.toLocaleString('bn-BD'),
                  )}
                </Text>
                <Text size="md">
                  {t('LATEST_RESULTS_OBTAINED.RESULTS_OBTAINED_CENTER_AMOUNT')}:{' '}
                  {getDigitBanglaFromEnglish(
                    latestResults?.totalResultApprovedCenterCount?.toLocaleString(
                      'bn-BD',
                    ),
                  )}
                </Text>
              </div>,
            ],
          }}
          rows={rows || []}
          columns={latestResultsObtainedTableColumns({
            t,
          })}
          loading={isLoading}
          loadingItemCount={4}
        />
      </div>
    </div>
  );
};

export default TableComponent;
