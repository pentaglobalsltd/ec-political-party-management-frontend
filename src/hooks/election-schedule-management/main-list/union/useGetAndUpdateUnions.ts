import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  fetchUnionOrWard,
  fetchUnionsOrWards,
  fetchUpdateUnionOrWard,
} from '@api/election-schedule-management/main-list/union/unions';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import {
  GetUnionOrWardsParamsData,
  GetUnionsOrWardsListPaginated,
  UnionOrWardType,
} from '@type/election-declaration-management/main-list/union/union-type';

export const useGetAndUpdateUnions = ({ size = 10 }: { size?: number }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [unionsOrWardsList, setUnionsOrWardsList] =
    useState<GetUnionsOrWardsListPaginated | null>(null);

  const [unionOrWard, setUnionOrWard] = useState<UnionOrWardType>();

  const { language } = useLanguage();
  const { t } = useTranslation();

  const getUnionsOrWards = (paramsData: GetUnionOrWardsParamsData) => {
    setLoading(true);
    const params = {
      UnionOrWardCode: paramsData?.UnionOrWardCode || '',
      upazilaId: paramsData?.upazilaId || '',
      regionId: paramsData?.regionId || '',
      nameEn:
        language === LANGUAGE.ENGLISH ? paramsData?.unionOrWardName || '' : '',
      nameBn:
        language === LANGUAGE.BANGLA ? paramsData?.unionOrWardName || '' : '',
      size,
      page: paramsData.page,
    };
    fetchUnionsOrWards(params)
      .then(({ data }) => {
        setSuccess(true);
        setError(null);
        setActivePage((data?.page && data?.page + 1) || 1);
        if (data?.total) {
          setTotalPage(Math.ceil(data?.total / size));
        }
        setUnionsOrWardsList(data);
      })
      .catch((error) => {
        setSuccess(false);
        setUnionsOrWardsList(null);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getUnionOrWard = (id: string | number) => {
    setLoading(true);
    fetchUnionOrWard(id)
      .then(({ data }) => {
        setSuccess(true);
        setError(null);
        setUnionOrWard(data);
      })
      .catch((error) => {
        setSuccess(false);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateUnionOrWard = async (id: string | number, data: any) => {
    setLoading(true);
    try {
      await fetchUpdateUnionOrWard(id, data).then((response) => {
        if (response?.data?.status === 200) {
          setLoading(false);
          setSuccess(true);
          setError(null);
          setUnionOrWard(data);
          toast.success(t('TOAST_MESSAGE.UPDATE_SUCCESS_MESSAGE'));
          navigate(-1);
        } else {
          setLoading(false);
          setSuccess(false);
          toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
        }
      });
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
    }
  };

  return {
    loading,
    error,
    success,
    totalPage,
    activePage,
    unionsOrWardsList,
    unionOrWard,
    getUnionsOrWards,
    getUnionOrWard,
    updateUnionOrWard,
  };
};
