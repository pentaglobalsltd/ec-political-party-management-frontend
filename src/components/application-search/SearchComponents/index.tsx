import { useEffect, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { Button, Dropdown, Text } from '@pentabd/ui';

import { CandidateTypeSearch } from './candidateType';

import { FORM_FIELDS } from '@constants/forms';
import { ADMIN_SEARCH } from './form';
import { USER_TYPE_CODE_ALL } from '../constants';
import { ElectionTypeSearch } from '@components/application-search/SearchComponents/electionType';
import { RefreshDataType, SearchComponentProps, StructTypes } from './types';
import {
  displayInput,
  SelectedOneField,
  hasUndefinedValues,
  areRequiredKeysDefined,
  removeUndefinedProperties,
  areConditionalRequiredKeysDefined,
  convertArrayValuesToCommaSeparated,
} from '../utils';
export const ADVANCE_SEARCH = ADMIN_SEARCH.ADVANCE_SEARCH;
export const APPLICATION_SEARCH = FORM_FIELDS.APPLICATION_SEARCH;

export const SearchComponents = ({
  struct,
  onSubmitHandler,
  totalCol = 'grid-cols-lg-12',
  colSpan = 'col-span-3',
  requiredField,
  userType,
  allSelectedData,
  submitButtonDisabled,
  nominationStatusCodes,
  paymentType,
  title,
  customClass,
  loading,
  selectAny,
  isSetSearchParams = true,
  isDetailedButton = false,
  isBriefButton = false,
  showSubmitButton = true,
  isBriefButtonOptions,
  isDetailedButtonOptions,
  isPublishButton,
  conditionalRequiredField,
  nonVisibleCandidateType,
  isBriefButtonLabel = 'SEARCH.BRIEF_REPORT',
  isDetailedButtonLabel = 'SEARCH.DETAILED_REPORT',
  children,
  isGetWatch,
  handleSearchWatch,
}: SearchComponentProps) => {
  const [formData, setFormData] = useState<FieldValues>();

  const [resetData, setResetData] = useState<RefreshDataType>({
    ...allSelectedData,
  });
  const { t } = useTranslation();
  const [, setSearchParams] = useSearchParams();

  const methods = useForm();

  const { watch, handleSubmit, setValue, getValues } = methods;

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
    if (data.isCaseAvailable === 'yes') {
      data.isCaseAvailable = 'true';
    } else if (data.isCaseAvailable === 'no') {
      data.isCaseAvailable = 'false';
    }
    if (userType) {
      data.type = userType;
    }
    if (data?.userTypeCode === USER_TYPE_CODE_ALL) {
      delete data.userTypeCode;
    }

    if (
      nominationStatusCodes &&
      (!data?.nominationStatusCodes ||
        (Array.isArray(data?.nominationStatusCodes) &&
          data?.nominationStatusCodes?.length === 0))
    ) {
      data = { ...data, nominationStatusCodes };
    }
    if (paymentType) {
      data = { paymentType, ...data };
    }
    if (Array.isArray(data?.agencyTypeIds)) {
      data.agencyTypeIds = data?.agencyTypeIds.join(',');
    }

    data = convertArrayValuesToCommaSeparated(data);

    if (onSubmitHandler) {
      const newData: any = removeUndefinedProperties(data);

      if (requiredField || conditionalRequiredField) {
        onSubmitHandler(newData);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isSetSearchParams && setSearchParams({ ...newData, page: 0 });
      } else if (!selectAny && hasUndefinedValues(data) && !requiredField) {
        onSubmitHandler(newData);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isSetSearchParams && setSearchParams({ ...newData, page: 0 });
      } else if (selectAny && !SelectedOneField(data)) {
        onSubmitHandler(newData);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isSetSearchParams && setSearchParams({ ...newData, page: 0 });
      } else if (isPublishButton) onSubmitHandler(data);
    }
  };

  useEffect(() => {
    if (isGetWatch && handleSearchWatch) {
      handleSearchWatch(watch());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGetWatch, JSON.stringify(watch())]);

  useEffect(() => {
    setFormData(watch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(watch())]);

  return (
    <div className="bg-light mb-10 rounded-5">
      <FormProvider {...methods}>
        <form
          className={classNames(' p-10 box-ex rounded-5', customClass)}
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
                {item?.fieldName === ADVANCE_SEARCH.ELECTION_TYPE ? (
                  <ElectionTypeSearch
                    struct={item}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                    setValue={setValue}
                  />
                ) : null}

                {/* প্রার্থীর ধরন */}
                {item?.fieldName === ADVANCE_SEARCH.CANDIDATE_TYPE ? (
                  <CandidateTypeSearch
                    struct={item}
                    watchList={getWatchList(item?.pathParamsDependency)}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                    setValue={setValue}
                    nonVisibleCandidateType={nonVisibleCandidateType}
                  />
                ) : null}
              </div>
            ))}
            {showSubmitButton ? (
              <div className="col-span-1">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-100"
                  size="lg"
                  loading={loading}
                  disabled={
                    submitButtonDisabled ||
                    (requiredField &&
                      !areRequiredKeysDefined(watch(), requiredField)) ||
                    (conditionalRequiredField &&
                      !areConditionalRequiredKeysDefined(
                        watch(),
                        conditionalRequiredField,
                      ))
                  }
                >
                  <Text weight="semibold">{t('SEARCH.SEARCH')}</Text>
                </Button>
              </div>
            ) : null}
            {isDetailedButton && (
              <div className="col-span-1">
                <Dropdown
                  buttonLabelName={t(`${isDetailedButtonLabel}`)}
                  buttonType="button"
                  listItem={isDetailedButtonOptions.map((item: any) => {
                    const { data, ...restData } = item;
                    return {
                      ...restData,
                      disabled: requiredField
                        ? !areRequiredKeysDefined(watch(), requiredField)
                        : false,
                      onClick: () =>
                        onSubmit({
                          ...getValues(),
                          ...data,
                        }),
                    };
                  })}
                />
              </div>
            )}
            {isBriefButton && (
              <div className="col-span-1">
                <Dropdown
                  buttonLabelName={t(`${isBriefButtonLabel}`)}
                  buttonType="button"
                  listItem={isBriefButtonOptions.map((item: any) => {
                    const { data, ...restData } = item;
                    return {
                      ...restData,
                      disabled: requiredField
                        ? !areRequiredKeysDefined(watch(), requiredField)
                        : false,
                      onClick: () =>
                        onSubmit({
                          ...getValues(),
                          ...data,
                        }),
                    };
                  })}
                />
              </div>
            )}
          </div>
          {children}
        </form>
      </FormProvider>
    </div>
  );
};
