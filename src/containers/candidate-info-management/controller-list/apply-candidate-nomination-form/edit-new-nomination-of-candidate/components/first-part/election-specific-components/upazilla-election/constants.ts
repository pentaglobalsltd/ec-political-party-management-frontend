export const allSelectedData = {
  // region: false,
  // zilla: false,
  constituency: false,
  rmo: false,
  municipalities: false,
  unionWard: false,
  voterArea: false,
  voterAreaOptions: false,
  unionWardOptions: false,
  municipalitiesOptions: false,
  rmoOptions: false,
  constituencyOption: false,
  // zillaOption: false,
  // regionOption: false,
};

export const optionVoterArea = {
  voterArea: true,
};

export const optionUnionWard = {
  ...optionVoterArea,
  unionWard: true,
  voterAreaOptions: true,
};

export const optionMunicipalities = {
  ...optionUnionWard,
  municipalities: true,
  unionWardOptions: true,
};

export const optionRmo = {
  ...optionMunicipalities,
  rmo: true,
  municipalitiesOptions: true,
};

export const optionConstituency = {
  ...optionRmo,
  constituency: true,
  rmoOptions: true,
};

// export const optionZilla = {
//   ...optionConstituency,
//   zilla: true,
//   constituencyOption: true,
// };

// export const optionRegion = {
//   ...optionZilla,
//   region: false,
//   regionOption: false,
//   zillaOption: false,
// };
