import { useState } from 'react';

import { GENERATED_BY } from '@containers/result-management/electoral-process/message-send-list/constants';
import {
  MESSAGE_SHEET,
  bartaSheetStatusLabel,
} from '@constants/polling-center-results';
import {
  MessageSendListFinalParams,
  fetchMessageSendListFinal,
} from '@api/result-management/results-monitoring/graphical-observation/graphical-observation';
import {
  useLanguage,
  LANGUAGE,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { MessageSendType } from '@type/result-management/electoral-process/message-send-list/message-send-list-type';
import { getDigitBanglaFromEnglish } from '@utils';

const mapResponseItems = (data: any, lang: string | null) => {
  return {
    ...data,
    candidateTypeName:
      lang === LANGUAGE.BANGLA
        ? data?.candidateTypeNameBn
        : data?.candidateTypeNameEn,
    zillaName: lang === LANGUAGE.BANGLA ? data?.zillaNameBn : data?.zillaNameEn,
    constituencyName:
      lang === LANGUAGE.BANGLA
        ? data?.constituencyNameBn
        : data?.constituencyNameEn,
    municipalityName:
      lang === LANGUAGE.BANGLA
        ? data?.municipalityNameBn
        : data?.municipalityNameEn,
    unionOrWardName:
      lang === LANGUAGE.BANGLA
        ? data?.unionOrWardNameBn
        : data?.unionOrWardNameEn,
    upazilaName:
      lang === LANGUAGE.BANGLA ? data?.upazilaNameBn : data?.upazilaNameEn,
    bartaSheetPollingCenterResultsLength:
      data?.bartaSheetPollingCenterResults?.length,
    fileByARO: Object.keys(data?.file > 0) ? true : false,
    fileByAROforTableDownload:
      Object.keys(data?.file > 0) && data?.generatedBy === GENERATED_BY.ARO
        ? `${MESSAGE_SHEET} - ${getDigitBanglaFromEnglish(data?.sheetSerial)}`
        : '',
    finalFileByRO: Object.keys(data?.finalFile > 0) ? true : false,
    finalFileByROforTableDownload:
      Object.keys(data?.finalFile > 0) && data?.generatedBy === GENERATED_BY.RO
        ? `${MESSAGE_SHEET} - ${getDigitBanglaFromEnglish(data?.sheetSerial)}`
        : '',
    totalCenterCount: getDigitBanglaFromEnglish(data?.totalCenterCount),
    statusForDownload: bartaSheetStatusLabel(data?.sheetStatus),
  };
};

export const useGetMessageSendFinalList = () => {
  const { language } = useLanguage();
  const [messageList, setMessageList] = useState<MessageSendType[]>([]);

  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getMessageSendListFinal = async ({
    page = 0,
    size = 10,
    electionScheduleId,
    candidateTypeId,
    zillaId,
    municipalityId,
    upazilaId,
    unionOrWardId,
  }: MessageSendListFinalParams) => {
    try {
      setLoading(true);
      const response = await fetchMessageSendListFinal({
        page: page.toString(),
        size,
        electionScheduleId,
        candidateTypeId,
        zillaId,
        municipalityId,
        upazilaId,
        unionOrWardId,
      });

      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.bartaSheets?.map((item: any) => {
            return mapResponseItems(item, language);
          }) || [];
        setMessageList(dataArray);
        setActivePage(
          (response?.data?.data?.page && response?.data?.data?.page + 1) || 1,
        );
        if (response?.data?.data?.total) {
          setTotalPage(Math.ceil(response?.data?.data?.total / size));
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return {
    activePage,
    totalPage,
    loading,
    messageList,
    getMessageSendListFinal,
  };
};
