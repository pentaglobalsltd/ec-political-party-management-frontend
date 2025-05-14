import { IconInfoCircle } from '@pentabd/icons';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const CandidateTypeTooltipTitle = () => {
  const { t } = useTranslation();
  return (
    <>
      <div
        className="d-flex gap-4"
        data-tooltip-id="my-tooltip"
        data-tooltip-html="ভোটকেন্দ্রের গ্যাজেট ডাউনলোড করতে, 'প্রার্থীর ধরণ' ড্রপডাউন<br>থেকে যেকোনো একজন প্রার্থী নির্বাচন করতে হবে।"
      >
        {t('SEARCH.CANDIDATE_TYPE')}
        <IconInfoCircle size="20" fill="primary" />
      </div>
      <Tooltip id="my-tooltip" />
    </>
  );
};

export default CandidateTypeTooltipTitle;
