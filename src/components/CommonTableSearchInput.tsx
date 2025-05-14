import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useDebounce } from '@pentabd/ui';
import { IconSearch } from '@pentabd/icons';
import Input from '@components/inputs/Input';
import { FORM_FIELDS } from '@constants/forms';
import { getParams } from '@utils';

const SEARCH_KEY = FORM_FIELDS.SEARCH_FIELD;

type CallbackParamObjType = {
  page: string | number;
  searchItems: { [key: string | number]: any };
};

interface Props {
  callback: (x: CallbackParamObjType) => void;
  tableSearchKey: string;
  isSearchAlwaysEnable?: boolean;
}

function CommonTableSearchInput({
  callback,
  tableSearchKey,
  isSearchAlwaysEnable = false,
}: Props) {
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

  const searchFieldWatch = watch(SEARCH_KEY);

  const isUrlParamsEmpty = Object.keys(params).length === 0;

  const deleteSearchFromUrl = () => {
    if (Object.keys(params).length > 0) {
      const mappedParams = params;

      // delete from url
      if (mappedParams.hasOwnProperty(tableSearchKey)) {
        delete mappedParams?.[tableSearchKey];
      }

      // make api call without the search-key
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
    if (searchFieldWatch !== undefined && searchFieldWatch?.trim()?.length) {
      const word = searchFieldWatch?.trim();
      const { page, ...rest } = params;

      setSearchParams({ ...params, page: '0', [tableSearchKey]: word });

      callback({
        page: 0,
        searchItems: { ...rest, [tableSearchKey]: word },
      });
    } else if (!searchFieldWatch?.trim()?.length) {
      if (isDirty) {
        deleteSearchFromUrl();
      }

      // means page just refreshed
      else {
        const data = params?.[tableSearchKey] || '';
        setValue(SEARCH_KEY, data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, JSON.stringify(params?.[tableSearchKey])]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={(event) => event.preventDefault()}>
        <Input
          registerName={SEARCH_KEY}
          onchange={(data) => setDebounceValue(data)}
          prefix={<IconSearch size="20" />}
          disabled={isSearchAlwaysEnable ? false : isUrlParamsEmpty}
        />
      </form>
    </FormProvider>
  );
}

export default CommonTableSearchInput;
