import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { Button, Header } from '@pentabd/ui';
import { IconCheckCircleBroken, IconRefreshCcw01 } from '@pentabd/icons';

import FormInput from '@components/inputs/FormInput';
import FormSelect from '@components/inputs/FormSelect';
import FormInputDouble from '@components/inputs/FormInputDouble';
import { FORM_FIELDS } from '@constants/forms';
import {
  editedReservedSeatListBreadcrumbs,
  newReservedSeatListBreadcrumbs,
} from '../constants';
import { rmos, status } from './constants';
import {
  ReservedSeatListDataType,
  reservedSeatListValidation,
} from '@validations/election-declaration-management/main-list/reserved-seat-list/reservedSeatListValidation';

import { useRegionListSelect } from '@hooks/election-schedule-management/main-list/region/useRegionListSelect';
import { useZillas } from '@hooks/miscellaneous/master-hook/zilla/useZillasDivison';
import { useMunicipalityListSelect } from '@hooks/election-schedule-management/main-list/reserve-seat-list/useMunicipalityListSelect';

import { useCreateReservedWard } from '@hooks/election-schedule-management/main-list/reserved-ward/useCreateReservedWard';
import { useUpdateReservedWard } from '@hooks/election-schedule-management/main-list/reserved-ward/useUpdateReservedWard';
import { useGetReservedWard } from '@hooks/election-schedule-management/main-list/reserved-ward/useGetReservedWard';
import { useInclusionListSelect } from '@hooks/election-schedule-management/main-list/reserve-seat-list/useInclusionListSelect';

import { useUpalizaByMunicipalityListSelect } from '@hooks/election-schedule-management/main-list/sub-district/useUpalizaByMunicipalityListSelect';

const RESERVED_SEAT_LIST =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.RESERVED_SEAT_LIST
    .CREATE_RESERVED_SEAT_LIST;

