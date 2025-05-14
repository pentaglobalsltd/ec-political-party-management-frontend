import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import { Button, Header } from '@pentabd/ui';
import { IconCheckCircleBroken, IconRefreshCcw01 } from '@pentabd/icons';

import FormSelect from '@components/inputs/FormSelect';
import FormInput from '@components/inputs/FormInput';
import UserSpecificComponents from './components';

import { FORM_FIELDS } from '@constants/forms';
import { USER_TYPES } from '@constants/user-types';
import { USER_MANAGEMENT } from '@constants/permissions/user-management';
import {
  USER_ACTION,
  newSystemUserTableBreadcrumbs,
  USER_ROLE_TYPE,
} from '../constants';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useLanguage } from '@hooks/miscellaneous/custom-hook/useLanguage';
import useUserTypesList from '@hooks/user-management/useUserTypesList';
import { useCreateUserProfile } from '@hooks/user-management/useCreateUserProfile';
import { useGetUserProfileById } from '@hooks/user-management/useGetUserProfileById';
import useUpdateUserProfileById from '@hooks/user-management/useUpdateUserUpdateById';
import { useReeditNominationPermission } from '@hooks/user-management/useReeditNominationPermission';
import { getParams } from '@utils';
import { mapSubmitSystemUserForm } from './helpers';
import { useUserRoleValidation } from './useUserRoleValidation';
import { SelectOptionArray } from '@type/selection-option-type';

const ELECTION_USER = FORM_FIELDS.USER_MANAGEMENT.CREATE_ELECTION_USER;
const { ASSISTANT_RETURNING_OFFICER, ASSISTANT_RETURNING_OFFICER_OPERATOR } =
  USER_ROLE_TYPE;

interface ConstituencyContextType {
  constituencyFromContext: SelectOptionArray[];
  setConstituencyFromContext: React.Dispatch<
    React.SetStateAction<SelectOptionArray[]>
  >;
  electionSettingsFromContext: any;
  setElectionSettingsFromContext: any;
  electionSettingsForMunicipalityExists?: boolean;
}

export const ConstituencyContext = createContext<
  ConstituencyContextType | undefined
>(undefined);

