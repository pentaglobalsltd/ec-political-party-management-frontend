/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import dayjs from 'dayjs';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { Button, Header } from '@pentabd/ui';
import { IconCalendar, IconCheckCircleBroken } from '@pentabd/icons';

import useElectionTypesCore from '@hooks/miscellaneous/core-hook/election-type/useElectionTypesCore';
import useElectionCandidateTypes from '@hooks/miscellaneous/master-hook/candidate-type/useElectionCandidateType';
import { useGetUserProfileFromRedux } from '@hooks/user-management/useGetUserProfileFromRedux';
import useElectionSchedulesCandidateTypeZillas from '@hooks/miscellaneous/core-hook/zilla/useCandiateTypeZillas';
import { useRegistrationValidation } from '@hooks/candidate-info-management/operator-view/useRegistrationValidation';
import useElectionSchedulesRegions from '@hooks/miscellaneous/core-hook/region/useElectionSchedulesRegions';
import useElectionSchedulesWithDate from '@hooks/miscellaneous/core-hook/election-schedules-with-date/useElectionSchedulesWithDate';
import {
  TypeRegisterNewNomination,
  useAddCandidateNominationForm,
} from '@hooks/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/add-new-nomination-of-candidate/useAddCandidateNominationForm';

import { ROUTES } from '@constants/routes';
import { FORM_FIELDS } from '@constants/forms';
import FormDate from '@components/inputs/FormDate';
import FormInput from '@components/inputs/FormInput';
import FormSelect from '@components/inputs/FormSelect';
import { nominationOfCandidatesTableBreadcrumbs } from './constants';
import ElectionSpecificComponents from './election-specific-components';
import { nominationFormCommonValidation } from '@validations/candidate-info-management/operator/nominationForm/add-new-nomination-of-candidate/addNewNominationValidation';

const PERSONAL =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM
    .ADD_NEW_NOMINATION.PERSONAL;

const NOMINATION =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM
    .ADD_NEW_NOMINATION.NOMINATION;

type FormData = yup.InferType<typeof nominationFormCommonValidation>;

