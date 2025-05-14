import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TableSecondary, Text } from '@pentabd/ui';
import InputTypeTableRow from './components/InputTypeTableRow';
import {
  getColumnSecondaryAddVoterArea,
  getColumnsAddVoterArea,
} from '../../../../constants';
import VoterAreaSearch from './components/VoterAreaSearch';
import { VOTE_CENTER_MANAGEMENT } from '@constants/forms/vote-center-management/vote-center-management';
import { NewVoteCenterContext } from '../../context/NewVoteCenterContext';
import { VoterAreaSearchParams } from '../..';
import { useFormContext } from 'react-hook-form';
import { typeGetPotentialPollingInstituteCenterAreasData } from '@hooks/vote-center-management/center-management/polling-center/usePotentialPollingCenters';
import { typeGetPollingCentersByIdData } from '@hooks/vote-center-management/center-management/polling-center/useGetPollingCenterByIdPollingCenterService';
import VoterAreaFooter from './components/VoterAreaFooter';
import { VoterCount } from './types';
import { ELECTION_INFO } from '@constants/election-info';

const ADD_VOTER_AREA = 'UPDATE_VOTE_CENTER.ADD_VOTER_AREA';

const { ADD_VOTE_CENTER } =
  VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT.VOTE_CENTER_ADDITION.NEW_CENTER;

interface Props {
  getPotentialPollingInstituteCenterAreasData: typeGetPotentialPollingInstituteCenterAreasData;
  getPollingCentersByIdData: typeGetPollingCentersByIdData;
}

const AddVoterArea = ({
  getPotentialPollingInstituteCenterAreasData,
  getPollingCentersByIdData,
}: Props) => {
  const { t } = useTranslation();

  // pollingInstituteId => present means CREATE
  // pollingCenterId    => present means UPDATE

  const {
    electionSettingsId,
    unionOrWardId,
    pollingInstituteId,
    pollingCenterId,
  } = useParams();

  const isCreate = !!pollingInstituteId;
  const isUpdate = !!pollingCenterId;

  const { getValues } = useFormContext();

  const { contextData, setContextData } = useContext(NewVoteCenterContext)!;

  const votingAreas = contextData?.potentialVoterAreas;
  const upazilaId = contextData?.potentialPollingInstitute?.upazila?.id;

  const isUnionParishadElection =
    ELECTION_INFO.UNION_PARISHAD.ID ===
    contextData?.potentialPollingCenter?.electionTypeId;

  const [voterCount, setVoterCount] = useState<VoterCount>({
    male: 0,
    female: 0,
    thirdGender: 0,
    total: 0,
  });

  const handleVoterAreaSearchCreate = (data: VoterAreaSearchParams) => {
    if (electionSettingsId && unionOrWardId && pollingInstituteId) {
      const centerInfo = getValues();

      setContextData((prev: any) => {
        return {
          ...prev,
          potentialPollingCenter: {
            ...prev.potentialPollingCenter,
            ...centerInfo,
          },
        };
      });

      // const isWardPresent = !!data.unionWardIds?.length;

      getPotentialPollingInstituteCenterAreasData({
        electionSettingsId,
        unionOrWardId,
        queryParams: {
          pollingInstituteId,
          unionOrWardIds: data.uniOrWardsIds,
          ...(data.unionWardIds ? { unionWardIds: data?.unionWardIds } : {}),
          ...(data.nameBn ? { nameBn: data.nameBn } : {}),
        },
        getVoterAreOnly: true,
      });
    }
  };

  const handleVoterAreaSearchUpdate = (data: VoterAreaSearchParams) => {
    const centerInfo = getValues();

    setContextData((prev: any) => {
      return {
        ...prev,
        potentialPollingCenter: {
          ...prev.potentialPollingCenter,
          ...centerInfo,
        },
      };
    });

    if (electionSettingsId && unionOrWardId && pollingCenterId) {
      getPollingCentersByIdData({
        electionSettingsId,
        unionOrWardId,
        pollingCenterId,
        queryParams: {
          unionOrWardIds: data?.uniOrWardsIds,
          ...(data.unionWardIds ? { unionWardIds: data?.unionWardIds } : {}),
          ...(data.nameBn ? { nameBn: data.nameBn } : {}),
        },
        getVoterAreOnly: true,
      });
    }
  };

  const handleVoterAreaSearch = (data: any) => {
    if (isCreate) handleVoterAreaSearchCreate(data);
    else if (isUpdate) handleVoterAreaSearchUpdate(data);
  };

  useEffect(() => {
    if (votingAreas && votingAreas?.length > 0) {
      let totalMale = 0;
      let totalFemale = 0;
      let totalThirdGender = 0;

      votingAreas?.forEach((area: any) => {
        if (area?.isSelected) {
          totalMale = totalMale + (parseInt(area?.maleVoter) | 0);
          totalFemale = totalFemale + (parseInt(area?.femaleVoter) | 0);
          totalThirdGender =
            totalThirdGender + (parseInt(area?.thirdGenderVoter) | 0);
        }
      });

      setVoterCount({
        male: totalMale,
        female: totalFemale,
        thirdGender: totalThirdGender,
        total: totalMale + totalFemale + totalThirdGender,
      });
    }
  }, [votingAreas]);

  return (
    <div className="my-10">
      <Text className="text-title" size="xl" weight="semibold">
        {t(`${ADD_VOTER_AREA}.TITLE`)}
      </Text>

      <VoterAreaSearch
        requiredField={
          isUnionParishadElection
            ? [ADD_VOTE_CENTER.UNION, ADD_VOTE_CENTER.UP_WARD]
            : [ADD_VOTE_CENTER.UNION]
        }
        handleVoterAreaSearch={handleVoterAreaSearch}
        searchDefaultValues={{
          upazilaId,
          unionOrWardId,
        }}
      />

      <div className="my-10">
        <TableSecondary
          border
          columns={getColumnsAddVoterArea(t, ADD_VOTER_AREA)}
          columnSecondary={getColumnSecondaryAddVoterArea(t, ADD_VOTER_AREA)}
        >
          {votingAreas?.map((row, index) => (
            <InputTypeTableRow
              index={index}
              key={index}
              voterArea={row?.name}
              areaCode={row?.areaCode}
              setVoterCount={setVoterCount}
              rowData={row}
            />
          ))}
        </TableSecondary>
      </div>

      <VoterAreaFooter voterCount={voterCount} />
    </div>
  );
};

export default AddVoterArea;
