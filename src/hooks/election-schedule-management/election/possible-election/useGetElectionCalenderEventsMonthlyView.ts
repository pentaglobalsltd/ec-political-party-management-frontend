import { useState } from 'react';
import { fetchElectionCalenderEvents } from '@api/election-schedule-management/election/possible-election/election-calender-events';
import {
  ElectionCalenderEvent,
  ElectionCalenderParams,
} from '@type/election-declaration-management/election/possible-election/possible-election';

export interface MonthlyEventsType {
  id?: number;
  label?: string;
  date?: string;
}

function mapEvents(data?: ElectionCalenderEvent, index?: number) {
  return {
    id: index,
    label: data?.eventName,
    date: data?.eventDate,
  };
}

export const useGetElectionCalenderEventsMonthlyView = () => {
  const [monthlyEvents, setMonthlyEvents] = useState<MonthlyEventsType[]>([]);

  const [monthlyEventsLoading, setMonthlyEventsLoading] = useState(false);

  const getElectionCalenderMonthlyEvents = async ({
    electionTypeId,
    candidateTypeId,
    regionId,
    zillaId,
    upazilaId,
    unionOrWardId,
    year,
    month,
  }: ElectionCalenderParams) => {
    try {
      setMonthlyEventsLoading(true);
      const response = await fetchElectionCalenderEvents({
        electionTypeId,
        candidateTypeId,
        unionOrWardId,
        upazilaId,
        zillaId,
        regionId,
        year,
        month,
      });

      if (response?.data?.status === 200) {
        const events = response?.data?.data?.events || [];

        setMonthlyEvents(events.map(mapEvents));

        setMonthlyEventsLoading(false);
      }
    } catch (error) {
      setMonthlyEventsLoading(false);
    }
  };

  return {
    monthlyEventsLoading,
    monthlyEvents,
    getElectionCalenderMonthlyEvents,
  };
};
