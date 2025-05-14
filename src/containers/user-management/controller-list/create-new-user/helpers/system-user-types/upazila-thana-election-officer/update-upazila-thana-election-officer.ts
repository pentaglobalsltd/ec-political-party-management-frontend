import { SubmitMapperType } from '../..';
import { upazilaThanaElectionOfficerFormMappedData } from '../../../constants/sytemUserConstants';

export const EditUpazilaThanaElectionOfficer = (props: SubmitMapperType) => {
  const { data, userId, language, updateUserProfileById } = props;

  let formData = {};

  formData = upazilaThanaElectionOfficerFormMappedData({
    data,
    language,
  });
  updateUserProfileById({ data: formData, userId });
};
