import { SelectOptionArray } from '@type/selection-option-type';

interface Props {
  candidateType: number;
  electionSettings: SelectOptionArray[] | undefined;
  getUnionOrWardIdAsValue?: boolean;
}

export const getUnionOrWardsForChairman = ({
  electionSettings,
  candidateType,
  getUnionOrWardIdAsValue = false,
}: Props) => {
  const chairmanSettingsObjFilter = electionSettings?.filter(
    (item) =>
      item?.extra?.candidateTypeId === candidateType &&
      (getUnionOrWardIdAsValue
        ? (item.value = item?.extra?.unionOrWardId as number)
        : true),
  );

  return chairmanSettingsObjFilter;
};
