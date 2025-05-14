import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { SectionHeader, Button, Modal } from '@pentabd/ui';

import ElectionSpecificComponents from './election-spicific-components';
import EditModalClaimedCaseDescriptionTable from './components/EditModalClaimedCaseDescriptionTable';

import {
  FIRST_STEP_AFFIDAVIT,
  firstStepAffidavitFormValidationSchema,
  FirstStepAffidavitFormValidationSchemaType,
} from '@validations/candidate-info-management/operator/affidavit/firstStepAffidavitFormValidation';
import AffidavitStepOneType from '@type/candidate-info-management/operator-view/affidavit-form/affidavit-step-one';
import { useAffidavitStepOne } from '@hooks/candidate-info-management/operator-view/candidate-management/affidavit-form/useAffidavitStepOne';
import { electionNameMapping } from '@helpers/election-type';
import { candidateNameMapping } from '@helpers/candidate-type';
import { mappedAffidavitStepOneSubmitData } from './helper';
import { createAffidavitStepOneInitialState } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one/affidavit-step-one-actions';

type Props = {
  handleCurrent: (step: number) => void;
};

export interface postDataProps extends AffidavitStepOneType {
  incomeSourcePostData?: {
    [key: string]: string | number;
  };
}

const AffidavitStepOne = ({ handleCurrent }: Props) => {
  const [caseType, setCaseType] = useState<string>();
  const [submitData, setSubmitData] = useState(false);
  const [caseId, setCaseId] = useState<string | number>();
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    electionSettingsId,
    candidateElectionDetailsId,
    electionTypeId,
    candidateTypeId,
  } = useParams();

  const electionTypeKey = electionNameMapping(Number(electionTypeId));
  const candidateTypeKey = candidateNameMapping(Number(candidateTypeId));

  const {
    isCreateRequested,
    isCreateSuccess,
    createAffidavitFormStepOne,
    affidavitFormStepOne,
    getPresentCaseHandler,
  } = useAffidavitStepOne({
    electionSettingsId,
    candidateElectionDetailsId,
    isGetAffidavitStepOne: true,
  });
  const transformedIncomeSourcePostData = Object.fromEntries(
    affidavitFormStepOne?.incomeSources?.flatMap((item) => [
      [`selfIncome_${item.serialNo}`, item.selfIncome],
      [`dependentIncome_${item.serialNo}`, item.dependentIncome],
    ]) || [],
  );
  const methods = useForm<FirstStepAffidavitFormValidationSchemaType>({
    resolver: yupResolver(firstStepAffidavitFormValidationSchema),
    values: {
      ...affidavitFormStepOne,
      incomeSourcePostData: transformedIncomeSourcePostData,
    } as any,
  });
  const { handleSubmit, watch } = methods;

  const presentCaseChecked = watch(
    `candidatePersonalInfo.${FIRST_STEP_AFFIDAVIT.NO_PRESENT_CRIMINAL_CASE}`,
  );
  const pastCaseChecked = watch(
    `candidatePersonalInfo.${FIRST_STEP_AFFIDAVIT.NO_PAST_CRIMINAL_CASE_BEFORE}`,
  );

  const openCaseEditModal = (caseId?: string | number, caseType?: string) => {
    if (caseId) {
      setCaseId(caseId);
      setCaseType(caseType);
      getPresentCaseHandler({
        electionSettingsId,
        candidateElectionDetailsId,
        caseId,
      });
      setIsOpenEditModal(true);
    }
  };

  const closeCaseEditModal = () => {
    if (disableButton === false) {
      setIsOpenEditModal(false);
    }
  };

  const handleButtonDisable = (value: boolean) => {
    setDisableButton(value);
  };

  const onSubmit: SubmitHandler<FirstStepAffidavitFormValidationSchemaType> = (
    postData: postDataProps,
  ) => {
    if (
      (pastCaseChecked ||
        (postData?.pastCases && postData?.pastCases?.length > 0)) &&
      (presentCaseChecked ||
        (postData?.presentCases && postData?.presentCases?.length > 0))
    ) {
      const data = mappedAffidavitStepOneSubmitData({
        postData,
        affidavitFormStepOne,
      });

      createAffidavitFormStepOne({
        electionSettingsId,
        candidateElectionDetailsId,
        data,
      });
    }
  };

  useEffect(() => {
    if (isCreateSuccess) {
      dispatch(createAffidavitStepOneInitialState());
      handleCurrent(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateSuccess]);

  return (
    <div>
      <FormProvider {...methods}>
        <form className="container" onSubmit={handleSubmit(onSubmit)}>
          <SectionHeader
            subtitle={t('AFFIDAVIT_STEP_ONE.CANDIDATE_FILL_UP')}
            title={t('AFFIDAVIT_STEP_ONE.AFFIDAVIT')}
          />

          <div className="d-flex flex-column gap-8 py-9">
            <ElectionSpecificComponents
              electionTypeKey={electionTypeKey}
              candidateTypeKey={candidateTypeKey}
              affidavitFormStepOne={
                affidavitFormStepOne as FirstStepAffidavitFormValidationSchemaType
              }
              submitData={submitData}
              openCaseEditModal={openCaseEditModal}
              handleButtonDisable={handleButtonDisable}
            />

            <div className="d-flex flex-row-reverse border-top pt-8">
              <Button
                key={3}
                htmlType="submit"
                type="info"
                loading={isCreateRequested}
                disabled={disableButton}
                onClick={() => setSubmitData(true)}
              >
                {t('AFFIDAVIT_STEP_ONE.SAVE_NEXT')}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>

      <Modal isOpen={isOpenEditModal} overlay onClose={closeCaseEditModal}>
        <EditModalClaimedCaseDescriptionTable
          caseType={caseType}
          closeCaseEditModal={closeCaseEditModal}
          caseId={caseId}
          parentHandleButtonDisabled={handleButtonDisable}
        />
      </Modal>
    </div>
  );
};

export default AffidavitStepOne;
