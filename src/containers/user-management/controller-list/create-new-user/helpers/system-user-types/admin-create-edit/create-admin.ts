import { SubmitMapperType } from '../..';
import { adminFormMappedData } from '../../../constants/sytemUserConstants';

export const createAdmin = (props: SubmitMapperType) => {
  const { data, language, userProfileCreateData } = props;

  let formData = {};

  formData = adminFormMappedData({
    data,
    language,
  });
  userProfileCreateData(formData);
};
