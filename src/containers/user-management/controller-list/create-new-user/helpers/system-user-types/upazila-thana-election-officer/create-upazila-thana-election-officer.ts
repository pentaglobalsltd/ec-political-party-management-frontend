import { SubmitMapperType } from '../..';
import { upazilaThanaElectionOfficerFormMappedData } from '../../../constants/sytemUserConstants';

export const createUpazilaThanaElectionOfficer = (props: SubmitMapperType) => {
  const { data, language, userProfileCreateData } = props;

  let formData = {};

  formData = upazilaThanaElectionOfficerFormMappedData({
    data,
    language,
  });
  userProfileCreateData(formData);
};
