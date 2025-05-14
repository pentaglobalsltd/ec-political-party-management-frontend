import { useTranslation } from 'react-i18next';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { IconCalendar, IconChevronDown } from '@pentabd/icons';
import { Button, InputDate, Text } from '@pentabd/ui';
import Select from '@components/inputs/Select';
import { ELECTION } from '@constants/forms/election-schedule-management/election';

const { POSSIBLE_ELECTION } = ELECTION;

const options = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
];

const AdvanceSearch = () => {
  const methods = useForm();
  const { handleSubmit, control } = methods;
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<any> = (data: any) => {
    console.log('onSubmit', data);
  };

  return (
    <div className="box-ex border rounded-5 bg-extra-light p-10">
      <Text component="h3">{t('POSSIBLE_ELECTION.ADVANCE_SEARCH')}</Text>

      <FormProvider {...methods}>
        <form className="container mb-9" onSubmit={handleSubmit(onSubmit)}>
          {/* row-1 */}
          <div className="d-grid grid-cols-1 grid-cols-lg-4 gap-6 my-8">
            {/* 1 - বিভাগের নাম */}

            <Select
              title="POSSIBLE_ELECTION.DIVISION"
              name={POSSIBLE_ELECTION.DIVISION}
              options={options}
              suffix={<IconChevronDown size="20" fill="subtitle2" />}
            />

            {/* 2 - জেলার নাম */}

            <Select
              title="POSSIBLE_ELECTION.DISTRICT"
              name={POSSIBLE_ELECTION.DISTRICT}
              options={options}
              suffix={<IconChevronDown size="20" fill="subtitle2" />}
            />

            {/* 3 - উপজেলা/থানা */}

            <Select
              title="POSSIBLE_ELECTION.UPAZILA"
              name={POSSIBLE_ELECTION.UPAZILA}
              options={options}
              suffix={<IconChevronDown size="20" fill="subtitle2" />}
            />

            {/* 4 - আর এম ও */}

            <Select
              title="POSSIBLE_ELECTION.ROM"
              name={POSSIBLE_ELECTION.ROM}
              options={options}
              suffix={<IconChevronDown size="20" fill="subtitle2" />}
            />
          </div>

          {/* row-2 */}
          <div className="d-grid grid-cols-1 grid-cols-lg-2 gap-6">
            <div className="d-grid grid-cols-1 grid-cols-lg-2 gap-6">
              {/* 5 - ইউনিয়ন/ওয়ার্ড*/}

              <Select
                title={t('POSSIBLE_ELECTION.UNION_OR_WARD')}
                name={POSSIBLE_ELECTION.UNION_OR_WARD}
                options={options}
                suffix={<IconChevronDown size="20" fill="subtitle2" />}
              />

              {/* 6 - নির্বাচনের ধরণ*/}

              <Select
                title={t('POSSIBLE_ELECTION.ELECTION_TYPE')}
                name={POSSIBLE_ELECTION.ELECTION_TYPE}
                options={options}
                suffix={<IconChevronDown size="20" fill="subtitle2" />}
              />
            </div>

            <div className="d-grid grid-cols-1 grid-cols-lg-5 gap-6 align-items-end">
              <div className="col-span-2">
                {/* 7 - তারিখ*/}
                <Controller
                  control={control}
                  name={POSSIBLE_ELECTION.DATE}
                  render={({ field }) => (
                    <InputDate
                      title={t('POSSIBLE_ELECTION.DATE')}
                      value={field.value}
                      onSelectDate={(date) => field.onChange(date)}
                      name={POSSIBLE_ELECTION.DATE}
                      prefix={<IconCalendar size="20" fill="subtitle2" />}
                    />
                  )}
                />
              </div>

              <div className="col-span-2">
                {/* 8 - হতে*/}

                <Controller
                  control={control}
                  name={POSSIBLE_ELECTION.FROM}
                  render={({ field }) => (
                    <InputDate
                      title={t('POSSIBLE_ELECTION.FROM')}
                      value={field.value}
                      onSelectDate={(date) => field.onChange(date)}
                      name={POSSIBLE_ELECTION.FROM}
                      prefix={<IconCalendar size="20" fill="subtitle2" />}
                    />
                  )}
                />
              </div>

              {/* 9 - button খুঁজুন*/}
              <Button type="primary" htmlType="submit">
                {t('POSSIBLE_ELECTION.SEARCH')}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AdvanceSearch;
