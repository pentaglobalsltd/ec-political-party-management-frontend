import { RouteType } from '../types';
import { PATH } from '@constants/paths';
import NoMatch from '@containers/no-match';
import SystemUser from '@containers/user-management/controller-list';
import CreateSystemUser from '@containers/user-management/controller-list/create-new-user';
import SystemLog from '@containers/user-management/others/system-log';
import HelpLine from '@containers/user-management/helpline';
import ProfileEdit from '@containers/user-management/controller-list/profile-edit';

const userRoutes: RouteType[] = [
  {
    id: '1.8.1',
    index: true,
    element: <SystemUser />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.8.2',
    path: PATH.USER_MANAGEMENT, // সিস্টেম ব্যবহারকারি
    children: [
      {
        id: '1.8.2.1',
        index: true,
        element: <SystemUser />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.8.2.2',
        path: PATH.SYSTEM_USER_CREATE, // সিস্টেম ব্যবহারকারি - নতুন ব্যবহারকারী তৈরি
        element: <CreateSystemUser />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.8.2.3',
        path: PATH.EDIT_SYSTEM_USER,
        element: <CreateSystemUser />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.8.2.4',
        path: PATH.CREATE_SYSTEM_USER,
        element: <CreateSystemUser />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.8.2.5',
        path: PATH.PROFILE_EDIT_SYSTEM_USER,
        element: <ProfileEdit />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.8.4',
    path: PATH.SYSTEM_LOG,
    element: <SystemLog />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.8.5',
    path: PATH.HELPLINE,
    element: <HelpLine />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
];

export default userRoutes;
