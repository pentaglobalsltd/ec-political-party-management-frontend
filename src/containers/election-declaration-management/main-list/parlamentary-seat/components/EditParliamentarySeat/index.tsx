import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { IconCheckCircleBroken } from '@pentabd/icons';
import { Button, Header } from '@pentabd/ui';

import FormSelect from '@components/inputs/FormSelect';
import { FORM_FIELDS } from '@constants/forms';
import {
  ParliamentarySeatDataType,
  parliamentarySeatValidation,
} from '@validations/election-declaration-management/main-list/parliamentary-seat/parliamentarySeatValidation';
import { editParliamentarySeatBreadcrumbs } from '../../constants';
import { useGetConstituency } from '@hooks/election-schedule-management/main-list/constituency/useGetConstituency';
import { useEffect } from 'react';
import { useConstituencyUpazila } from '@hooks/miscellaneous/master-hook/constituency/useConstituencyUpazilas';
import { useUnionsOrWards } from '@hooks/miscellaneous/master-hook/union-or-ward/useUnionsOrWardsSelect';

import { useMainListSearch } from '@hooks/advanced-search-hook/useMainListSearch';
import { useUpdateConstituencyLocation } from '@hooks/election-schedule-management/main-list/constituency/useUpdateConstituencyLocation';

const PARLIAMENTARY_SEAT =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.PARLIAMENTARY_SEAT
    .CREATE_PARLIAMENTARY_SEAT;

function EditParliamentarySeat() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { constituency, getConstituency } = useGetConstituency();
  const { editConstituencyLocation, success } = useUpdateConstituencyLocation();
  const navigate = useNavigate();

  const { upazilas, getConstituenciesUpazilaData } = useConstituencyUpazila();
  const { unionsOrWards, getUnionsOrWardsData } = useUnionsOrWards();

  const methods = useForm<ParliamentarySeatDataType>({
    resolver: yupResolver(parliamentarySeatValidation),
    values: constituency,
  });

  const { handleSubmit, watch } = methods;
  const regionWatch = watch(PARLIAMENTARY_SEAT.DIVISION);
  const districtWatch = watch(PARLIAMENTARY_SEAT.DISTRICT);
  const constituencyWatch = watch(PARLIAMENTARY_SEAT.PARLIAMENTARY_SEAT);
  const subdistrictWatch = watch(PARLIAMENTARY_SEAT.SUB_DISTRICT);

  const { regions, zillas, constituencies } = useMainListSearch({
    regionWatch,
    districtWatch,
    inputs: {
      region: true,
      district: true,
      constituency: true,
    },
  });

  useEffect(() => {
    if (constituencyWatch) {
      getConstituenciesUpazilaData(constituencyWatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [constituencyWatch]);

  useEffect(() => {
    if (subdistrictWatch) {
      getUnionsOrWardsData({ upazilaId: subdistrictWatch });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subdistrictWatch]);

  const updateParliamentarySeatForm = (data: any) => {
    const newData = {
      constituencyId: data.constituencyId,
      unionOrWardId: data.unionOrWardId,
    };
    editConstituencyLocation(Number(id), newData);
  };

  useEffect(() => {
    if (id) {
      getConstituency(Number(id));
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (success) {
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <div className="container-96 mb-24">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(updateParliamentarySeatForm)}>
          <Header
            className="mb-10 pt-10"
            headerText={{
              header: t('PARLIAMENTARY_SEAT.PARLIAMENTARY_SEAT_CHANGE'),
            }}
            breadcrumbs={editParliamentarySeatBreadcrumbs(t)}
          />

          <div className="mb-9">
            <div className="d-flex flex-column gap-8 p-9 border rounded-5">
              <FormSelect
                title={t('PARLIAMENTARY_SEAT.DIVISION')}
                name={PARLIAMENTARY_SEAT.DIVISION}
                options={regions}
                disabled={regions?.length === 0}
              />

              <FormSelect
                title={t('PARLIAMENTARY_SEAT.DISTRICT')}
                name={PARLIAMENTARY_SEAT.DISTRICT}
                options={zillas}
                disabled={zillas?.length === 0}
              />

              <FormSelect
                title={t('PARLIAMENTARY_SEAT.PARLIAMENTARY_SEAT')}
                name={PARLIAMENTARY_SEAT.PARLIAMENTARY_SEAT}
                options={constituencies}
                disabled={constituencies?.length === 0}
              />

              <FormSelect
                title={t('PARLIAMENTARY_SEAT.SUB_DISTRICT')}
                name={PARLIAMENTARY_SEAT.SUB_DISTRICT}
                options={upazilas}
                disabled={upazilas?.length === 0}
              />

              <FormSelect
                title={t('PARLIAMENTARY_SEAT.UNION')}
                name={PARLIAMENTARY_SEAT.UNION}
                options={unionsOrWards}
                disabled={unionsOrWards?.length === 0}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end align-items-center gap-6 border-top py-8">
            <Button fill="outline" key={1} htmlType="button" type="light">
              {t('PARLIAMENTARY_SEAT.BACK')}
            </Button>
            <Button key={2} htmlType="submit" type="success">
              {t('PARLIAMENTARY_SEAT.FILED')}
              <IconCheckCircleBroken size="20" fill="light" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default EditParliamentarySeat;
