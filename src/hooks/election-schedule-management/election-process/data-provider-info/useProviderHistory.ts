import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { getProviderHistry } from '../../../../api/election-schedule-management/election-process/data-provider-info/getProviderHistry';
import { mapDataProviderData } from '../../../../components/SendToAppButton/helper/mapDataProviderData';

interface useProviderHistoryTypes {
  success: boolean;
  loading: boolean;
  error: boolean;
  alreadyPublished: boolean;
  lastUpdatedDate: string | null;
  lastUpdatedStatus: string | null;
  fullData: any;
  historyList: any;
  getProviderHistoryData: (
    endPoint: string,
    scheduleId: string | number,
    regionId?: string | number,
  ) => void;
}

const useProviderHistory = (): useProviderHistoryTypes => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [alreadyPublished, setAlreadyPublished] = useState<boolean>(false);
  const [lastUpdatedDate, setLastUpdatedDate] = useState<string | null>(null);
  const [lastUpdatedStatus, setLastUpdatedStatus] = useState<string | null>(
    null,
  );
  const [historyList, setHistroyList] = useState<any>([]);
  const [fullData, setFullData] = useState<any>([]);
  const { t } = useTranslation();

  const getProviderHistoryData = async (
    endPoint: string,
    scheduleId: string | number,
    regionId?: string | number,
  ) => {
    const page = 0;
    const size = 0;
    setLoading(true);
    setSuccess(false);
    setError(false);
    try {
      const response = await getProviderHistry({
        scheduleId,
        regionId,
        endPoint,
        page,
        size,
      });
      if (response?.data?.status === 200) {
        setFullData(response?.data?.data);
        const { dataExists, modifiedUpdatedDate, status, providerHistoryList } =
          mapDataProviderData(endPoint, response?.data?.data);
        setAlreadyPublished(dataExists);
        setLastUpdatedStatus(status);
        setHistroyList(providerHistoryList);

        if (modifiedUpdatedDate) {
          setLastUpdatedDate(modifiedUpdatedDate);
        } else {
          setLastUpdatedDate(null);
        }

        setLoading(false);
        setSuccess(true);
      } else {
        setLoading(false);
        setSuccess(false);
        setError(true);
        setAlreadyPublished(false);
        setLastUpdatedStatus(null);
        setLastUpdatedDate(null);
        toast.error(t('TOAST_MESSAGE.DATA_PROVIDER_ERROR'));
      }
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      setError(true);
      setAlreadyPublished(false);
      setLastUpdatedStatus(null);
      setLastUpdatedDate(null);
      toast.error(t('TOAST_MESSAGE.DATA_PROVIDER_ERROR'));
    }
  };

  return {
    success,
    error,
    loading,
    alreadyPublished,
    lastUpdatedStatus,
    historyList,
    fullData,
    lastUpdatedDate,
    getProviderHistoryData,
  };
};

export default useProviderHistory;
