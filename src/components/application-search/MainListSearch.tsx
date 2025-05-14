import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { IconChevronDown } from '@pentabd/icons';
import { Button, InputText, Text } from '@pentabd/ui';

import Select from '@components/inputs/Select';
import { FORM_FIELDS } from '@constants/forms';
import { useMainListSearch } from '@hooks/advanced-search-hook/useMainListSearch';
import { ReportRoSearchFiltersType } from '@hooks/candidate-info-management/report/useRoReportFilters';

const MAIN_LIST_SEARCH = FORM_FIELDS.MAIN_LIST_SEARCH;

interface Props {
  title?: string;
  totalCol?: string;
  colSpan?: string;
  inputs?: {
    region?: boolean;
    electionUserDistrict?: boolean; //comes from roReport search filters
    district?: boolean;
    subDistrict?: boolean;
    electionUserSubDistrict?: boolean;
    rmo?: boolean;
    municipality?: boolean;
    goCode?: boolean;
    unionOrWardName?: boolean;
    unionOrWard?: boolean;
    instituteName?: boolean;
    constituency?: boolean;
    voterAreaCode?: boolean;
  };
  onSubmitHandler: (data: any) => void;
  requiredField?: string[];
  electionUserFields?: ReportRoSearchFiltersType;
  isUpazilaMunicipalities?: boolean;
  isBulkEditButton?: boolean;
  bulkEditRequiredField?: string[];
}

