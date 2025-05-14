import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import { Text, Button, InputSelect, InputCheck } from '@pentabd/ui';
import { SelectionType } from '@pentabd/ui/build/atoms/select/types';

import { options } from '@containers/election-declaration-management/election/election-settings/constants';
import { FORM_FIELDS } from '@constants/forms';
import {
  ChangedSettingsModalDataType,
  changedSettingsModalValidation,
} from '@validations/election-declaration-management/election/electionSettingsValidation';

const ELECTION_SETTINGS =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.ELECTION.ELECTION_SETTINGS;

function ChangedSettingsModal({ openSettingsModal, closeSettingsModal }: any) {
  const { t } = useTranslation();
  const methods = useForm<ChangedSettingsModalDataType>({
    resolver: yupResolver(changedSettingsModalValidation),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = methods;
  const submitChangedSettingsFormData = (data: any) => {
    console.log(data);
  };

  return (
    <form
      className="column p-9 g-3"
      onSubmit={handleSubmit(submitChangedSettingsFormData)}
    >
      <div className="mt-8">
        <Text size="2xl" weight="bold" color="title">
          {t('ELECTION_SETTINGS.CHANGE_SETTINGS')}
        </Text>
      </div>
      <div className="d-flex flex-column gap-12 py-12">
        <Controller
          control={control}
          name={ELECTION_SETTINGS.TAB_CENTER}
          render={({ field }) => (
            <InputSelect
              title={t('ELECTION_SETTINGS.TAB_CENTER')}
              name={ELECTION_SETTINGS.TAB_CENTER}
              onSelectItem={(data: SelectionType) => field.onChange(data)}
              minWidth
              options={options}
              error={errors as any}
            />
          )}
        />
        <Controller
          control={control}
          name={ELECTION_SETTINGS.EVM}
          render={({ field }) => (
            <InputSelect
              title={t('ELECTION_SETTINGS.EVM')}
              name={ELECTION_SETTINGS.EVM}
              onSelectItem={(data: SelectionType) => field.onChange(data)}
              minWidth
              options={options}
              error={errors as any}
            />
          )}
        />

        <InputCheck
          id={ELECTION_SETTINGS.AREA_VOTE_CENTER}
          {...register(ELECTION_SETTINGS.AREA_VOTE_CENTER)}
          title={t('ELECTION_SETTINGS.AREA_VOTE_CENTER')}
        />

        <InputCheck
          id={ELECTION_SETTINGS.ELECTION_BY_TAB}
          {...register(ELECTION_SETTINGS.ELECTION_BY_TAB)}
          title={t('ELECTION_SETTINGS.ELECTION_BY_TAB')}
        />

        <InputCheck
          id={ELECTION_SETTINGS.ELECTION_BY_EVM}
          {...register(ELECTION_SETTINGS.ELECTION_BY_EVM)}
          title={t('ELECTION_SETTINGS.ELECTION_BY_EVM')}
        />
      </div>
      <div className="d-flex justify-content-center gap-7 mt-10">
        <Button
          fill="outline"
          type="light"
          className="flex-fill"
          htmlType="button"
          onClick={closeSettingsModal}
        >
          {t('ELECTION_SETTINGS.CLOSE')}
        </Button>
        <Button
          fill="fill"
          type="primary"
          className="flex-fill"
          htmlType="submit"
          onClick={openSettingsModal}
        >
          {t('ELECTION_SETTINGS.UPDATE')}
        </Button>
      </div>
    </form>
  );
}

export default ChangedSettingsModal;
