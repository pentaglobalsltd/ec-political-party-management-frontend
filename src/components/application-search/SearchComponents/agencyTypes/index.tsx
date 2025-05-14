import { useEffect } from 'react';
import { useAgencyTypes } from './hooks/useAgencyTypes';
import Select from '@components/inputs/Select';

import { IconChevronDown } from '@pentabd/icons';
import { APPLICATION_SEARCH } from '..';
import { RefreshDataType, StructTypes } from '../types';

interface Props {
  struct: StructTypes;
  resetData: RefreshDataType;
  emptyBelowData?: (data: any) => void;
}

export const AgencyTypesSearch = ({
  struct,
  resetData,
  emptyBelowData,
}: Props) => {
  const { agencyTypes, getAgencyTypesData } = useAgencyTypes();

  useEffect(() => {
    getAgencyTypesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Select
        title="SEARCH.AGENCY_TYPE"
        name={APPLICATION_SEARCH.AGENCY_TYPE_IDS}
        options={agencyTypes}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        isMulti
        clearValue={resetData?.agencyTypeIds}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
      />
    </div>
  );
};
