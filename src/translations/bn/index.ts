import login from './login.json';
import home from './home.json';
import search from './search.json';
import siteMaintenance from './site-maintenance.json';
import centerOfficerManagementSearch from './center-officer-management/center-officer-management-search.json';

import politicalParty from './center-officer-management/controller-list/political-party.json';

// center officer
import centerOfficerTopbar from './center-officer-management/center-officer-topbar.json';
import officerList from './center-officer-management/controller-list/officer-list.json';
import organizationList from './center-officer-management/controller-list/organization-list.json';
import organizationListErrorMessage from './center-officer-management/controller-list//organization-list-error-message.json';
import symbol from './center-officer-management/controller-list/symbol.json';

import placeholder from './placeholder.json';

import registration from './registration.json';

// Center Officer Management
import centerBasedOfficerDistribution from './center-officer-management/controller-list/center-based-officer-distribution.json';
import centerBasedOfficerList from './center-officer-management/controller-list/center-based-officer-list.json';
import centerOfficerContactDetails from './center-officer-management/controller-list/center-officer-contact-details.json';
import centerOfficerSendSMS from './center-officer-management/send-sms/send-sms.json';
import centerOfficerSendSMSErrorMsg from './center-officer-management/send-sms/send-sms-error-message.json';

import CustomErrorMessages from './custom-validation-error-messages.json';

import confirmationModal from './confirmation-modal.json';
import attachFile from './attach-file.json';
import AttachFileErrorMessages from './attach-file-error-messages.json';
// Toast Messages
import toastMessage from './toast-message.json';

const translation = {
  translation: {
    LOGIN: login,
    SEARCH: search,
    CENTER_OFFICER_MANAGEMENT_SEARCH: centerOfficerManagementSearch,
    HOME: home,
    REGISTRATION: registration,
    SITE_MAINTENANCE: siteMaintenance,

    CUSTOM_ERROR_MSG: CustomErrorMessages,

    POLITICAL_PARTY: politicalParty,
    ATTACH_FILE_ERROR_MSG: AttachFileErrorMessages,

    // center officer
    CENTER_OFFICER_TOPBAR: centerOfficerTopbar,

    SYMBOL: symbol,
    ORGANIZATION_LIST: organizationList,
    ORGANIZATION_LIST_ERROR_MESSAGE: organizationListErrorMessage,
    OFFICER_LIST: officerList,
    PLACEHOLDER: placeholder,

    ATTACH_FILE: attachFile,

    // Center Officer Management
    CENTER_BASED_OFFICER_ALLOCATION: centerBasedOfficerDistribution,
    CENTER_BASED_OFFICER_LIST: centerBasedOfficerList,
    CENTER_OFFICER_CONTACT_DETAILS: centerOfficerContactDetails,
    CENTER_OFFICER_SEND_SMS: centerOfficerSendSMS,
    CENTER_OFFICER_SEND_SMS_ERROR_MSG: centerOfficerSendSMSErrorMsg,

    // confirmation modal
    CONFIRMATION_MODAL: confirmationModal,

    // Toast Message
    TOAST_MESSAGE: toastMessage,
  },
};

export default translation;
