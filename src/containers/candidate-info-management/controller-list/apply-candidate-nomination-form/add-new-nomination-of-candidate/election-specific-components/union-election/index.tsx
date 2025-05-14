import { CANDIDATE_INFO } from '@constants/candidate-info';

import { UnionChairman } from './Chairman';
import { UnionGeneralAndReservedMember } from './GeneralAndReservedMember';
import { GenericProps } from '../../types';

const UnionElection = (props: GenericProps) => {
  const { candidateTypeId } = props;

  const renderComponents = () => {
    switch (candidateTypeId) {
      case CANDIDATE_INFO.UNION_PARISHAD_CHAIRMAN.ID:
        return <UnionChairman {...props} />;
      case CANDIDATE_INFO.UNION_PARISHAD_GENERAL_MEMBER.ID:
        return <UnionGeneralAndReservedMember {...props} />;
      case CANDIDATE_INFO.UNION_PARISHAD_RESERVED_MEMBER.ID:
        return <UnionGeneralAndReservedMember {...props} />;

      default:
        return <></>;
    }
  };

  return renderComponents();
};

export default UnionElection;
