import { useState } from 'react';

import { fetchMessageSendingList } from '@api/result-management/electoral-process/message-sending-list/get-message-sending-list';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import {
  MessageSendingListParams,
  MessageSendingType,
} from '@type/result-management/electoral-process/message-sending-list/message-sending-list-type';
import { removeTimeInDate } from '@utils/date-converter';
import { getDigitBanglaFromEnglish } from '@utils';

function mapMessageSendingList(data: any, lang: string | null) {
  const upazilaName =
    lang === LANGUAGE.BANGLA ? data?.upazilaNameBn : data?.upazilaNameEn;

  return {
    ...data,
    sheetSerial: getDigitBanglaFromEnglish(data?.sheetSerial),
    zillaName: lang === LANGUAGE.BANGLA ? data?.zillaNameBn : data?.zillaNameEn,
    upazilaName: upazilaName ? upazilaName : ' ',
    candidateTypeName:
      lang === LANGUAGE.BANGLA
        ? data?.candidateTypeNameBn
        : data?.candidateTypeNameEn,
    generatedAt: removeTimeInDate({ dateFormat: data?.generatedAt }),
    publishedAt: removeTimeInDate({ dateFormat: data?.publishedAt }),
    includeCentersNumber: getDigitBanglaFromEnglish(
      data?.bartaSheetPollingCenterResults?.length,
    ),
  };
}

export const useGetMessageSendingList = () => {
  const [messageSendingList, setMessageSendingList] = useState<
    MessageSendingType[]
  >([]);

  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getMessageSendingList = async ({
    page = 0,
    size = 10,
    scheduleId,
    electionSettingsId,

    sheetStatus,
  }: MessageSendingListParams) => {
    try {
      setLoading(true);
      const response = await fetchMessageSendingList({
        page,
        size,
        scheduleId,
        electionSettingsId,
        sheetStatus,
      });
      if (response?.data?.status === 200) {
        const messageSendingListResponse = response?.data?.data?.bartaSheets;
        const __response: any = messageSendingListResponse?.map((item: any) => {
          return mapMessageSendingList(item, language);
        });
        setMessageSendingList(__response);
        setActivePage(
          (response?.data?.data?.page && response?.data?.data?.page + 1) || 1,
        );
        if (response?.data?.data?.total) {
          setTotalPage(Math.ceil(response?.data?.data?.total / size));
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    activePage,
    totalPage,
    loading,
    messageSendingList,
    getMessageSendingList,
  };
};
