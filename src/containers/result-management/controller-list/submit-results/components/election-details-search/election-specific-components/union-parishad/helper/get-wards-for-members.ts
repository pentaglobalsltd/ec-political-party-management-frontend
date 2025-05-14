import { SelectOptionArray } from '@type/selection-option-type';

interface Props {
  candidateType: number | undefined;
  unionOrWardId: number;
  electionSettings: SelectOptionArray[] | undefined;
}

export const getWardsForMembers = ({
  candidateType,
  unionOrWardId,
  electionSettings,
}: Props) => {
  const membersSettingsObj = electionSettings
    ?.filter((item) => item?.extra?.candidateTypeId === candidateType)
    ?.filter((item) => item?.extra?.unionOrWardId === unionOrWardId);

  return membersSettingsObj;
};
