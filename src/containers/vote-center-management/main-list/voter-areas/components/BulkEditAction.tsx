import { useEffect } from 'react';
import Select from '@components/inputs/Select';
import { useGetUnionsWardsSelect } from '@hooks/election-schedule-management/main-list/union-ward/useGetUnionsWardsSelect';
import { GetUnionWardType } from '@type/election-declaration-management/main-list/union-ward/union-ward-type';

function BulkEditAction({ data }: { data: GetUnionWardType }) {
  const { getUnionsWardsSelect, unionsWards } = useGetUnionsWardsSelect();
  useEffect(() => {
    if (data?.unionOrWard?.id) {
      getUnionsWardsSelect({
        unionId: data?.unionOrWard?.id,
        upazilaId: data?.upazila?.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.unionId, data?.upazila]);

  return (
    <Select
      name={`bulkEditUnionWards-${data.id}`}
      portal
      options={unionsWards}
      defaultValue={data.unionWardId}
    />
  );
}

export default BulkEditAction;
