import { ELECTION_INFO } from '@constants/election-info';
import { USER_ACTION } from '@containers/user-management/controller-list/constants';
import {
  aroNationalElectionFormMappedData,
  aroOpModalNationalElectionFormMappedData,
  aroCityCorporationFormMappedData,
  aroUpazilaFormMappedData,
  aroMunicipalityFormMappedData,
} from '../../../constants/index';
import { SubmitMapperType } from '../..';

export const editAroOp = (props: SubmitMapperType) => {
  const { electionTypeId } = props?.data;
  const {
    data,
    userId,
    params,
    language,
    constituencyFromContext,
    updateUserProfileById,
  } = props;

  let formData = {};

  switch (electionTypeId) {
    case ELECTION_INFO.NATIONAL.ID:
      // ARO-OP edit from modal view of aro
      if (params?.action === USER_ACTION.EDIT) {
        formData = aroOpModalNationalElectionFormMappedData({
          data,
          language,
          userId: true,
          constituencyFromContext,
        });

        updateUserProfileById({ data: formData, userId });
      } else {
        // single ARO-OP edit
        formData = aroNationalElectionFormMappedData({
          data,
          language,
          userId: true,
          constituencyFromContext,
        });

        updateUserProfileById({ data: formData, userId });
      }
      break;

    case ELECTION_INFO.CITY_CORPORATION.ID:
      // ARO-OP single edit and edit from modal view (of aro)
      formData = aroCityCorporationFormMappedData({
        data,
        language,
        userId: true,
        constituencyFromContext,
      });

      updateUserProfileById({ data: formData, userId });
      break;

    case ELECTION_INFO.UPAZILLA.ID:
      // ARO-OP single edit and edit from modal view (of aro)
      formData = aroUpazilaFormMappedData({
        data,
        language,
        userId: true,
      });

      updateUserProfileById({ data: formData, userId });
      break;

    case ELECTION_INFO.MUNICIPALITY.ID:
      // ARO-OP single edit and edit from modal view (of aro)
      formData = aroMunicipalityFormMappedData({
        data,
        language,
        userId: true,
        constituencyFromContext,
      });

      updateUserProfileById({ data: formData, userId });
      break;

    default:
      break;
  }
};
