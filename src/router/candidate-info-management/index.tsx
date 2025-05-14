import NoMatch from '@containers/no-match';
import CandidateManagement from '@containers/candidate-info-management/controller-list/candidate-management';
import ViewCandidateManagement from '@containers/candidate-info-management/controller-list/candidate-management/ViewCandidateManagement';
import EditCandidateManagement from '@containers/candidate-info-management/controller-list/candidate-management/EditCandidateManagement';
import ContendingCandidatesNumber from '@containers/candidate-info-management/report/contending-candidates-number';
import CandidateAppliedOnline from '@containers/candidate-info-management/controller-list/candidate-applied-online';
import EditCandidateAppliedOnline from '@containers/candidate-info-management/controller-list/candidate-applied-online/components/edit-candidate-applied-online';
import CandidateVerify from '@containers/candidate-info-management/controller-list/candidate-verify';
import ViewCandidateVerify from '@containers/candidate-info-management/controller-list/candidate-verify/components/ViewCandidateVerify';
import CandidateConfirmation from '@containers/candidate-info-management/controller-list/candidate-confirmation';
import ViewCandidateConfirmation from '@containers/candidate-info-management/controller-list/candidate-confirmation/components/view-candidate-confirmaion';
import ContestingCandidatesList from '@containers/candidate-info-management/report/contesting-candidates-list';
import CandidateUnopposedElected from '@containers/candidate-info-management/controller-list/candidate-unopposed-elected';
import ManualShipmentInfo from '@containers/candidate-info-management/controller-list/manual-shipment-info';
import CandidatesCommunication from '@containers/candidate-info-management/report/candidates-communication';
import ValidNominatedCandidateList from '@containers/candidate-info-management/report/valid-nominated-candidate-list';
import ElectedCandidatesList from '@containers/candidate-info-management/report/elected-candidates-list';
import Appeal from '@containers/candidate-info-management/controller-list/candidate-appeal';
import CIBReport from '@containers/candidate-info-management/report/cib-report';
import SymbolAllocation from '@containers/candidate-info-management/controller-list/candidate-symbol-allocation';
import NominationPaperInformation from '@containers/candidate-info-management/report/nomination-paper-information';
import NumericalReporting1 from '@containers/candidate-info-management/numerical-reporting/numerical-reporting-1';
import NumericalReporting2 from '@containers/candidate-info-management/numerical-reporting/numerical-reporting-2';
import HelpLine from '@containers/candidate-info-management/helpline';
import Selection from '@containers/candidate-info-management/controller-list/candidate-selection';
import CandidacyWithdrawal from '@containers/candidate-info-management/controller-list/candidacy-withdrawal';
// import NominationDashboard from '@containers/candidate-info-management/controller-list/nomination-dashboard';
import EditCandidatePersonalInfo from '@containers/candidate-info-management/controller-list/apply-candidate-personal-information/edit-candidate-personal-info';
import CandidatePersonalInformation from '@containers/candidate-info-management/controller-list/apply-candidate-personal-information';
import NominationOfCandidates from '@containers/candidate-info-management/controller-list/apply-candidate-nomination-form';
import AddNewNominationOfCandidate from '@containers/candidate-info-management/controller-list/apply-candidate-nomination-form/add-new-nomination-of-candidate';
import EditAttachFile from '@containers/candidate-info-management/controller-list/apply-candidate-attach-file/edit-attach-file';
import Affidavit from '@containers/candidate-info-management/controller-list/apply-cadidate-affidavit-form';
import EditAffidavit from '@containers/candidate-info-management/controller-list/apply-cadidate-affidavit-form/edit-affidavit';
import Attachment from '@containers/candidate-info-management/controller-list/apply-candidate-attach-file';
import EditNewNominationOfCandidate from '@containers/candidate-info-management/controller-list/apply-candidate-nomination-form/edit-new-nomination-of-candidate';

import AssetLiabilitiesForm from '@containers/candidate-info-management/controller-list/apply-candidate-asset-liabilities-form';
import IncomeSourceDetails from '@containers/candidate-info-management/controller-list/apply-candidate-income-source-details';
import EditAssetLiabilitiesForm from '@containers/candidate-info-management/controller-list/apply-candidate-asset-liabilities-form/edit';
import EditIncomeSourceDetails from '@containers/candidate-info-management/controller-list/apply-candidate-income-source-details/edit';
import Accept from '@containers/candidate-info-management/controller-list/candidate-accept-online';
import EditAccept from '@containers/candidate-info-management/controller-list/candidate-accept-online/components/edit-accept.tsx';
import CandidateTabs from '@containers/candidate-info-management/controller-list/candidate-applied-online/components/CandidateTabs';
import CWNSCReport from '@containers/candidate-info-management/report/constituency-wise-nomination-status-count-report';
import PPWNSCReport from '@containers/candidate-info-management/report/political-party-wise-nomination-status-count-report';
import BailForfeitedList from '@containers/candidate-info-management/report/bail-forfeited-list';
import { CandidateNominationStatistics } from '@containers/candidate-info-management/controller-list/candidate-nominaton-statistics';
import ViewCandidateStatusHistory from '@containers/candidate-info-management/controller-list/candidate-management/ViewCandidateStatusHistory';
import DynamicReport from '@containers/candidate-info-management/dynamic-report';
import EditDynamicReport from '@containers/candidate-info-management/dynamic-report/edit';

