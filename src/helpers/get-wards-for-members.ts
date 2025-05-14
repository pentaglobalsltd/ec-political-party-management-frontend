import { SelectOptionArray } from '@type/selection-option-type';

interface Props {
  candidateType: number | undefined;
  unionOrWardId: number;
  electionSettings: SelectOptionArray[] | undefined;
  getConstituencyIdAsValue?: boolean;
}

export const getWardsForMembers = ({
  candidateType,
  unionOrWardId,
  electionSettings,
  getConstituencyIdAsValue = false,
}: Props) => {
  const membersSettingsObj = electionSettings
    ?.filter((item) => item?.extra?.candidateTypeId === candidateType)
    ?.filter((item) => item?.extra?.unionOrWardId === unionOrWardId);
  if (getConstituencyIdAsValue) {
    const updatedArray = membersSettingsObj?.map((item) => ({
      ...item,
      value: item?.extra?.constituencyId,
    }));
    console.log(updatedArray);

    return updatedArray;
  } else return membersSettingsObj;
};
