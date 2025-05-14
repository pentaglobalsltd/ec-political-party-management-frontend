import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { Button } from '@pentabd/ui';
import {
  mapFormSubmitCreate,
  mapFormSubmitUpdate,
} from '../helper/map-form-submit';
import { NewVoteCenterContext } from '../context/NewVoteCenterContext';
import { typeUpdateUpdatePollingCentersByIdData } from '@hooks/vote-center-management/center-management/polling-center/useUpdatePollingCenterById';
import { CreatePollingCenterType } from '@hooks/vote-center-management/center-management/polling-center/useCreatePollingCenter';

interface Props {
  loadingCreate: boolean;
  loadingUpdate: boolean;
  updateUpdatePollingCentersByIdData: typeUpdateUpdatePollingCentersByIdData;
  createPollingCenter: CreatePollingCenterType;
}

const FormFooterBtns = ({
  loadingCreate,
  loadingUpdate,
  updateUpdatePollingCentersByIdData,
  createPollingCenter,
}: Props) => {
  const { contextData } = useContext(NewVoteCenterContext)!;
  const { t } = useTranslation();

  const navigate = useNavigate();

  const {
    electionSettingsId,
    unionOrWardId,
    pollingInstituteId,
    pollingCenterId,
  } = useParams();

  const isCreate = !!pollingInstituteId;
  const isUpdate = !!pollingCenterId;

  const { handleSubmit } = useFormContext();

  const handleCancel = () => {
    navigate(-1);
  };

  const formSubmitCreate = (data: any) => {
    mapFormSubmitCreate({
      data,
      potentialVoterAreas: contextData?.potentialVoterAreas,
      electionSettingsId,
      unionOrWardId,
      unionWardId: contextData?.upUnionWardId,
      pollingInstituteId,
      createPollingCenter,
    });
  };

  const formSubmitUpdate = (data: any) => {
    mapFormSubmitUpdate({
      electionSettingsId,
      unionOrWardId,
      unionWardId: contextData?.upUnionWardId,
      pollingCenterId,
      data,
      contextData,
      updateUpdatePollingCentersByIdData,
    });
  };

  const formSubmit = (data: any) => {
    if (isCreate) return formSubmitCreate(data);
    else if (isUpdate) return formSubmitUpdate(data);
  };

  const onSubmit = () => {
    handleSubmit(formSubmit)();
  };

  return (
    <div className="d-flex flex-row justify-content-end border-top mt-10 pt-10 gap-6">
      <Button
        key={3}
        fill="outline"
        type="light"
        htmlType="button"
        onClick={handleCancel}
      >
        {t('UPDATE_VOTE_CENTER.CANCEL_BUTTON')}
      </Button>

      <Button
        key={4}
        type="primary"
        // htmlType="submit"
        onClick={onSubmit}
        loading={isCreate ? loadingCreate : loadingUpdate}
      >
        {t('UPDATE_VOTE_CENTER.SAVE_BUTTON')}
      </Button>
    </div>
  );
};

export default FormFooterBtns;