import { PATH } from '@constants/paths';
import { RouteType } from '../types';

const candidateInfoRoutes = (): RouteType[] => [
  {
    id: '1.6.1',
    index: true,
    element: <CandidateManagement />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  {
    id: '1.6.2',
    path: PATH.CANDIDATE_MANAGEMENT, // প্রার্থী ব্যবস্থাপনা
    children: [
      {
        id: '1.6.2.1',
        index: true,
        element: <CandidateManagement />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.6.2.2',
        path: PATH.EDIT_CANDIDATE_MANAGEMENT,
        element: <EditCandidateManagement />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.6.2.3',
        path: PATH.VIEW_CANDIDATE_MANAGEMENT,
        element: <ViewCandidateManagement />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.6.2.4',
        path: PATH.VIEW_CANDIDATE_STATUS_HISTORY,
        element: <ViewCandidateStatusHistory />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },

  {
    id: '1.6.3',
    path: PATH.CANDIDATES_APPLIED_ONLINE, // অনলাইনে আবেদনকৃত প্রার্থী
    children: [
      {
        id: '1.6.3.1',
        index: true,
        element: <CandidateAppliedOnline />, //Candidate applied online
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.6.3.2',
        path: PATH.EDIT_CANDIDATES_APPLIED_ONLINE,
        element: <EditCandidateAppliedOnline />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.6.3.3',
        path: PATH.CANDIDATES_APPLIED_ONLINE_SUMMARY,
        element: <CandidateTabs />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },

  {
    id: '1.6.4',
    path: PATH.APPEAL, // আপিল
    element: <Appeal />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  {
    id: '1.6.5',
    path: PATH.SYMBOL_ALLOCATION, // Symbol Allocation
    element: <SymbolAllocation />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  {
    id: '1.6.6',
    path: PATH.CANDIDATE_CONFIRMATION, // প্রার্থী নিশ্চিতকরন
    children: [
      {
        id: '1.6.6.1',
        index: true,
        element: <CandidateConfirmation />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.6.6.2',
        path: PATH.VIEW_CANDIDATE_CONFIRMATION,
        element: <ViewCandidateConfirmation />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },

  {
    id: '1.6.7',
    path: PATH.WITHDRAWAL_OF_CANDIDATURE, // প্রার্থীতা প্রত্যাহার
    element: <CandidacyWithdrawal />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  {
    id: '1.6.8',
    path: PATH.SELECTION, // বাছাই
    element: <Selection />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  {
    id: '1.6.9',
    path: PATH.MANUAL_SHIPMENT_INFO, // ম্যানুয়াল চালানের তথ্য
    element: <ManualShipmentInfo />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  {
    id: '1.6.10',
    path: PATH.CANDIDATE_VERIFY, // যাচাই
    children: [
      {
        id: '1.6.10.1',
        index: true,
        element: <CandidateVerify />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.6.10.1',
        path: PATH.VIEW_CANDIDATE_VERIFY,
        element: <ViewCandidateVerify />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },

  // Report starts ------------------------------------
  {
    id: '1.6.11',
    path: PATH.CANDIDATES_COMMUNICATION, // প্রার্থীর যোগাযোগ সংক্রান্ত
    element: <CandidatesCommunication />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  {
    id: '1.6.12',
    path: PATH.NOMINATION_PAPER_INFORMATION, // মনোনয়ন পত্র দাখিলকারীদের তথ্য
    children: [
      {
        id: '1.6.12.1',
        index: true,
        element: <NominationPaperInformation />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },

  {
    id: '1.6.13',
    path: PATH.VALID_NOMINATED_CANDIDATE_LIST, // বৈধভাবে মনোনীত প্রার্থীগণের তালিকা
    element: <ValidNominatedCandidateList />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  {
    id: '1.6.14',
    path: PATH.ELECTED_CANDIDATES_LIST, // বিনা প্রতিদ্বন্দ্বীতায় নির্বাচিত প্রার্থীর বিবরণী
    element: <ElectedCandidatesList />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  {
    id: '1.6.15',
    path: PATH.CONTESTING_CANDIDATES_LIST, // প্রতিদ্বন্দ্বী প্রার্থীগণের তালিকা
    element: <ContestingCandidatesList />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  {
    id: '1.6.16',
    path: PATH.CONTENDING_CANDIDATES_NUMBER, // এক নজরে প্রতিদ্বন্দ্বী প্রার্থীর সংখ্যা
    element: <ContendingCandidatesNumber />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  {
    id: '1.6.17',
    path: PATH.CIB_REPORT, // এক নজরে প্রতিদ্বন্দ্বী প্রার্থীর সংখ্যা
    element: <CIBReport />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  {
    id: '1.6.18',
    path: PATH.CWNSC_REPORT, // নির্বাচনী এলাকা ভিত্তিক মনোনয়নের স্ট্যাটাস গণনা প্রতিবেদন
    element: <CWNSCReport />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  {
    id: '1.6.19',
    path: PATH.PPWNSC_REPORT, // রাজনৈতিক দল ভিত্তিক মনোনয়নের স্ট্যাটাস গণনা প্রতিবেদন
    element: <PPWNSCReport />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  {
    id: '1.6.20',
    path: PATH.BAIL_FORFEITED_LIST, // জামানত বাজেয়াপ্ত প্রার্থীদের তালিকা
    element: <BailForfeitedList />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  {
    id: '1.6.21',
    path: PATH.NUMERICAL_REPORTING_1, // সংখ্যাভিত্তিক প্রতিবেদন-১
    element: <NumericalReporting1 />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  // shongkha vittik prodibedon will start from below ------------------------------------
  {
    id: '1.6.22',
    path: PATH.NUMERICAL_REPORTING_2, // সংখ্যাভিত্তিক প্রতিবেদন-২
    element: <NumericalReporting2 />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  {
    id: '1.6.23',
    path: PATH.HELPLINE, // হেল্পলাইন
    element: <HelpLine />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  {
    id: '1.6.24',
    path: PATH.NOMINATION_OF_CANDIDATES, // প্রার্থী মনোনয়ন
    children: [
      {
        id: '1.6.24.1',
        index: true,
        element: <NominationOfCandidates />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.6.24.2',
        path: PATH.CREATE_NEW_NOMINATION_OF_CANDIDATE,
        element: <AddNewNominationOfCandidate />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.6.24.3',
        path: PATH.EDIT_NOMINATION_OF_CANDIDATE,
        element: <EditNewNominationOfCandidate />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },

  {
    id: '1.6.25',
    path: PATH.CANDIDATES_PERSONAL_INFO, // প্রার্থীর ব্যাক্তিগত তথ্যাদি
    children: [
      {
        id: '1.6.25.1',
        index: true,
        element: <CandidatePersonalInformation />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },

      {
        id: '1.6.25.2',
        path: PATH.EDIT_CANDIDATES_PERSONAL_INFO,
        element: <EditCandidatePersonalInfo />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },

  {
    id: '1.6.26',
    path: PATH.NOMINATION_ATTACHMENT, // প্রার্থীর ফাইল সংযুক্তিকরণ
    children: [
      {
        id: '1.6.26.1',
        index: true,
        element: <Attachment />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },

      {
        id: '1.6.26.2',
        path: PATH.EDIT_NOMINATION_ATTACHMENT,
        element: <EditAttachFile />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.6.27',
    path: PATH.AFFIDAVIT, // হলফনামা
    children: [
      {
        id: '1.6.27.1',
        index: true,
        element: <Affidavit />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },

      {
        id: '1.6.27.2',
        path: PATH.EDIT_AFFIDAVIT,
        element: <EditAffidavit />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },

  {
    id: '1.6.28',
    path: PATH.ASSET_LIABILITIES, // সম্পদ ও দায় এবং বাৎসরিক আয় ও ব্যয়ের বিবরণী
    children: [
      {
        id: '1.6.28.1',
        index: true,
        element: <AssetLiabilitiesForm />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },

      {
        id: '1.6.28.2',
        path: PATH.EDIT_ASSET_LIABILITIES,
        element: <EditAssetLiabilitiesForm />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },

  {
    id: '1.6.29',
    path: PATH.ELECTION_EXPENSE, // নির্বাচনী ব্যয় নির্বাহের জন্য অর্থ প্রাপ্তির সম্ভাব্য উৎসের বিবরণী
    children: [
      {
        id: '1.6.29.1',
        index: true,
        element: <IncomeSourceDetails />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },

      {
        id: '1.6.29.2',
        path: PATH.EDIT_ELECTION_EXPENSE,
        element: <EditIncomeSourceDetails />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },

  {
    id: '1.6.30',
    path: PATH.ACCEPT, // গ্রহণ
    children: [
      {
        id: '1.6.30.1',
        index: true,
        element: <Accept />, //Accept
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.6.30.2',
        path: PATH.EDIT_ACCEPT,
        element: <EditAccept />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },

  {
    id: '1.6.31',
    path: PATH.CANDIDATE_NOMINATION_STATISTICS, // আপিল
    element: <CandidateNominationStatistics />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  {
    id: '1.6.32',
    path: PATH.CANDIDATE_UNOPPOSED_ELECTED, // বিনা প্রতিদ্বন্দ্বিতায় নির্বাচিত
    element: <CandidateUnopposedElected />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  // ডাইনামিক রিপোর্ট
  {
    id: '1.6.33',
    path: PATH.DYNAMIC_REPORT,
    children: [
      {
        id: '1.6.33.1',
        index: true,
        element: <DynamicReport />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.6.33.2',
        path: PATH.CREATE_DYNAMIC_REPORT,
        element: <EditDynamicReport />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.6.33.3',
        path: PATH.EDIT_DYNAMIC_REPORT,
        element: <EditDynamicReport />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
];

export default candidateInfoRoutes;