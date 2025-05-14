import { ELECTION_INFO } from '@constants/election-info';
import { poNationalElectionFormMappedData } from '../../../constants/nationalElectionConstants';
import { SubmitMapperType } from '../..';

export const editPresidingOfficer = (props: SubmitMapperType) => {
  const { electionTypeId } = props?.data;
  const {
    data,
    userId,
    language,
    constituencyFromContext,
    updateUserProfileById,
  } = props;

  let formData = {};

  switch (electionTypeId) {
    case ELECTION_INFO.NATIONAL.ID:
      formData = poNationalElectionFormMappedData({
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
