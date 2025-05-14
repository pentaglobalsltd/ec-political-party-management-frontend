import { useEffect } from 'react';
import { useRegions } from '@hooks/miscellaneous/master-hook/region/useRegions';
import { useZillas } from '@hooks/miscellaneous/master-hook/zilla/useZillasRegion';
import { useSubDistricts } from '@hooks/miscellaneous/master-hook/upazilas/useSubDistricts';
import { SelectOptionArray } from '@type/selection-option-type';
import { useGetUnionsWardsSelect } from '../union-ward/useGetUnionsWardsSelect';
import { useUnionsOrWards } from '@hooks/miscellaneous/master-hook/union-or-ward/useUnionsOrWards';

interface Props {
  watchDivision: string | (number | undefined)[];
  watchDistrict: string | (number | undefined)[];
  watchSubDistrict: string | (number | undefined)[];
  watchUnion: string | (number | undefined)[];
}

interface HookReturnType {
  regions: SelectOptionArray[];
  zillas: SelectOptionArray[];
  upazilas: SelectOptionArray[];
  unions: SelectOptionArray[];
  unionsWardsMulti: SelectOptionArray[];
}

export const useUnionReserveSeatFields = (props: Props): HookReturnType => {
  const { watchDivision, watchDistrict, watchSubDistrict, watchUnion } = props;

  const { regions } = useRegions();
  const { zillas, getZilla } = useZillas();
  const { upazilas, getSubdistrictData } = useSubDistricts();

  // hook for ইউনিয়ন/ওয়ার্ড field
  const { unionsOrWards: unions, getUnionsOrWard: getUnions } =
    useUnionsOrWards();

  //hook for অন্তর্ভুক্তি field
  const {
    unionsWards: unionsWardsMulti,
    getUnionsWardsSelect: getUnionsWardsSelectMulti,
  } = useGetUnionsWardsSelect();

  useEffect(() => {
    if (watchDivision) {
      getZilla(Number(watchDivision));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchDivision]);

  useEffect(() => {
    if (watchDistrict) {
      getSubdistrictData({ zillaId: Number(watchDistrict) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchDistrict]);

  // api call for ইউনিয়ন/ওয়ার্ড field
  useEffect(() => {
    if (watchSubDistrict) {
      // getUnionsWardsSelectMulti({ upazilaId: Number(watchSubDistrict) });
      getUnions({ upazilaId: Number(watchSubDistrict) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchSubDistrict]);

  // api call for অন্তর্ভুক্তি field
  useEffect(() => {
    if (watchUnion && watchSubDistrict) {
      getUnionsWardsSelectMulti({
        upazilaId: Number(watchSubDistrict),
        unionId: Number(watchUnion),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchUnion]);

  return { regions, zillas, upazilas, unions, unionsWardsMulti };
};
