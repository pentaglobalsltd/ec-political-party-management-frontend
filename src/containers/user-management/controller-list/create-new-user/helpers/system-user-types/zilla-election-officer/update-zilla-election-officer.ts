import { SubmitMapperType } from '../..';
import { zillaElectionOfficerFormMappedData } from '../../../constants/sytemUserConstants';

export const EditZillaElectionOfficer = (props: SubmitMapperType) => {
  const { data, userId, language, updateUserProfileById } = props;

  let formData = {};

  formData = zillaElectionOfficerFormMappedData({
    data,
    language,
  });
  updateUserProfileById({ data: formData, userId });
};
