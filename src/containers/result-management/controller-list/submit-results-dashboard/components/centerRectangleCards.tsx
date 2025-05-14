import { POLLING_CENTER_RESULT_STATUS } from '@constants/polling-center-results';
import { ROUTES } from '@constants/routes';
import { Text } from '@pentabd/ui';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CandidateTypeWisePollingCenterDetails } from '@type/result-management/electoral-process/submit-results/submitResults';
import { getDigitBanglaFromEnglish } from '@utils';

export const CenterRectangleCards = ({
  data,
  candidateTypeId,
}: {
  data?: CandidateTypeWisePollingCenterDetails;
  candidateTypeId?: string | number;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const unClickable =
    data?.status === POLLING_CENTER_RESULT_STATUS.CLOSED ||
    data?.status === POLLING_CENTER_RESULT_STATUS.REQUESTED_BY_RO;

  return (
    <div
      className={classNames(
        `p-12 border rounded shadow-xl col-span-3 ${data?.bgClassName}`,
        { pointer: !unClickable },
      )}
      onClick={() =>
        !unClickable
          ? navigate(
              ROUTES.SUBMIT_RESULTS_FROM_DASHBOARD(
                candidateTypeId,
                data?.pollingCenterId,
                data?.electionSettingsId,
              ),
            )
          : {}
      }
    >
      <Text weight="bold" color={data?.titleTextColor} size="md">
        {data?.label}
      </Text>
      <div className="pt-12 d-flex justify-content-between">
        <div>
          <div className="d-flex gap-5">
            <Text color={data?.subTextClassName}>
              {t('SUBMIT_RESULTS.TOTAL')}
            </Text>
            <Text color={data?.subTextClassName}>
              {data?.totalVoter
                ? getDigitBanglaFromEnglish(data?.totalVoter)
                : getDigitBanglaFromEnglish(0)}
            </Text>
          </div>
          <div className="d-flex gap-5">
            <Text color={data?.subTextClassName}>
              {t('SUBMIT_RESULTS.MALE')}
            </Text>
            <Text color={data?.subTextClassName}>
              {data?.maleVoter
                ? getDigitBanglaFromEnglish(data?.maleVoter)
                : getDigitBanglaFromEnglish(0)}
            </Text>
          </div>
        </div>
        <div>
          <div className="d-flex gap-5">
            <Text color={data?.subTextClassName}>
              {t('SUBMIT_RESULTS.FEMALE')}
            </Text>
            <Text color={data?.subTextClassName}>
              {data?.femaleVoter
                ? getDigitBanglaFromEnglish(data?.femaleVoter)
                : getDigitBanglaFromEnglish(0)}
            </Text>
          </div>
          <div className="d-flex gap-5">
            <Text color={data?.subTextClassName}>
              {t('SUBMIT_RESULTS.THIRD_GENDER')}
            </Text>
            <Text color={data?.subTextClassName}>
              {data?.thirdGenderVoter
                ? getDigitBanglaFromEnglish(data?.thirdGenderVoter)
                : getDigitBanglaFromEnglish(0)}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
