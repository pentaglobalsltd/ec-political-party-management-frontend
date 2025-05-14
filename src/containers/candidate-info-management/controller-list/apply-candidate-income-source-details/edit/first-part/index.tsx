import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Text } from '@pentabd/ui';

import {
  incomeSourceValidation,
  IncomeSourceValidationType,
} from '@validations/candidate-info-management/operator/income-source-details/incomeSourceDetailsValidation';
import { FUNDING_SOURCES } from '../constants';
import { useIncomeSourceDetails } from '@hooks/candidate-info-management/operator-view/candidate-management/income-source-details/useIncomeSourceDetails';
import { createIncomeSourceDetailsInitialState } from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/income-source-details-first-part-actions';
import {
  BasicInfo,
  DonationByOthers,
  DonationByRelative,
  EarningFromOthers,
  EarningFromRelative,
  Miscellaneous,
  OwnEarning,
} from '../components';
import { ELECTION_INFO } from '@constants/election-info';

const EditIncomeSourceDetailsFirstPart = ({
  onEdit,
  setCurrent,
}: {
  onEdit?: (data: number) => void;
  setCurrent?: (data: number) => void;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { electionSettingsId, candidateElectionDetailsId, electionTypeId } =
    useParams();

  const isSecondPartShow = [
    ELECTION_INFO.MUNICIPALITY.ID,
    ELECTION_INFO.UNION_PARISHAD.ID,
  ].includes(Number(electionTypeId));

  const {
    incomeSourceDetails,
    isCreateRequested,
    isCreateSuccess,
    createIncomeDetails,
    updateSelfFundingHandler,
    updateRelativeFundingHandler,
    updateOtherFundingHandler,
    deleteSelfFundingHandler,
    deleteRelativeFundingHandler,
    deleteOtherFundingHandler,
  } = useIncomeSourceDetails({
    electionSettingsId,
    candidateElectionDetailId: candidateElectionDetailsId,
    getOnMount: true,
  });

  const methods = useForm<IncomeSourceValidationType>({
    resolver: yupResolver(incomeSourceValidation),
    values: incomeSourceDetails as IncomeSourceValidationType,
  });

  const { handleSubmit, getValues } = methods;

  const onSubmit: SubmitHandler<IncomeSourceValidationType> = (
    data: IncomeSourceValidationType,
  ) => {
    createIncomeDetails({
      electionSettingsId,
      candidateElectionDetailId: candidateElectionDetailsId,
      data,
    });
  };

  useEffect(() => {
    if (isCreateSuccess) {
      dispatch(createIncomeSourceDetailsInitialState());
      if (isSecondPartShow) {
        setCurrent && setCurrent(2);
      } else {
        navigate(-1);
      }
    }
  }, [isCreateSuccess, navigate, dispatch, setCurrent, electionTypeId]);

  const editHandler = (index: number, idx: string, name: string) => {
    const formValues: any = getValues();
    let editedData = {};

    switch (name) {
      case FUNDING_SOURCES.SELF:
        editedData = formValues?.selfFundings[index];
        break;
      case FUNDING_SOURCES.RELATIVE_LOAN:
        editedData = formValues?.earningFromRelative[index];
        break;
      case FUNDING_SOURCES.RELATIVE_DONATION:
        editedData = formValues?.donationByRelative[index];
        break;
      case FUNDING_SOURCES.OTHER_LOAN:
        editedData = formValues?.earningFromOthers[index];
        break;
      case FUNDING_SOURCES.OTHER_DONATION:
        editedData = formValues?.donationByOthers[index];
        break;
      case FUNDING_SOURCES.OTHER:
        editedData = formValues?.miscellaneous[index];
        break;

      default:
        break;
    }

    if (
      Object.keys(editedData).length !== 0 &&
      (name === FUNDING_SOURCES.RELATIVE_LOAN ||
        name === FUNDING_SOURCES.RELATIVE_DONATION)
    ) {
      updateRelativeFundingHandler({
        electionSettingsId,
        candidateElectionDetailId: candidateElectionDetailsId,
        relativeFundingId: idx,
        data: editedData,
      });
    } else if (
      Object.keys(editedData).length !== 0 &&
      (name === FUNDING_SOURCES.OTHER_LOAN ||
        name === FUNDING_SOURCES.OTHER_DONATION ||
        name === FUNDING_SOURCES.OTHER)
    ) {
      updateOtherFundingHandler({
        electionSettingsId,
        candidateElectionDetailId: candidateElectionDetailsId,
        otherFundingId: idx,
        data: editedData,
      });
    } else {
      updateSelfFundingHandler({
        electionSettingsId,
        candidateElectionDetailId: candidateElectionDetailsId,
        selfFundingId: idx,
        data: editedData,
      });
    }
  };

  const deleteHandler = (index: number, idx: string, name: string) => {
    if (idx) {
      if (
        name === FUNDING_SOURCES.RELATIVE_LOAN ||
        name === FUNDING_SOURCES.RELATIVE_DONATION
      ) {
        deleteRelativeFundingHandler({
          electionSettingsId,
          candidateElectionDetailId: candidateElectionDetailsId,
          relativeFundingId: idx,
        });
      } else if (
        name === FUNDING_SOURCES.OTHER_LOAN ||
        name === FUNDING_SOURCES.OTHER_DONATION ||
        name === FUNDING_SOURCES.OTHER
      ) {
        deleteOtherFundingHandler({
          electionSettingsId,
          candidateElectionDetailId: candidateElectionDetailsId,
          otherFundingId: idx,
        });
      } else if (name === FUNDING_SOURCES.SELF) {
        deleteSelfFundingHandler({
          electionSettingsId,
          candidateElectionDetailId: candidateElectionDetailsId,
          selfFundingId: idx,
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="py-10">
        <BasicInfo />

        <Text
          component="p"
          sizeType="fs"
          size="md"
          weight="semibold"
          className="mb-8"
        >
          {t('INCOME_SOURCE_DETAILS.POTENTIAL_EARNING_FROM_OWN_INCOME')}
        </Text>
        <OwnEarning editHandler={editHandler} deleteHandler={deleteHandler} />

        <Text
          component="p"
          sizeType="fs"
          size="md"
          weight="semibold"
          className="mb-8"
        >
          {t('INCOME_SOURCE_DETAILS.POTENTIAL_EARNING_FROM_RELATIVES')}
        </Text>
        <EarningFromRelative
          editHandler={editHandler}
          deleteHandler={deleteHandler}
        />

        <Text
          component="p"
          sizeType="fs"
          size="md"
          weight="semibold"
          className="mb-8"
        >
          {t(
            'INCOME_SOURCE_DETAILS.POTENTIAL_EARNING_FROM_DONATION_BY_RELATIVES',
          )}
        </Text>
        <DonationByRelative
          editHandler={editHandler}
          deleteHandler={deleteHandler}
        />

        <Text
          component="p"
          sizeType="fs"
          size="md"
          weight="semibold"
          className="mb-8"
        >
          {t('INCOME_SOURCE_DETAILS.POTENTIAL_EARNING_FROM_OTHERS')}
        </Text>
        <EarningFromOthers
          editHandler={editHandler}
          deleteHandler={deleteHandler}
        />

        <Text
          component="p"
          sizeType="fs"
          size="md"
          weight="semibold"
          className="mb-8"
        >
          {t('INCOME_SOURCE_DETAILS.POTENTIAL_EARNING_FROM_DONATION_BY_OTHERS')}
        </Text>
        <DonationByOthers
          editHandler={editHandler}
          deleteHandler={deleteHandler}
        />

        <Text
          component="p"
          sizeType="fs"
          size="md"
          weight="semibold"
          className="mb-8"
        >
          {t('INCOME_SOURCE_DETAILS.POTENTIAL_EARNING_FROM_MISCELLANEOUS')}
        </Text>
        <Miscellaneous
          editHandler={editHandler}
          deleteHandler={deleteHandler}
        />

        <div className="border-top py-8">
          <div className="col-12 d-flex justify-content-end">
            <Button
              fill="fill"
              type="primary"
              loading={isCreateRequested}
              htmlType="submit"
            >
              {t('INCOME_SOURCE_DETAILS.SUBMIT')}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditIncomeSourceDetailsFirstPart;
