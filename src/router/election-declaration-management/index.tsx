import { PATH } from '@constants/paths';
import { RouteType } from '../types';
import ScheduleDeclaration from '@containers/election-declaration-management/election/schedule-declaration';
import NoMatch from '@containers/no-match';
import AddNewScheduleDeclaration from '@containers/election-declaration-management/election/schedule-declaration/components/add-new-schedule-declaration';
import ElectionSettings from '@containers/election-declaration-management/election/election-settings';
import CreateElectionSettings from '@containers/election-declaration-management/election/election-settings/CreateElectionSettings';
import EditElectionSettings from '@containers/election-declaration-management/election/election-settings/EditElectionSettings';
import NominationLetter from '@containers/election-declaration-management/election/nomination-letter';
import CreateNominationLetter from '@containers/election-declaration-management/election/nomination-letter/CreateNominationLetter';
import EditNominationLetter from '@containers/election-declaration-management/election/nomination-letter/EditNominationLetter';
import ElectionCalender from '@containers/election-declaration-management/election/election-calender';
import PossibleElection from '@containers/election-declaration-management/election/possible-election';
import ElectionTransfer from '@containers/election-declaration-management/election/election-transfer';

import AddScheduleInfo from '@containers/election-declaration-management/election-process/add-schedule-info';
import CreateElectionInfo from '@containers/election-declaration-management/election-process/add-schedule-info/edit-election-info';
import Division from '@containers/election-declaration-management/main-list/division';
import CreateDivision from '@containers/election-declaration-management/main-list/division/CreateDivision';
import EditDivision from '@containers/election-declaration-management/main-list/division/EditDivision';
import District from '@containers/election-declaration-management/main-list/district';
import CreateDistrict from '@containers/election-declaration-management/main-list/district/CreateDistrict';
import EditDistrict from '@containers/election-declaration-management/main-list/district/EditDistrict';
import SubDistrict from '@containers/election-declaration-management/main-list/sub-district';
import CreateSubDistrict from '@containers/election-declaration-management/main-list/sub-district/components/create-sub-district/CreateSubDistrict';
import EditSubDistrict from '@containers/election-declaration-management/main-list/sub-district/components/edit-sub-district/EditSubDistrict';
import Union from '@containers/election-declaration-management/main-list/union';
import CreateUnion from '@containers/election-declaration-management/main-list/union/CreateUnion';
import EditUnion from '@containers/election-declaration-management/main-list/union/EditUnion';
import Municipality from '@containers/election-declaration-management/main-list/municipality';
import CreateMunicipality from '@containers/election-declaration-management/main-list/municipality/CreateMunicipality';
import EditMunicipality from '@containers/election-declaration-management/main-list/municipality/EditMunicipality';
import ReservedSeatList from '@containers/election-declaration-management/main-list/reserved-seat-list';
import ReservedSeat from '@containers/election-declaration-management/main-list/reserved-seat-list/ReservedSeat';
import ZillaWard from '@containers/election-declaration-management/main-list/zilla-ward';
import CreateZillaWard from '@containers/election-declaration-management/main-list/zilla-ward/components/add-zilla-ward/CreateZillaWard';
import EditZillaWard from '@containers/election-declaration-management/main-list/zilla-ward/components/edit-zilla-ward/EditZillaWard';
import DistrictReservedSeats from '@containers/election-declaration-management/main-list/district-reserved-seats';
import CreateDistrictReservedSeats from '@containers/election-declaration-management/main-list/district-reserved-seats/CreateDistrictReservedSeats';
import EditDistrictReservedSeats from '@containers/election-declaration-management/main-list/district-reserved-seats/EditDistrictReservedSeats';
import ElectionType from '@containers/election-declaration-management/others/election-type';
import CreateElectionType from '@containers/election-declaration-management/others/election-type/CreateElectionType';
import EditElectionType from '@containers/election-declaration-management/others/election-type/EditElectionType';
import CandidateType from '@containers/election-declaration-management/others/candidate-type';
import InstitutionType from '@containers/election-declaration-management/others/institution-type';
import CreateInstitutionType from '@containers/election-declaration-management/others/institution-type/CreateInstitutionType';
import EditInstitutionType from '@containers/election-declaration-management/others/institution-type/EditInstitutionType';
import ParliamentarySeat from '@containers/election-declaration-management/main-list/parlamentary-seat';
import CreateParliamentarySeat from '@containers/election-declaration-management/main-list/parlamentary-seat/components/CreateParliamentarySeat';
import EditParliamentarySeat from '@containers/election-declaration-management/main-list/parlamentary-seat/components/EditParliamentarySeat';
import InstitutionBuildingType from '@containers/election-declaration-management/others/institution-building-type';
import AddInstitutionBuildingType from '@containers/election-declaration-management/others/institution-building-type/components/AddInstitutionBuildingType';
import EditInstitutionBuildingType from '@containers/election-declaration-management/others/institution-building-type/components/EditInstitutionBuildingType';
import MessageList from '@containers/election-declaration-management/main-list/message-list';
import ElectionProceduresReport from '@containers/election-declaration-management/report/election-procedures-report';
import { ELECTION_SCHEDULE_DECLARATION } from '@constants/permissions/election-schedule-declaration';
import ElectionCeremonyInformation from '@containers/election-declaration-management/report/election-ceremony-information';
import DataProviderInfo from '@containers/election-declaration-management/election-process/data-provider-info';
import UnionWard from '@containers/election-declaration-management/main-list/union-ward';
import AddEditUnionWard from '@containers/election-declaration-management/main-list/union-ward/components/add-edit-union-ward';
import UnionReservedSeats from '@containers/election-declaration-management/main-list/union-reserved-seat';
import AddEditUnionReservedSeats from '@containers/election-declaration-management/main-list/union-reserved-seat/components/add-edit-union-reserved-seat';
import { isPermitted } from '@helpers/permission';

const electionDeclarationRoutes = (permissionsArray: string[]): RouteType[] => [
  // নির্বাচন
  {
    id: '1.3.1.1',
    index: true,
    element: isPermitted(
      permissionsArray,
      ELECTION_SCHEDULE_DECLARATION.ELECTION,
    ) ? (
      <ScheduleDeclaration />
    ) : (
      <AddScheduleInfo />
    ),
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.3.1', // তফসিল ঘোষণা
    path: PATH.DECLARE_SCHEDULE,
    hide: isPermitted(
      permissionsArray,
      ELECTION_SCHEDULE_DECLARATION.ELECTION_FULL_PERMISSION,
    ),
    children: [
      {
        id: '1.3.1.1',
        index: true,
        element: <ScheduleDeclaration />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },

      {
        id: '1.3.1.2', // নতুন সংযোজন
        path: PATH.ADD_NEW_SCHEDULE_DECLARATION,
        element: <AddNewScheduleDeclaration />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.1.3', // নতুন সংযোজন
        path: PATH.EDIT_SCHEDULE_DECLARATION,
        element: <AddNewScheduleDeclaration />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.3.2',
    path: PATH.ELECTION_SETTINGS, // নির্বাচন সেটিংস
    children: [
      {
        id: '1.3.2.1',
        index: true,
        element: <ElectionSettings />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.2.2',
        path: PATH.CREATE_ELECTION_SETTINGS,
        element: <CreateElectionSettings />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.2.3',
        path: PATH.EDIT_ELECTION_SETTINGS,
        element: <EditElectionSettings />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },

  {
    id: '1.3.3',
    path: PATH.NOMINATION_LETTER, // মনোনয়ন পত্র
    children: [
      {
        id: '1.3.3.1',
        index: true,
        element: <NominationLetter />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.3.2',
        path: PATH.CREATE_NOMINATION_LETTER,
        element: <CreateNominationLetter />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.3.3',
        path: PATH.EDIT_NOMINATION_LETTER,
        element: <EditNominationLetter />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.3.5',
    path: PATH.ELECTION_CALENDER, // calender view
    element: <ElectionCalender />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.3.5',
    path: PATH.POSSIBLE_ELECTION, // সম্ভাব্য নির্বাচন
    element: <PossibleElection />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.3.6',
    path: PATH.ELECTION_TRANSFER, // নির্বাচন স্থানান্তর
    element: <ElectionTransfer />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  // নির্বাচন প্রক্রিয়া
  {
    id: '1.3.7',
    path: PATH.ADD_SCHEDULE_INFO, // তফসিল তথ্য সংযোজন
    children: [
      {
        id: '1.3.7.1',
        index: true,
        element: <AddScheduleInfo />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },

      {
        id: '1.3.7.2',
        path: PATH.CREATE_ELECTION_SCHEDULE_INFO,
        element: <CreateElectionInfo />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.7.3',
        path: PATH.EDIT_ELECTION_SCHEDULE_INFO,
        element: <CreateElectionInfo />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },

  // প্রধান তালিকা
  {
    id: '1.3.8',
    path: PATH.DIVISION, // বিভাগ
    children: [
      {
        id: '1.3.17.1',
        index: true,
        element: <Division />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.8.2',
        path: PATH.CREATE_DIVISION,
        element: <CreateDivision />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.8.3',
        path: PATH.EDIT_DIVISION,
        element: <EditDivision />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.3.9',
    path: PATH.DISTRICT, // জেলা
    children: [
      {
        id: '1.3.9.1',
        index: true,
        element: <District />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.9.2',
        path: PATH.CREATE_DISTRICT,
        element: <CreateDistrict />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.9.3',
        path: PATH.EDIT_DISTRICT,
        element: <EditDistrict />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.3.10',
    path: PATH.SUB_DISTRICT, // উপজেলা তালিকা
    children: [
      {
        id: '1.3.10.1',
        index: true,
        element: <SubDistrict />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.10.2',
        path: PATH.CREATE_SUB_DISTRICT,
        element: <CreateSubDistrict />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.10.3',
        path: PATH.EDIT_SUB_DISTRICT,
        element: <EditSubDistrict />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.3.11',
    path: PATH.UNION, // ইউনিয়ন
    children: [
      {
        id: '1.3.11.1',
        index: true,
        element: <Union />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.11.2',
        path: PATH.CREATE_UNION,
        element: <CreateUnion />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.11.3',
        path: PATH.EDIT_UNION,
        element: <EditUnion />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.3.20',
    path: PATH.UNION_WARD, // ইউনিয়ন পরিষদ/ওয়ার্ড
    children: [
      {
        id: '1.4.4.1',
        index: true,
        element: <UnionWard />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.4.4.2',
        path: PATH.ADD_UNION_WARD,
        element: <AddEditUnionWard />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.4.4.3',
        path: PATH.EDIT_UNION_WARD,
        element: <AddEditUnionWard />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },

  {
    id: '1.3.25',
    path: PATH.UNION_RESERVED_SEAT, // ইউনিয়ন পরিষদ সংরক্ষিত আসন
    children: [
      {
        id: '1.3.25.1',
        index: true,
        element: <UnionReservedSeats />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.25.2',
        path: PATH.ADD_UNION_RESERVED_SEAT,
        element: <AddEditUnionReservedSeats />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.25.3',
        path: PATH.EDIT_UNION_RESERVED_SEAT,
        element: <AddEditUnionReservedSeats />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },

  {
    id: '1.3.12',
    path: PATH.MUNICIPALITY, //পৌরসভা
    children: [
      {
        id: '1.3.12.1',
        index: true,
        element: <Municipality />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.12.2',
        path: PATH.CREATE_MUNICIPALITY,
        element: <CreateMunicipality />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.12.3',
        path: PATH.EDIT_MUNICIPALITY,
        element: <EditMunicipality />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.3.14',
    path: PATH.RESERVED_SEAT_LIST, // সংরক্ষিত আসন তালিকা
    children: [
      {
        id: '1.3.14.1',
        index: true,
        element: <ReservedSeatList />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.14.2',
        path: PATH.CREATE_RESERVED_SEAT_LIST,
        element: <ReservedSeat />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.14.3',
        path: PATH.EDIT_RESERVED_SEAT_LIST,
        element: <ReservedSeat />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.3.16',
    path: PATH.PARLIAMENTARY_SEAT, // সংসদীয় আসন
    children: [
      {
        id: '1.3.16.1',
        index: true,
        element: <ParliamentarySeat />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.16.2',
        path: PATH.CREATE_PARLIAMENTARY_SEAT,
        element: <CreateParliamentarySeat />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.16.3',
        path: PATH.EDIT_PARLIAMENTARY_SEAT,
        element: <EditParliamentarySeat />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.3.17',
    path: PATH.ZILLA_WARD, // জেলা ওয়ার্ডের তালিকা
    children: [
      {
        id: '1.3.17.1',
        index: true,
        element: <ZillaWard />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.17.2',
        path: PATH.CREATE_ZILLA_WARD,
        element: <CreateZillaWard />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.17.3',
        path: PATH.EDIT_ZILLA_WARD,
        element: <EditZillaWard />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.3.18',
    path: PATH.DISTRICT_RESERVED_SEATS, // জেলা সংরক্ষিত আসন
    children: [
      {
        id: '1.3.18.1',
        index: true,
        element: <DistrictReservedSeats />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.18.2',
        path: PATH.CREATE_DISTRICT_RESERVED_SEATS,
        element: <CreateDistrictReservedSeats />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.18.3',
        path: PATH.EDIT_DISTRICT_RESERVED_SEATS,
        element: <EditDistrictReservedSeats />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.3.19',
    path: PATH.MESSAGE_LIST, // জেলা সংরক্ষিত আসন
    children: [
      {
        id: '1.3.19.1',
        index: true,
        element: <MessageList />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },

  // অন্যান্য
  {
    id: '1.3.19',
    path: PATH.ELECTION_TYPE, // নির্বাচন প্রকার
    children: [
      {
        id: '1.3.19.1',
        index: true,
        element: <ElectionType />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.19.2',
        path: PATH.CREATE_ELECTION_TYPE,
        element: <CreateElectionType />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.19.3',
        path: PATH.EDIT_ELECTION_TYPE,
        element: <EditElectionType />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.3.20',
    path: PATH.CANDIDATE_TYPE, // প্রার্থীর ধরন
    element: <CandidateType />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.3.21',
    path: PATH.INSTITUTION_BUILDING_TYPE, // প্রতিষ্ঠান ভবনের ধরন
    children: [
      {
        id: '1.3.21.1',
        index: true,
        element: <InstitutionBuildingType />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.21.2',
        path: PATH.CREATE_INSTITUTION_BUILDING_TYPE,
        element: <AddInstitutionBuildingType />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.21.3',
        path: PATH.EDIT_INSTITUTION_BUILDING_TYPE,
        element: <EditInstitutionBuildingType />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.3.22',
    path: PATH.INSTITUTE_TYPE, // প্রতিষ্ঠানের ধরন
    children: [
      {
        id: '1.3.22.1 ',
        index: true,
        element: <InstitutionType />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.22.2',
        path: PATH.CREATE_INSTITUTE_TYPE,
        element: <CreateInstitutionType />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.3.22.2',
        path: PATH.EDIT_INSTITUTE_TYPE,
        element: <EditInstitutionType />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.3.23',
    path: PATH.ELECTION_CEREMONY_INFORMATION, // Election Ceremony Info
    element: <ElectionCeremonyInformation />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.3.24',
    path: PATH.ELECTION_PROCEDURES_REPORT, // নির্বাচন পদ্ধতি প্রতিবেদন
    element: <ElectionProceduresReport />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  // data provider - অ্যাপ্লিকেশনে তথ্য প্রকাশ
  {
    id: '1.3.24',
    path: PATH.DATA_PROVIDER_INFO, // অ্যাপ্লিকেশনে তথ্য প্রকাশ
    element: <DataProviderInfo />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
];

export default electionDeclarationRoutes;
