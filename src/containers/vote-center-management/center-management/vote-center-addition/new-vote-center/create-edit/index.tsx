import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import FormHeader from './components/FormHeader';
import { yupResolver } from '@hookform/resolvers/yup';
import AddVoterArea from './components/add-voter-area';
import FormFooterBtns from './components/FormFooterBtns';
import AddCenterInfo from './components/add-center-info';
import InstitutionReport from './components/institution-report';
import { VOTE_CENTER_MANAGEMENT } from '@constants/forms/vote-center-management/vote-center-management';
import useCreatePollingCenter from '@hooks/vote-center-management/center-management/polling-center/useCreatePollingCenter';
import useUpdatePollingCentersById from '@hooks/vote-center-management/center-management/polling-center/useUpdatePollingCenterById';
import {
  ContextData,
  NewVoteCenterContext,
} from './context/NewVoteCenterContext';
import {
  VoteCenterAdditionDataType,
  voteCenterAdditionValidation,
} from '@validations/vote-center-management/center-management/vote-center-addition/voteCenterAdditionValidation';
import useCreateEditCombine from '@hooks/vote-center-management/center-management/polling-center/useCreateEditCombine';

const { UPDATE_VOTE_CENTER } =
  VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT.VOTE_CENTER_ADDITION.NEW_CENTER;

export interface VoterAreaSearchParams {
  uniOrWardsIds: string;
  unionWardIds?: string;
  nameBn?: string;
}

const CreateEditCenter = () => {
  const [contextData, setContextData] = useState<ContextData>();

  const navigate = useNavigate();

  const methods = useForm<VoteCenterAdditionDataType>({
    resolver: yupResolver(voteCenterAdditionValidation),
    values: {
      voterAreas: contextData?.potentialVoterAreas as any,

      [UPDATE_VOTE_CENTER.SERIAL_NO]:
        contextData?.potentialPollingCenter?.serial,

      // ======================
      [UPDATE_VOTE_CENTER.CENTER_INSTITUTE_NAME_BN]:
        contextData?.potentialPollingCenter?.centerInstituteNameBn ||
        contextData?.potentialPollingInstitute?.nameBn,

      [UPDATE_VOTE_CENTER.CENTER_INSTITUTE_NAME_EN]:
        contextData?.potentialPollingCenter?.centerInstituteNameEn ||
        contextData?.potentialPollingInstitute?.nameEn,
      // ======================

      [UPDATE_VOTE_CENTER.CENTER_DESCRIPTION_BANGLA]:
        contextData?.potentialPollingCenter?.descriptionBn,

      [UPDATE_VOTE_CENTER.CENTER_DESCRIPTION_ENGLISH]:
        contextData?.potentialPollingCenter?.descriptionEn,

      [UPDATE_VOTE_CENTER.CENTER_TYPE]:
        contextData?.potentialPollingCenter?.voterType,

      [UPDATE_VOTE_CENTER.CENTER_ADDRESS_BANGLA]:
        contextData?.potentialPollingCenter?.addressBn,

      [UPDATE_VOTE_CENTER.CENTER_ADDRESS_ENGLISH]:
        contextData?.potentialPollingCenter?.addressEn,

      [UPDATE_VOTE_CENTER.TOTAL_BOOTH]:
        contextData?.potentialPollingCenter?.numberOfBooth,

      [UPDATE_VOTE_CENTER.NUMBER_OF_TEMPORARY_BOOTH]:
        contextData?.potentialPollingCenter?.numberOfTemporaryBooth,

      [UPDATE_VOTE_CENTER.TEMPORARY_CENTER]:
        contextData?.potentialPollingCenter?.isTemporary,

      [UPDATE_VOTE_CENTER.TAB_CENTER]:
        contextData?.potentialPollingCenter?.isTabCenter,

      [UPDATE_VOTE_CENTER.EVM_RESULT]:
        contextData?.potentialPollingCenter?.isEvmCenter,
    },
  });

  // initial useEffects are here
  const {
    getPotentialPollingInstituteCenterAreasData,
    getPollingCentersByIdData,
  } = useCreateEditCombine({ setContextData });

  const {
    createPollingCenter,
    loading: loadingCreate,
    success: successCreate,
  } = useCreatePollingCenter();

  const {
    updateUpdatePollingCentersByIdData,
    loading: loadingUpdate,
    success: successUpdate,
  } = useUpdatePollingCentersById();

  useEffect(() => {
    if (successCreate) {
      navigate(-1);
    }
  }, [navigate, successCreate]);

  useEffect(() => {
    if (successUpdate) {
      navigate(-1);
    }
  }, [navigate, successUpdate]);

  return (
    <NewVoteCenterContext.Provider value={{ contextData, setContextData }}>
      <div className="container-96 mb-24">
        <FormProvider {...methods}>
          <form>
            <FormHeader />

            <InstitutionReport />

            <AddCenterInfo />

            <AddVoterArea
              getPotentialPollingInstituteCenterAreasData={
                getPotentialPollingInstituteCenterAreasData
              }
              getPollingCentersByIdData={getPollingCentersByIdData}
            />

            <FormFooterBtns
              loadingCreate={loadingCreate}
              loadingUpdate={loadingUpdate}
              updateUpdatePollingCentersByIdData={
                updateUpdatePollingCentersByIdData
              }
              createPollingCenter={createPollingCenter}
            />
          </form>
        </FormProvider>
      </div>
    </NewVoteCenterContext.Provider>
  );
};

export default CreateEditCenter;
