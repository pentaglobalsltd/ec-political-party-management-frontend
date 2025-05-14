export const mapOpRoSearchSubmit = ({
  data,

  searchInstituteWatch,
  searchCenterWatch,
  getPollingInstitutesList,
  getPollingCenterAggregatedData,
  setSearchParams,
}: any) => {
  const objInstitute = {
    queryParams: {
      ...data,
      nameBn: searchInstituteWatch,
    },
  };
  const objCenterAggregated = {
    queryParams: {
      ...data,

      pollingInstituteNameBn: searchCenterWatch,
    },
  };

  getPollingInstitutesList(objInstitute);
  getPollingCenterAggregatedData(objCenterAggregated);

  // has to set url from because 'setUrlParams' is 'false'
  setSearchParams({
    ...data,
    ...(searchInstituteWatch && { nameBn: searchInstituteWatch }),
    ...(searchCenterWatch && { pollingInstituteNameBn: searchCenterWatch }),
  });
};
