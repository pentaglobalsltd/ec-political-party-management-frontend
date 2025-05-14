import { t } from 'i18next';
import { Button, Text } from '@pentabd/ui';
import { FormProvider, useForm } from 'react-hook-form';
import { VoteCenterTypeSearch } from './CenterTypeSearch';
import { IsActiveSearch } from './IsActiveSearch';
import Select from '@components/inputs/Select';

import { FORM_FIELDS } from './form-fields';
import { IconChevronDown } from '@pentabd/icons';
import { useConstituencyUpazila } from '@hooks/miscellaneous/master-hook/constituency/useConstituencyUpazilas';
import { useEffect, useState } from 'react';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { useUnionsOrWardsSelectByConstituencyUpazilla } from '@hooks/miscellaneous/master-hook/union-or-ward/useUnionsOrWardsSelectByConstituencyUpazilla';
import { areRequiredKeysDefined } from '@components/application-search/utils';

interface Props {
  requiredField?: string[];
  callback: (data?: any) => void;
  field?: {
    upazila?: boolean;
    unionward?: boolean;
    centerType?: boolean;
    status?: boolean;
  };
}

export const VoteCenterListSearch = ({
  callback,
  requiredField,
  field,
}: //  = {
//   upazila: true,
//   unionward: true,
//   centerType: true,
//   status: true,
// },
Props) => {
  const { upazilas, getConstituenciesUpazilaData } = useConstituencyUpazila();
  const { unionsOrWards, getUnionsOrWardsData } =
    useUnionsOrWardsSelectByConstituencyUpazilla();

  const [resetData, setResetData] = useState({
    unionOrWardIds: false,
  });
  const emptyBelowData = (newData: { [name: string]: boolean }) => {
    setResetData((data: any) => ({
      ...data,
      ...newData,
    }));
  };

  const methods = useForm();
  const { handleSubmit, watch } = methods;

  const watchUpazilla = watch(FORM_FIELDS.UPAZILLA_ID);

  const { constituencies: constituenciesRedux } = useFiltersRedux();

  const onSubmit = (data: any) => {
    callback(data);
  };

  useEffect(() => {
    if (constituenciesRedux?.[0]) {
      getConstituenciesUpazilaData(constituenciesRedux[0]?.value);
    }
  }, [constituenciesRedux]);

  useEffect(() => {
    if (constituenciesRedux?.[0] && watchUpazilla)
      getUnionsOrWardsData({
        constituencyId: constituenciesRedux[0]?.value,
        upazilaId: watchUpazilla,
      });
  }, [watchUpazilla]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-grid grid-cols-1 gap-6 align-items-end grid-cols-lg-4 py-6">
          {field?.upazila ? (
            <Select
              placeholder="VOTE_CENTER_ADDITION.SUB_DISTRICT"
              name={FORM_FIELDS.UPAZILLA_ID}
              options={upazilas}
              suffix={<IconChevronDown size="20" fill="subtitle2" />}
              resetData={() => emptyBelowData({ unionOrWardIds: true })}
            />
          ) : null}

          {/* ---------------------- */}

          {field?.unionward ? (
            <Select
              placeholder="VOTE_CENTER_ADDITION.UNION_OR_WARD"
              name={FORM_FIELDS.UNION_OR_WARD_IDS}
              options={unionsOrWards}
              suffix={<IconChevronDown size="20" fill="subtitle2" />}
              clearValue={resetData.unionOrWardIds}
              resetData={() => emptyBelowData({ unionOrWardIds: false })}
            />
          ) : null}

          {/* ---------------------- */}

          {field?.centerType ? <VoteCenterTypeSearch /> : null}

          {field?.status ? <IsActiveSearch /> : null}

          <div className="col-span-1">
            <Button
              type="primary"
              htmlType="submit"
              className="w-25"
              size="lg"
              disabled={
                requiredField && !areRequiredKeysDefined(watch(), requiredField)
              }
            >
              <Text weight="semibold">{t('SEARCH.SEARCH')}</Text>
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
