import { useState } from 'react';
import {
  ResultObservationProps,
  fetchResultObservation,
} from '@api/result-management/results-monitoring/monitoring-overall-results/result-observation';
import { useTranslation } from 'react-i18next';
import { ResultObservationModifiedTypes } from '@type/result-management/result-monitoring/monitoring-overall-result-types';
import {
  mapAROResultSummary,
  mapROResultSummary,
  mapResultObservationSummary,
} from './helpers';

interface UseResultObservation {
  loading: boolean;
  getResultObservation: (data: ResultObservationProps) => void;
  resultObservationSummary: ResultObservationModifiedTypes[];
  aroResultObservationSummary: ResultObservationModifiedTypes[];
  roResultObservationSummary: ResultObservationModifiedTypes[];
  isFailed: boolean;
}

export const useResultObservation = (): UseResultObservation => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [isFailed, setFailed] = useState<boolean>(false);
  const [resultObservationSummary, setResultObservationSummary] = useState<
    ResultObservationModifiedTypes[]
  >([]);
  const [aroResultObservationSummary, setAROResultObservationSummary] =
    useState<ResultObservationModifiedTypes[]>([]);
  const [roResultObservationSummary, setROResultObservationSummary] = useState<
    ResultObservationModifiedTypes[]
  >([]);

  const getResultObservation = async ({
    electionTypeId,
    electionScheduleId,
    zillaId,
    constituencyId,
    municipalityId,
    upazilaId,
    unionOrWardId,
  }: ResultObservationProps) => {
    try {
      setFailed(false);
      setLoading(true);
      const response = await fetchResultObservation({
        electionScheduleId,
        zillaId,
        constituencyId,
        municipalityId,
        upazilaId,
        unionOrWardId,
      });

      if (response?.data?.status === 200) {
        setResultObservationSummary(
          mapResultObservationSummary(t, response?.data?.data),
        );
        setAROResultObservationSummary(
          mapAROResultSummary(t, response?.data?.data),
        );
        setROResultObservationSummary(
          mapROResultSummary({
            t,
            electionTypeId: Number(electionTypeId),
            data: response?.data?.data,
          }),
        );
        setLoading(false);
        setFailed(false);
      } else {
        setLoading(false);
        setFailed(true);
      }
    } catch (error: any) {
      console.log(error);
      setResultObservationSummary([]);
      setAROResultObservationSummary([]);
      setROResultObservationSummary([]);
      setLoading(false);
      setFailed(true);
    }
  };

  return {
    loading,
    getResultObservation,
    resultObservationSummary,
    aroResultObservationSummary,
    roResultObservationSummary,
    isFailed,
  };
};
