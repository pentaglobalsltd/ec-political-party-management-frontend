import { useState } from 'react';
import dayjs from 'dayjs';
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

export interface YearlyEventsType {
  [key: number]: {
    [key: string]: {
      date: number;
      title: string;
      type: number;
      eventDetails?: any;
      eventName?: string;
    }[];
  };
}

export const useGetElectionCalenderEventsYearlyView = () => {
  const [yearlyEvents, setYearlyEvents] = useState();
  const [yearlyEventsLoading, setYearlyEventsLoading] = useState(false);

  const getElectionCalenderYearlyEvents = async ({
    electionTypeId,
    candidateTypeId,
    regionId,
    zillaId,
    upazilaId,
    unionOrWardId,
    year,
  }: ElectionCalenderParams) => {
    try {
      setYearlyEventsLoading(true);
      const response = await fetchElectionCalenderEvents({
        electionTypeId,
        candidateTypeId,
        unionOrWardId,
        upazilaId,
        zillaId,
        regionId,
        year,
      });

      if (response?.data?.status === 200) {
        const events = response?.data?.data?.events || [];

        const updatedYears: any = {};

        events
          .sort((a: ElectionCalenderEvent, b: ElectionCalenderEvent) => {
            const first = a.eventDate ? new Date(a.eventDate).getTime() : 0;
            const second = b.eventDate ? new Date(b.eventDate).getTime() : 0;
            return first - second;
          })
          .forEach((event: any) => {
            const { eventDate, eventType, eventDetails, eventName } = event;

            if (eventDate && eventType) {
              const date = dayjs(eventDate);

              const year = date.year();
              const day = date.date();
              const month = date.format('MMMM').toLowerCase();
              if (!updatedYears[year]) {
                updatedYears[year] = {};
              }
              if (!updatedYears[year][month]) {
                updatedYears[year][month] = [];
              }
              updatedYears?.[year]?.[month]?.push({
                date: day,
                title: eventType,
                type: 1,
                eventName,
                eventDetails,
              });
            }
          });

        setYearlyEvents(updatedYears);

        setYearlyEventsLoading(false);
      }
    } catch (error) {
      setYearlyEventsLoading(false);
    }
  };

  return {
    yearlyEventsLoading,
    yearlyEvents,
    getElectionCalenderYearlyEvents,
  };
};
