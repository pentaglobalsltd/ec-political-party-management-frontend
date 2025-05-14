import { PropsElectionSpecificRows } from './interface';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { ELECTION_INFO } from '@constants/election-info';
import NationalElection from './NationalElection';

const ElectionSpecificRows = (props: PropsElectionSpecificRows) => {
  const { electionTypes } = useFiltersRedux();

  const renderRows = () => {
    const electionTypeId = electionTypes?.[0]?.value as number;

    switch (electionTypeId) {
      case ELECTION_INFO.NATIONAL.ID:
        return <NationalElection {...props} />;

      case ELECTION_INFO.UPAZILLA.ID:
        return <NationalElection {...props} />;

      default:
        return <></>;
    }
  };

  return renderRows();
};

export default ElectionSpecificRows;
