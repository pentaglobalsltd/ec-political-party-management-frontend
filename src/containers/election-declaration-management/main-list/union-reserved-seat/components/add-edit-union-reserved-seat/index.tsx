import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Header, Text } from '@pentabd/ui';
import {
  allSelectedData,
  clearUnion,
  clearUnionWardMulti,
  clearUpazila,
  clearZilla,
  unionReservedSeatAddEditBreadcrumbs,
} from './constants';
import {
  AddUnionReservedSeatDataType,
  addUnionReservedSeatValidation,
} from '@validations/vote-center-management/main-list/union-reserved-seat/unionReservedSeatValidation';
import { FORM_FIELDS } from '@constants/forms';
import FormSelect from '@components/inputs/FormSelect';
import FormInput from '@components/inputs/FormInput';
import { IconCheckCircleBroken, IconRefreshCcw01 } from '@pentabd/icons';
import { useUnionReserveSeatFields } from '../../../../../../hooks/election-schedule-management/main-list/union-reserved-seat/useUnionReserveSeatFields';
import useCreateUnionReserveSeat from '@hooks/election-schedule-management/main-list/union-reserved-seat/useCreateUnionReserveSeat';
import useGetReserveUnionWardById, {
  MAPPING_KEY_UNION_WARDS_ARRAY,
} from '@hooks/election-schedule-management/main-list/union-reserved-seat/useGetReserveUnionWardById';
import useUpdateUnionReserveSeat from '@hooks/election-schedule-management/main-list/union-reserved-seat/useUpdateUnionReserveSeat';
import { reqMapping } from './mapping';

const ADD_UNION_RESERVED_SEAT =
  FORM_FIELDS.VOTE_CENTER_MANAGEMENT.MAIN_LIST.UNION_RESERVED_SEAT
    .ADD_UNION_RESERVED_SEAT;

