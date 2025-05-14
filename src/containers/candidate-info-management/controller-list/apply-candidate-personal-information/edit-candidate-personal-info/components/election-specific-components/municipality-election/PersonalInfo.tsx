import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { IconCalendar } from '@pentabd/icons';
import { RadioGroup, Text } from '@pentabd/ui';

import FormDate from '@components/inputs/FormDate';
import FormInput from '@components/inputs/FormInput';
import FormSelect from '@components/inputs/FormSelect';
import Address from './Address';
import CurrentWorkplace from './CurrentWorkplace';
import EmergencyContact from './EmergencyContact';

import {
  genderRadioOptions,
  maritalStatusRadioOptions,
} from '../../formOptions';
import { useZillas } from '@hooks/miscellaneous/master-hook/zilla/useZillasDivison';

import { PERSONAL_INFO } from '@validations/candidate-info-management/operator/personalInfoValidation';

const PersonalInfo = () => {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { zillas, getZillasData: getZilla } = useZillas({
    notCallOnMount: true,
  });

  useEffect(() => {
    getZilla();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FormInput
        title="CANDIDATE_PERSONAL_INFO.CANDIDATES_NAME"
        registerName={PERSONAL_INFO.CANDIDATE_NAME}
      />

      <FormInput
        title="CANDIDATE_PERSONAL_INFO.CANDIDATES_NAME_EN"
        registerName={PERSONAL_INFO.CANDIDATE_NAME_EN}
      />

      <FormInput
        title="CANDIDATE_PERSONAL_INFO.FATHER_NAME"
        registerName={PERSONAL_INFO.FATHER_NAME}
      />

      <FormInput
        title="CANDIDATE_PERSONAL_INFO.FATHER_NAME_EN"
        registerName={PERSONAL_INFO.FATHER_NAME_EN}
      />

      <FormInput
        title="CANDIDATE_PERSONAL_INFO.MOTHER_NAME"
        registerName={PERSONAL_INFO.MOTHER_NAME}
      />

      <FormInput
        title="CANDIDATE_PERSONAL_INFO.MOTHER_NAME_EN"
        registerName={PERSONAL_INFO.MOTHER_NAME_EN}
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
        maximumDate={dayjs()}
      />

      <FormInput
        title="CANDIDATE_PERSONAL_INFO.AGE"
        registerName={PERSONAL_INFO.AGE}
      />

      <FormSelect
        title="CANDIDATE_PERSONAL_INFO.PLACE_OF_BIRTH"
        subtitle="CANDIDATE_PERSONAL_INFO.DISTRICT_NAME"
        name={PERSONAL_INFO.PLACE_OF_BIRTH}
        options={zillas}
      />

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

      <div className="row mb-8">
        <div className="col-3">
          <Text weight="semibold" color="title" size="sm" component="p">
            {t('CANDIDATE_PERSONAL_INFO.GENDER')}
          </Text>
          <Text weight="medium" color="subtitle2" size="xs" component="p">
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
              getTranslation={t}
            />
          </div>
        </div>
      </div>

      <div className="row mb-8">
        <div className="col-3">
          <Text weight="semibold" color="title" size="sm" component="p">
            {t('CANDIDATE_PERSONAL_INFO.MARITAL_STATUS')}{' '}
            {<span className="text-danger">*</span>}
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
        placeholder={t('PLACEHOLDER.ENTER')}
        registerName={PERSONAL_INFO.OCCUPATION}
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
