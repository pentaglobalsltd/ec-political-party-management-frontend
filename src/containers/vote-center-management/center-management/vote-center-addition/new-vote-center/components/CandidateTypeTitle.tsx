import { IconInfoCircle } from '@pentabd/icons';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const CandidateTypeTitle = () => {
  const { t } = useTranslation();
  return (
    <>
      <div
        className="d-flex gap-4"
        data-tooltip-id="my-tooltip"
        data-tooltip-html="
        ভোটকেন্দ্র সংযোজন করতে, 'প্রার্থীর ধরণ' ড্রপডাউন থেকে যে-কোনো একজন প্রার্থী সিলেক্ট করতে হবে।<br>উল্লেখ্যঃ চেয়ারম্যান বা মেয়র সিলেক্ট করে কেন্দ্র সংযোজন করা হলে পরবর্তীতে অন্য কোনো প্রার্থীর জন্য কেন্দ্র সংযোজন করতে হবে নাহ।<br>যেমনঃ ভাইস চেয়ারম্যান, মহিলা ভাইস চেয়ারম্যান, কাউন্সিলর ইত্যাদি।"
      >
        {t('SEARCH.CANDIDATE_TYPE')}
        <IconInfoCircle size="20" fill="primary" />
      </div>
      <Tooltip id="my-tooltip" />
    </>
  );
};

export default CandidateTypeTitle;