function CreateSystemUser({ viewProfile = false }: any) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { userId } = useParams();
  let [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;
  const activePermission = Boolean(
    permissionsArray?.includes(USER_MANAGEMENT.EDIT_USERS_IN_USER_MANAGEMENT),
  );

  const { userProfileCreateData, loading, success } = useCreateUserProfile();
  const { userTypes, getUserTypesData } = useUserTypesList();
  const { getUserProfileByIdData, userProfileById } = useGetUserProfileById();
  const { updateLoading, updateSuccess, updateUserProfileById } =
    useUpdateUserProfileById();
  const { postReeditNominationPermission, success: reeditSuccess } =
    useReeditNominationPermission();

  // Dynamic Validation Hook
  const { validationSchema, setUserRoleValidation } = useUserRoleValidation(
    userId as string,
    params,
  );

  // Context states
  const [constituencyFromContext, setConstituencyFromContext] = useState<
    SelectOptionArray[]
  >([]);
  const [electionSettingsFromContext, setElectionSettingsFromContext] =
    useState<number>();

  useEffect(() => {
    if (userId && params?.userType === USER_TYPES.ARO_OP) {
      getUserProfileByIdData({ userId });
    } else {
      if (userId) {
        getUserProfileByIdData({ userId });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (success || updateSuccess) {
      navigate(-1);
    }
  }, [success, navigate, updateSuccess]);

  useEffect(() => {
    if (params?.type) {
      getUserTypesData({ type: params.type });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.type]);

  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
    values: userProfileById,
  });

  const { handleSubmit, reset, watch, clearErrors, setValue } = methods;

  const userRoleWatch = watch(ELECTION_USER.USER_ROLE);

  useEffect(() => {
    if (userRoleWatch) {
      clearErrors();
      setUserRoleValidation({ userRoleWatch });
    }
    if (
      params?.action !== USER_ACTION.EDIT &&
      (userRoleWatch === ASSISTANT_RETURNING_OFFICER ||
        userRoleWatch === ASSISTANT_RETURNING_OFFICER_OPERATOR)
    ) {
      setValue(ELECTION_USER.LOGIN_ID, null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRoleWatch]);

  const resetSystemUserForm = () => {
    reset();
  };

  const submitSystemUserForm = (data: any) => {
    mapSubmitSystemUserForm({
      data,
      userId,
      params,
      language,
      constituencyFromContext,
      electionSettingsFromContext,
      userProfileCreateData,
      updateUserProfileById,
    });
  };

  useEffect(() => {
    if (userId && reeditSuccess) {
      getUserProfileByIdData({ userId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reeditSuccess, userId]);

  return (
    <ConstituencyContext.Provider
      value={{
        constituencyFromContext,
        setConstituencyFromContext,
        electionSettingsFromContext,
        setElectionSettingsFromContext,
        electionSettingsForMunicipalityExists:
          userProfileById?.electionSettingsForMunicipalityExists,
      }}
    >
      <div className="container-96 mb-24">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(submitSystemUserForm)}>
            {!viewProfile && (
              <Header
                className="mb-10 pt-10"
                headerText={{
                  header:
                    params?.action === USER_ACTION.EDIT
                      ? t('ELECTION_USER.EDIT')
                      : t('ELECTION_USER.ADD_NEW'),
                }}
                breadcrumbs={newSystemUserTableBreadcrumbs(t, params)}
              />
            )}

            <div className="mb-9">
              <div className="d-flex flex-column gap-8 p-9 border rounded-5">
                <FormSelect
                  title={t('ELECTION_USER.USER_ROLE')}
                  name={ELECTION_USER.USER_ROLE}
                  options={userTypes}
                  disabled={
                    params?.userType === USER_TYPES.ARO_OP || viewProfile
                  }
                />

                <FormInput
                  title={t('ELECTION_USER.NAME')}
                  placeholder={t('PLACEHOLDER.ENTER')}
                  registerName={ELECTION_USER.NAME}
                  // disabled={params?.userType === USER_TYPES.ARO_OP}
                  disabled={viewProfile}
                />

                <FormInput
                  title={t('ELECTION_USER.EMAIL')}
                  placeholder={t('PLACEHOLDER.ENTER')}
                  registerName={ELECTION_USER.EMAIL}
                  // disabled={params?.userType === USER_TYPES.ARO_OP}
                  disabled={viewProfile}
                />

                <FormInput
                  title={t('ELECTION_USER.LOGIN_ID')}
                  placeholder={
                    userRoleWatch === ASSISTANT_RETURNING_OFFICER ||
                    userRoleWatch === ASSISTANT_RETURNING_OFFICER_OPERATOR
                      ? t(' ')
                      : t('PLACEHOLDER.ENTER')
                  }
                  registerName={ELECTION_USER.LOGIN_ID}
                  disabled={
                    userRoleWatch === ASSISTANT_RETURNING_OFFICER ||
                    userRoleWatch === ASSISTANT_RETURNING_OFFICER_OPERATOR ||
                    params?.userType === USER_TYPES.ARO_OP ||
                    viewProfile
                  }
                />

                <FormInput
                  title={t('ELECTION_USER.PASSWORD')}
                  placeholder={t('PLACEHOLDER.ENTER')}
                  registerName={ELECTION_USER.PASSWORD}
                  disabled={viewProfile}
                />

                <FormInput
                  title={t('ELECTION_USER.CONFIRM_PASSWORD')}
                  placeholder={t('PLACEHOLDER.ENTER')}
                  registerName={ELECTION_USER.CONFIRM_PASSWORD}
                  disabled={viewProfile}
                />

                <UserSpecificComponents
                  viewProfile={viewProfile}
                  userRoleWatch={userRoleWatch}
                  userProfileById={userProfileById}
                  userId={userProfileById?.userId}
                  reeditNomination={userProfileById?.reeditNomination}
                  postReeditNominationPermission={
                    postReeditNominationPermission
                  }
                  setUserRoleValidation={setUserRoleValidation}
                />
              </div>
            </div>

            {!viewProfile && activePermission && (
              <div className="d-flex justify-content-end align-items-center gap-6 border-top py-8">
                <Button
                  fill="outline"
                  key={1}
                  htmlType="button"
                  type="primary"
                  onClick={resetSystemUserForm}
                >
                  {t('ELECTION_USER.RESET')}
                  <IconRefreshCcw01 size="20" fill="primary" />
                </Button>
                <Button
                  key={2}
                  htmlType="submit"
                  type="success"
                  loading={loading || updateLoading}
                >
                  {t('ELECTION_USER.FILED')}
                  <IconCheckCircleBroken size="20" fill="light" />
                </Button>
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </ConstituencyContext.Provider>
  );
}

export default CreateSystemUser;
