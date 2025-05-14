import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { IconCheckCircleBroken, IconRefreshCcw01 } from '@pentabd/icons';
import { Button, Header, Text } from '@pentabd/ui';
import { useNavigate, useParams } from 'react-router-dom';
import FormInputDouble from '@components/inputs/FormInputDouble';
import FormSelect from '@components/inputs/FormSelect';
import { FORM_FIELDS } from '@constants/forms';
import {
  CreateSymbolDataType,
  createSymbolValidation,
} from '@validations/center-officer-management/controller-list/symbol/symbol-validation';
import { addSymbolBreadcrumbs } from '../../constants';
import { useGetAllCandidateType } from '@hooks/election-schedule-management/other/candidate-type/useGetAllCandidateType';
import ImageInput from '@components/inputs/ImageInput';
import { useCreateSymbol } from '@hooks/center-officer-management/controller-list/symbol/useCreateSymbol';
import { useUpdateSymbol } from '@hooks/center-officer-management/controller-list/symbol/useUpdateSymbol';
import { useGetSymbol } from '@hooks/center-officer-management/controller-list/symbol/useGetSymbol';
import { FILE_CATEGORY } from '@constants/file';

const CREATE_SYMBOL =
  FORM_FIELDS.CENTER_OFFICER_MANAGEMENT.CONTROLLER_LIST.SYMBOL.CREATE_SYMBOL;

const CreateSymbol = () => {
  const { t } = useTranslation();
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const navigate = useNavigate();
  const { allCandidateTypes, getAllCandidateType } = useGetAllCandidateType();
  const {
    addSymbol,
    loading: createLoading,
    success: createSuccess,
  } = useCreateSymbol();
  const {
    updateSymbol,
    loading: updateLoading,
    success: updateSuccess,
  } = useUpdateSymbol();
  const { symbol, getSymbol } = useGetSymbol();

  const methods = useForm<CreateSymbolDataType>({
    resolver: yupResolver(createSymbolValidation),
    values: {
      [CREATE_SYMBOL.SYMBOL_NAME_BN]: symbol.nameBn,
      [CREATE_SYMBOL.SYMBOL_NAME_EN]: symbol.nameEn,
      [CREATE_SYMBOL.CANDIDATE_TYPE]: symbol.candidateTypeIds,
      [CREATE_SYMBOL.SYMBOL_IMAGE]: symbol.file,
    },
  });
  const { id } = useParams();

  const { handleSubmit, reset } = methods;

  const handleButtonDisable = (value: boolean) => {
    setDisableButton(value);
  };

  const onSubmit: SubmitHandler<CreateSymbolDataType> = (data: any) => {
    const __data = {
      ...data,
      candidateTypeIds: data.candidateTypeIds.map((item: any) => Number(item)),
      filePath: data?.file?.documentId,
    };

    if (id) {
      updateSymbol(id, __data);
    } else {
      addSymbol(__data);
    }
  };

  useEffect(() => {
    getAllCandidateType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (id) {
      getSymbol(id);
      getAllCandidateType();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      navigate(-1);
    }
  }, [navigate, createSuccess, updateSuccess]);

  return (
    <div className="container-96 mb-24">
      <Header
        headerText={{ header: t('SYMBOL.ADD_SYMBOL') }}
        breadcrumbs={addSymbolBreadcrumbs(t)}
        className="mb-12 pt-10"
      />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-6 border p-12 mb-12">
            <FormInputDouble
              title="SYMBOL.SYMBOL"
              registerName={{
                type1: CREATE_SYMBOL.SYMBOL_NAME_BN,
                type2: CREATE_SYMBOL.SYMBOL_NAME_EN,
              }}
              inputLabel1="SYMBOL.BANGLA"
              inputLabel2="SYMBOL.ENGLISH"
              required1
              required2
            />

            {/* <FormSelect
              title="SYMBOL.ELECTION_TYPE"
              name={CREATE_SYMBOL.ELECTION_TYPE}
              options={options}
            /> */}

            <FormSelect
              title="SYMBOL.CANDIDATE_TYPE"
              name={CREATE_SYMBOL.CANDIDATE_TYPE}
              options={allCandidateTypes}
              isMulti
              required
            />

            {/* --------------- */}
            <ImageInput
              title={t('SYMBOL.UPLOAD_SYMBOL_IMAGE')}
              subtitle={t('ATTACH_FILE.IMAGE_FIELD_SUBTITLE')}
              fileContainerType="image-upload"
              registerName={CREATE_SYMBOL.SYMBOL_IMAGE}
              handleButtonDisable={handleButtonDisable}
              required
              candidateImage={{ ...symbol?.file, filePath: symbol?.filePath }}
              usePublicUrl={true}
              category={FILE_CATEGORY.SYMBOLS}
            />

            {/* --------------- */}
          </div>

          <div className="d-flex justify-content-end gap-6 border-top py-12">
            <Button
              fill="outline"
              className="border-primary"
              type="primary"
              onClick={() => reset()}
            >
              <Text size="sm" weight="semibold" color="primary">
                {t('SYMBOL.RESET')}
              </Text>
              <IconRefreshCcw01 size="20" fill="primary" />
            </Button>

            <Button
              fill="fill"
              className="border-primary"
              type="success"
              htmlType="submit"
              disabled={disableButton}
              loading={createLoading || updateLoading}
            >
              <Text size="sm" weight="semibold" color="white">
                {t('SYMBOL.SUBMIT')}
              </Text>
              <IconCheckCircleBroken size="20" fill="white" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateSymbol;
