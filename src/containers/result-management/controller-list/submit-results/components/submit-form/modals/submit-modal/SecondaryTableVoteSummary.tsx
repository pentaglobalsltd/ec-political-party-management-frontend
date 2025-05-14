import { useTranslation } from 'react-i18next';
import { TableData, TableRow, TableSecondary } from '@pentabd/ui';
import { electionNameMapping } from '@helpers/election-type';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { shouldDisplayExtraRows } from '../../helper/should-display-extra-rows';

interface Props {
  data: any;
}

const SecondaryTableVoteSummary = ({ data }: Props) => {
  const { t } = useTranslation();

  const { electionTypes } = useFiltersRedux();

  const electionTypeLabel = electionNameMapping(
    electionTypes?.[0]?.value as number,
  );

  return (
    <div>
      <TableSecondary columns={[]}>
        {/* 1 */}
        <TableRow>
          <TableData>
            {t(`SUBMIT_RESULTS.CANDIDATE_TOTAL_VOTE.${electionTypeLabel}`)}
          </TableData>
          <TableData>{data?.totalLegalVoteCount}</TableData>
          <TableData></TableData>
        </TableRow>

        {/* 2 */}
        <TableRow>
          <TableData>
            {t(`SUBMIT_RESULTS.TOTAL_ILLEGAL_VOTER_NO.${electionTypeLabel}`)}
          </TableData>
          <TableData>{data?.totalIllegalVoteCount}</TableData>
          <TableData></TableData>
        </TableRow>

        {/* 3 */}
        <TableRow>
          <TableData>
            {t(`SUBMIT_RESULTS.TOTAL_VOTE.${electionTypeLabel}`)}
          </TableData>
          <TableData>{data?.netTotalVotes}</TableData>
          <TableData></TableData>
        </TableRow>

        {shouldDisplayExtraRows(electionTypes?.[0]?.value) && (
          <>
            {/* 4 */}
            <TableRow>
              <TableData>
                {t(`SUBMIT_RESULTS.PRESENT_VOTER.${electionTypeLabel}`)}
              </TableData>
              <TableData>{data?.netTotalVotes}</TableData>
              <TableData></TableData>
            </TableRow>

            {/* 5 */}
            <TableRow>
              <TableData>
                {t(`SUBMIT_RESULTS.ABSENT_VOTER.${electionTypeLabel}`)}
              </TableData>
              <TableData>{data?.totalAbsentVoteCount}</TableData>
              <TableData></TableData>
            </TableRow>
          </>
        )}
      </TableSecondary>
    </div>
  );
};

export default SecondaryTableVoteSummary;
