import { ELECTION_INFO } from '@constants/election-info';
import { poNationalElectionFormMappedData } from '../../../constants/nationalElectionConstants';
import { SubmitMapperType } from '../..';

export const createPresidingOfficer = (props: SubmitMapperType) => {
  const { electionTypeId } = props?.data;
  const { data, language, userProfileCreateData } = props;

  let formData = {};

  switch (electionTypeId) {
    case ELECTION_INFO.NATIONAL.ID:
      formData = poNationalElectionFormMappedData({
        data,
        language,
      });

      userProfileCreateData(formData);
      break;

    default:
      break;
  }
};