const AddNewNominationOfCandidate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { requested } = useAddCandidateNominationForm();
  const { userProfileDetails } = useGetUserProfileFromRedux();

  const { validation, setElectionWiseValidation } = useRegistrationValidation();
  const { electionTypesCore, getElectionTypesCoreData } =
    useElectionTypesCore();
  const { electionSchedulesWithDate, getElectionSchedulesDataWithDate } =
    useElectionSchedulesWithDate();

  const { electionCandidateTypes, getElectionCandidateTypesData } =
    useElectionCandidateTypes();
  const { electionSchedulesRegions, getElectionSchedulesRegionsData } =
    useElectionSchedulesRegions();

  const {
    addNewNomination,
    isSuccess,
    newNominationRestore,
    newNominationData,
  } = useAddCandidateNominationForm();

  const {
    candidateTypeDistrict,
    getElectionSchedulesCandidateTypeDistrictData,
  } = useElectionSchedulesCandidateTypeZillas();

  const methods = useForm<FormData>({
    resolver: yupResolver(validation) as any,
    values: userProfileDetails,
  });

  const { watch } = methods;

  const electionId = watch(NOMINATION.TYPE);
  const electionSchedulesId = watch(NOMINATION.NAME);
  const electionSchedulesZillaId = watch(NOMINATION.DISTRICT);
  const electionSchedulesRegionId = watch(NOMINATION.DEPARTMENT);
  const electionSchedulesCandidateId = watch(NOMINATION.POST);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (data) {
      const regBody: TypeRegisterNewNomination = {
        electionScheduleId: Number(data[NOMINATION.NAME]),
        electionSettingsId: Number(data[NOMINATION.CONSTITUENCY]),
        dob: data[PERSONAL.BIRTH_DATE],
        nid: data[PERSONAL.NID],
        phone: data[PERSONAL.MOBILE],
        email: data[PERSONAL.EMAIL],
        matchImage: '',
      };

      addNewNomination(regBody);
    }
  };

  useEffect(() => {
    setElectionWiseValidation(electionId, electionSchedulesCandidateId);
  }, [electionId, electionSchedulesCandidateId]);

  useEffect(() => {
    getElectionTypesCoreData();
  }, []);

  useEffect(() => {
    if (electionId) {
      getElectionCandidateTypesData(electionId);
    }
  }, [electionId]);

  useEffect(() => {
    if (electionId) {
      getElectionSchedulesDataWithDate(electionId);
    }
  }, [electionId]);

  useEffect(() => {
    if (electionSchedulesId) {
      getElectionSchedulesRegionsData(electionSchedulesId);
    }
  }, [electionSchedulesId]);

  useEffect(() => {
    if (
      electionSchedulesId &&
      electionSchedulesCandidateId &&
      electionSchedulesRegionId
    ) {
      getElectionSchedulesCandidateTypeDistrictData(
        electionSchedulesId,
        electionSchedulesCandidateId,
        electionSchedulesRegionId,
      );
    }
  }, [
    electionSchedulesId,
    electionSchedulesCandidateId,
    electionSchedulesRegionId,
  ]);

  useEffect(() => {
    if (isSuccess) {
      const candidateElectionDetailsId = newNominationData?.id;
      const electionSettingsId = newNominationData?.electionSettingsId;
      const electionTypeId = newNominationData?.electionTypeId;
      const candidateTypeId = newNominationData?.candidateTypeId;
      const electionScheduleId = newNominationData?.electionScheduleId;

      newNominationRestore();
      navigate(
        ROUTES.EDIT_NOMINATION_OF_CANDIDATE({
          electionSettingsId,
          candidateElectionDetailsId,
          electionTypeId,
          candidateTypeId,
          scheduleId: electionScheduleId,
          isFromNominationPage: 'true',
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, newNominationRestore]);

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('NOMINATION_OF_CANDIDATES.NOMINATION_OF_CANDIDATES'),
        }}
        breadcrumbs={nominationOfCandidatesTableBreadcrumbs(t)}
      />

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="container-96 my-12"
        >
          {/* নির্বাচনের ধরন */}
          <FormSelect
            title="REGISTRATION.ELECTION_TYPE"
            name={NOMINATION.TYPE}
            options={electionTypesCore}
            placeholder={t('PLACEHOLDER.SELECT')}
            required
          />
          {/* নির্বাচনের নাম */}
          <FormSelect
            title="REGISTRATION.ELECTION_NAME"
            name={NOMINATION.NAME}
            options={electionSchedulesWithDate}
            placeholder={t('PLACEHOLDER.SELECT')}
            required
          />
          {/* পদ */}
          <FormSelect
            title="REGISTRATION.POST"
            name={NOMINATION.POST}
            options={electionCandidateTypes}
            placeholder={t('PLACEHOLDER.SELECT')}
            required
          />
          {/* বিভাগ */}
          <FormSelect
            title="REGISTRATION.DEPARTMENT"
            name={NOMINATION.DEPARTMENT}
            options={electionSchedulesRegions}
            placeholder={t('PLACEHOLDER.SELECT')}
            required
          />
          {/* জেলা */}
          <FormSelect
            title="REGISTRATION.DISTRICT"
            name={NOMINATION.DISTRICT}
            options={candidateTypeDistrict}
            placeholder={t('PLACEHOLDER.SELECT')}
            disabled={candidateTypeDistrict.length === 0}
            required
          />
          {/* নির্বাচনী আসনে */}

          <ElectionSpecificComponents
            watch={watch}
            electionId={electionId}
            electionScheduleId={electionSchedulesId}
            candidateTypeId={electionSchedulesCandidateId}
            zillaId={electionSchedulesZillaId}
          />

          {/* জন্মতারিখ */}
          <FormDate
            name={PERSONAL.BIRTH_DATE}
            title="REGISTRATION.BIRTH_DATE"
            placeholder={t('PLACEHOLDER.SELECT')}
            registerName={PERSONAL.BIRTH_DATE}
            prefix={<IconCalendar size="20" fill="subtitle2" />}
            maximumDate={dayjs()}
            required
          />
          {/* এন.আই.ডি নম্বর */}
          <FormInput
            title="REGISTRATION.NID"
            placeholder={t('PLACEHOLDER.ENTER')}
            registerName={PERSONAL.NID}
            required
          />
          {/* মোবাইল নম্বর */}
          <FormInput
            title="REGISTRATION.MOBILE"
            placeholder={t('PLACEHOLDER.ENTER')}
            registerName={PERSONAL.MOBILE}
            required
          />
          {/* ই-মেইল */}
          <FormInput
            title="REGISTRATION.EMAIL"
            placeholder={t('PLACEHOLDER.ENTER')}
            registerName={PERSONAL.EMAIL}
          />

          <div className="py-8 col-12 d-flex justify-content-end gap-6">
            <Button
              fill="fill"
              className="border-primary"
              type="success"
              htmlType="submit"
              loading={requested}
            >
              {t('NOMINATION_FORM_FIRST_PART.SUBMIT_BUTTON')}
              <IconCheckCircleBroken size="20" fill="white" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
export default AddNewNominationOfCandidate;
