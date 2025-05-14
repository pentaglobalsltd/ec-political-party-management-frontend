import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { IconCalendar } from '@pentabd/icons';
import { RadioGroup, Text } from '@pentabd/ui';

import { useZillas } from '@hooks/miscellaneous/master-hook/zilla/useZillasDivison';

import {
  genderRadioOptions,
  maritalStatusRadioOptions,
} from '../../formOptions';
import { PERSONAL_INFO } from '@validations/candidate-info-management/operator/personalInfoValidation';
import FormInput from '@components/inputs/FormInput';
import FormDate from '@components/inputs/FormDate';
import FormSelect from '@components/inputs/FormSelect';
import Address from './Address';
import EmergencyContact from './EmergencyContact';
import CurrentWorkplace from './CurrentWorkplace';

const PersonalInfo = () => {
  const { t } = useTranslation();

  const { zillas, getZillasData: getZilla } = useZillas({
    notCallOnMount: true,
  });

  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext();

  const maritalStatusWatch = watch(PERSONAL_INFO.MARITAL_STATUS);

  useEffect(() => {
    getZilla();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FormInput
        title="CANDIDATE_PERSONAL_INFO.CANDIDATES_NAME"
        registerName={PERSONAL_INFO.CANDIDATE_NAME}
        placeholder={t('PLACEHOLDER.ENTER')}
      />

      <FormInput
        title="CANDIDATE_PERSONAL_INFO.CANDIDATES_NAME_EN"
        registerName={PERSONAL_INFO.CANDIDATE_NAME_EN}
        placeholder={t('PLACEHOLDER.ENTER')}
      />

      <FormInput
        title="CANDIDATE_PERSONAL_INFO.FATHER_NAME"
        registerName={PERSONAL_INFO.FATHER_NAME}
        placeholder={t('PLACEHOLDER.ENTER')}
      />

      <FormInput
        title="CANDIDATE_PERSONAL_INFO.FATHER_NAME_EN"
        registerName={PERSONAL_INFO.FATHER_NAME_EN}
        placeholder={t('PLACEHOLDER.ENTER')}
      />

      <FormInput
        title="CANDIDATE_PERSONAL_INFO.MOTHER_NAME"
        registerName={PERSONAL_INFO.MOTHER_NAME}
        placeholder={t('PLACEHOLDER.ENTER')}
      />

      <FormInput
        title="CANDIDATE_PERSONAL_INFO.MOTHER_NAME_EN"
        registerName={PERSONAL_INFO.MOTHER_NAME_EN}
        placeholder={t('PLACEHOLDER.ENTER')}
      />

      <FormInput
        title="CANDIDATE_PERSONAL_INFO.SPOUSE_NAME"
        registerName={PERSONAL_INFO.SPOUSE_NAME}
        placeholder={t('PLACEHOLDER.ENTER')}
      />

      <FormInput
        title="CANDIDATE_PERSONAL_INFO.SPOUSE_NAME_EN"
        registerName={PERSONAL_INFO.SPOUSE_NAME_EN}
        placeholder={t('PLACEHOLDER.ENTER')}
      />

      <FormDate
        name="PERSONAL_INFO.DATE_OF_BIRTH"
        title="CANDIDATE_PERSONAL_INFO.DATE_OF_BIRTH"
        registerName={PERSONAL_INFO.DATE_OF_BIRTH}
        prefix={<IconCalendar size="20" fill="subtitle2" />}
        placeholder={t('CANDIDATE_PERSONAL_INFO.DATE_OF_BIRTH')}
        maximumDate={dayjs()}
      />

      <FormInput
        title="CANDIDATE_PERSONAL_INFO.AGE"
        registerName={PERSONAL_INFO.AGE}
        placeholder={t('PLACEHOLDER.ENTER')}
      />

      <FormSelect
        title="CANDIDATE_PERSONAL_INFO.PLACE_OF_BIRTH"
        subtitle="CANDIDATE_PERSONAL_INFO.DISTRICT_NAME"
        name={PERSONAL_INFO.PLACE_OF_BIRTH}
        placeholder={t('PLACEHOLDER.SELECT')}
        options={zillas}
        isSearchable
      />

      <Text
        component="p"
        sizeType="fs"
        size="md"
        weight="semibold"
        className="mb-8"
      >
        {t('CANDIDATE_PERSONAL_INFO.ADDRESS')}
      </Text>

      <Address />

      <Text
        component="p"
        sizeType="fs"
        size="md"
        weight="semibold"
        className="mb-8"
      >
        {t('CANDIDATE_PERSONAL_INFO.EMERGENCY_CONTACT')}
      </Text>

      <EmergencyContact />

      <div className="row mb-8">
        <div className="col-3">
          <Text weight="medium" color="title" size="sm">
            {t('CANDIDATE_PERSONAL_INFO.GENDER')}
          </Text>

          <Text weight="light" color="title" size="sm" component="p">
            {t('CANDIDATE_PERSONAL_INFO.PUT_TICK')}
          </Text>
        </div>
        <div className="col-9 col-lg-7">
          <div className="d-flex gap-8">
            <RadioGroup
              {...register(PERSONAL_INFO.GENDER)}
              id="gender"
              options={genderRadioOptions(t)}
              error={errors as any}
            />
          </div>
        </div>
      </div>

      <div className="row mb-8">
        <div className="col-3">
          <Text weight="semibold" color="title" size="sm">
            {t('CANDIDATE_PERSONAL_INFO.MARITAL_STATUS')}
          </Text>
          <Text weight="semibold" className="text-danger">
            *
          </Text>
        </div>
        <div className="col-9 col-lg-7">
          <div className="d-flex gap-8">
            <RadioGroup
              {...register(PERSONAL_INFO.MARITAL_STATUS)}
              id="marital_status"
              options={maritalStatusRadioOptions(t)}
              error={errors as any}
              getTranslation={t}
            />
          </div>
        </div>
      </div>

      <Text
        component="p"
        sizeType="fs"
        size="md"
        weight="semibold"
        className="mb-8"
      >
        {t('CANDIDATE_PERSONAL_INFO.CURRENT_WORKPLACE')}
      </Text>

      <FormInput
        title="CANDIDATE_PERSONAL_INFO.OCCUPATION"
        registerName={PERSONAL_INFO.OCCUPATION}
        placeholder={t('PLACEHOLDER.ENTER')}
      />

      <CurrentWorkplace />

      <FormInput
        title="CANDIDATE_PERSONAL_INFO.SPOUSE_OCCUPATION"
        registerName={PERSONAL_INFO.SPOUSE_OCCUPATION}
        placeholder={t('PLACEHOLDER.ENTER')}
      />
    </>
  );
};

export default PersonalInfo;
