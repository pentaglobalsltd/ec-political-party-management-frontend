export const reqMapping = (data: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { unionWards, ...rest } = data;

  const mappedData = rest;

  return mappedData;
};
