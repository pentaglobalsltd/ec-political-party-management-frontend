import { TFunction } from 'i18next';
import { FormProvider, useForm } from 'react-hook-form';

import { InputText, Text } from '@pentabd/ui';
import { IconChevronDown, IconHomeLine, IconSearch } from '@pentabd/icons';

import Select from '@components/inputs/Select';
import { EventFlow, ReviewSituation } from './components';
import { ElecitonSpecificTab } from './election-specific-tab';

export const LAST_ROW = 'সর্বমোট';

export const resultAndSituationReviewBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('RESULT_AND_SITUATION_REVIEW.RESULT_AND_SITUATION_REVIEW'),
  },
];

export const getTabData = (t: TFunction<'translation', undefined>) => [
  ...ElecitonSpecificTab(),

  {
    label: t('RESULT_AND_SITUATION_REVIEW.REVIEW_THE_SITUATION'),
    component: <ReviewSituation t={t} />,
  },
  {
    label: t('RESULT_AND_SITUATION_REVIEW.EVENT_FLOW'),
    component: <EventFlow t={t} />,
  },
];

export const getReviewSituationTableColumns = (
  t: TFunction<'translation', undefined>,
  openCenterModal: () => void,
) => [
  {
    id: 1,
    name: t('RESULT_AND_SITUATION_REVIEW.SERIAL'),
    key: 'serial',
  },
  {
    id: 2,
    name: t('RESULT_AND_SITUATION_REVIEW.EVENT_REPORT'),
    key: 'eventReport',
  },
  {
    id: 3,
    name: t('RESULT_AND_SITUATION_REVIEW.ANSWER_CENTER'),
    key: 'answerCenter',
    render: (data: any) => (
      <span className="pointer" onClick={openCenterModal}>
        <Text color="primary">{data}</Text>
      </span>
    ),
  },
  {
    id: 4,
    name: t('RESULT_AND_SITUATION_REVIEW.WAITING_CENTER_FOR_ANSWERS'),
    key: 'waitingAnswerCenter',
    render: (data: any) => (
      <span className="pointer" onClick={openCenterModal}>
        <Text color="primary">{data}</Text>
      </span>
    ),
  },
];

export const getVoterTurnoutTableColumns = (
  t: TFunction<'translation', undefined>,
  openCenterResultModal: () => void,
) => [
  {
    id: 1,
    name: t('RESULT_AND_SITUATION_REVIEW.SERIAL'),
    key: 'serial',
  },
  {
    id: 2,
    name: t('RESULT_AND_SITUATION_REVIEW.EVENT_REPORT'),
    key: 'eventReport',
  },
  {
    id: 3,
    name: t('RESULT_AND_SITUATION_REVIEW.ANSWER_CENTER'),
    key: 'answerCenter',
    render: (data: any) => (
      <span className="pointer" onClick={openCenterResultModal}>
        <Text color="primary">{data}</Text>
      </span>
    ),
  },
  {
    id: 4,
    name: t('RESULT_AND_SITUATION_REVIEW.SITUATION_RATE'),
    key: 'situationRate',
  },
];

export const getSpecialMessageTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('RESULT_AND_SITUATION_REVIEW.UNION'),
    key: 'union',
  },
  {
    id: 2,
    name: t('RESULT_AND_SITUATION_REVIEW.POLLING_STATION_NAME'),
    key: 'pollingStationName',
  },
  {
    id: 3,
    name: t('RESULT_AND_SITUATION_REVIEW.CENTER_NO'),
    key: 'centerNo',
  },
  {
    id: 4,
    name: t('RESULT_AND_SITUATION_REVIEW.SPECIAL_MESSAGE'),
    key: 'specialMessage',
  },
];

export const getPhotoOfElectionCenterTableColumns = (
  t: TFunction<'translation', undefined>,
  openPhotoModal: () => void,
) => [
  {
    id: 1,
    name: t('RESULT_AND_SITUATION_REVIEW.DISTRICT'),
    key: 'district',
  },
  {
    id: 2,
    name: t('RESULT_AND_SITUATION_REVIEW.UPAZILA'),
    key: 'upazila',
  },
  {
    id: 3,
    name: t('RESULT_AND_SITUATION_REVIEW.UNION'),
    key: 'union',
  },
  {
    id: 4,
    name: t('RESULT_AND_SITUATION_REVIEW.POLLING_STATION_NAME'),
    key: 'pollingStationName',
  },
  {
    id: 5,
    name: t('RESULT_AND_SITUATION_REVIEW.CENTER_NO'),
    key: 'centerNo',
  },
  {
    id: 6,
    name: t('RESULT_AND_SITUATION_REVIEW.NUMBER_OF_IMAGES_RECEIVED'),
    key: 'numberOfImagesReceived',
    render: (data: any) => (
      // TODO:: modal link
      <span onClick={() => openPhotoModal()} className="pointer">
        <Text color="info">{data}</Text>
      </span>
    ),
  },
];

export const getReviewSituationTableRows = () => [
  {
    id: 1,
    serial: 1,
    eventReport: 'সমস্ত নির্বাচনী সামগ্রী ভোটকেন্দ্রে পৌঁছেছে',
    answerCenter: 45,
    waitingAnswerCenter: 45,
  },
];

