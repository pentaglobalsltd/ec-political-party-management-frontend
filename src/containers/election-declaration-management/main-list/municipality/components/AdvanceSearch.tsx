import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Text } from '@pentabd/ui';

import { FORM_FIELDS } from '@constants/forms';
import Select from '@components/inputs/Select';
import { options } from '../constants';

const MUNICIPALITY_SEARCH =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.MUNICIPALITY
    .MUNICIPALITY_SEARCH;

const AdvanceSearch = () => {
  const methods = useForm();
  const { t } = useTranslation();
  const { handleSubmit } = methods;

  const searchMunicipality = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="mb-20 p-10 bg-light box-ex rounded-5"
          onSubmit={handleSubmit(searchMunicipality)}
        >
          <div className="d-grid grid-cols-1 grid-cols-lg-10 gap-6 align-items-end">
            <div className="col-span-3">
              <Select
                title="MUNICIPALITY.DIVISION"
                name={MUNICIPALITY_SEARCH.DIVISION}
                options={options}
              />
            </div>
            <div className="col-span-3">
              <Select
                title="MUNICIPALITY.DISTRICT"
                name={MUNICIPALITY_SEARCH.DISTRICT}
                options={options}
              />
            </div>
            <div className="col-span-3">
              <Select
                title={t('MUNICIPALITY.MUNICIPALITY')}
                name={MUNICIPALITY_SEARCH.MUNICIPALITY}
                options={options}
              />
            </div>
            <div className="col-span-1">
              <Button type="primary" className="w-100" htmlType="submit">
                <Text weight="semibold">{t('MUNICIPALITY.SEARCH')}</Text>
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AdvanceSearch;
