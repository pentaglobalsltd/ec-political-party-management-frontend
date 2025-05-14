import { useTranslation } from 'react-i18next';
import { TableData, TableRow, TableSecondary } from '@pentabd/ui';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { ELECTION_INFO } from '@constants/election-info';
import { submitResultModalColumn } from './constants';

interface Props {
  data: any;
}

const nationalElectionRows = (item: any) => {
  return (
    <>
      <TableData>{item?.challengedLegalVoteCount}</TableData>
      <TableData>{item?.totalLegalVoteCount}</TableData>
    </>
  );
};

const SecondaryTableCandidatesVote = ({ data }: Props) => {
  const { t } = useTranslation();

  const { electionTypes } = useFiltersRedux();

  const renderElectionSpecificRows = (item: any) => {
    switch (electionTypes?.[0]?.value) {
      case ELECTION_INFO.NATIONAL.ID:
        return nationalElectionRows(item);

      case ELECTION_INFO.UPAZILLA.ID:
        return nationalElectionRows(item);

      default:
        return null;
    }
  };

  return (
    <div className="pb-16">
      <TableSecondary
        columns={submitResultModalColumn({
          t,
          electionTypeId: electionTypes?.[0]?.value as number,
        })}
      >
        {data?.candidateVoteDetails?.map((item: any, index: number) => {
          return (
            <TableRow key={index}>
              <TableData>{item?.candidateName}</TableData>
              <TableData>{item?.symbolName}</TableData>
              <TableData>{item?.legalVoteCount}</TableData>

              {renderElectionSpecificRows(item)}
            </TableRow>
          );
        })}
      </TableSecondary>
    </div>
  );
};

export default SecondaryTableCandidatesVote;
