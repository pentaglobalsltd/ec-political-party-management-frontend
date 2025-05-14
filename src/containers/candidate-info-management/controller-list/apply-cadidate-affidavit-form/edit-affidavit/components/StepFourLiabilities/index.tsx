import { useDispatch } from 'react-redux';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Modal, SectionHeader } from '@pentabd/ui';

import LiabilityModalForm from './components/LiabilityModalForm';
import CommitmentAchievementModalForm from './components/CommitmentAchievementModalForm';
import ElectionSpecificComponents from './election-specific-components';

import { useLiabilities } from '@hooks/candidate-info-management/operator-view/candidate-management/affidavit-form/useLiabilities';
import { useLiabilitiesValidation } from '@hooks/candidate-info-management/operator-view/candidate-management/affidavit-form/useLiabilitiesValidation';

import { ELECTION_INFO } from '@constants/election-info';
import { LiabilitiesType } from '@type/candidate-info-management/operator-view/affidavit-form/liabilities';
import { createLiabilitiesInitialState } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities-actions';
import { liabilitiesFormValidationSchemaType } from '@validations/candidate-info-management/operator/affidavit/fourthStepLiabilitiesValidation';
import { electionSpecificSubmitData } from './helper';

const LiabilitiesStepFour = ({
  onEdit,
}: {
  onEdit?: (data: number) => void;
}) => {
  const [submitData, setSubmitData] = useState<boolean>(false);
  const [liabilityId, setLiabilityId] = useState<number | string>();
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const [commitmentAchievementId, setCommitmentAchievementId] = useState<
    number | string
  >();
  const [isOpenLiabilityEditModal, setIsOpenLiabilityEditModal] =
    useState(false);

  const [
    isOpenCommitmentAchievementEditModal,
    setIsOpenCommitmentAchievementEditModal,
  ] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { electionSettingsId, candidateElectionDetailsId, electionTypeId } =
    useParams();
  const { validationSchema, getValidationSchema } = useLiabilitiesValidation();

  const {
    createAffidavitLiabilities,
    isCreateSuccess,
    liabilityLoanOath,
    getLiabilityChildHandler,
    getCommitmentAchievementChildHandler,
    isCreateRequested,
  } = useLiabilities({
    electionSettingsId,
    candidateElectionDetailsId,
    isGetLiabilities: true,
  });

  const methods = useForm<liabilitiesFormValidationSchemaType>({
    resolver: yupResolver(validationSchema),
    values: liabilityLoanOath as any,
  });

  const { handleSubmit } = methods;

  const openLiabilityEditModal = (liabilityId?: string | number) => {
    if (liabilityId) {
      setLiabilityId(liabilityId);
      setIsOpenLiabilityEditModal(true);
      getLiabilityChildHandler({
        electionSettingsId,
        candidateElectionDetailsId,
        liabilityId,
      });
    }
  };

  const openCommitmentAchievementEditModal = (
    commitmentAchievementId?: string | number,
  ) => {
    if (commitmentAchievementId) {
      setCommitmentAchievementId(commitmentAchievementId);
      setIsOpenCommitmentAchievementEditModal(true);
      getCommitmentAchievementChildHandler({
        electionSettingsId,
        candidateElectionDetailsId,
        commitmentAchievementId,
      });
    }
  };

  const closeLiabilityEditModal = () => {
    if (disableButton === false) {
      setIsOpenLiabilityEditModal(false);
    }
  };

  const closeCommitmentAchievementEditModal = () => {
    setIsOpenCommitmentAchievementEditModal(false);
  };

  const handleButtonDisable = (value: boolean) => {
    setDisableButton(value);
  };

  const onSubmit: SubmitHandler<liabilitiesFormValidationSchemaType> = (
    postData: any,
  ) => {
    const data = electionSpecificSubmitData({
      liabilityLoanOath,
      electionTypeId: Number(electionTypeId),
      postData,
    });

    createAffidavitLiabilities({
      electionSettingsId,
      candidateElectionDetailsId,
      data: data as LiabilitiesType,
    });
  };

  useEffect(() => {
    if (Number(electionTypeId) === ELECTION_INFO.NATIONAL.ID) {
      getValidationSchema(true);
    } else {
      getValidationSchema(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionTypeId]);

  useEffect(() => {
    if (isCreateSuccess) {
      dispatch(createLiabilitiesInitialState());
      if (!onEdit) {
        navigate(-1);
      } else {
        onEdit && onEdit(4);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateSuccess]);

  return (
    <div>
      <FormProvider {...methods}>
        <form className="container" onSubmit={handleSubmit(onSubmit)}>
          <SectionHeader title={t('AFFIDAVIT_STEP_ONE.RESPONSIBILITY')} />

          <ElectionSpecificComponents
            openLiabilityEditModal={openLiabilityEditModal}
            handleButtonDisable={handleButtonDisable}
            openCommitmentAchievementEditModal={
              openCommitmentAchievementEditModal
            }
            submitData={submitData}
            loans={liabilityLoanOath?.loans}
          />

          <div className="row d-flex flex-row-reverse border-top pt-8">
            <Button
              key={1}
              htmlType="submit"
              type="info"
              loading={isCreateRequested}
              disabled={disableButton}
              onClick={(e) => setSubmitData(true)}
            >
              {t('AFFIDAVIT_STEP_ONE.SAVE_NEXT')}
            </Button>
          </div>
        </form>
      </FormProvider>

      <Modal
        isOpen={isOpenLiabilityEditModal}
        overlay
        onClose={closeLiabilityEditModal}
      >
        <LiabilityModalForm
          liabilityId={liabilityId}
          closeLiabilityEditModal={closeLiabilityEditModal}
          parentHandleButtonDisabled={handleButtonDisable}
        />
      </Modal>

      <Modal
        isOpen={isOpenCommitmentAchievementEditModal}
        closeAble
        overlay
        onClose={closeCommitmentAchievementEditModal}
      >
        <CommitmentAchievementModalForm
          commitmentAchievementId={commitmentAchievementId}
          closeCommitmentAchievementEditModal={
            closeCommitmentAchievementEditModal
          }
        />
      </Modal>
    </div>
  );
};

export default LiabilitiesStepFour;
