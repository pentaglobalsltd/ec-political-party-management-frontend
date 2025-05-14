import dayjs from 'dayjs';
import { BANGLA_LABEL } from '@constants/bangla-label';
import { NominationType } from '@type/candidate-info-management/nomination-list-type';
import { getDigitBanglaFromEnglish } from '@utils';

export const mappingCandidateElectionFullDetailsDataFn = ({
  data,
  page,
}: {
  page: number;
  data: NominationType[];
}) => {
  const result = data?.map((item: NominationType, index: number) => {
    return {
      ...item,

      serialNo: getDigitBanglaFromEnglish(item?.serialNo) ?? '',

      idx: getDigitBanglaFromEnglish(page * 10 + index + 1),
      nidNumber: item.nid,
      voterNumber: getDigitBanglaFromEnglish(item.voterNo),
      phoneNumber: getDigitBanglaFromEnglish(item.phone),
      chalanNumber: getDigitBanglaFromEnglish(item.chalanNo),

      candidateNameWithNid: `${item?.candidateName ?? ''} ${
        getDigitBanglaFromEnglish(item?.voterNo) ?? ''
      } ${getDigitBanglaFromEnglish(item?.nid) ?? ''}`,

      candidateNameWithVoterNo: `${item?.candidateName ?? ''} ${
        getDigitBanglaFromEnglish(item?.voterNo) ?? ''
      }`,

      candidateNameFormSerialNo: `${item?.candidateName ?? ''} ${
        item?.formSerialNo ?? ''
      }`,

      proposerNameWithNid: `${item?.proposerName ?? ''} ${
        getDigitBanglaFromEnglish(item?.proposerVoterNo) ?? ''
      } ${getDigitBanglaFromEnglish(item?.proposerNid) ?? ''}`,

      supporterNameWithNid: `${item?.supporterName ?? ''} ${
        getDigitBanglaFromEnglish(item?.supporterVoterNo) ?? ''
      } ${getDigitBanglaFromEnglish(item?.supporterNid) ?? ''}`,

      telephone: item?.telephone ?? '',

      lastUpdatedDate: getDigitBanglaFromEnglish(
        dayjs(item?.lastUpdatedDate?.split('.')?.[0]).format(
          'YYYY-MM-DD HH:mm',
        ),
      ),

      nominationPercentageForDownload:
        getDigitBanglaFromEnglish(item?.nominationPercentage) ??
        getDigitBanglaFromEnglish(0),

      personalInfoPercentageForDownload:
        getDigitBanglaFromEnglish(item?.personalInfoPercentage) ??
        getDigitBanglaFromEnglish(0),

      holofnamaPercentageForDownload:
        getDigitBanglaFromEnglish(item?.holofnamaPercentage) ??
        getDigitBanglaFromEnglish(0),

      attachmentExistsForDownload: item?.attachmentExists
        ? BANGLA_LABEL.EXISTS
        : BANGLA_LABEL.NOT_EXISTS,
      isVerifiedForDownload: item?.isVerified
        ? BANGLA_LABEL.EXISTS
        : BANGLA_LABEL.NOT_EXISTS,
      isSelectedForDownload: item?.isSelected
        ? BANGLA_LABEL.EXISTS
        : BANGLA_LABEL.NOT_EXISTS,
      symbolIdForDownload: item?.symbolId
        ? BANGLA_LABEL.EXISTS
        : BANGLA_LABEL.NOT_EXISTS,
      isCandidateAgeCorrectForDownload: item?.isCandidateAgeCorrect
        ? BANGLA_LABEL.YES
        : BANGLA_LABEL.NO,
      candidateVoterNoCorrectForDownload: item?.candidateVoterNoCorrect
        ? BANGLA_LABEL.YES
        : BANGLA_LABEL.NO,
      proposerVoterNoCorrectForDownload: item?.proposerVoterNoCorrect
        ? BANGLA_LABEL.YES
        : BANGLA_LABEL.NO,
      supporterVoterNoCorrectForDownload: item?.supporterVoterNoCorrect
        ? BANGLA_LABEL.YES
        : BANGLA_LABEL.NO,

      jamanatAmount: getDigitBanglaFromEnglish(item?.jamanatAmount),

      chalanDate: getDigitBanglaFromEnglish(
        dayjs(item?.chalanDate?.split('.')?.[0]).format('YYYY-MM-DD HH:mm'),
      ),
    };
  });

  return result;
};
