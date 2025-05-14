import { Table, Text } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import { voterListModalViewTableColumns } from './constant';
import { MessageSendingType } from '@type/result-management/electoral-process/message-sending-list/message-sending-list-type';

interface Props {
  data?: MessageSendingType[];
}

const VoteCenterListModalView = ({ data }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="p-12 d-grid grid-cols-lg-4">
      <div className="col-span-lg-4">
        <Text weight="semibold" size="md">
          {t(
            'MESSAGE_SEND_LIST_PUBLISH.VIEW_CENTER_MODAL.VOTE_CENTER_LIST_CENTER',
          )}
        </Text>

        <div className="mt-16">
          <Table
            columns={voterListModalViewTableColumns(t)}
            rows={data || []}
          />
        </div>
      </div>
    </div>
  );
};

export default VoteCenterListModalView;
