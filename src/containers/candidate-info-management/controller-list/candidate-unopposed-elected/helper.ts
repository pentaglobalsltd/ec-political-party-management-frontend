import { UNOPPOSED_ELECTED_CODES } from '@constants/nomination-status-codes';

/* 
    nominationStatusCode
    5 / 9 / 12  -> বিনা প্রতিদ্বন্দ্বিতায় নির্বাচন করুন
    17 -> মুছে ফেলুন
*/
export const isUnopposedElect = (nominationStatusCode: number | undefined) => {
  if (
    nominationStatusCode === UNOPPOSED_ELECTED_CODES.ACCEPT ||
    nominationStatusCode === UNOPPOSED_ELECTED_CODES.APPEAL_APPROVED ||
    nominationStatusCode === UNOPPOSED_ELECTED_CODES.SELECTION_CANCELLED
  )
    return true;
  else if (nominationStatusCode === UNOPPOSED_ELECTED_CODES.DELETE)
    return false;
  else return true;
};
