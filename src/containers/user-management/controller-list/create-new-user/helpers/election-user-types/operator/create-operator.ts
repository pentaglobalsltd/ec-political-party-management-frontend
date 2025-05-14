import { ELECTION_INFO } from '@constants/election-info';
import { SubmitMapperType } from '../..';
import {
  roAndOpNationalElectionFormMappedData,
  opCityCorporationFormMappedData,
  opUpazilaFormMappedData,
  roAndOpMunicipalityFormMappedData,
} from '../../../constants/index';

export const createOperator = (props: SubmitMapperType) => {
  const { electionTypeId } = props?.data;
  const { data, language, electionSettingsFromContext, userProfileCreateData } =
    props;

  let formData = {};

  switch (electionTypeId) {
    case ELECTION_INFO.NATIONAL.ID:
      formData = roAndOpNationalElectionFormMappedData({
        data,
        language,
      });

      userProfileCreateData(formData);
      break;

    case ELECTION_INFO.CITY_CORPORATION.ID:
      formData = opCityCorporationFormMappedData({
        data,
        language,
        electionSettingsFromContext,
      });

      userProfileCreateData(formData);
      break;

    case ELECTION_INFO.UPAZILLA.ID:
      formData = opUpazilaFormMappedData({
        data,
        language,
      });

      userProfileCreateData(formData);
      break;

    case ELECTION_INFO.MUNICIPALITY.ID:
      formData = roAndOpMunicipalityFormMappedData({
        data,
        language,
      });

      userProfileCreateData(formData);
      break;

    case ELECTION_INFO.UNION_PARISHAD.ID:
      formData = opUpazilaFormMappedData({
        data,
        language,
      });

      userProfileCreateData(formData);
      break;

    default:
      break;
  }
};
