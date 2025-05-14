import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconCheckCircleBroken, IconRefreshCcw01 } from '@pentabd/icons';
import { Button, Header, Text } from '@pentabd/ui';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import FormSelect from '@components/inputs/FormSelect';
import { FORM_FIELDS } from '@constants/forms';
import { useNominationListSearch } from '@hooks/advanced-search-hook/useNominationListSearchHook';

import {
  NewElectionSettingsDataType,
  newElectionSettingsValidation,
} from '@validations/election-declaration-management/election/electionSettingsValidation';
import { VOTING_TYPE, newElectionSettingsBreadcrumbs } from './constants';
import { useCreateElectionSettings } from '@hooks/election-schedule-management/election/election-settings/useCreateElectionSettings';
import {
  CreateElectionSettingsType,
  ElectionSettingsContextDataType,
} from '@type/election-declaration-management/election/election-settings';
import { ROUTES } from '@constants/routes';
import ElectionWiseLocations from '../components/ElectionWiseLocations';

interface ElectionSettingContextType {
  addElectionSetting: ElectionSettingsContextDataType[];
  setAddElectionSettings: React.Dispatch<
    React.SetStateAction<ElectionSettingsContextDataType[]>
  >;
}

export const ElectionSettingContext = createContext<
  ElectionSettingContextType | undefined
>(undefined);

function CreateElectionSettings() {
  const [addElectionSetting, setAddElectionSettings] = useState<
    ElectionSettingsContextDataType[]
  >([]);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createSettings, loading, success } = useCreateElectionSettings();
  const ELECTION_SETTINGS =
    FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.ELECTION.ELECTION_SETTINGS;

  const methods = useForm<NewElectionSettingsDataType>({
    resolver: yupResolver(newElectionSettingsValidation),
  });

  const { register, handleSubmit, reset, watch } = methods;
  const electionTypeWatch = watch(ELECTION_SETTINGS.ELECTION_TYPE) as string;

  const electionScheduleWatch = watch(
    ELECTION_SETTINGS.ELECTION_NAME,
  ) as string;
  const candidateTypeWatch = watch(ELECTION_SETTINGS.CANDIDATE_TYPE) as string;

  useEffect(() => {
    setAddElectionSettings([]);
  }, [electionTypeWatch, electionScheduleWatch, candidateTypeWatch]);
  useEffect(() => {
    if (success) {
      navigate(
        `${ROUTES.ELECTION_DECLARATION_MANAGEMENT}/${ROUTES.ELECTION_SETTINGS}`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const submitElectionSettingsForm = (data: any) => {
    const formData: CreateElectionSettingsType[] = [];

    addElectionSetting?.forEach((item: any) => {
      formData.push({
        ...item,
        electionScheduleId: parseInt(data.electionScheduleId),
        candidateTypeId: parseInt(data.candidateTypeId),
        // regionId: item.regionId,
        // zillaId: item.zillaId,
        // constituencyId: item.constituencyId,
        isVoterAreaDivided: data.isVoterAreaDivided,
        isResultFromTab: data.isResultFromTab,
        votingType: data.electionByEvm ? VOTING_TYPE.EVM : VOTING_TYPE.BALLOT,
      });
    });

    createSettings(formData);
  };

  const resetElectionSettingsForm = () => {
    reset();
  };

  const { electionTypesMaster, electionSchedules, electionCandidateTypes } =
    useNominationListSearch({
      electionTypeWatch,
      electionScheduleWatch,
      inputs: {
        electionType: true,
        electionName: true,
        candidateType: true,
      },
    });

  return (
    <ElectionSettingContext.Provider
      value={{ addElectionSetting, setAddElectionSettings }}
    >
      <div className="container-96 mb-24 py-9">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(submitElectionSettingsForm)}>
            <Header
              className="mb-10 pt-10"
              headerText={{
                header: t('ELECTION_SETTINGS.NEW_ELECTION_SETTINGS'),
              }}
              breadcrumbs={newElectionSettingsBreadcrumbs(t)}
            />

            <div className="d-flex flex-column gap-8 p-9 border rounded-5">
              <FormSelect
                title={t('ELECTION_SETTINGS.ELECTION_TYPE')}
                name={ELECTION_SETTINGS.ELECTION_TYPE}
                options={electionTypesMaster}
              />

              <FormSelect
                title={t('ELECTION_SETTINGS.ELECTION_NAME')}
                name={ELECTION_SETTINGS.ELECTION_NAME}
                options={electionSchedules}
              />

              <FormSelect
                title={t('ELECTION_SETTINGS.CANDIDATE_TYPE')}
                name={ELECTION_SETTINGS.CANDIDATE_TYPE}
                options={electionCandidateTypes}
              />

              <div className="d-flex flex-column gap-8 pt-9 border-top">
                <div className="row">
                  <div className="col-3">
                    <Text weight="bold" size="sm" color="title">
                      {t('ELECTION_SETTINGS.AREA_VOTE_CENTER')}
                    </Text>
                  </div>
                  <div className="col-9 col-lg-7">
                    <input
                      type="checkbox"
                      id={ELECTION_SETTINGS.AREA_VOTE_CENTER}
                      {...register(ELECTION_SETTINGS.AREA_VOTE_CENTER)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-3">
                    <Text weight="bold" size="sm" color="title">
                      {t('ELECTION_SETTINGS.ELECTION_BY_TAB')}
                    </Text>
                  </div>
                  <div className="col-9 col-lg-7">
                    <input
                      type="checkbox"
                      id={ELECTION_SETTINGS.ELECTION_BY_TAB}
                      {...register(ELECTION_SETTINGS.ELECTION_BY_TAB)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-3">
                    <Text weight="bold" size="sm" color="title">
                      {t('ELECTION_SETTINGS.ELECTION_BY_EVM')}
                    </Text>
                  </div>
                  <div className="col-9 col-lg-7">
                    <input
                      type="checkbox"
                      id={ELECTION_SETTINGS.ELECTION_BY_EVM}
                      {...register(ELECTION_SETTINGS.ELECTION_BY_EVM)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {electionTypeWatch &&
            candidateTypeWatch &&
            electionScheduleWatch ? (
              <>
                <div className="py-9">
                  <Text weight="bold" size="lg" color="title">
                    {t('ELECTION_SETTINGS.SELECT_NEEDED_AREA')}
                  </Text>
                </div>
                <ElectionWiseLocations
                  electionTypeId={electionTypeWatch}
                  candidateTypeId={candidateTypeWatch}
                  electionScheduleId={electionScheduleWatch}
                />
              </>
            ) : null}

            <div className="d-flex justify-content-end align-items-center gap-6 border-top pt-8">
              <Button
                fill="outline"
                key={1}
                htmlType="button"
                type="info"
                onClick={resetElectionSettingsForm}
              >
                {t('ELECTION_SETTINGS.RESET')}
                <IconRefreshCcw01 size="20" fill="info" />
              </Button>
              <Button
                key={2}
                htmlType="submit"
                type="success"
                loading={loading}
                disabled={addElectionSetting.length ? false : true}
              >
                {t('ELECTION_SETTINGS.FILED')}
                <IconCheckCircleBroken size="20" fill="light" />
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </ElectionSettingContext.Provider>
  );
}

export default CreateElectionSettings;
