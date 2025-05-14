import { SelectOptionArray } from '@type/selection-option-type';

interface Props {
  candidateType: number;
  electionSettings: SelectOptionArray[] | undefined;
  unionOrWardsRedux: SelectOptionArray[] | undefined;
}

export const getUnionOrWardsForMembers = ({
  electionSettings,
  candidateType,
  unionOrWardsRedux,
}: Props) => {
  const memberSettings = electionSettings?.filter(
    (item) => item?.extra?.candidateTypeId === candidateType,
  );

  const unionOrWardIdArrayWithDuplicateValues = memberSettings?.map(
    (item) => item?.extra?.unionOrWardId,
  );

  const unionOrWardIdArray = [
    ...new Set(unionOrWardIdArrayWithDuplicateValues),
  ];

  const newUnions = unionOrWardsRedux?.filter((item) =>
    unionOrWardIdArray?.includes(Number(item?.value)),
  );

  return newUnions;
};
