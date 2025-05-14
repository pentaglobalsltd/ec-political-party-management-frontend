import { ELECTION_INFO } from '@constants/election-info';
import {
  aroNationalElectionFormMappedData,
  aroCityCorporationFormMappedData,
  aroUpazilaFormMappedData,
  aroMunicipalityFormMappedData,
} from '../../../constants/index';
import { SubmitMapperType } from '../..';

export const createAroOp = (props: SubmitMapperType) => {
  const { electionTypeId } = props?.data;
  const { data, language, userProfileCreateData } = props;

  let formData = {};

  switch (electionTypeId) {
    case ELECTION_INFO.NATIONAL.ID:
      // ARO-OP independent-create logic here, modal-create logic inside aro-edit
      formData = aroNationalElectionFormMappedData({ data, language });

      userProfileCreateData(formData);
      break;

    // ARO-OP independent-create logic here, modal-create logic inside aro-edit
    case ELECTION_INFO.CITY_CORPORATION.ID:
      formData = aroCityCorporationFormMappedData({
        data,
        language,
      });

      userProfileCreateData(formData);
      break;

    // ARO-OP independent-create logic here, modal-create logic inside aro-edit
    case ELECTION_INFO.UPAZILLA.ID:
      formData = aroUpazilaFormMappedData({
        data,
        language,
      });

      userProfileCreateData(formData);
      break;

    // ARO-OP independent-create logic here, modal-create logic inside aro-edit
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