const AddEditUnionReservedSeats = () => {
  const { t } = useTranslation();

  const { id } = useParams();

  const navigate = useNavigate();

  const [resetData, setResetData] = useState({
    ...allSelectedData,
  });

  const {
    createUnionReserveSeat,
    loading: loadingCreate,
    success: successCreate,
  } = useCreateUnionReserveSeat();

  const {
    updateReserveUnionWards,
    loading: loadingUpdate,
    success: successLoading,
  } = useUpdateUnionReserveSeat();

  const { unionWard, getReserveUnionWardById } = useGetReserveUnionWardById();

  const methods = useForm<AddUnionReservedSeatDataType>({
    resolver: yupResolver(addUnionReservedSeatValidation),
    values: {
      ...(unionWard as any),
      [ADD_UNION_RESERVED_SEAT.UNION_WARD_MULTI]:
        unionWard?.[MAPPING_KEY_UNION_WARDS_ARRAY],
    },
  });

  const { handleSubmit, watch, reset } = methods;

  const watchDivision = watch(ADD_UNION_RESERVED_SEAT.DIVISION);
  const watchDistrict = watch(ADD_UNION_RESERVED_SEAT.DISTRICT);
  const watchSubDistrict = watch(ADD_UNION_RESERVED_SEAT.SUB_DISTRICT);
  const watchUnion = watch(ADD_UNION_RESERVED_SEAT.UNION);

  const { regions, zillas, upazilas, unions, unionsWardsMulti } =
    useUnionReserveSeatFields({
      watchDivision,
      watchDistrict,
      watchSubDistrict,
      watchUnion,
    });

  const onSubmit = (data: any) => {
    const postData = reqMapping(data);

    if (id) updateReserveUnionWards(postData);
    else createUnionReserveSeat(postData);
  };

  useEffect(() => {
    if (successCreate || successLoading) {
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successCreate, successLoading]);

  useEffect(() => {
    if (id) {
      getReserveUnionWardById(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const emptyBelowData = (newData: { [name: string]: boolean }) => {
    setResetData((data: any) => ({
      ...data,
      ...newData,
    }));
  };

  return (
    <div className="container-96 mb-24">
      <div className="mb-10 pt-10">
        <Header
          headerText={{
            header: t(
              'UNION_RESERVED_SEAT.ADD_UNION_RESERVED_SEAT_SECTION_HEADER',
            ),
          }}
          breadcrumbs={unionReservedSeatAddEditBreadcrumbs(t)}
        />
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-6 border p-12 mb-12">
            <FormSelect
              title="UNION_RESERVED_SEAT.DIVISION"
              name={ADD_UNION_RESERVED_SEAT.DIVISION}
              options={regions}
              required
              resetData={() =>
                emptyBelowData({
                  ...clearZilla,
                })
              }
            />

            <FormSelect
              title="UNION_RESERVED_SEAT.DISTRICT"
              name={ADD_UNION_RESERVED_SEAT.DISTRICT}
              options={zillas}
              disabled={!watchDivision}
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
              title="UNION_RESERVED_SEAT.UPAZILA"
              name={ADD_UNION_RESERVED_SEAT.SUB_DISTRICT}
              options={upazilas}
              disabled={!watchDistrict}
              required
              clearValue={resetData?.upazila}
              resetData={() =>
                emptyBelowData({
                  ...clearUnion,
                  upazila: false,
                  unionOptions: false,
                })
              }
              clearOptions={resetData?.upazilaOptions}
            />

            {/* ইউনিয়ন/ওয়ার্ড */}
            <FormSelect
              title={t('UNION_RESERVED_SEAT.UNION_OR_WARD')}
              name={ADD_UNION_RESERVED_SEAT.UNION}
              options={unions}
              required
              disabled={!watchSubDistrict}
              clearValue={resetData?.union}
              clearOptions={resetData?.unionOptions}
              resetData={() =>
                emptyBelowData({
                  ...clearUnionWardMulti,
                  union: false,
                  unionWardMultiOptions: false,
                })
              }
            />

            {/* অন্তর্ভুক্তি */}
            <FormSelect
              title={t('UNION_RESERVED_SEAT.INCLUDES')}
              name={ADD_UNION_RESERVED_SEAT.UNION_WARD_MULTI}
              options={unionsWardsMulti}
              isMulti
              required
              disabled={!watchUnion}
              clearValue={resetData?.unionWardMulti}
              clearOptions={resetData?.unionWardMultiOptions}
            />

            <FormInput
              registerName={ADD_UNION_RESERVED_SEAT.RESERVED_WARD_CODE}
              title={t('UNION_RESERVED_SEAT.RESERVED_WARD_NUMBER')}
              placeholder="PLACEHOLDER.ENTER"
              required
            />

            <FormInput
              registerName={ADD_UNION_RESERVED_SEAT.RESERVED_WARD_NAME_BN}
              title={t('UNION_RESERVED_SEAT.RESERVED_WARD_NAMEBN')}
              placeholder="PLACEHOLDER.ENTER"
              required
            />

            <FormInput
              registerName={ADD_UNION_RESERVED_SEAT.RESERVED_WARD_NAME_EN}
              title={t('UNION_RESERVED_SEAT.RESERVED_WARD_NAMEEN')}
              placeholder="PLACEHOLDER.ENTER"
              required
            />

            {/* btns */}
            <div className="d-flex justify-content-end gap-6 border-top py-12">
              <Button
                type="primary"
                htmlType="button"
                fill="outline"
                onClick={() => reset()}
              >
                <Text weight="semibold" size="sm">
                  {t('UNION_RESERVED_SEAT.RESET')}
                </Text>
                <IconRefreshCcw01 size="20" fill="primary" />
              </Button>

              <Button
                fill="fill"
                className="border-primary"
                type="primary"
                htmlType="submit"
                loading={loadingCreate || loadingUpdate}
              >
                <Text size="sm" weight="semibold" color="white">
                  {t('UNION_RESERVED_SEAT.SAVE')}
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

export default AddEditUnionReservedSeats;
