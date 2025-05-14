import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, InputText, Text } from '@pentabd/ui';

import { FORM_FIELDS } from '@constants/forms';
import Select from '@components/inputs/Select';
import { options } from '../constants';

const UNION_SEARCH =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.UNION.UNION_SEARCH;

const AdvanceSearch = () => {
  const methods = useForm();
  const { t } = useTranslation();
  const { register, handleSubmit } = methods;

  const searchUnion = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="mb-20 p-10 bg-light box-ex rounded-5"
          onSubmit={handleSubmit(searchUnion)}
        >
          <div className="d-grid grid-cols-1 grid-cols-lg-12 gap-6 align-items-end">
            <div className="col-span-3">
              <Select
                title="UNION.DIVISION"
                name={UNION_SEARCH.DIVISION}
                options={options}
              />
            </div>
            <div className="col-span-3">
              <Select
                title="UNION.DISTRICT"
                name={UNION_SEARCH.DISTRICT}
                options={options}
              />
            </div>
            <div className="col-span-3">
              <Select
                title="UNION.SUB_DISTRICT"
                name={UNION_SEARCH.SUB_DISTRICT}
                options={options}
              />
            </div>
            <div className="col-span-3">
              <InputText
                {...register(UNION_SEARCH.GO_CODE)}
                title={t('UNION.GO_CODE')}
              />
            </div>
            <div className="col-span-3">
              <InputText
                {...register(UNION_SEARCH.UNION)}
                title={t('UNION.UNION_NAME')}
              />
            </div>
            <div className="col-span-1">
              <Button type="primary" className="w-100" htmlType="submit">
                <Text weight="semibold">{t('UNION.SEARCH')}</Text>
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AdvanceSearch;
