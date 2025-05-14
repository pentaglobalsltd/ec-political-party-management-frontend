import { SubmitMapperType } from '../..';
import { createZillaElectionOfficer } from './create-zilla-election-officer';
import { EditZillaElectionOfficer } from './update-zilla-election-officer';

export const createOrEditZillaElectionOfficer = (props: SubmitMapperType) => {
  const { userId } = props;

  if (!userId) {
    createZillaElectionOfficer({ ...props });
  } else if (userId) {
    EditZillaElectionOfficer({ ...props });
  }
};
