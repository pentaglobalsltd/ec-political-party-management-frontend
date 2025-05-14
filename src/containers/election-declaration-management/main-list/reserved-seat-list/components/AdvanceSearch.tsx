import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Text } from '@pentabd/ui';

import { FORM_FIELDS } from '@constants/forms';
import Select from '@components/inputs/Select';
import { options } from '../constants';

const RESERVED_SEAT_LIST_SEARCH =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.RESERVED_SEAT_LIST
    .RESERVED_SEAT_LIST_SEARCH;

const AdvanceSearch = () => {
  const methods = useForm();
  const { t } = useTranslation();
  const { handleSubmit } = methods;
  const searchReservedSearchList = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="mb-20 p-10 bg-light box-ex rounded-5"
          onSubmit={handleSubmit(searchReservedSearchList)}
        >
          <div className="d-grid grid-cols-1 grid-cols-lg-10 gap-6 align-items-end">
            <div className="col-span-3">
              <Select
                title="RESERVED_SEAT_LIST.DIVISION"
                name={RESERVED_SEAT_LIST_SEARCH.DIVISION}
                options={options}
              />
            </div>
            <div className="col-span-3">
              <Select
                title="RESERVED_SEAT_LIST.DISTRICT"
                name={RESERVED_SEAT_LIST_SEARCH.DISTRICT}
                options={options}
              />
            </div>
            <div className="col-span-3">
              <Select
                title="RESERVED_SEAT_LIST.MUNICIPALITY"
                name={RESERVED_SEAT_LIST_SEARCH.MUNICIPALITY}
                options={options}
              />
            </div>
            <div className="col-span-1">
              <Button type="primary" className="w-100" htmlType="submit">
                <Text weight="semibold">{t('RESERVED_SEAT_LIST.SEARCH')}</Text>
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AdvanceSearch;
