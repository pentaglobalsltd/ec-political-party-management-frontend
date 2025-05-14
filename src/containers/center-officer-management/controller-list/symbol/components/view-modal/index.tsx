import { Table } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import { symbolTableElectionAndCandidateTypeColumns } from '../../constants';
import { getDigitBanglaFromEnglish } from '@utils';

const ViewModal = ({ selectedSymbol }: any) => {
  const { t } = useTranslation();

  return (
    <div className="p-12 d-grid grid-cols-lg-4">
      <div className="col-span-lg-4">
        {/* <Text weight="semibold" size="md">
          {t(
            'ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.VOTE_CENTER_LIST_CENTER',
          )}
        </Text> */}

        <div className="mt-16">
          <Table
            columns={symbolTableElectionAndCandidateTypeColumns(t)}
            rows={
              selectedSymbol?.modifiedCandidateTypes?.map(
                (item: any, index: number) => ({
                  ...item,
                  serial: getDigitBanglaFromEnglish(index + 1),
                }),
              ) || []
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
