import { useTranslation } from 'react-i18next';

import { Text } from '@pentabd/ui';
import { CenterSummary } from '@type/center-officer-management/polling-center/polling center-summary';
import { getDigitBanglaFromEnglish } from '@utils';
interface Props {
  centerSummary: CenterSummary;
}
const OfficerAllocationSummary = ({ centerSummary }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="bg-extra-light p-12 mb-16 rounded-5">
      <Text
        component="p"
        sizeType="fs"
        size="md"
        weight="semibold"
        className="mb-12"
      >
        {t('CENTER_BASED_OFFICER_ALLOCATION.CENTER_NAME')}
        {centerSummary?.instituteName}
      </Text>

      <div className="d-grid grid-cols-lg-10 grid-cols-1 gap-8">
        <div className="col-span-lg-2 col-span-1 bg-white p-12 rounded-5 shadow-md ">
          <Text
            component="p"
            sizeType="fs"
            size="sm"
            weight="medium"
            color="subtitle1"
            className="mb-10"
          >
            {t('CENTER_BASED_OFFICER_ALLOCATION.TOTAL_BOOTH')}
          </Text>
          <Text>{getDigitBanglaFromEnglish(centerSummary?.totalBooth)}</Text>
        </div>
        <div className="col-span-lg-2 col-span-1 bg-white p-12 rounded-5 shadow-md ">
          <Text
            component="p"
            sizeType="fs"
            size="sm"
            weight="medium"
            color="subtitle1"
            className="mb-10"
          >
            {t('CENTER_BASED_OFFICER_ALLOCATION.PRESIDING_OFFICER')}
          </Text>
          {centerSummary?.presidingOfficerMaxNumber && (
            <Text>
              {getDigitBanglaFromEnglish(
                centerSummary?.presidingOfficerAssignedNumber,
              )}
              /
              {getDigitBanglaFromEnglish(
                centerSummary?.presidingOfficerMaxNumber,
              )}
            </Text>
          )}
        </div>
        <div className="col-span-lg-2 col-span-1 bg-white p-12 rounded-5 shadow-md ">
          <Text
            component="p"
            sizeType="fs"
            size="sm"
            weight="medium"
            color="subtitle1"
            className="mb-10"
          >
            {t('CENTER_BASED_OFFICER_ALLOCATION.ASSISTANT_PRESIDING_OFFICER')}
          </Text>
          {centerSummary?.assistantPresidingOfficerMaxNumber && (
            <Text>
              {getDigitBanglaFromEnglish(
                centerSummary?.assistantPresidingOfficerAssignedNumber,
              )}
              /
              {getDigitBanglaFromEnglish(
                centerSummary?.assistantPresidingOfficerMaxNumber,
              )}
            </Text>
          )}
        </div>
        <div className="col-span-lg-2 col-span-1 bg-white p-12 rounded-5 shadow-md ">
          <Text
            component="p"
            sizeType="fs"
            size="sm"
            weight="medium"
            color="subtitle1"
            className="mb-10"
          >
            {t('CENTER_BASED_OFFICER_ALLOCATION.POLLING_OFFICER')}
          </Text>
          {centerSummary?.pollingOfficerMaxNumber && (
            <Text>
              {getDigitBanglaFromEnglish(
                centerSummary?.pollingOfficerAssignedNumber,
              )}
              /
              {getDigitBanglaFromEnglish(
                centerSummary?.pollingOfficerMaxNumber,
              )}
            </Text>
          )}
        </div>
        <div className="col-span-lg-2 col-span-1 bg-white p-12 rounded-5 shadow-md ">
          <Text
            component="p"
            sizeType="fs"
            size="sm"
            weight="medium"
            color="subtitle1"
            className="mb-10"
          >
            {t('CENTER_BASED_OFFICER_ALLOCATION.ACTING_PRESIDING_OFFICER')}
          </Text>
          {centerSummary?.inchargePresidingOfficerMaxNumber && (
            <Text>
              {getDigitBanglaFromEnglish(
                centerSummary?.inchargePresidingOfficerAssignedNumber,
              )}
              /
              {getDigitBanglaFromEnglish(
                centerSummary?.inchargePresidingOfficerMaxNumber,
              )}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficerAllocationSummary;
