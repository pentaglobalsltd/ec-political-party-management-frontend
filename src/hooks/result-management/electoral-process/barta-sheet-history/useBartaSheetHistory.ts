import { useState } from 'react';
import { fetchBartaSheetHistory } from '@api/result-management/electoral-process/barta-sheet-history/barta-sheet-history';
import { BartaSheetHistoryListTypes } from '@type/result-management/electoral-process/message-sending-list/barta-sheet-history-list-types';

interface BartaSheetHistoryProps {
  scheduleId: string | number;
  bartaSheetId: string | number;
  page?: string | number;
  size?: number;
}

interface Props {
  isBartaSheetHistoryLoading: boolean;
  bartaSheetHistoryList: BartaSheetHistoryListTypes[];
  getBartaSheetHistoryListData: ({
    scheduleId,
    bartaSheetId,
    page,
    size,
  }: BartaSheetHistoryProps) => void;
  activePage: number;
  totalPage: number;
  countSerial: number;
}

export const useBartaSheetHistory = (): Props => {
  const [bartaSheetHistoryList, setBartaSheetHistoryList] = useState<
    BartaSheetHistoryListTypes[]
  >([]);
  const [isBartaSheetHistoryLoading, setIsBartaSheetHistoryLoading] =
    useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [countSerial, setCountSerial] = useState(0);

  const getBartaSheetHistoryListData = async ({
    scheduleId,
    bartaSheetId,
    page,
    size = 10,
  }: BartaSheetHistoryProps) => {
    try {
      setIsBartaSheetHistoryLoading(true);

      const response = await fetchBartaSheetHistory({
        scheduleId,
        bartaSheetId,
        page,
        size,
      });
      if (response?.data?.status === 200) {
        setBartaSheetHistoryList(
          response?.data?.data?.bartaSheets?.map(
            (item: { id: any }, index: number) => ({
              idx: item?.id,
              serialNo: countSerial + index + 1,
              ...item,
            }),
          ) || [],
        );
        setIsBartaSheetHistoryLoading(false);
        setActivePage(
          (response?.data?.data?.page && response?.data?.data?.page + 1) || 1,
        );
        if (response?.data?.data?.total) {
          setTotalPage(Math.ceil(response?.data?.data?.total / size));
        }
        if (
          response?.data?.data?.size &&
          (response?.data?.data?.page as number) >= 0
        )
          setCountSerial(
            (response?.data?.data?.page as number) * response?.data?.data?.size,
          );
      } else {
        setIsBartaSheetHistoryLoading(false);
      }
    } catch {
      setIsBartaSheetHistoryLoading(false);
    }
  };

  return {
    isBartaSheetHistoryLoading,
    bartaSheetHistoryList,
    getBartaSheetHistoryListData,
    activePage,
    totalPage,
    countSerial,
  };
};
