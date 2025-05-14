export const mappingPaymentMethod = (value: string) => {
  switch (value) {
    case PAYMENT_METHOD.MANUAL.EN:
      return PAYMENT_METHOD.MANUAL.BN;

    case PAYMENT_METHOD.SONALI_PAY.EN:
      return PAYMENT_METHOD.SONALI_PAY.BN;

    case PAYMENT_METHOD.SSL_COMMERZ.EN:
      return PAYMENT_METHOD.SSL_COMMERZ.BN;

    default:
      return '';
  }
};

const PAYMENT_METHOD = {
  MANUAL: {
    BN: 'ম্যানুয়াল',
    EN: 'MANUAL',
  },

  SONALI_PAY: {
    BN: 'সোনালি পে',
    EN: 'SONALI_PAY',
  },

  SSL_COMMERZ: {
    BN: 'এস.এস.এল. কমার্স',
    EN: 'SSL_COMMERZ',
  },
};
