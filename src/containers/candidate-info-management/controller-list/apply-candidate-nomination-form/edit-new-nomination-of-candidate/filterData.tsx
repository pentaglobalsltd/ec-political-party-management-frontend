import {
  FirstPartCandidateType,
  FirstPartProposerType,
} from '@type/candidate-info-management/operator-view/candidate-nomination-form/first-part';
import { SecondPartChildType } from '@type/candidate-info-management/operator-view/candidate-nomination-form/second-part';
import { candidatePersonalInfoType } from '@type/candidate-info-management/operator-view/candidate-nomination-form/third-part';
import { ID_TYPE } from '../constants';

export const mapFirstPartProposer = (
  data: FirstPartProposerType,
  idType: string,
) => {
  const {
    name,
    nid,
    voterNo,
    id,
    dob,
    serialNo,
    zillaId,
    rmoEn,
    upazilaId,
    unionOrWardId,
    constituencyId,
    regionId,
    municipalityId,
    voterAreaId,
    isAgree,
    unionWardId,
  } = data;

  let nidNumber = '';
  let voterNumber = '';

  if (idType === ID_TYPE.NID) {
    nidNumber = nid as string;
    voterNumber = '';
  }
  if (idType === ID_TYPE.VOTER_NO) {
    nidNumber = '';
    voterNumber = voterNo as string;
  }

  return {
    name,
    nid: nidNumber,
    voterNo: voterNumber,
    id,
    dob,
    serialNo,
    zillaId,
    rmo: rmoEn,
    upazilaId,
    unionOrWardId,
    constituencyId,
    regionId,
    municipalityId,
    unionWardId,
    voterAreaId,
    isAgree,
  };
};
export const mapFirstPartCandidate = (data: FirstPartCandidateType) => {
  const { candidateAddress, candidateType } = data;
  return {
    candidateAddress,
    candidateType,
  };
};
export const mapSecondPart = (data: SecondPartChildType, idType: string) => {
  const {
    name,
    nid,
    voterNo,
    id,
    dob,
    serialNo,
    zillaId,
    rmo,
    upazilaId,
    unionOrWardId,
    constituencyId,
    regionId,
    municipalityId,
    voterAreaId,
    isAgree,
    candidateType,
    unionWardId,
  } = data;

  let nidNumber = '';
  let voterNumber = '';

  if (idType === ID_TYPE.NID) {
    nidNumber = nid as string;
    voterNumber = '';
  }
  if (idType === ID_TYPE.VOTER_NO) {
    nidNumber = '';
    voterNumber = voterNo as string;
  }

  return {
    name,
    nid: nidNumber,
    voterNo: voterNumber,
    id,
    dob,
    serialNo,
    zillaId,
    rmo,
    upazilaId,
    unionOrWardId,
    constituencyId,
    regionId,
    municipalityId,
    voterAreaId,
    isAgree,
    candidateType,
    unionWardId,
  };
};
export const mapCandidatePersonalInfo = (data: candidatePersonalInfoType) => {
  const {
    name,
    nid,
    fatherOrHusbandName,
    motherName,
    candidateAddress,
    voterNo,
    serialNo,
    regionId,
    zillaId,
    upazilaId,
    rmo,
    unionOrWardId,
    voterAreaId,
    bankAccountNo,
    bankId,
    bankBranchName,
    tin,
    unionWardId,
  } = data;
  return {
    name,
    nid,
    fatherOrHusbandName,
    motherName,
    candidateAddress,
    voterNo,
    serialNo,
    regionId,
    zillaId,
    upazilaId,
    rmo,
    unionOrWardId,
    voterAreaId,
    bankAccountNo,
    bankId,
    bankBranchName,
    tin,
    unionWardId,
  };
};

export const mapFourthPart = (data: any) => {
  const {
    isElectedBefore,
    pastElectionInfo,
    pastElectionName,
    constituencyId,
  } = data;
  if (isElectedBefore === 'yes') {
    return {
      isElectedBefore,
      candidatePastElectionInfo: { pastElectionInfo, pastElectionName },
    };
  } else {
    return {
      isElectedBefore,
      candidatePresentElectionInfo: { constituencyId },
    };
  }
};

export const nidOptions = [
  { label: 'NID No.', value: 'nid' },
  { label: 'Voter No.', value: 'voterNo' },
];
