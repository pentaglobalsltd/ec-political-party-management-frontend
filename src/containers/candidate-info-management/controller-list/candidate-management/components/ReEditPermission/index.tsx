import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import useUpdatePermission from '@hooks/miscellaneous/auth/useUpdatePermission';
import FormSwitch from '@components/inputs/FormSwitch';
import { getParams } from '@utils';

function ReEditPermission({
  rowData,
  getCandidateInformation,
}: {
  rowData: any;
  getCandidateInformation: (data: any) => void;
}) {
  const { updatePermission, loading, success } = useUpdatePermission();

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const methods = useForm();
  const confirmUpdateHandler = () => {
    updatePermission({
      id: rowData?.candidateElectionDetailsId,
      reeditPermission: !rowData?.reeditPermission,
    });
  };

  useEffect(() => {
    if (success) {
      const { page, ...rest } = params;

      getCandidateInformation({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: rest,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <FormProvider {...methods}>
      <div className="px-10">
        <FormSwitch
          id={rowData?.candidateElectionDetailsId}
          name={`${rowData?.candidateElectionDetailsId}`}
          checked={rowData?.reeditPermission}
          controlling
          disabled={loading}
          onChange={(e) => {
            if (rowData?.candidateElectionDetailsId) {
              confirmUpdateHandler();
            }
          }}
        />
      </div>
    </FormProvider>
  );
}

export default ReEditPermission;
