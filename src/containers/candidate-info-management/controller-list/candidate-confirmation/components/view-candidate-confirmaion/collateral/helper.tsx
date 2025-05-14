import {
  ManualPayment,
  EditManualPayment,
  SPGPayment,
  SSLPayment,
  AChalanPayment,
} from './components';

import { PAYMENT_STATUS, PAYMENT_TYPE } from '@constants/payment-type';
import { LANGUAGE } from '@hooks/miscellaneous/custom-hook/useLanguage';
import {
  SpgPaymentType,
  SslPaymentType,
  AChalanPaymentType,
  GetJamanatPropsType,
} from '@type/candidate-info-management/candidate-confirmation/collateral-form';

export const PaymentSpecificForm = ({
  paymentType,
  editManualPayment,
  isUpdateRequested,
  electionScheduleId,
}: {
  paymentType?: string;
  editManualPayment?: boolean;
  isUpdateRequested?: boolean;
  electionScheduleId?: string;
}) => {
  switch (paymentType) {
    case PAYMENT_TYPE.MANUAL:
      return editManualPayment ? (
        <EditManualPayment
          isUpdateRequested={isUpdateRequested}
          electionScheduleId={electionScheduleId}
        />
      ) : (
        <ManualPayment />
      );

    case PAYMENT_TYPE.SPG:
      return <SPGPayment />;

    case PAYMENT_TYPE.SSL:
      return <SSLPayment />;

    case PAYMENT_TYPE.A_CHALAN:
      return <AChalanPayment />;

    default:
      return <></>;
  }
};

export const getPaymentValues = ({
  language,
  paymentType,
  collateralData,
}: {
  language?: string | null;
  paymentType?: string;
  collateralData?: GetJamanatPropsType;
}) => {
  switch (paymentType) {
    case PAYMENT_TYPE.MANUAL:
      return {
        ...collateralData?.manualPayment,
        zilla:
          language === LANGUAGE.BANGLA
            ? collateralData?.manualPayment?.zilla?.nameBn
            : collateralData?.manualPayment?.zilla?.nameEn,
        region:
          language === LANGUAGE.BANGLA
            ? collateralData?.manualPayment?.region?.nameBn
            : collateralData?.manualPayment?.region?.nameEn,
        regionId: collateralData?.manualPayment?.region?.id,
        bank:
          language === LANGUAGE.BANGLA
            ? collateralData?.manualPayment?.bank?.nameBn
            : collateralData?.manualPayment?.bank?.nameEn,
        bankId: collateralData?.manualPayment?.bank?.id,
      };

    case PAYMENT_TYPE.SPG:
      return collateralData?.spgPayment?.find(
        (item: SpgPaymentType) => item?.status === PAYMENT_STATUS.PAID,
      );

    case PAYMENT_TYPE.SSL:
      return collateralData?.sslPayment?.find(
        (item: SslPaymentType) => item?.status === PAYMENT_STATUS.PAID,
      );

    case PAYMENT_TYPE.A_CHALAN:
      return collateralData?.achallanPayment?.find(
        (item: AChalanPaymentType) => item?.status === PAYMENT_STATUS.PAID,
      );

    default:
      return null;
  }
};
