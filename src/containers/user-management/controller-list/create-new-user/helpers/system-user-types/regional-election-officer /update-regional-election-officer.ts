import { SubmitMapperType } from '../..';
import { regionalElectionOfficerFormMappedData } from '../../../constants/sytemUserConstants';

export const EditRegionalElectionOfficer = (props: SubmitMapperType) => {
  const { data, userId, language, updateUserProfileById } = props;

  let formData = {};

  formData = regionalElectionOfficerFormMappedData({
    data,
    language,
  });
  updateUserProfileById({ data: formData, userId });
};
