import { APPLICATION_SEARCH } from '..';

/**
 * @param str should be like '1,2,3'
 */
const convertCommaSeparatedStringToNumberArray = (str: string) => {
  const parts = str.split(',');
  const numbersArr = parts.map((part) => Number(part));
  return numbersArr;
};

export const setValuesFromParams = (params: any) => {
  const getNumberIfKeyAvailable = (key: string) => {
    return params[key] && { [key]: Number(params[key]) };
  };
  const getStringIfKeyAvailable = (key: string) => {
    return params[key] && { [key]: params[key] };
  };
  const getNumberArrayIfKeyAvailable = (key: string) => {
    return (
      params[key] && {
        [key]: convertCommaSeparatedStringToNumberArray(params[key]),
      }
    );
  };

  const result = {
    ...getNumberIfKeyAvailable(APPLICATION_SEARCH.ELECTION_TYPE),
    ...getNumberIfKeyAvailable(APPLICATION_SEARCH.ELECTION_SCHEDULE),
    ...getNumberIfKeyAvailable(APPLICATION_SEARCH.CANDIDATE_TYPE),

    ...getNumberIfKeyAvailable(APPLICATION_SEARCH.DIVISION),
    ...getNumberIfKeyAvailable(APPLICATION_SEARCH.DISTRICT),
    ...getNumberIfKeyAvailable(APPLICATION_SEARCH.SUB_DISTRICT),
    ...getStringIfKeyAvailable(APPLICATION_SEARCH.RMO),

    ...getNumberIfKeyAvailable(APPLICATION_SEARCH.CONSTITUENCY),
    ...getNumberIfKeyAvailable(APPLICATION_SEARCH.UNION_OR_WARD),
    ...getNumberIfKeyAvailable(APPLICATION_SEARCH.UNION_OR_WARDS),
    ...getNumberIfKeyAvailable(APPLICATION_SEARCH.CONSTITUENCY),

    ...getNumberIfKeyAvailable(APPLICATION_SEARCH.MUNICIPALITY),
    ...getNumberIfKeyAvailable(APPLICATION_SEARCH.USER_ID),
    ...getNumberIfKeyAvailable(APPLICATION_SEARCH.UPAZILA_THANA),
    ...getNumberIfKeyAvailable(APPLICATION_SEARCH.ELECTION_SETTINGS_ID),
    ...getNumberIfKeyAvailable(APPLICATION_SEARCH.ELECTION_SETTINGS_IDS),

    ...getNumberIfKeyAvailable(
      APPLICATION_SEARCH.DISTRICT_BY_ELECTION_SETTINGS,
    ),
    ...getNumberIfKeyAvailable(
      APPLICATION_SEARCH.MUNICIPALITY_BY_ELECTION_SETTINGS,
    ),
    ...getNumberIfKeyAvailable(APPLICATION_SEARCH.UPAZILA_BY_ELECTION_SETTINGS),
    ...getNumberIfKeyAvailable(
      APPLICATION_SEARCH.ELECTION_CONSTITUENCY_BY_ELECTION_SETTINGS,
    ),

    ...getNumberArrayIfKeyAvailable(APPLICATION_SEARCH.STATUS),
    ...getNumberArrayIfKeyAvailable(APPLICATION_SEARCH.AGENCY_TYPE_IDS),
  };

  // console.log({ params, result });

  const isResultEmpty = Object.keys(result).length === 0;

  const response = isResultEmpty ? {} : { values: result };

  return response;
};
