import { Button, Header, Text } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { unionWardAddEditBreadcrumbs } from './constants';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconCheckCircleBroken } from '@pentabd/icons';
import FormSelect from '@components/inputs/FormSelect';
import { FORM_FIELDS } from '@constants/forms';
import {
  AddUnionWardDataType,
  addUnionWardValidation,
} from '@validations/vote-center-management/main-list/union-ward/unionWardValidation';
import FormInput from '@components/inputs/FormInput';
import { useCreateUnionWard } from '@hooks/election-schedule-management/main-list/union-ward/useCreateUnionWards';
import { useRegionListSelect } from '@hooks/election-schedule-management/main-list/region/useRegionListSelect';
import { useEffect, useState } from 'react';
import { useZillas } from '@hooks/miscellaneous/master-hook/zilla/useZillasRegion';
import { useSubDistrictListSelect } from '@hooks/election-schedule-management/main-list/sub-district/useSubDistrictListSelect';
import { useUnionByUpazila } from '@hooks/miscellaneous/master-hook/union-or-ward/useUnionByUpazila';
import { useGetUnionWard } from '@hooks/election-schedule-management/main-list/union-ward/useGetUnionWard';
import { useUpdateUnionWard } from '@hooks/election-schedule-management/main-list/union-ward/useUpdateUnionWard';
import {
  allSelectedData,
  clearUnionOrWard,
  clearUpazila,
  clearZilla,
} from '../../constants';
import { RMO } from '@components/application-search/constants';

const ADD_UNION_WARD =
  FORM_FIELDS.VOTE_CENTER_MANAGEMENT.MAIN_LIST.UNION_WARD.ADD_UNION_WARD;

const AddEditUnionWard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { id } = useParams();

  const [resetData, setResetData] = useState({
    ...allSelectedData,
  });

  const {
    unionWardsCreate,
    loading: createLoading,
    success: createSuccess,
  } = useCreateUnionWard();
  const { getUnionWard, unionWard } = useGetUnionWard();
  const {
    unionWardsUpdate,
    loading: updateLoading,
    success: updateSuccess,
  } = useUpdateUnionWard();

  const { regions, getRegionListSelect } = useRegionListSelect();
  const { getZilla, zillas } = useZillas();
  const { upazilas, getSubDistrictListSelect } = useSubDistrictListSelect();
  const { getUnionByUpazila, unionByUpazila } = useUnionByUpazila();

  const methods = useForm<AddUnionWardDataType>({
    resolver: yupResolver(addUnionWardValidation),
    values: unionWard as any,
  });

  const { handleSubmit, watch } = methods;

  const divisionId = watch(ADD_UNION_WARD.DIVISION);
  const districtId = watch(ADD_UNION_WARD.DISTRICT);
  const upazilaId = watch(ADD_UNION_WARD.SUB_DISTRICT);

  const onSubmit = (postData: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { regionId, zillaId, ...rest } = postData;
    if (id) unionWardsUpdate({ ...rest });
    else unionWardsCreate({ ...rest });
  };

  const emptyBelowData = (newData: { [name: string]: boolean }) => {
    setResetData((data: any) => ({
      ...data,
      ...newData,
    }));
  };

  useEffect(() => {
    if (id) {
      getUnionWard(id);
    }
  }, [id]);

  // বিভাগ
  useEffect(() => {
    getRegionListSelect();
  }, []);

  // জেলা
  useEffect(() => {
    if (divisionId) getZilla(divisionId);
  }, [divisionId]);

  // উপজেলা
  useEffect(() => {
    if (districtId) getSubDistrictListSelect(districtId);
  }, [districtId]);

  // উপজেলা
  useEffect(() => {
    if (upazilaId) getUnionByUpazila({ upazilaId, rmoEn: RMO.RURAL });
  }, [upazilaId]);

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      navigate(-1);
    }
  }, [createSuccess, updateSuccess]);

  return (
    <div className="container-96 mb-24">
      <div className="mb-10 pt-10">
        <Header
          headerText={{
            header: id
              ? t('UNION_WARD.UPDATE_UNION_WARD_SECTION_HEADER')
              : t('UNION_WARD.ADD_UNION_WARD_SECTION_HEADER'),
          }}
          breadcrumbs={unionWardAddEditBreadcrumbs(t, id)}
        />
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-6 p-12 mb-12">
            <FormSelect
              title="UNION_WARD.DIVISION"
              name={ADD_UNION_WARD.DIVISION}
              options={regions}
              required
              resetData={() =>
                emptyBelowData({
                  ...clearZilla,
                })
              }
            />
            <FormSelect
              title="UNION_WARD.DISTRICT"
              name={ADD_UNION_WARD.DISTRICT}
              options={zillas}
              required
              clearValue={resetData?.district}
              resetData={() =>
                emptyBelowData({
                  ...clearUpazila,
                  district: false,
                  upazilaOptions: false,
                })
              }
              clearOptions={resetData?.districtOptions}
            />
            <FormSelect
              title="UNION_WARD.UPAZILA"
              name={ADD_UNION_WARD.SUB_DISTRICT}
              options={upazilas}
              required
              clearValue={resetData?.upazila}
              resetData={() =>
                emptyBelowData({
                  ...clearUnionOrWard,
                  upazila: false,
                  unionOrWardOptions: false,
                })
              }
              clearOptions={resetData?.upazilaOptions}
            />
            <FormSelect
              title="UNION_WARD.UNION_OR_WARD"
              name={ADD_UNION_WARD.UNION_OR_WARD}
              options={unionByUpazila}
              required
              clearValue={resetData?.unionOrWard}
              clearOptions={resetData?.unionOrWardOptions}
            />
            <FormInput
              registerName={ADD_UNION_WARD.WARD_NUMBER}
              title={t('UNION_WARD.WARD_NUMBER')}
              placeholder="PLACEHOLDER.ENTER"
              required
            />
            <FormInput
              registerName={ADD_UNION_WARD.WARD_NAMEBN}
              title={t('UNION_WARD.WARD_NAMEBN')}
              placeholder="PLACEHOLDER.ENTER"
              required
            />
            <FormInput
              registerName={ADD_UNION_WARD.WARD_NAMEEN}
              title={t('UNION_WARD.WARD_NAMEEN')}
              placeholder="PLACEHOLDER.ENTER"
              required
            />
            <div className="d-flex justify-content-end gap-6  py-12">
              <Button
                fill="fill"
                className="border-primary"
                type="primary"
                htmlType="submit"
                loading={createLoading || updateLoading}
              >
                <Text size="sm" weight="semibold" color="white">
                  {t('UNION_WARD.SAVE')}
                </Text>
                <IconCheckCircleBroken size="20" fill="white" />
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddEditUnionWard;
