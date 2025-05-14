import { ELECTION_INFO } from '@constants/election-info';
import {
  aroNationalElectionFormMappedData,
  aroCityCorporationFormMappedData,
  aroUpazilaFormMappedData,
  aroMunicipalityFormMappedData,
} from '../../../constants/index';
import { SubmitMapperType } from '../..';

export const createAssistantReturningOfficer = (props: SubmitMapperType) => {
  const { electionTypeId } = props?.data;
  const { data, language, constituencyFromContext, userProfileCreateData } =
    props;

  let formData = {};

  switch (electionTypeId) {
    case ELECTION_INFO.NATIONAL.ID:
      formData = aroNationalElectionFormMappedData({
        data,
        language,
        constituencyFromContext,
      });

      userProfileCreateData(formData);
      break;

    case ELECTION_INFO.CITY_CORPORATION.ID:
      formData = aroCityCorporationFormMappedData({
        data,
        language,
      });

      userProfileCreateData(formData);
      break;

    case ELECTION_INFO.UPAZILLA.ID:
      formData = aroUpazilaFormMappedData({
        data,
        language,
      });
      userProfileCreateData(formData);
      break;

    case ELECTION_INFO.MUNICIPALITY.ID:
      formData = aroMunicipalityFormMappedData({
        data,
        language,
      });

      userProfileCreateData(formData);
      break;

    default:
      break;
  }
};
