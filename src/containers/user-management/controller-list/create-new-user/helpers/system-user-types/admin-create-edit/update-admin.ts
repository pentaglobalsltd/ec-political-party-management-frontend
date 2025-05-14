import { SubmitMapperType } from '../..';
import { adminFormMappedData } from '../../../constants/sytemUserConstants';

export const editAdmin = (props: SubmitMapperType) => {
  const { data, userId, language, updateUserProfileById } = props;

  let formData = {};

  formData = adminFormMappedData({
    data,
    language,
  });
  updateUserProfileById({ data: formData, userId });
};
