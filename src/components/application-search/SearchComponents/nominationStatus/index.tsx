import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import useNominationStatuses from '@hooks/candidate-info-management/controller-list/nomination-status/useNominationStatuses';
import { useEffect } from 'react';

export const NominationStatusSearch = ({
  ignoreOnlineDraft,
}: {
  ignoreOnlineDraft?: boolean;
}) => {
  const { nominationStatuses, getNominationStatusData } = useNominationStatuses(
    { isActive: true },
  );
  useEffect(() => {
    getNominationStatusData(ignoreOnlineDraft);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Select
        title="SEARCH.STATUS"
        name={APPLICATION_SEARCH.STATUS}
        options={nominationStatuses}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        isMulti
      />
    </div>
  );
};
