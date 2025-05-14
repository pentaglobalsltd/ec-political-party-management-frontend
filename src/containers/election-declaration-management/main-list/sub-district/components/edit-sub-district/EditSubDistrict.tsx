import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import { IconCheckCircleBroken } from '@pentabd/icons';
import { Button, Header, Text } from '@pentabd/ui';

import FormInput from '@components/inputs/FormInput';
import FormInputDouble from '@components/inputs/FormInputDouble';
import FormSelect from '@components/inputs/FormSelect';
import { FORM_FIELDS } from '@constants/forms';
import {
  CreateSubDistrictDataType,
  createSubDistrictValidation,
} from '@validations/election-declaration-management/main-list/sub-district/subDistrictValidation';
import { editSubDistrictBreadcrumbs } from '../../constants';
import { useGetSubdistrict } from '@hooks/election-schedule-management/main-list/sub-district/useGetSubdistrict';
import { useZillas } from '@hooks/miscellaneous/master-hook/zilla/useZillasDivison';
import { useUpdateSubdistrict } from '@hooks/election-schedule-management/main-list/sub-district/useUpdateSubdistrict';
import FormRadio from '@components/inputs/FormRadio';
import { UPAZILA_IS_THANA_RADIO_CODES, radioOptions } from './constants';

const CREATE_SUB_DISTRICT =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.SUB_DISTRICT
    .CREATE_SUB_DISTRICT;

const EditSubDistrict = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { subdistrict, getSubdistrict } = useGetSubdistrict();
  const { zillas } = useZillas({ notCallOnMount: false });
  const { editSubdistrict, success } = useUpdateSubdistrict();

  const methods = useForm<CreateSubDistrictDataType>({
    resolver: yupResolver(createSubDistrictValidation),
    values: {
      ...subdistrict,
      [CREATE_SUB_DISTRICT.IS_THANA]: subdistrict?.isThana
        ? UPAZILA_IS_THANA_RADIO_CODES?.YES
        : UPAZILA_IS_THANA_RADIO_CODES?.NO,
    } as any,
  });

  useEffect(() => {
    if (id) {
      getSubdistrict(id);
    }
    // eslint-disable-next-line
  }, [id]);

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<CreateSubDistrictDataType> = (
    data: CreateSubDistrictDataType,
  ) => {
    const isThana =
      data?.isThana === UPAZILA_IS_THANA_RADIO_CODES?.YES ? true : false;

    const modifiedData = {
      zillaId: data.zillaId,
      upazilaCode: data.upazilaCode,
      nameBn: data.nameBn,
      nameEn: data.nameEn,
      isThana,
    };

    if (data.id) editSubdistrict(data.id, modifiedData);
  };

  useEffect(() => {
    if (success) {
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <div className="container-96 mb-24">
      <Header
        headerText={{ header: t('SUB_DISTRICT.EDIT_SUB_DISTRICT') }}
        breadcrumbs={editSubDistrictBreadcrumbs(t)}
        className="mb-12 pt-10"
      />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-6 border p-12 mb-12">
            <FormSelect
              title="SUB_DISTRICT.DISTRICT"
              name={CREATE_SUB_DISTRICT.DISTRICT}
              options={zillas}
            />

            <FormInputDouble
              title="SUB_DISTRICT.SUB_DISTRICT"
              placeholder={t('PLACEHOLDER.ENTER')}
              registerName={{
                type1: CREATE_SUB_DISTRICT.SUB_DISTRICT_BN,
                type2: CREATE_SUB_DISTRICT.SUB_DISTRICT_EN,
              }}
              inputLabel1="SUB_DISTRICT.SUB_DISTRICT_NAME_BN"
              inputLabel2="SUB_DISTRICT.SUB_DISTRICT_NAME_EN"
            />

            <FormInput
              title="SUB_DISTRICT.GO_CODE"
              placeholder={t('PLACEHOLDER.ENTER')}
              registerName={CREATE_SUB_DISTRICT.GO_CODE}
            />

            <FormRadio
              title="SUB_DISTRICT.IS_THANA"
              options={radioOptions(t)}
              name={CREATE_SUB_DISTRICT.IS_THANA}
              id={CREATE_SUB_DISTRICT.IS_THANA}
            />
          </div>

          <div className="d-flex justify-content-end gap-6 border-top py-12">
            <Button
              fill="outline"
              className="border"
              type="light"
              onClick={() => navigate(-1)}
            >
              <Text size="sm" weight="semibold">
                {t('SUB_DISTRICT.RETURN')}
              </Text>
            </Button>

            <Button
              fill="fill"
              className="border-primary"
              type="success"
              htmlType="submit"
            >
              <Text size="sm" weight="semibold" color="white">
                {t('SUB_DISTRICT.SUBMIT')}
              </Text>
              <IconCheckCircleBroken size="20" fill="white" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditSubDistrict;
