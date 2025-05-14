import { SubmitMapperType } from '../..';
import { regionalElectionOfficerFormMappedData } from '../../../constants/sytemUserConstants';

export const createRegionalElectionOfficer = (props: SubmitMapperType) => {
  const { data, language, userProfileCreateData } = props;

  let formData = {};

  formData = regionalElectionOfficerFormMappedData({
    data,
    language,
  });
  userProfileCreateData(formData);
};
