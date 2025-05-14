import { useTranslation } from 'react-i18next';

import { Table, Text } from '@pentabd/ui';
import { voterListModalTableColumns } from './constants';

const VoteCenterListModal = ({ includedPollingCenters }: any) => {
  const { t } = useTranslation();

  return (
    <div className="p-12 d-grid grid-cols-lg-4">
      <div className="col-span-lg-4">
        <Text weight="semibold" size="md">
          {t(
            'ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.VOTE_CENTER_LIST_CENTER',
          )}
        </Text>

        <div className="mt-16">
          <Table
            columns={voterListModalTableColumns(t)}
            rows={includedPollingCenters}
          />
        </div>
      </div>
    </div>
  );
};

export default VoteCenterListModal;
