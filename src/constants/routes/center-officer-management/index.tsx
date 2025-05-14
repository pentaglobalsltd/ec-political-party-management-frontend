export const CENTER_OFFICER_MANAGEMENT_ROUTES = {
  // Political Party
  POLITICAL_PARTY: 'political-party',
  CREATE_POLITICAL_PARTY: '/political-party/create-political-party',
  EDIT_POLITICAL_PARTY: (id: string | number) => `/political-party/${id}`,

  // Vote Establishment List
  VOTE_ESTABLISHMENT_LIST: 'vote-establishment-list',

  // Symbol
  SYMBOL: 'symbol',
  CREATE_SYMBOL: 'create',
  EDIT_SYMBOL: (id: string | number) => `${id}`,

  // organization list
  ORGANIZATION_LIST: 'organization-list',
  CREATE_ORGANIZATION_LIST: 'create-organization-list',
  EDIT_ORGANIZATION: (id: number) => `edit/${id}`,

  // Officer List
  OFFICER_LIST: 'officer-list',
  CREATE_OFFICER: 'create',
  EDIT_OFFICER: (id: string | number) => `${id}`,

  // Center Based Officer Distribution
  CENTER_BASED_OFFICER_DISTRIBUTION: 'center-based-officer-distribution',

  // Center Based Officer List
  CENTER_BASED_OFFICER_LIST: 'center-based-officer-list',

  // Center Officer Contact Details
  CENTER_OFFICER_CONTACT_DETAILS: 'center-officer-contact-details',

  // Send SMS
  CENTER_OFFICER_SEND_SMS: 'send-sms',
};
