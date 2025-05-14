import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button, Header, Tab } from '@pentabd/ui';
import { IconPlus } from '@pentabd/icons';
import { ROUTES } from '@constants/routes';

import { getParams } from '@utils';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { USER_MANAGEMENT } from '@constants/permissions/user-management';
import SystemUser from './system-user';
import ElectionUser from './election-user';
import AutomaticUser from './automatic-user';
import {
  systemUserTableBreadcrumbs,
  CURRENT_USER_TYPE,
  USER_PROFILE_LIST_TYPE,
} from './constants';

const { SYSTEM_USER, ELECTION_USER, AUTOMATIC_USER } = CURRENT_USER_TYPE;

const User = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;
  const activePermission = Boolean(
    permissionsArray?.includes(USER_MANAGEMENT.EDIT_USERS_IN_USER_MANAGEMENT),
  );

  const [currentTab, setCurrentTab] = useState<number>();

  useEffect(() => {
    setCurrentTab(() => {
      if (params.type === USER_PROFILE_LIST_TYPE.SYSTEM) {
        return SYSTEM_USER;
      } else if (params.type === USER_PROFILE_LIST_TYPE.ELECTION) {
        return ELECTION_USER;
      } else if (params.type === USER_PROFILE_LIST_TYPE.AUTOMATIC) {
        return AUTOMATIC_USER;
      }
      return ELECTION_USER;
    });
  }, [params.type]);

  const handleNavigate = () => {
    if (
      currentTab === SYSTEM_USER &&
      params?.type === USER_PROFILE_LIST_TYPE.SYSTEM
    ) {
      navigate({
        pathname: ROUTES.SYSTEM_USER_CREATE,
        search: `type=${USER_PROFILE_LIST_TYPE.SYSTEM}`,
      });
    } else {
      navigate({
        pathname: ROUTES.SYSTEM_USER_CREATE,
        search: `type=${USER_PROFILE_LIST_TYPE.ELECTION}`,
      });
    }
  };
  const handleActiveTab = (tabIndex: any) => {
    setCurrentTab(tabIndex);
    if (tabIndex === SYSTEM_USER) {
      setSearchParams({ type: USER_PROFILE_LIST_TYPE.SYSTEM });
    } else if (tabIndex === 1) {
      setSearchParams({ type: USER_PROFILE_LIST_TYPE.ELECTION });
    } else {
      setSearchParams({ type: USER_PROFILE_LIST_TYPE.AUTOMATIC });
    }
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header:
            currentTab === SYSTEM_USER
              ? t('ELECTION_USER.SYSTEM_USER')
              : currentTab === ELECTION_USER
              ? t('ELECTION_USER.ELECTION_USER')
              : t('ELECTION_USER.AUTOMATIC_USER_CREATION'),
        }}
        breadcrumbs={systemUserTableBreadcrumbs(t)}
        actions={
          (currentTab === SYSTEM_USER || currentTab === ELECTION_USER) &&
          permissionsArray?.includes(
            USER_MANAGEMENT.EDIT_USERS_IN_USER_MANAGEMENT,
          )
            ? [
                <Button
                  key={1}
                  type="primary"
                  htmlType="button"
                  size="sm"
                  onClick={handleNavigate}
                >
                  <IconPlus size="20" fill="light" />{' '}
                  {currentTab === SYSTEM_USER
                    ? t('ELECTION_USER.ADD_NEW_SYSTEM_USER')
                    : t('ELECTION_USER.ADD_NEW_ELECTION_USER')}
                </Button>,
              ]
            : [<></>]
        }
      />

      <div className="pb-9 mb-9 border-bottom">
        <Tab active={currentTab} setActiveTab={handleActiveTab}>
          <Tab.Heads>
            {activePermission ? (
              <Tab.Item
                index={SYSTEM_USER}
                label={t('ELECTION_USER.SYSTEM_USER')}
              />
            ) : (
              <></>
            )}
            <Tab.Item
              index={ELECTION_USER}
              label={t('ELECTION_USER.SELECTIVE_USERS')}
            />
            {activePermission ? (
              <Tab.Item
                index={AUTOMATIC_USER}
                label={t('ELECTION_USER.AUTOMATIC_USER_CREATION')}
              />
            ) : (
              <></>
            )}
          </Tab.Heads>
          <Tab.ContentWrapper>
            {activePermission ? (
              <Tab.Content index={SYSTEM_USER}>
                <div></div>
              </Tab.Content>
            ) : (
              <></>
            )}
            <Tab.Content index={ELECTION_USER}>
              <div></div>
            </Tab.Content>
            {activePermission ? (
              <Tab.Content index={AUTOMATIC_USER}>
                <div></div>
              </Tab.Content>
            ) : (
              <></>
            )}
          </Tab.ContentWrapper>
        </Tab>
      </div>

      {currentTab === SYSTEM_USER && <SystemUser />}
      {currentTab === ELECTION_USER && <ElectionUser />}
      {currentTab === AUTOMATIC_USER && <AutomaticUser />}
    </div>
  );
};

export default User;
