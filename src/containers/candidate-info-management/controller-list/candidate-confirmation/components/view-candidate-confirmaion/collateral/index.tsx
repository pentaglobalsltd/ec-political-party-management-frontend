import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

import ConfirmationButton from '../ConfirmationButton';

import { useLanguage } from '@hooks/miscellaneous/custom-hook/useLanguage';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCollateralForm } from '@hooks/candidate-info-management/operator-view/candidate-management/collateral-form/useCollateralForm';
import {
  collateralFormData,
  collateralValidation,
} from '@validations/candidate-info-management/controller-list/collateralValidation';
import { PaymentSpecificForm, getPaymentValues } from './helper';

const Collateral = ({
  hideButton = false,
  editManualPayment = false,
  onEdit,
}: {
  hideButton?: boolean;
  editManualPayment?: boolean;
  onEdit?: (data: number) => void;
}) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { electionSettingsId, candidateElectionDetailsId, scheduleId } =
    useParams();

  const {
    collateralData,
    updateCollateralFormHandler,
    isUpdateRequested,
    isUpdateSuccess,
    updateCollateralFormResetHandler,
    getCollateralFormData,
  } = useCollateralForm({
    electionSettingsId,
    candidateElectionDetailId: candidateElectionDetailsId,
  });

  const methods = useForm<collateralFormData>({
    resolver: yupResolver(collateralValidation),
    values: getPaymentValues({
      language,
      paymentType: collateralData?.paymentType,
      collateralData,
    }) as FieldValues,
  });

  const { handleSubmit } = methods;

  const handleUpdate = (data: any) => {
    updateCollateralFormHandler({
      electionSettingsId,
      candidateElectionDetailId: candidateElectionDetailsId,
      data: {
        amount: collateralData?.candidatePersonalInfo?.amount,
        chalanNo: data?.chalanNumber,
        chalanDate: data?.chalanDate,
        depositedType: data?.depositedIn,
        regionId: Number(data?.regionId),
        bankId: Number(data?.bankId),
        branchName: data?.branchName,
        file: data?.file as any,
      },
    });
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      methods.reset();
      updateCollateralFormResetHandler();
      getCollateralFormData({
        electionSettingsId,
        candidateElectionDetailId: candidateElectionDetailsId,
      });

      if (!onEdit) {
        navigate(-1);
      } else {
        onEdit && onEdit(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateSuccess, methods, updateCollateralFormResetHandler]);

  return (
    <div className="container-95">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="d-flex flex-column gap-8 py-9">
            <>
              <PaymentSpecificForm
                paymentType={collateralData?.paymentType}
                editManualPayment={editManualPayment}
                isUpdateRequested={isUpdateRequested}
                electionScheduleId={scheduleId}
              />

              {!hideButton ? <ConfirmationButton /> : null}
            </>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Collateral;
