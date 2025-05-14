import { ELECTION_INFO } from '@constants/election-info';
import { SubmitMapperType } from '../..';
import {
  roAndOpNationalElectionFormMappedData,
  roCityCorporationFormMappedData,
  roUpazilaFormMappedData,
  roAndOpMunicipalityFormMappedData,
} from '../../../constants/index';

export const editReturningOfficer = (props: SubmitMapperType) => {
  const { electionTypeId } = props?.data;
  const { data, userId, language, updateUserProfileById } = props;

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
      formData = roCityCorporationFormMappedData({
        data,
        language,
      });

      updateUserProfileById({ data: formData, userId });
      break;

    case ELECTION_INFO.UPAZILLA.ID:
      formData = roUpazilaFormMappedData({
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
      formData = roUpazilaFormMappedData({
        data,
        language,
      });

      updateUserProfileById({ data: formData, userId });
      break;

    default:
      break;
  }
};
