import { USER_TYPES } from '@constants/user-types';
import { ELECTION_INFO } from '@constants/election-info';
import { USER_ROLE_TYPE } from '@containers/user-management/controller-list/constants';
import {
  aroNationalElectionFormMappedData,
  aroCityCorporationFormMappedData,
  aroUpazilaFormMappedData,
  aroMunicipalityFormMappedData,
} from '../../../constants/index';
import { SubmitMapperType } from '../..';

export const editAssistantReturningOfficer = (props: SubmitMapperType) => {
  const { electionTypeId } = props?.data;
  const {
    data,
    userId,
    params,
    language,
    constituencyFromContext,
    userProfileCreateData,
    updateUserProfileById,
  } = props;

  let formData = {};

  switch (electionTypeId) {
    case ELECTION_INFO.NATIONAL.ID:
      // ARO-OP Create logic here (from ARO Modal)
      if (params?.userType === USER_TYPES.ARO_OP) {
        formData = aroNationalElectionFormMappedData({
          data,
          language,
          constituencyFromContext,
        });
        const newData = {
          ...formData,
          userTypeCode: USER_ROLE_TYPE.ASSISTANT_RETURNING_OFFICER_OPERATOR,
        };

        userProfileCreateData(newData);
      } else {
        // ARO edit
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
      // ARO-OP Create logic here (from ARO Modal)
      if (params?.userType === USER_TYPES.ARO_OP) {
        formData = aroCityCorporationFormMappedData({
          data,
          language,
          constituencyFromContext,
        });
        const newData = {
          ...formData,
          userTypeCode: USER_ROLE_TYPE.ASSISTANT_RETURNING_OFFICER_OPERATOR,
        };

        userProfileCreateData(newData);
      } else {
        // ARO edit
        formData = aroCityCorporationFormMappedData({
          data,
          language,
          userId: true,
        });

        updateUserProfileById({ data: formData, userId });
      }
      break;

    case ELECTION_INFO.UPAZILLA.ID:
      // ARO-OP Create logic here (from ARO Modal)
      if (params?.userType === USER_TYPES.ARO_OP) {
        formData = aroUpazilaFormMappedData({
          data,
          language,
        });
        const newData = {
          ...formData,
          userTypeCode: USER_ROLE_TYPE.ASSISTANT_RETURNING_OFFICER_OPERATOR,
        };

        userProfileCreateData(newData);
      } else {
        // ARO edit
        formData = aroUpazilaFormMappedData({
          data,
          language,
          userId: true,
        });

        updateUserProfileById({ data: formData, userId });
      }
      break;

    case ELECTION_INFO.MUNICIPALITY.ID:
      // ARO-OP Create logic here (from ARO Modal)
      if (params?.userType === USER_TYPES.ARO_OP) {
        formData = aroMunicipalityFormMappedData({
          data,
          language,
          constituencyFromContext,
        });
        const newData = {
          ...formData,
          userTypeCode: USER_ROLE_TYPE.ASSISTANT_RETURNING_OFFICER_OPERATOR,
        };

        userProfileCreateData(newData);
      } else {
        // ARO edit
        formData = aroMunicipalityFormMappedData({
          data,
          language,
          userId: true,
        });

        updateUserProfileById({ data: formData, userId });
      }
      break;

    default:
      break;
  }
};
