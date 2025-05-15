import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '@pentabd/ui';
import { FormProvider, useForm } from 'react-hook-form';
import { IconSearch } from '@pentabd/icons';
import Input from '@components/inputs/Input';
import { getParams } from '@utils';

export type CallbackParamObjType = { page: number; searchItems: any };

interface Props {
  callback: (x: CallbackParamObjType) => void;
  searchKey: string;
}

function SearchInput({ callback, searchKey }: Props) {
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

  const watchSearchKey = watch(searchKey);

  const deleteSearchFromUrl = () => {
    if (Object.keys(params).length > 0) {
      const mappedParams = params;

      if (Object.prototype.hasOwnProperty.call(mappedParams, searchKey)) {
        delete mappedParams?.[searchKey];
      }
      if (Object.keys(mappedParams).length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    if (watchSearchKey !== undefined && watchSearchKey?.trim()?.length) {
      const data = watchSearchKey?.trim();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { page, ...rest } = params;

      setSearchParams({ ...rest, page: '0', [searchKey]: data });

      callback({
        page: 0,
        searchItems: { ...rest, [searchKey]: data },
      });
    } else if (!watchSearchKey?.trim()?.length) {
      if (isDirty) {
        deleteSearchFromUrl();
      }

      // means page just refreshed
      else {
        const data = params?.[searchKey] || '';
        setValue(searchKey, data);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={(event) => event.preventDefault()}>
        <Input
          registerName={searchKey}
          onchange={(data) => setDebounceValue(data)}
          prefix={<IconSearch size="20" />}
          size="xs"
        />
      </form>
    </FormProvider>
  );
}

export default SearchInput;
