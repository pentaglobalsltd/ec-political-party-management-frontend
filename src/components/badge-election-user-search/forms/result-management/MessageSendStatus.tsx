import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import useGetMessageSendStatusSelect from '@hooks/result-management/useGetMessageSendStatusSelect';

export const MessageSendStatusSearch = ({
  callback,
}: {
  callback: (data?: any) => void;
}) => {
  const methods = useForm();
  const { messageSendStatuses, getMessageSendStatuses } =
    useGetMessageSendStatusSelect();

  useEffect(() => {
    getMessageSendStatuses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <FormProvider {...methods}>
      <form className="w-25">
        <div className="d-grid grid-cols-1 gap-6 align-items-end grid-cols-lg-4 pb-6">
          <div className="col-span-6">
            <Select
              title="SEARCH.RESULT_STATUS"
              name={APPLICATION_SEARCH.MESSAGE_SEND_LIST_STATUS}
              onSelectItem={(e) => callback({ messageSendStatus: e })}
              options={messageSendStatuses}
              suffix={<IconChevronDown size="20" fill="subtitle2" />}
              isSearchable
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
