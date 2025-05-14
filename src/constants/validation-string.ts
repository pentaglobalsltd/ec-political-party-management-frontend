export const PHONE_NUMBER_REGEX = /^(?:\+?88)?0?1[13-9]\d{8}$/i;
export const PHONE_NUMBER_REGEX_WITH_EMPTY_STRING =
  /^(?:(?:\+?88)?0?1[13-9]\d{8})?$/;
export const CHECK_ONLY_NUMBER = /^[0-9]+$/;
export const CHECK_ONLY_NUMBER_AND_EMPTY = /^(?:[0-9]+)?$/;
export const CHECK_ONLY_NUMBER_AND_STRING = /^(\s*|\d+)$/;
export const CHECK_TIN_NUMBER = /^\d{1,12}$/;
export const CHECK_TIN_NUMBER_AND_EMPTY = /^(?:\d{1,12})?$/;