export const getVoterTurnoutTableRows = () => [
  {
    id: 1,
    serial: 1,
    eventReport: 'সকাল ১০:০০ টায় ভোটারের উপস্থিতি ',
    answerCenter: '17458 (আংশিক)',
    situationRate: 4.61,
  },
];

export const getPhotoOfElectionCenterTableRows = () => [
  {
    id: 1,
    district: 'বগুড়া',
    upazila: 'বগুড়া সদর',
    union: 'ওয়ার্ড নং - ০১',
    pollingStationName: 'মোস্তাফাবিয়া সরকারি বিদ্যালয়',
    centerNo: 3,
    numberOfImagesReceived: 45,
  },
];

export const getSpecialMessageTableRows = () => [
  {
    id: 1,
    union: 'ওয়ার্ড নং - ২০',
    pollingStationName: 'আদাবাড়ি গহের আলি উচ্চ বিদ্যালয়',
    centerNo: 77,
    specialMessage: 'স্বচ্ছ নির্বাচন',
  },
];

export const GetResolvedCaseTableHeader = (
  t: TFunction<'translation', undefined>,
) => {
  const methods = useForm();

  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return {
    leftComponents: [
      <div className="mb-8">
        <Text weight="bold" size="md" color="subtitle2">
          {t('RESULT_AND_SITUATION_REVIEW.RESOLVED_CASE')}
        </Text>
      </div>,
      <div style={{ width: '50%' }}>
        <InputText
          key={1}
          name="pre-input"
          outline
          placeholder="Search"
          prefix={<IconSearch size="20" />}
          size="sm"
          type="text"
          status="default"
        />
      </div>,
    ],
    rightComponents: [
      <div className="mb-8">
        <Text
          weight="bold"
          size="md"
          color="subtitle2"
          className="visibility-hidden"
        >
          {t('RESULT_AND_SITUATION_REVIEW.RESOLVED_CASE')}
        </Text>
      </div>,
      <div className="d-flex align-items-center gap-2">
        <div>
          <Text weight="bold" size="md" color="subtitle2">
            {t('RESULT_AND_SITUATION_REVIEW.TO_SHOW')}
          </Text>
        </div>
        <div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Select
                title=""
                name="itemCount"
                defaultValue={'10'}
                options={[
                  { label: '5', value: '5' },
                  { label: '10', value: '10' },
                  { label: '15', value: '15' },
                  { label: '20', value: '20' },
                ]}
                size="md"
                suffix={<IconChevronDown size="20" fill="subtitle2" />}
              />
            </form>
          </FormProvider>
        </div>
        <div>
          <Text weight="bold" size="md" color="subtitle2">
            {t('RESULT_AND_SITUATION_REVIEW.QUEUE')}
          </Text>
        </div>
      </div>,
    ],
  };
};

export const GetAllEventsTableHeader = (
  t: TFunction<'translation', undefined>,
) => {
  const methods = useForm();

  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return {
    leftComponents: [
      <div className="mb-8">
        <Text weight="bold" size="md" color="subtitle2">
          {t('RESULT_AND_SITUATION_REVIEW.ALL_EVENTS')}
        </Text>
      </div>,
      <div style={{ width: '50%' }}>
        <InputText
          key={1}
          name="pre-input"
          outline
          placeholder="Search"
          prefix={<IconSearch size="20" />}
          size="sm"
          type="text"
          status="default"
        />
      </div>,
    ],
    rightComponents: [
      <div className="mb-8">
        <Text
          weight="bold"
          size="md"
          color="subtitle2"
          className="visibility-hidden"
        >
          {t('RESULT_AND_SITUATION_REVIEW.RESOLVED_CASE')}
        </Text>
      </div>,
      <div className="d-flex align-items-center gap-2">
        <div>
          <Text weight="bold" size="md" color="subtitle2">
            {t('RESULT_AND_SITUATION_REVIEW.TO_SHOW')}
          </Text>
        </div>
        <div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Select
                title=""
                name="itemCount"
                defaultValue={'10'}
                options={[
                  { label: '5', value: '5' },
                  { label: '10', value: '10' },
                  { label: '15', value: '15' },
                  { label: '20', value: '20' },
                ]}
                size="md"
                suffix={<IconChevronDown size="20" fill="subtitle2" />}
              />
            </form>
          </FormProvider>
        </div>
        <div>
          <Text weight="bold" size="md" color="subtitle2">
            {t('RESULT_AND_SITUATION_REVIEW.QUEUE')}
          </Text>
        </div>
      </div>,
    ],
  };
};

export const getResolvedCaseTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('RESULT_AND_SITUATION_REVIEW.EVENT'),
    key: 'event',
  },
  {
    id: 2,
    name: t('RESULT_AND_SITUATION_REVIEW.DESCRIPTION'),
    key: 'description',
  },
  {
    id: 3,
    name: t('RESULT_AND_SITUATION_REVIEW.CENTER'),
    key: 'center',
  },
  {
    id: 4,
    name: t('RESULT_AND_SITUATION_REVIEW.TIME'),
    key: 'time',
  },
];

export const getResolvedCaseTableRows = () => [
  {
    id: 1,
    event: 'সমস্ত নির্বাচনী সামগ্রী',
    description: 'সমস্ত নির্বাচনী সামগ্রী',
    center: 'মোস্তাফাবিয়া সরকারি',
    time: '2022-02-02',
  },
];
