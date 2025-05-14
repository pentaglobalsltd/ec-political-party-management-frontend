export const getParams = (searchParams: any) => {
  let params: { [x: string]: string } = {};

  searchParams.forEach((value: any, key: string) => {
    params = { ...params, [key]: value };
  });
  return params;
};

const mapEnglishToBanglaDigit: { [key: string]: string } = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

// TODO:: language setup needed
export const getDigitBanglaFromEnglish = (
  englishNumber: string | number | undefined,
) => {
  let banglaNumber = englishNumber?.toString();

  if (!banglaNumber) return '';

  for (const englishDigit in mapEnglishToBanglaDigit) {
    if (mapEnglishToBanglaDigit.hasOwnProperty(englishDigit)) {
      banglaNumber = banglaNumber.replace(
        new RegExp(englishDigit, 'g'),
        mapEnglishToBanglaDigit[englishDigit],
      );
    }
  }
  return banglaNumber;
};
