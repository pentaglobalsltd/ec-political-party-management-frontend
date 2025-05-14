import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import { Button, Header } from '@pentabd/ui';
import { IconCheckCircleBroken, IconRefreshCcw01 } from '@pentabd/icons';

import {
  DistrictReservedSeatsDataType,
  districtReservedSeatsValidation,
} from '@validations/election-declaration-management/main-list/district-reserved-seats/districtReservedSeatsValidation';
import FormSelect from '@components/inputs/FormSelect';
import FormInputDouble from '@components/inputs/FormInputDouble';
import { FORM_FIELDS } from '@constants/forms';
import { options, newDistrictReservedSeatsBreadcrumbs } from '../constants';

const DISTRICT_RESERVED_SEATS =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.DISTRICT_RESERVED_SEATS
    .CREATE_DISTRICT_RESERVED_SEATS;

function CreateDistrictReservedSeats() {
  const { t } = useTranslation();
  const methods = useForm<DistrictReservedSeatsDataType>({
    resolver: yupResolver(districtReservedSeatsValidation),
  });

  const { handleSubmit, reset } = methods;
  const submitDistrictReservedSeatsForm = (data: any) => {
    console.log(data);
  };

  const resetDistrictReservedSeatsForm = () => {
    reset();
  };

  return (
    <div className="container-96 mb-24">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitDistrictReservedSeatsForm)}>
          <Header
            className="mb-10 pt-10"
            headerText={{
              header: t(
                'DISTRICT_RESERVED_SEATS.ADD_NEW_DISTRICT_RESERVED_SEAT',
              ),
            }}
            breadcrumbs={newDistrictReservedSeatsBreadcrumbs(t)}
          />

          <div className="mb-9">
            <div className="d-flex flex-column gap-8 p-9 border rounded-5">
              <FormSelect
                title={t('DISTRICT_RESERVED_SEATS.RMO')}
                name={DISTRICT_RESERVED_SEATS.RMO}
                options={options}
              />

              <FormSelect
                title={t('DISTRICT_RESERVED_SEATS.DIVISION')}
                name={DISTRICT_RESERVED_SEATS.DIVISION}
                options={options}
              />

              <FormSelect
                title={t('DISTRICT_RESERVED_SEATS.DISTRICT')}
                name={DISTRICT_RESERVED_SEATS.DISTRICT}
                options={options}
              />

              <FormSelect
                title={t('DISTRICT_RESERVED_SEATS.RESERVED_WARD_NO')}
                name={DISTRICT_RESERVED_SEATS.RESERVED_WARD_NO}
                options={options}
              />

              <FormInputDouble
                title="DISTRICT_RESERVED_SEATS.RESERVED_WARD"
                placeholder={t('PLACEHOLDER.ENTER')}
                registerName={{
                  type1: DISTRICT_RESERVED_SEATS.RESERVED_WARD_BN,
                  type2: DISTRICT_RESERVED_SEATS.RESERVED_WARD_EN,
                }}
                inputLabel1="DISTRICT_RESERVED_SEATS.BANGLA"
                inputLabel2="DISTRICT_RESERVED_SEATS.ENGLISH"
              />

              <FormSelect
                title={t('DISTRICT_RESERVED_SEATS.INCLUSION_1')}
                name={DISTRICT_RESERVED_SEATS.INCLUSION_1}
                options={options}
              />

              <FormSelect
                title={t('DISTRICT_RESERVED_SEATS.INCLUSION_2')}
                name={DISTRICT_RESERVED_SEATS.INCLUSION_2}
                options={options}
              />

              <FormSelect
                title={t('DISTRICT_RESERVED_SEATS.INCLUSION_3')}
                name={DISTRICT_RESERVED_SEATS.INCLUSION_3}
                options={options}
              />

              <FormSelect
                title={t('DISTRICT_RESERVED_SEATS.INCLUSION_4')}
                name={DISTRICT_RESERVED_SEATS.INCLUSION_4}
                options={options}
              />

              <FormSelect
                title={t('DISTRICT_RESERVED_SEATS.CONDITION')}
                name={DISTRICT_RESERVED_SEATS.CONDITION}
                options={options}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end align-items-center gap-6 border-top py-8">
            <Button
              fill="outline"
              key={1}
              htmlType="button"
              type="primary"
              onClick={resetDistrictReservedSeatsForm}
            >
              {t('DISTRICT_RESERVED_SEATS.RESET')}
              <IconRefreshCcw01 size="20" fill="primary" />
            </Button>
            <Button key={2} htmlType="submit" type="success">
              {t('DISTRICT_RESERVED_SEATS.FILED')}
              <IconCheckCircleBroken size="20" fill="light" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default CreateDistrictReservedSeats;
