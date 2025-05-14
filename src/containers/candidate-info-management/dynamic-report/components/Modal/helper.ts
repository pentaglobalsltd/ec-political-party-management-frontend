export interface MappedData {
  mapValue: {
    [key: string]: string;
  };
}

export interface ItemType {
  0: string;
  value: string;
}

export const mapSubmitData = (data: ItemType[]): MappedData => {
  const mapValue: { [key: string]: string } = {};

  data?.forEach((item: ItemType) => {
    const key = item[0];
    const value = item?.value;
    if (value) {
      mapValue[key] = value;
    }
  });

  return { mapValue };
};
