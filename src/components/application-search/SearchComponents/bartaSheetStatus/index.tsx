import { useEffect } from 'react';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import useGetMessageSendStatusSelect from '@hooks/result-management/useGetMessageSendStatusSelect';

export const BartaSheetStatusSearch = () => {
  const { messageSendStatuses, getMessageSendStatuses } =
    useGetMessageSendStatusSelect();

  useEffect(() => {
    getMessageSendStatuses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Select
        title="SEARCH.RESULT_STATUS"
        name={APPLICATION_SEARCH.MESSAGE_SEND_LIST_STATUS}
        options={messageSendStatuses}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
      />
    </div>
  );
};
