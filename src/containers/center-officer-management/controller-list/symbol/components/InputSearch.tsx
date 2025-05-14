import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { useDebounce } from '@pentabd/ui';
import { IconSearch } from '@pentabd/icons';

import Input from '@components/inputs/Input';
import { FORM_FIELDS } from '@constants/forms';

import { getParams } from '@utils';

const SEARCH_SYMBOL =
  FORM_FIELDS.CENTER_OFFICER_MANAGEMENT.CONTROLLER_LIST.SYMBOL.SEARCH_SYMBOL;

function InputSearch({ getSymbolList }: { getSymbolList: any }) {
  const [value, setDebounceValue] = useState<any>('');
  const debouncedValue = useDebounce<string>(value, 500);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { watch } = useFormContext();

  const searchSymbolsWatch = watch(SEARCH_SYMBOL);

  // api search in table left components
  useEffect(() => {
    if (
      searchSymbolsWatch !== undefined &&
      searchSymbolsWatch?.trim()?.length
    ) {
      const word = searchSymbolsWatch?.trim();

      if (word || Object.keys(params).length > 0) {
        getSymbolList({ ...params, page: 0, nameBn: word });
      }
      if (word) {
        setSearchParams({
          ...params,
          nameBn: word,
        });
      }
    } else if (!searchSymbolsWatch?.trim()?.length) {
      if (Object.keys(params).length > 0) {
        const mappedParams = params;
        if (mappedParams.hasOwnProperty('nameBn')) {
          delete mappedParams.nameBn;
        }
        if (Object.keys(mappedParams).length > 0) {
          getSymbolList({
            ...mappedParams,
            page: 0,
          });
        }
        setSearchParams({
          ...mappedParams,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <Input
        registerName={SEARCH_SYMBOL}
        onchange={(data) => setDebounceValue(data)}
        prefix={<IconSearch size="20" />}
      />
    </form>
  );
}

export default InputSearch;