function ReservedSeat() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { regions, getRegionListSelect } = useRegionListSelect();
  const { zillas, getZillasData } = useZillas({ notCallOnMount: true });
  const { municipalities, getMunicipalityListSelect } =
    useMunicipalityListSelect();
  const { upazilas, getUpalizaByMunicipalityListSelect } =
    useUpalizaByMunicipalityListSelect();
  const { inclusions, getInclusionListSelect } = useInclusionListSelect();

  const { createReservedWard, loading, success } = useCreateReservedWard();
  const {
    updateReservedWard,
    loading: updateLoading,
    success: updateSuccess,
  } = useUpdateReservedWard();
  const { reservedWard, getReservedWard } = useGetReservedWard();

  const methods = useForm<ReservedSeatListDataType>({
    resolver: yupResolver(reservedSeatListValidation),
    values: reservedWard as any,
  });
  const { handleSubmit, reset, watch } = methods;

  const rmoWatch = watch(RESERVED_SEAT_LIST.RMO) as string;
  const regionWatch = watch(RESERVED_SEAT_LIST.DIVISION) as string;
  const districtWatch = watch(RESERVED_SEAT_LIST.DISTRICT) as string;
  const municipalityWatch = watch(RESERVED_SEAT_LIST.MUNICIPALITY) as string;

  const onSubmitForm: SubmitHandler<ReservedSeatListDataType> = (
    data: ReservedSeatListDataType,
  ) => {
    const {
      code,
      municipalityId,
      municipalityWardIds,
      nameBn,
      nameEn,
      rmo,
      upazilaId,
      isActive,
    } = data;
    if (id) {
      updateReservedWard(id, {
        code: Number(code),
        municipalityId: Number(municipalityId),
        nameBn: nameBn as string,
        nameEn: nameEn as string,
        rmo: rmo as string,
        municipalityWardIds:
          municipalityWardIds &&
          ((municipalityWardIds?.length > 4
            ? municipalityWardIds.slice(0, 4)
            : municipalityWardIds) as number[]),
        ...(upazilaId && { upazilaId: Number(upazilaId) }),
        isActive: isActive === '1' ? true : false,
      });
    } else {
      createReservedWard({
        code: Number(code),
        municipalityId: Number(municipalityId),
        nameBn: nameBn as string,
        nameEn: nameEn as string,
        rmo: rmo as string,
        municipalityWardIds:
          municipalityWardIds &&
          ((municipalityWardIds?.length > 4
            ? municipalityWardIds.slice(0, 4)
            : municipalityWardIds) as number[]),
        ...(upazilaId && { upazilaId: Number(upazilaId) }),
        isActive: isActive === '1' ? true : false,
      });
    }
  };

  const resetReservedSeatListForm = () => {
    reset();
  };

  useEffect(() => {
    getRegionListSelect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (regionWatch) {
      getZillasData(regionWatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionWatch]);

  useEffect(() => {
    if (districtWatch && rmoWatch) {
      getMunicipalityListSelect({ districtId: districtWatch, rmoEn: rmoWatch });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtWatch, rmoWatch]);

  useEffect(() => {
    if (municipalityWatch || reservedWard?.municipalityId) {
      getUpalizaByMunicipalityListSelect(
        municipalityWatch || reservedWard?.municipalityId || '',
        districtWatch,
      );
      getInclusionListSelect({
        municipality: municipalityWatch || reservedWard?.municipalityId || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [municipalityWatch, districtWatch, reservedWard]);

  useEffect(() => {
    if (id) {
      getReservedWard(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (success || updateSuccess) {
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, updateSuccess]);

  return (
    <div className="container-96 mb-24">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Header
            className="mb-10 pt-10"
            headerText={{
              header: id
                ? t('RESERVED_SEAT_LIST.CHANGE')
                : t('RESERVED_SEAT_LIST.ADD_NEW'),
            }}
            breadcrumbs={
              id
                ? editedReservedSeatListBreadcrumbs(t)
                : newReservedSeatListBreadcrumbs(t)
            }
          />

          <div className="mb-9">
            <div className="d-flex flex-column gap-8 p-9 border rounded-5">
              <FormSelect
                title={t('RESERVED_SEAT_LIST.RMO')}
                name={RESERVED_SEAT_LIST.RMO}
                options={rmos}
              />

              <FormSelect
                title={t('RESERVED_SEAT_LIST.DIVISION')}
                name={RESERVED_SEAT_LIST.DIVISION}
                options={regions}
                disabled={regions?.length === 0}
              />

              <FormSelect
                title={t('RESERVED_SEAT_LIST.DISTRICT')}
                name={RESERVED_SEAT_LIST.DISTRICT}
                options={zillas}
                disabled={zillas?.length === 0}
              />

              <FormSelect
                title={t('RESERVED_SEAT_LIST.MUNICIPALITY_OR_CITY_CORPORATION')}
                name={RESERVED_SEAT_LIST.MUNICIPALITY}
                options={municipalities}
                disabled={municipalities?.length === 0}
              />

              <FormSelect
                title={t('RESERVED_SEAT_LIST.SUB_DISTRICT')}
                name={RESERVED_SEAT_LIST.SUB_DISTRICT}
                options={upazilas}
                disabled={upazilas?.length === 0}
              />

              <FormInput
                title={t('RESERVED_SEAT_LIST.RESERVED_WARD_NO')}
                placeholder={t('PLACEHOLDER.ENTER')}
                registerName={RESERVED_SEAT_LIST.RESERVED_WARD_NO}
              />

              <FormInputDouble
                title="RESERVED_SEAT_LIST.RESERVED_WARD"
                placeholder={t('PLACEHOLDER.ENTER')}
                registerName={{
                  type1: RESERVED_SEAT_LIST.RESERVED_WARD_BN,
                  type2: RESERVED_SEAT_LIST.RESERVED_WARD_EN,
                }}
                inputLabel1="RESERVED_SEAT_LIST.BANGLA"
                inputLabel2="RESERVED_SEAT_LIST.ENGLISH"
              />

              <FormSelect
                title={t('RESERVED_SEAT_LIST.INCLUSION')}
                subtitle={t('RESERVED_SEAT_LIST.INCLUSION_SUB')}
                name={RESERVED_SEAT_LIST.INCLUSION}
                options={inclusions}
                isMulti
                numberOfSelection={4}
              />

              <FormSelect
                title={t('RESERVED_SEAT_LIST.CONDITION')}
                name={RESERVED_SEAT_LIST.CONDITION}
                options={status}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end align-items-center gap-6 border-top py-8">
            <Button
              fill="outline"
              key={1}
              htmlType="button"
              type="primary"
              onClick={resetReservedSeatListForm}
              loading={loading || updateLoading}
            >
              {t('RESERVED_SEAT_LIST.RESET')}
              <IconRefreshCcw01 size="20" fill="primary" />
            </Button>
            <Button
              key={2}
              htmlType="submit"
              type="success"
              loading={loading || updateLoading}
            >
              {t('RESERVED_SEAT_LIST.FILED')}
              <IconCheckCircleBroken size="20" fill="light" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default ReservedSeat;
