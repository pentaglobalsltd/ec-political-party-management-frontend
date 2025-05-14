import { VOTE_CENTER_MANAGEMENT } from '@constants/forms/vote-center-management/vote-center-management';
import { PollingCenterReqBodyType } from '@type/vote-center-management/create-polling-center-types';
import { ContextData } from '../context/NewVoteCenterContext';
import { INPUT_TYPE_TABLE_ROW } from '@validations/vote-center-management/center-management/vote-center-addition/voteCenterAdditionValidation';
import { typeUpdateUpdatePollingCentersByIdData } from '@hooks/vote-center-management/center-management/polling-center/useUpdatePollingCenterById';
import { PotentialVoterAreasType } from '@type/vote-center-management/potential-polling-centers-types';
import { CreatePollingCenterType } from '@hooks/vote-center-management/center-management/polling-center/useCreatePollingCenter';

const { UPDATE_VOTE_CENTER, ADD_VOTER_AREA_TABLE } =
  VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT.VOTE_CENTER_ADDITION.NEW_CENTER;

const {
  IS_CHECKED,
  NUMBER_OF_VOTERS,
  SERIAL_OF_VOTERS_MALE,
  SERIAL_OF_VOTERS_FEMALE,
  SERIAL_OF_VOTERS_THIRD_GENDER,
} = ADD_VOTER_AREA_TABLE;

interface MapFormSubmitCreate {
  data: any;
  potentialVoterAreas?: PotentialVoterAreasType[];
  electionSettingsId?: string;
  unionOrWardId?: string;
  unionWardId?: number;
  pollingInstituteId?: string;
  createPollingCenter: CreatePollingCenterType;
}

export const mapFormSubmitCreate = ({
  data,
  potentialVoterAreas,
  electionSettingsId,
  unionOrWardId,
  unionWardId,
  pollingInstituteId,
  createPollingCenter,
}: MapFormSubmitCreate) => {
  const voterAreaArray = data?.voterAreas?.map((item: any, index: number) => {
    return {
      ...item,
      id: potentialVoterAreas?.[index]?.id,
      areaCode: potentialVoterAreas?.[index]?.areaCode,
      nameEn: potentialVoterAreas?.[index]?.nameEn,
      nameBn: potentialVoterAreas?.[index]?.nameBn,
    };
  });

  const reqBody: PollingCenterReqBodyType = {
    electionSettingId: electionSettingsId,
    unionOrWardId: unionOrWardId,
    unionWardId: unionWardId,

    serial: data[UPDATE_VOTE_CENTER.SERIAL_NO],

    instituteNameBn: data[UPDATE_VOTE_CENTER.CENTER_INSTITUTE_NAME_BN],
    instituteNameEn: data[UPDATE_VOTE_CENTER.CENTER_INSTITUTE_NAME_EN],

    descriptionBn: data[UPDATE_VOTE_CENTER.CENTER_DESCRIPTION_BANGLA],
    descriptionEn: data[UPDATE_VOTE_CENTER.CENTER_DESCRIPTION_ENGLISH],
    voterType: data[UPDATE_VOTE_CENTER.CENTER_TYPE],
    numberOfBooth: data[UPDATE_VOTE_CENTER.TOTAL_BOOTH],
    numberOfTemporaryBooth: data[UPDATE_VOTE_CENTER.NUMBER_OF_TEMPORARY_BOOTH],
    isTemporary:
      data[UPDATE_VOTE_CENTER.TEMPORARY_CENTER] === 'active' ? true : false,
    isTabCenter:
      data[UPDATE_VOTE_CENTER.TAB_CENTER] === 'active' ? true : false,
    isEvmCenter:
      data[UPDATE_VOTE_CENTER.EVM_RESULT] === 'active' ? true : false,

    pollingInstituteId: pollingInstituteId,
    isActive: true,

    voterAreas: voterAreaArray
      .filter((area: any) => area?.[IS_CHECKED])
      .map((item: any) => {
        return {
          ...item,
          voterAreaId: item?.voterAreaId,
          areaCode: item?.areaCode,
          electionClass: 'NATIONAL',
          nameEn: item?.nameEn,
          nameBn: item?.nameBn,
          maleVoter: item?.[NUMBER_OF_VOTERS.COL_MALE],
          femaleVoter: item?.[NUMBER_OF_VOTERS.COL_FEMALE],
          thirdGenderVoter: item?.[NUMBER_OF_VOTERS.COL_THIRD_GENDER],
          maleVoterSerialStart: item?.[SERIAL_OF_VOTERS_MALE.COL_START],
          maleVoterSerialEnd: item?.[SERIAL_OF_VOTERS_MALE.COL_FINISH],
          femaleVoterSerialStart: item?.[SERIAL_OF_VOTERS_FEMALE.COL_START],
          femaleVoterSerialEnd: item?.[SERIAL_OF_VOTERS_FEMALE.COL_FINISH],

          thirdGenderVoterSerialStart:
            item?.[SERIAL_OF_VOTERS_THIRD_GENDER.COL_START],
          thirdGenderVoterSerialEnd:
            item?.[SERIAL_OF_VOTERS_THIRD_GENDER.COL_FINISH],
        };
      }),
  };

  if (electionSettingsId && unionOrWardId)
    createPollingCenter({ electionSettingsId, unionOrWardId, reqBody });
};

