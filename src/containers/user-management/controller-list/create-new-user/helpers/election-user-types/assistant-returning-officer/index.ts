import { createAssistantReturningOfficer } from './create-assistant-returning-officer';
import { editAssistantReturningOfficer } from './edit-assistant-returning-officer';
import { SubmitMapperType } from '../..';

export const createOrEditAssistantReturningOfficer = (
  props: SubmitMapperType,
) => {
  const { userId } = props;

  if (!userId) {
    // create AssistantReturningOfficer
    createAssistantReturningOfficer({ ...props });
  } else if (userId) {
    // edit AssistantReturningOfficer
    editAssistantReturningOfficer({ ...props });
  }
};
