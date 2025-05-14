import { ChildType } from '@type/candidate-info-management/operator-view/candidatePersonalInformation';

export function mapCreateChildrenInfo(data: ChildType) {
  return {
    name: data.childName,
    dob: data.childDob,
    maritalStatus: data.childMaritalStatus,
    education: data.education,
    occupationAndOfficeAddress: data.occupationAndOfficeAddress,
  };
}
