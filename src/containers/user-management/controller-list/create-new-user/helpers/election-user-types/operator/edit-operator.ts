import { ELECTION_INFO } from '@constants/election-info';
import { SubmitMapperType } from '../..';
import {
  roAndOpNationalElectionFormMappedData,
  opCityCorporationFormMappedData,
  opUpazilaFormMappedData,
  roAndOpMunicipalityFormMappedData,
} from '../../../constants/index';

export const editOperator = (props: SubmitMapperType) => {
  const { electionTypeId } = props?.data;
  const {
    data,
    userId,
    language,
    electionSettingsFromContext,
    updateUserProfileById,
  } = props;

  let formData = {};

  switch (electionTypeId) {
    case ELECTION_INFO.NATIONAL.ID:
      formData = roAndOpNationalElectionFormMappedData({
        data,
        language,
        userId: true,
      });

      updateUserProfileById({ data: formData, userId });
      break;

    case ELECTION_INFO.CITY_CORPORATION.ID:
      formData = opCityCorporationFormMappedData({
        data,
        language,
        electionSettingsFromContext,
      });

      updateUserProfileById({ data: formData, userId });
      break;

    case ELECTION_INFO.UPAZILLA.ID:
      formData = opUpazilaFormMappedData({
        data,
        language,
      });

      updateUserProfileById({ data: formData, userId });
      break;

    case ELECTION_INFO.MUNICIPALITY.ID:
      formData = roAndOpMunicipalityFormMappedData({
        data,
        language,
      });

      updateUserProfileById({ data: formData, userId });
      break;

    case ELECTION_INFO.UNION_PARISHAD.ID:
      formData = opUpazilaFormMappedData({
        data,
        language,
      });

      updateUserProfileById({ data: formData, userId });
      break;

    default:
      break;
  }
};