const MainListSearch = ({
  title,
  totalCol = 'grid-cols-lg-12',
  colSpan = 'col-span-3',
  inputs = {
    region: true,
  },
  onSubmitHandler,
  requiredField,
  electionUserFields,
  isUpazilaMunicipalities = false,
  isBulkEditButton = false,
  bulkEditRequiredField,
}: Props) => {
  const methods = useForm();
  const { t } = useTranslation();
  const [, setSearchParams] = useSearchParams();
  const { handleSubmit, watch, register, getValues, setValue } = methods;

  const regionWatch = watch(MAIN_LIST_SEARCH.REGION);
  const subDistrictWatch = watch(MAIN_LIST_SEARCH.SUBDISTRICT);
  const districtWatch = watch(MAIN_LIST_SEARCH.DISTRICT);
  const rmoWatch = watch(MAIN_LIST_SEARCH.RMO);
  const municipalityWatch = watch(MAIN_LIST_SEARCH.MUNICIPALITY);
  const unionOrWardWatch = watch(MAIN_LIST_SEARCH.UNION_OR_WARD);

  const {
    regions,
    zillas,
    upazilas,
    rmos,
    municipalities,
    upazilaMunicipalities,
    unionsOrWards,
    institutes,
    constituencies,
  } = useMainListSearch({
    regionWatch,
    districtWatch,
    subDistrictWatch,
    rmoWatch,
    municipalityWatch,
    unionOrWardWatch,
    inputs,
  });

  useEffect(() => {
    if (inputs?.municipality && !inputs?.rmo && subDistrictWatch) {
      setValue(MAIN_LIST_SEARCH.MUNICIPALITY, undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs?.municipality, inputs?.rmo, subDistrictWatch]);

  function removeUndefinedProperties(data: any) {
    const newData: any = {};
    for (const key in data) {
      if (data[key]) {
        newData[key] = data[key];
      }
    }
    return newData;
  }

  function areRequiredKeysDefined(data: any, requiredField: string[]) {
    for (const key of requiredField) {
      if (!data.hasOwnProperty(key) || !data[key]) {
        return false;
      }
    }
    return true;
  }

  function hasUndefinedValues(data: any) {
    if (
      (inputs?.goCode && data.UnionOrWardCode) ||
      (inputs?.unionOrWardName && data.unionOrWardName)
    ) {
      return true;
    }

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (typeof data[key] === 'undefined') {
          return false;
        }
      }
    }
    return true;
  }

  const onSubmit = (data: any) => {
    if (requiredField) {
      const newData: any = removeUndefinedProperties(data);
      onSubmitHandler(data); // remove data that are undefined
      setSearchParams({ ...newData, page: 0 });
    } else if (hasUndefinedValues(data) && !requiredField) {
      onSubmitHandler(data);
      setSearchParams({ ...data, page: 0 });
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="mb-20 p-10 bg-extra-light box-ex rounded-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          {title ? (
            <div className="mb-7">
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
            {inputs?.region ? (
              <div className={colSpan}>
                <Select
                  title="MAIN_LIST_SEARCH.REGION"
                  name={MAIN_LIST_SEARCH.REGION}
                  options={regions}
                  disabled={regions?.length === 0}
                  suffix={<IconChevronDown size="20" fill="subtitle2" />}
                />
              </div>
            ) : null}

            {inputs?.district ? (
              <div className={colSpan}>
                <Select
                  title="MAIN_LIST_SEARCH.DISTRICT"
                  name={MAIN_LIST_SEARCH.DISTRICT}
                  options={zillas}
                  disabled={zillas.length === 0}
                  suffix={<IconChevronDown size="20" fill="subtitle2" />}
                  isSearchable
                />
              </div>
            ) : null}

            {inputs?.electionUserDistrict ? (
              <div className={colSpan}>
                <Select
                  title="MAIN_LIST_SEARCH.DISTRICT"
                  name={MAIN_LIST_SEARCH.DISTRICT}
                  options={electionUserFields?.zilla || []}
                  suffix={<IconChevronDown size="20" fill="subtitle2" />}
                  isSearchable
                />
              </div>
            ) : null}

            {inputs?.electionUserSubDistrict ? (
              <div className={colSpan}>
                <Select
                  title="MAIN_LIST_SEARCH.SUB_DISTRICT"
                  name={MAIN_LIST_SEARCH.SUBDISTRICT}
                  options={electionUserFields?.upazilla || []}
                  suffix={<IconChevronDown size="20" fill="subtitle2" />}
                  isSearchable
                />
              </div>
            ) : null}

            {inputs?.subDistrict ? (
              <div className={colSpan}>
                <Select
                  title="MAIN_LIST_SEARCH.SUB_DISTRICT"
                  name={MAIN_LIST_SEARCH.SUBDISTRICT}
                  options={upazilas}
                  disabled={upazilas.length === 0}
                  suffix={<IconChevronDown size="20" fill="subtitle2" />}
                  isSearchable
                />
              </div>
            ) : null}

            {inputs?.rmo ? (
              <div className={colSpan}>
                <Select
                  title="MAIN_LIST_SEARCH.RMO"
                  name={MAIN_LIST_SEARCH.RMO}
                  options={rmos}
                  disabled={rmos.length === 0}
                  suffix={<IconChevronDown size="20" fill="subtitle2" />}
                  isSearchable
                />
              </div>
            ) : null}

            {inputs?.municipality ? (
              <div className={colSpan}>
                <Select
                  title="MAIN_LIST_SEARCH.MUNICIPALITY"
                  name={MAIN_LIST_SEARCH.MUNICIPALITY}
                  options={
                    isUpazilaMunicipalities
                      ? upazilaMunicipalities
                      : municipalities
                  }
                  disabled={
                    isUpazilaMunicipalities
                      ? upazilaMunicipalities.length === 0
                      : municipalities.length === 0
                  }
                  suffix={<IconChevronDown size="20" fill="subtitle2" />}
                  isSearchable
                />
              </div>
            ) : null}

            {inputs?.unionOrWard ? (
              <div className={colSpan}>
                <Select
                  title="MAIN_LIST_SEARCH.UNION_OR_WARD"
                  name={MAIN_LIST_SEARCH.UNION_OR_WARD}
                  options={unionsOrWards}
                  disabled={unionsOrWards.length === 0}
                  suffix={<IconChevronDown size="20" fill="subtitle2" />}
                  isSearchable
                />
              </div>
            ) : null}

            {inputs?.instituteName ? (
              <div className={colSpan}>
                <Select
                  title="MAIN_LIST_SEARCH.INSTITUTE_NAME"
                  name={MAIN_LIST_SEARCH.INSTITUTE_NAME}
                  options={institutes}
                  disabled={institutes.length === 0}
                  suffix={<IconChevronDown size="20" fill="subtitle2" />}
                  isSearchable
                />
              </div>
            ) : null}

            {inputs?.goCode ? (
              <div className={colSpan}>
                <InputText
                  {...register(MAIN_LIST_SEARCH.UNION_OR_WARD_CODE)}
                  title={t('MAIN_LIST_SEARCH.GO_CODE')}
                />
              </div>
            ) : null}

            {inputs?.unionOrWardName ? (
              <div className={colSpan}>
                <InputText
                  {...register(MAIN_LIST_SEARCH.UNION_OR_WARD_NAME)}
                  title={t('MAIN_LIST_SEARCH.UNION_NAME')}
                />
              </div>
            ) : null}

            {inputs?.constituency ? (
              <div className={colSpan}>
                <Select
                  title="MAIN_LIST_SEARCH.CONSTITUENCY"
                  name={MAIN_LIST_SEARCH.CONSTITUENCY}
                  options={constituencies}
                  disabled={constituencies.length === 0}
                  suffix={<IconChevronDown size="20" fill="subtitle2" />}
                  isSearchable
                />
              </div>
            ) : null}

            {/* VOTER AREA CODE */}
            {inputs?.voterAreaCode ? (
              <div className={colSpan}>
                <InputText
                  {...register(MAIN_LIST_SEARCH.VOTER_AREA_CODE)}
                  title={t('MAIN_LIST_SEARCH.VOTER_AREA_CODE')}
                />
              </div>
            ) : null}

            <div className="col-span-1">
              <Button
                type="primary"
                className="w-100"
                htmlType="submit"
                size="lg"
                disabled={
                  requiredField &&
                  !areRequiredKeysDefined(getValues(), requiredField)
                }
              >
                <Text weight="semibold">{t('SEARCH.SEARCH')}</Text>
              </Button>
            </div>

            {isBulkEditButton && (
              <div className="col-span-1">
                <Button
                  type="info"
                  fill="outline"
                  htmlType="button"
                  size="lg"
                  onClick={() =>
                    onSubmit({
                      ...watch(),
                      isBulkEdit: true,
                    })
                  }
                  disabled={
                    bulkEditRequiredField &&
                    !areRequiredKeysDefined(getValues(), bulkEditRequiredField)
                  }
                >
                  <Text weight="semibold">{t('SEARCH.BULK_EDIT')}</Text>
                </Button>
              </div>
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default MainListSearch;