export const mapFormSubmitUpdate = ({
  electionSettingsId,
  unionOrWardId,
  unionWardId,
  pollingCenterId,
  data,
  contextData,
  updateUpdatePollingCentersByIdData,
}: {
  electionSettingsId?: string;
  unionOrWardId?: string;
  unionWardId?: number;
  pollingCenterId?: string;
  data: any;
  contextData?: ContextData;
  updateUpdatePollingCentersByIdData: typeUpdateUpdatePollingCentersByIdData;
}) => {
  if (electionSettingsId && unionOrWardId && pollingCenterId) {
    const reqBody = {
      id: Number(pollingCenterId),
      electionSettingId: Number(electionSettingsId),
      unionOrWardId: Number(unionOrWardId),
      unionWardId: unionWardId,

      serial: Number(data[UPDATE_VOTE_CENTER.SERIAL_NO]),

      instituteNameBn: data[UPDATE_VOTE_CENTER.CENTER_INSTITUTE_NAME_BN],
      instituteNameEn: data[UPDATE_VOTE_CENTER.CENTER_INSTITUTE_NAME_EN],

      descriptionBn: data[UPDATE_VOTE_CENTER.CENTER_DESCRIPTION_BANGLA],
      descriptionEn: data[UPDATE_VOTE_CENTER.CENTER_DESCRIPTION_ENGLISH],
      voterType: data[UPDATE_VOTE_CENTER.CENTER_TYPE],
      numberOfBooth: data[UPDATE_VOTE_CENTER.TOTAL_BOOTH],
      numberOfTemporaryBooth:
        data[UPDATE_VOTE_CENTER.NUMBER_OF_TEMPORARY_BOOTH],
      isTemporary:
        data[UPDATE_VOTE_CENTER.TEMPORARY_CENTER] === 'active' ? true : false,
      isTabCenter:
        data[UPDATE_VOTE_CENTER.TAB_CENTER] === 'active' ? true : false,
      isEvmCenter:
        data[UPDATE_VOTE_CENTER.EVM_RESULT] === 'active' ? true : false,

      pollingInstituteId: contextData?.potentialPollingInstitute?.id,
      voterAreas: data[INPUT_TYPE_TABLE_ROW],
    };

    reqBody.voterAreas = reqBody?.voterAreas?.filter(
      (area: any) => area?.[UPDATE_VOTE_CENTER.IS_CHECKED],
    );
    updateUpdatePollingCentersByIdData({
      id: pollingCenterId,
      data: reqBody,
    });
  }
};
