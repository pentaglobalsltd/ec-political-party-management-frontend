import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Header } from '@pentabd/ui';
import { IconCheckCircleBroken } from '@pentabd/icons';

import FormInput from '@components/inputs/FormInput';
import FormTextArea from '@components/inputs/FormTextArea';

import useCreateDynamicReport from '@hooks/candidate-info-management/dynamic-report/useDynamicReportCreate';
import useUpdateDynamicReport from '@hooks/candidate-info-management/dynamic-report/useDynamicReportUpdate';
import useDynamicReportGetById from '@hooks/candidate-info-management/dynamic-report/useDynamicReportGetById';

import { FORM_FIELDS } from '@constants/forms';
import { dynamicReportBreadcrumbs } from './constants';
import { CANDIDATE_INFO_MANAGEMENT_PATH } from '@constants/paths/candidate-info-management';
import {
  dynamicReportValidationSchema,
  DynamicReportValidationSchemaType,
} from '@validations/candidate-info-management/dynamic-report/dynamicReportValidation';

const DYNAMIC_REPORT = FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.DYNAMIC_REPORT;

const EditDynamicReport = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const isCreate =
    pathname === CANDIDATE_INFO_MANAGEMENT_PATH.CREATE_DYNAMIC_REPORT_FULL_PATH;

  const {
    createDynamicReport,
    isLoading: isCreateLoading,
    isSuccess: isCreateSuccess,
  } = useCreateDynamicReport();

  const { dynamicReportById, getDynamicReportByIdData } =
    useDynamicReportGetById();

  const {
    updateDynamicReport,
    isLoading: isUpdateLoading,
    isSuccess: isUpdateSuccess,
  } = useUpdateDynamicReport();

  const methods = useForm<DynamicReportValidationSchemaType>({
    resolver: yupResolver(dynamicReportValidationSchema),
    values: dynamicReportById as DynamicReportValidationSchemaType,
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<DynamicReportValidationSchemaType> = async (
    data: DynamicReportValidationSchemaType,
  ) => {
    const { nameBn, nameEn, tag, queryValue } = data || {};

    if (isCreate) {
      if (nameBn && nameEn && tag && queryValue) {
        createDynamicReport({
          nameBn,
          nameEn,
          tag,
          queryValue,
        });
      }
    } else {
      if (id && nameBn && nameEn && tag && queryValue) {
        updateDynamicReport({
          reportId: id,
          nameBn,
          nameEn,
          tag,
          queryValue,
        });
      }
    }
  };

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateSuccess, isUpdateSuccess]);

  useEffect(() => {
    if (!isCreate && id) {
      getDynamicReportByIdData(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isCreate]);

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: isCreate
            ? t('DYNAMIC_REPORT.CREATE')
            : t('DYNAMIC_REPORT.EDIT'),
        }}
        breadcrumbs={dynamicReportBreadcrumbs({ t, isCreate })}
      />

      <FormProvider {...methods}>
        <form className="container" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            title="DYNAMIC_REPORT.NAME_BN"
            placeholder="PLACEHOLDER.ENTER"
            registerName={DYNAMIC_REPORT.NAME_BN}
            required
          />

          <FormInput
            title="DYNAMIC_REPORT.NAME_EN"
            placeholder="PLACEHOLDER.ENTER"
            registerName={DYNAMIC_REPORT.NAME_EN}
            required
          />

          <FormInput
            title="DYNAMIC_REPORT.TAG"
            placeholder="PLACEHOLDER.ENTER"
            registerName={DYNAMIC_REPORT.TAG}
            required
          />

          <FormTextArea
            title="DYNAMIC_REPORT.QUERY"
            registerName={DYNAMIC_REPORT.QUERY_VALUE}
            placeholder="PLACEHOLDER.ENTER"
            maxCharacters={10_000}
            isEmbeddedMessage
            required
          />

          <div className="d-flex flex-row-reverse">
            <Button
              key={1}
              type="success"
              loading={isCreateLoading || isUpdateLoading}
              htmlType="submit"
            >
              {t('DYNAMIC_REPORT.SUBMIT')}
              <IconCheckCircleBroken size="20" fill="white" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditDynamicReport;
