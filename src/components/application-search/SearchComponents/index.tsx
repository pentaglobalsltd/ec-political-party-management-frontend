import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { Button, Text } from '@pentabd/ui';

import { CandidateTypeSearch } from './candidateType';

import { ElectionTypeSearch } from '@components/application-search/SearchComponents/electionType';
import { FORM_FIELDS } from '@constants/forms';
import {
  areRequiredKeysDefined,
  convertArrayValuesToCommaSeparated,
  displayInput,
  removeUndefinedProperties,
} from '../utils';
import { ADMIN_SEARCH } from './form';
import { RefreshDataType, SearchComponentProps, StructTypes } from './types';
export const APPLICATION_SEARCH = FORM_FIELDS.APPLICATION_SEARCH;

export const SearchComponents = ({
  struct,
  onSubmitHandler,
  totalCol = 'grid-cols-lg-12',
  colSpan = 'col-span-3',
  requiredField,
  allSelectedData,
  title,
  loading,
}: SearchComponentProps) => {
  const [formData, setFormData] = useState<FieldValues>();

  const [resetData, setResetData] = useState<RefreshDataType>({
    ...allSelectedData,
  });
  const { t } = useTranslation();
  const [, setSearchParams] = useSearchParams();

  const methods = useForm();

  const { watch, handleSubmit, setValue } = methods;

  const getWatchList = (fieldStruct: any) => {
    const watchList: any = {};
    if (fieldStruct) {
      Object.keys(fieldStruct)?.forEach((key: string) => {
        if (key === 'getDirectValue') {
          Object.assign(watchList, fieldStruct[key]);
        } else {
          watchList[key] = watch(fieldStruct[key]);
        }
      });
    }

    return watchList;
  };

  const emptyBelowData = (newData: { [name: string]: boolean }) => {
    setResetData((data: any) => ({
      ...data,
      ...newData,
    }));
  };

  const onSubmit = (data: any) => {
    data = convertArrayValuesToCommaSeparated(data);

    if (onSubmitHandler) {
      const newData: any = removeUndefinedProperties(data);

      onSubmitHandler(newData);
      setSearchParams({ ...newData, page: 0 });
    }
  };

  useEffect(() => {
    setFormData(watch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(watch())]);

  return (
    <div className="bg-light mb-10 rounded-5">
      <FormProvider {...methods}>
        <form
          className={classNames(' p-10 box-ex rounded-5')}
          onSubmit={handleSubmit(onSubmit)}
        >
          {title ? (
            <div className="pb-5">
              <Text size="lg" weight="bold">
                {t(title)}
              </Text>
            </div>
          ) : null}
          <div
            className={classNames(
              'd-grid grid-cols-1 gap-6 align-items-end',
              totalCol,
            )}
          >
            {struct?.map((item: StructTypes, index: any) => (
              <div
                key={index}
                className={colSpan}
                style={{
                  display: displayInput({
                    struct: item,
                    formData,
                  })
                    ? 'block'
                    : 'none',
                }}
              >
                {/* নির্বাচনের ধরন */}
                {item?.fieldName === ADMIN_SEARCH.ELECTION_TYPE ? (
                  <ElectionTypeSearch
                    struct={item}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                  />
                ) : null}

                {/* প্রার্থীর ধরন */}
                {item?.fieldName === ADMIN_SEARCH.CANDIDATE_TYPE ? (
                  <CandidateTypeSearch
                    struct={item}
                    watchList={getWatchList(item?.pathParamsDependency)}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                    setValue={setValue}
                  />
                ) : null}
              </div>
            ))}

            <div className="col-span-1">
              <Button
                type="primary"
                htmlType="submit"
                className="w-100"
                size="lg"
                loading={loading}
                disabled={
                  requiredField &&
                  !areRequiredKeysDefined(watch(), requiredField)
                }
              >
                <Text weight="semibold">{t('SEARCH.SEARCH')}</Text>
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
