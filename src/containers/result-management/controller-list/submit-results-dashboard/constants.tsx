import { IconHomeLine } from '@pentabd/icons';
import { TFunction } from 'i18next';

export const submitResultsDashboardTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('SUBMIT_RESULTS.DASHBOARD'),
  },
];

export const totalVoteCenterOptions = [
  {
    id: 1,
    label: 'চেয়ারম্যান',
    center: 21,
  },
  {
    id: 2,
    label: 'ভাইস চেয়ারম্যান',
    center: 21,
  },
  {
    id: 3,
    label: 'মহিলা ভাইস চেয়ারম্যান',
    center: 21,
  },
];
export const centersOptions = [
  {
    id: 1,
    name: 'হাজারবিঘা উচ্চ বিদ্যালয় - ১ (সংসদ সদস্য)',
    total: 21,
    male: 23,
    female: 60,
    thirdGender: 10,
    status: 'RETURNED',
  },
  {
    id: 2,
    label: 'হাজারবিঘা উচ্চ বিদ্যালয় - ১ (সংসদ সদস্য)',

    total: 21,
    male: 23,
    female: 60,
    thirdGender: 10,
    status: 'RETURNED',
  },
  {
    id: 3,
    label: 'হাজারবিঘা উচ্চ বিদ্যালয় - ১ (সংসদ সদস্য)',
    total: 21,
    male: 23,
    female: 60,
    thirdGender: 10,
    status: 'FINAL',
  },
  {
    id: 5,
    label: 'হাজারবিঘা উচ্চ বিদ্যালয় - ১ (সংসদ সদস্য)',
    total: 21,
    male: 23,
    female: 60,
    thirdGender: 10,
    status: 'SUSPENDED',
  },
];

export const CENTER_NUMBER_STATUS = {
  TOTAL: {
    nameEn: 'total_center',
    nameBn: 'মোট কেন্দ্র',
  },
  SUSPENDED: {
    nameEn: 'center_suspended',
    nameBn: 'কেন্দ্র স্থগিত',
  },
  SUBMITTED: {
    nameEn: 'submitted',
    nameBn: 'দাখিল করা হয়েছে',
  },
  NOT_SUBMITTED: {
    nameEn: 'not_submitted',
    nameBn: 'পাঠানো হয়নি',
  },
};
