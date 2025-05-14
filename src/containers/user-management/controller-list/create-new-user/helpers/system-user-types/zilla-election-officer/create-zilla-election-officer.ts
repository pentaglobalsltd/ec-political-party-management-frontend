import { SubmitMapperType } from '../..';
import { zillaElectionOfficerFormMappedData } from '../../../constants/sytemUserConstants';

export const createZillaElectionOfficer = (props: SubmitMapperType) => {
  const { data, language, userProfileCreateData } = props;

  let formData = {};

  formData = zillaElectionOfficerFormMappedData({
    data,
    language,
  });
  userProfileCreateData(formData);
};
