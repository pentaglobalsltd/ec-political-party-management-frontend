import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { Button, Modal } from '@pentabd/ui';
import { IconCheckCircleBroken, IconRefreshCcw01 } from '@pentabd/icons';

import { CandidatePersonalInfoHeader } from './components/CandidatePersonalInfoHeader';
import ElectionSpecificComponents from './components/election-specific-components';
import EditModalForm from './components/EditModalForm';

import { useCandidatePersonalInformation } from '@hooks/candidate-info-management/operator-view/candidate-management/candidate-personal-information/useCandidatePersonalInformation';
import {
  PersonalInfoValidationSchemaType,
  personalInfoValidationSchema,
} from '@validations/candidate-info-management/operator/personalInfoValidation';
import { createCandidateChildInitialState } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-personal-information/candidate-personal-information-actions';
import {
  CandidatePersonalInformationType,
  ChildType,
} from '@type/candidate-info-management/operator-view/candidatePersonalInformation';
import { removeObjectsWithIdxAndDeleteId } from '@helpers/removeObjectsWithIdxAndDeleted';
import { mapCreateChildrenInfo } from '../helpers';

function EditCandidatePersonalInformation({
  onEdit,
}: {
  onEdit?: (data: number) => void;
}) {
  const [childId, setChildId] = useState<number | string>();
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { electionSettingsId, candidateElectionDetailsId } = useParams();

  const { t } = useTranslation();

  const {
    isCreateRequested,
    createCandidatePersonalInfo,
    isCreateSuccess,
    candidatePersonalInformation,
    getCandidateChildHandler,
  } = useCandidatePersonalInformation({
    electionSettingsId,
    candidateElectionDetailsId,
    isGetPersonalInfo: true,
  });

  const methods = useForm<PersonalInfoValidationSchemaType>({
    resolver: yupResolver(personalInfoValidationSchema),
    values: candidatePersonalInformation as PersonalInfoValidationSchemaType,
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (isCreateSuccess) {
      dispatch(createCandidateChildInitialState());
      if (!onEdit) {
        navigate(-1);
      } else {
        onEdit && onEdit(3);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateSuccess]);

  const onSubmit: SubmitHandler<PersonalInfoValidationSchemaType> = (
    data: CandidatePersonalInformationType,
  ) => {
    let filteredData: ChildType[] = [];

    if (Array.isArray(data?.childrenInfo)) {
      filteredData = removeObjectsWithIdxAndDeleteId(data?.childrenInfo).map(
        (item: any) => {
          return mapCreateChildrenInfo(item);
        },
      );
    }

    data.childrenInfo = filteredData;

    createCandidatePersonalInfo({
      electionSettingsId,
      candidateElectionDetailsId,
      data,
    });
  };

  const openEditModal = (childId?: string | number) => {
    if (childId) {
      setChildId(childId);
      setIsOpenEditModal(true);
      getCandidateChildHandler({
        electionSettingsId,
        candidateElectionDetailsId,
        childId,
      });
    }
  };

  const closeEditModal = () => {
    setIsOpenEditModal(false);
  };

  return (
    <div className="container-96 mb-24">
      <CandidatePersonalInfoHeader />
      <FormProvider {...methods}>
        <form className="container mt-10" onSubmit={handleSubmit(onSubmit)}>
          <ElectionSpecificComponents openEditModal={openEditModal} />

          <div className="border-top py-8">
            <div className="col-12 d-flex justify-content-end gap-6">
              <Button
                fill="outline"
                className="border-info"
                type="info"
                onClick={() => reset()}
              >
                {t('NOMINATION_FORM_FIRST_PART.RESET_BUTTON')}
                <IconRefreshCcw01 size="20" fill="info" />
              </Button>
              <Button
                fill="fill"
                className="border-primary"
                type="success"
                loading={isCreateRequested}
                htmlType="submit"
              >
                {t('NOMINATION_FORM_FIRST_PART.SUBMIT_BUTTON')}
                <IconCheckCircleBroken size="20" fill="white" />
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>

      <Modal
        isOpen={isOpenEditModal}
        closeAble
        overlay
        onClose={closeEditModal}
      >
        <EditModalForm childId={childId} closeEditModal={closeEditModal} />
      </Modal>
    </div>
  );
}

export default EditCandidatePersonalInformation;
