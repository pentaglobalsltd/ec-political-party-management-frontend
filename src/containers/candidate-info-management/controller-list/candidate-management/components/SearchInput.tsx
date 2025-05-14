import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '@pentabd/ui';
import { FormProvider, useForm } from 'react-hook-form';
import { IconSearch } from '@pentabd/icons';
import { FORM_FIELDS } from '@constants/forms';
import Input from '@components/inputs/Input';
import { getParams } from '@utils';

const { SEARCH_NID_OR_Name } =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_MANAGEMENT;

const CANDIDATE_NAME_OR_NID = 'candidateNameOrNid';

export type CallbackParamObjType = { page: number; searchItems: any };

interface Props {
  callback: (x: CallbackParamObjType) => void;
  isSearchAlwaysEnable?: boolean;
}

function SearchInput({ callback, isSearchAlwaysEnable = false }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);
  const methods = useForm();
  const {
    watch,
    setValue,
    formState: { isDirty },
  } = methods;
  const [value, setDebounceValue] = useState<any>('');
  const debouncedValue = useDebounce<string>(value, 500);

  const searchNidOrName = watch(SEARCH_NID_OR_Name);

  const isUrlParamsEmpty = Object.keys(params).length === 0;

  const deleteSearchFromUrl = () => {
    if (Object.keys(params).length > 0) {
      const mappedParams = params;

      if (mappedParams.hasOwnProperty(CANDIDATE_NAME_OR_NID)) {
        console.log('keyword removed || new params:', params);
        delete mappedParams?.[CANDIDATE_NAME_OR_NID];
      }
      if (Object.keys(mappedParams).length > 0) {
        const { page, ...rest } = params;
        callback({
          page: 0,
          searchItems: rest,
        });
      }
      setSearchParams({
        ...mappedParams,
        page: '0',
      });
    }
  };

  useEffect(() => {
    if (searchNidOrName !== undefined && searchNidOrName?.trim()?.length) {
      const data = searchNidOrName?.trim();
      const { page, ...rest } = params;

      setSearchParams({ ...rest, page: '0', [CANDIDATE_NAME_OR_NID]: data });

      callback({
        page: 0,
        searchItems: { ...rest, [CANDIDATE_NAME_OR_NID]: data },
        // [CANDIDATE_NAME_OR_NID]: data, // TODO: remove this in future
      });
    } else if (!searchNidOrName?.trim()?.length) {
      if (isDirty) {
        deleteSearchFromUrl();
      }

      // means page just refreshed
      else {
        const data = params?.[CANDIDATE_NAME_OR_NID] || '';
        setValue(SEARCH_NID_OR_Name, data);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={(event) => event.preventDefault()}>
        <Input
          registerName={SEARCH_NID_OR_Name}
          onchange={(data) => setDebounceValue(data)}
          prefix={<IconSearch size="20" />}
          disabled={isSearchAlwaysEnable ? false : isUrlParamsEmpty}
          size="xs"
        />
      </form>
    </FormProvider>
  );
}

export default SearchInput;
