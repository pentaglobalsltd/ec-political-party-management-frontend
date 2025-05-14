import { useState } from 'react';
import { Button, Modal } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from 'react-router-dom';

import { USER_TYPES } from '@constants/user-types';
import { ROUTES } from '@constants/routes';
import { switchDynamicParamsInRoute } from '../helpers';
import { getParams } from '@utils';
import CreatePollingInstitute from '../../polling-institute/CreatePollingInstitute';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { PollingCentersAggregatedType } from '@type/vote-center-management/polling-centers-aggregated-types';
import { GetPollingPollingInstitutes } from '@api/vote-center-management/center-management/polling-institute/polling-institutes';

function Download({
  row,
  getPollingInstitutesList,
  searchInstituteWatch,
}: {
  row: PollingCentersAggregatedType;
  getPollingInstitutesList: (obj: GetPollingPollingInstitutes) => void;
  searchInstituteWatch: string;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState<number>();

  const navigateToCreatePollingCenter = (row: any) => {
    const electionTypeId = Number(params?.electionTypeId);
    const constituencyId = row?.constituency?.id;
    const electionSettingsId = params?.electionSettingsIds;
    const unionOrWardId = row?.unionOrWard?.id;
    const pollingInstituteId = row?.id;
    const municipalityId = row?.municipality?.id;
    const upazilaId = row?.upazila?.id;

    const navigateObj = {
      pathname: ROUTES.NEW_CENTER_CREATE({
        electionSettingsId,
        unionOrWardId,
        pollingInstituteId,
      }),
    };

    switchDynamicParamsInRoute({
      electionTypeId,
      navigateObj,
      queryParams: {
        constituencyId,
        municipalityId,
        upazilaId,
      },
      navigate,
      createSearchParams,
    });
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div>
      <div className="d-flex gap-5">
        <Button
          fill="outline"
          onClick={() => {
            navigateToCreatePollingCenter(row);
          }}
          type="primary"
          size="sm"
        >
          {t('ADD_VOTE_CENTER.STATUS_TABLE_ACTION_BUTTON')}
        </Button>

        {userType === USER_TYPES.ADMIN ? (
          <Button
            fill="outline"
            onClick={() => {
              setSelectedInstitute(row?.id as number);
              setIsOpenModal(true);
            }}
            type="primary"
            size="sm"
          >
            {t('ADD_VOTE_CENTER.STATUS_TABLE_INSTITUTE_CHANGE')}
          </Button>
        ) : null}
      </div>

      {isOpenModal && selectedInstitute ? (
        <Modal
          isOpen={isOpenModal}
          closeAble
          overlay
          onClose={closeModal}
          portal
        >
          <CreatePollingInstitute
            pollingInstituteId={selectedInstitute}
            closeModal={closeModal}
            getPollingInstitutesList={() =>
              getPollingInstitutesList({
                page: params?.institutePage as unknown as number,
                queryParams: {
                  ...params,
                  nameBn: searchInstituteWatch,
                },
              })
            }
          />
        </Modal>
      ) : null}
    </div>
  );
}

export default Download;
