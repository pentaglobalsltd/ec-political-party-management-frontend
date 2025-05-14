import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import { IconCheckCircleBroken, IconRefreshCcw01 } from '@pentabd/icons';
import { Button, Header, Text } from '@pentabd/ui';

import {
  CreateZillaWardDataType,
  createZillaWardValidation,
} from '@validations/election-declaration-management/main-list/zilla-ward/zillaWardValidation';
import FormInput from '@components/inputs/FormInput';
import FormInputDouble from '@components/inputs/FormInputDouble';
import FormSelect from '@components/inputs/FormSelect';
import { FORM_FIELDS } from '@constants/forms';
import { editZillaWardBreadcrumbs, options } from '../../constants';

const CREATE_ZILLA_WARD =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.ZILLA_WARD
    .CREATE_ZILLA_WARD;

const EditZillaWard = () => {
  const { t } = useTranslation();
  const methods = useForm<CreateZillaWardDataType>({
    resolver: yupResolver(createZillaWardValidation),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<CreateZillaWardDataType> = (data: any) => {
    console.log(data);
  };

  return (
    <div className="container-96 mb-24">
      <Header
        headerText={{ header: t('ZILLA_WARD.EDIT_ZILLA_WARD') }}
        breadcrumbs={editZillaWardBreadcrumbs(t)}
        className="mb-12 pt-10"
      />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-6 border p-12 mb-12">
            <FormSelect
              title="ZILLA_WARD.DISTRICT_NAME"
              name={CREATE_ZILLA_WARD.DISTRICT}
              options={options}
            />

            <FormInputDouble
              title="ZILLA_WARD.WARD"
              placeholder={t('PLACEHOLDER.ENTER')}
              registerName={{
                type1: CREATE_ZILLA_WARD.WARD_BN,
                type2: CREATE_ZILLA_WARD.WARD_EN,
              }}
              inputLabel1="ZILLA_WARD.WARD_NAME_BN"
              inputLabel2="ZILLA_WARD.WARD_NAME_EN"
            />

            <FormInput
              title="ZILLA_WARD.GO_CODE"
              placeholder={t('PLACEHOLDER.ENTER')}
              registerName={CREATE_ZILLA_WARD.GO_CODE}
            />
          </div>

          <div className="d-flex justify-content-end gap-6 border-top py-12">
            <Button
              fill="outline"
              className="border-primary"
              type="primary"
              onClick={() => reset()}
            >
              <Text size="sm" weight="semibold" color="primary">
                {t('ZILLA_WARD.RESET')}
              </Text>
              <IconRefreshCcw01 size="20" fill="primary" />
            </Button>

            <Button
              fill="fill"
              className="border-primary"
              type="success"
              htmlType="submit"
            >
              <Text size="sm" weight="semibold" color="white">
                {t('ZILLA_WARD.SUBMIT')}
              </Text>
              <IconCheckCircleBroken size="20" fill="white" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditZillaWard;
