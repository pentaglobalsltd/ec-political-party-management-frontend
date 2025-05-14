import { SelectOptionArray } from '@type/selection-option-type';

interface Props {
  candidateType: number;
  electionSettings: SelectOptionArray[] | undefined;
}

export const getUnionOrWardsForChairman = ({
  electionSettings,
  candidateType,
}: Props) => {
  const chairmanSettingsObjFilter = electionSettings?.filter(
    (item) => item?.extra?.candidateTypeId === candidateType,
  );

  return chairmanSettingsObjFilter;
};
