import { useEffect, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { Button, Dropdown, Text } from '@pentabd/ui';

import { ElectionScheduleSearch } from './electionSchedule';
import { CandidateTypeSearch } from './candidateType';
import { DistrictSearch } from './district';
import { DivisionSearch } from './division';
import { ConstituencySearch } from './constituency';
import { ElectionAreaReorganizedSearch } from './rearrangeSeat';
import { CaseSearch } from './case';
import { MunicipalityAsConstituencySearch } from './MunicipalityAsConstituency';
import { UpazilaOrThanaSearch } from './upazilaOrThana';
import { MunicipalitySearch } from './municipality';
import { NominationStatusSearch } from './nominationStatus';
import { BartaSheetStatusSearch } from './bartaSheetStatus';
import { UserTypeCodeSearch } from './userTypeCode';
import { UserProfileLoginIdSearch } from './userLogInId';
import { VoteCenterTypeSearch } from './voteCenterType';
import { ZillaNameWithElectionSettingsSearch } from './vote-center-module/zillaNameWithElectionSettingsSearch';
import { MunicipalityNameWithElectionSettingsSearch } from './vote-center-module/MunicipalityNameWithElectionSettingsSearch';
import { ElectionSettingsUnionOrWardsSearch } from './vote-center-module/electionSettingsUnionOrWards';
import { ElectionConstituencyWithElectionSettingsSearch } from './vote-center-module/ElectionConstituencyWithElectionSettingsSearch';
import { UnionOrWardSearch } from './unionOrWard';
import { ResultStatusSearch } from './result-status';
import { DraftResultStatusSearch } from './draft-result-status';
import { ResultTypeSearch } from './result-type';
import { UpazilaConstituencySearch } from './upazilaConstituencySearch';
import { UpazilaNameWithElectionSettingsSearch } from './vote-center-module/upazilaNameWithElectionSettingsSearch';
import { UpazilaSearch } from './upazila';
import { ConstituencyUnionOrWardSearch } from './unionOrWardAsConstituency';
import { ElectionSettingsForVoteCenter } from './vote-center-module/electionSettingsVoteCenter';
import { ElectionSettingsUpazilaSearch } from './vote-center-module/electionSettingsUpazila';
import { RmoSearch } from './rmo';
import { DateFromSearch } from './fromDate';
import { DateToSearch } from './toDate';
import { IsActiveSearch } from './isActive';
import { InstituteNameSearch } from './instituteNameSearch';
import { LogTypeSearch } from './logType';
import { DesignationSearch } from './designation';
import { DistributedOfficerSearch } from './distributedOfficer';
import { AgencyTypesSearch } from './agencyTypes';
import { PollingCenterSearch } from './pollingCenter';
import { CenterStatusSelect } from './CenterStatus';
import { YearSearch } from './year';
import { MonthSearch } from './month';
import { UnionAsConstituency } from './unionAsConstituency';
import { UnionSearch } from './union';
import { UnionParishadWardAsConstituency } from './unionParishadWardAsConstituency';
import { UnionNameWithElectionSettingsSearch } from './vote-center-module/UnionNameWithElectionSettingsSearch';
import { SettingsForLatestResultObtained } from './settingsForLatestResultObtained';

import { FORM_FIELDS } from '@constants/forms';
import { ADMIN_SEARCH } from './form';
import { USER_TYPE_CODE_ALL } from '../constants';
import { ElectionTypeSearch } from '@components/application-search/SearchComponents/electionType';
import { RefreshDataType, SearchComponentProps, StructTypes } from './types';
import {
  displayInput,
  SelectedOneField,
  areQueriesOptional,
  hasUndefinedValues,
  areRequiredKeysDefined,
  removeUndefinedProperties,
  areConditionalRequiredKeysDefined,
  convertArrayValuesToCommaSeparated,
} from '../utils';
import { UnionParishadWard } from './unionParishadWard';

export const ADVANCE_SEARCH = ADMIN_SEARCH.ADVANCE_SEARCH;
export const APPLICATION_SEARCH = FORM_FIELDS.APPLICATION_SEARCH;

export const SearchComponents = ({
  struct,
  onSubmitHandler,
  totalCol = 'grid-cols-lg-12',
  colSpan = 'col-span-3',
  requiredField,
  isActiveElectionSchedule = true,
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
  getElectionSettingsIdForAdmin,
  conditionalRequiredField,
  nonVisibleCandidateType,
  defaultFromDate,
  defaultToDate,
  isBriefButtonLabel = 'SEARCH.BRIEF_REPORT',
  isDetailedButtonLabel = 'SEARCH.DETAILED_REPORT',
  ignoreOnlineDraft,
  children, // Add children prop
  userTypeCodesIncludingAll,
  isGetWatch,
  getScheduleDate = false,
  defaultYear,
  defaultMonth,
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

                {/* নির্বাচনের নাম */}
                {item?.fieldName === ADVANCE_SEARCH.ELECTION_SCHEDULE ? (
                  <ElectionScheduleSearch
                    struct={item}
                    watchList={getWatchList(item?.pathParamsDependency)}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                    isActiveElectionSchedule={isActiveElectionSchedule}
                    setValue={setValue}
                    watch={watch}
                    getScheduleDate={getScheduleDate}
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
                {/* বিভাগের */}
                {item?.fieldName === ADVANCE_SEARCH.DIVISION ? (
                  <DivisionSearch
                    struct={item}
                    pathWatchList={getWatchList(item?.pathParamsDependency)}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                    setValue={setValue}
                  />
                ) : null}

                {/* জেলা */}
                {item?.fieldName === ADVANCE_SEARCH.DISTRICT ? (
                  <DistrictSearch
                    struct={item}
                    pathWatchList={getWatchList(item?.pathParamsDependency)}
                    queryWatchList={getWatchList(item?.queryParamsDependency)}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                    setValue={setValue}
                    callApi={displayInput({
                      struct: item,
                      formData,
                    })}
                  />
                ) : null}

                {item?.fieldName === APPLICATION_SEARCH.CONSTITUENCY ? (
                  <ConstituencySearch
                    struct={item}
                    pathWatchList={getWatchList(item?.pathParamsDependency)}
                    callApi={displayInput({
                      struct: item,
                      formData,
                    })}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                    watch={watch}
                    setValue={setValue}
                    getElectionSettingsIdForAdmin={
                      getElectionSettingsIdForAdmin
                    }
                  />
                ) : null}

                {item?.fieldName === ADVANCE_SEARCH.UPAZILA ? (
                  <UpazilaSearch
                    struct={item}
                    callApi={displayInput({
                      struct: item,
                      formData,
                    })}
                    watch={watch}
                    queryWatchList={getWatchList(item?.queryParamsDependency)}
                    pathWatchList={getWatchList(item?.pathParamsDependency)}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                    setValue={setValue}
                  />
                ) : null}
                {item?.fieldName ===
                ADVANCE_SEARCH.UPAZILA_AS_CONSTITUENCIES ? (
                  <UpazilaConstituencySearch
                    struct={item}
                    watch={watch}
                    setValue={setValue}
                    callApi={displayInput({
                      struct: item,
                      formData,
                    })}
                    pathWatchList={getWatchList(item?.pathParamsDependency)}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                    getElectionSettingsIdForAdmin={
                      getElectionSettingsIdForAdmin
                    }
                  />
                ) : null}

                {/* ফলাফল পর্যবেক্ষণ -> সর্বশেষ প্রাপ্ত ফলাফল -> settingsIds*/}
                {item?.fieldName ===
                ADVANCE_SEARCH.SETTINGS_FOR_LATEST_RESULT_OBTAINED ? (
                  <SettingsForLatestResultObtained
                    queryWatchList={getWatchList(item?.queryParamsDependency)}
                    emptyBelowData={emptyBelowData}
                    resetData={resetData}
                    struct={item}
                    watch={watch}
                  />
                ) : null}

                {/* আর এম ও */}
                {item?.fieldName === ADVANCE_SEARCH.RMO ? (
                  <RmoSearch
                    struct={item}
                    watchList={getWatchList(item?.pathParamsDependency)}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                    setValue={setValue}
                  />
                ) : null}

                {item?.fieldName ===
                ADVANCE_SEARCH.MUNICIPALITY_AS_CONSTITUENCY ? (
                  <MunicipalityAsConstituencySearch
                    struct={item}
                    callApi={displayInput({
                      struct: item,
                      formData,
                    })}
                    pathWatchList={getWatchList(item?.pathParamsDependency)}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                    setValue={setValue}
                    watch={watch}
                    getElectionSettingsIdForAdmin={
                      getElectionSettingsIdForAdmin
                    }
                  />
                ) : null}

                {item?.fieldName === ADVANCE_SEARCH.MUNICIPALITY ? (
                  <MunicipalitySearch
                    struct={item}
                    callApi={displayInput({
                      struct: item,
                      formData,
                    })}
                    queryWatchList={getWatchList(item?.queryParamsDependency)}
                    pathWatchList={getWatchList(item?.pathParamsDependency)}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                    setValue={setValue}
                  />
                ) : null}
                {item?.fieldName === ADVANCE_SEARCH.UPAZILA_THANA ? (
                  <UpazilaOrThanaSearch
                    struct={item}
                    callApi={displayInput({
                      struct: item,
                      formData,
                    })}
                    watchList={getWatchList(item?.pathParamsDependency)}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                  />
                ) : null}
                {item?.fieldName ===
                ADVANCE_SEARCH.UNION_OR_WARD_AS_CONSTITUENCY ? (
                  <ConstituencyUnionOrWardSearch
                    struct={item}
                    callApi={displayInput({
                      struct: item,
                      formData,
                    })}
                    pathWatchList={getWatchList(item?.pathParamsDependency)}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                    watch={watch}
                    setValue={setValue}
                    getElectionSettingsIdForAdmin={
                      getElectionSettingsIdForAdmin
                    }
                  />
                ) : null}
                {item?.fieldName === ADVANCE_SEARCH.UNION_OR_WARD ? (
                  <UnionOrWardSearch
                    struct={item}
                    callApi={displayInput({
                      struct: item,
                      formData,
                    })}
                    pathWatchList={getWatchList(item?.pathParamsDependency)}
                    queryWatchList={getWatchList(item?.queryParamsDependency)}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                  />
                ) : null}
                {item?.fieldName === ADVANCE_SEARCH.UNION ? (
                  <UnionSearch
                    struct={item}
                    callApi={displayInput({
                      struct: item,
                      formData,
                    })}
                    pathWatchList={getWatchList(item?.pathParamsDependency)}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                    watch={watch}
                  />
                ) : null}
                {item?.fieldName === ADVANCE_SEARCH.UNION_AS_CONSTITUENCY ? (
                  <UnionAsConstituency
                    struct={item}
                    callApi={displayInput({
                      struct: item,
                      formData,
                    })}
                    pathWatchList={getWatchList(item?.pathParamsDependency)}
                    queryWatchList={getWatchList(item?.queryParamsDependency)}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                    watch={watch}
                    setValue={setValue}
                    getElectionSettingsIdForAdmin={
                      getElectionSettingsIdForAdmin
                    }
                  />
                ) : null}
                {item?.fieldName ===
                ADVANCE_SEARCH.UNION_PARISHAD_WARD_AS_CONSTITUENCY ? (
                  <UnionParishadWardAsConstituency
                    struct={item}
                    callApi={displayInput({
                      struct: item,
                      formData,
                    })}
                    pathWatchList={getWatchList(item?.pathParamsDependency)}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                    watch={watch}
                    setValue={setValue}
                    getElectionSettingsIdForAdmin={
                      getElectionSettingsIdForAdmin
                    }
                  />
                ) : null}
                {item?.fieldName === ADVANCE_SEARCH.UNION_WARD ? (
                  <UnionParishadWard
                    struct={item}
                    callApi={displayInput({
                      struct: item,
                      formData,
                    })}
                    pathWatchList={getWatchList(item?.pathParamsDependency)}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                  />
                ) : null}
                {item?.fieldName === ADVANCE_SEARCH.NOMINATION_STATUS ? (
                  <NominationStatusSearch
                    ignoreOnlineDraft={ignoreOnlineDraft}
                  />
                ) : null}

                {/* for vote center specifically */}
                {item?.fieldName ===
                ADVANCE_SEARCH.ELECTION_SETTINGS_VOTE_CENTER ? (
                  <ElectionSettingsForVoteCenter
                    queryWatchList={getWatchList(item?.queryParamsDependency)}
                    struct={item}
                    callApi={displayInput({
                      struct: item,
                      formData,
                    })}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                    watch={watch}
                    setValue={setValue}
                  />
                ) : null}
                {item?.fieldName ===
                ADVANCE_SEARCH.DISTRICT_BY_ELECTION_SETTINGS ? (
                  <ZillaNameWithElectionSettingsSearch resetData={resetData} />
                ) : null}
                {item?.fieldName ===
                ADVANCE_SEARCH.UPAZILA_BY_ELECTION_SETTINGS ? (
                  <UpazilaNameWithElectionSettingsSearch
                    resetData={resetData}
                  />
                ) : null}
                {item?.fieldName ===
                ADVANCE_SEARCH.MUNICIPALITY_BY_ELECTION_SETTINGS ? (
                  <MunicipalityNameWithElectionSettingsSearch
                    resetData={resetData}
                  />
                ) : null}
                {item?.fieldName ===
                ADVANCE_SEARCH.ELECTION_CONSTITUENCY_BY_ELECTION_SETTINGS ? (
                  <ElectionConstituencyWithElectionSettingsSearch
                    resetData={resetData}
                  />
                ) : null}
                {item?.fieldName ===
                ADVANCE_SEARCH.UNION_BY_ELECTION_SETTINGS ? (
                  <UnionNameWithElectionSettingsSearch
                    resetData={resetData}
                    pathWatchList={getWatchList(item?.pathParamsDependency)}
                    queryWatchList={getWatchList(item?.queryParamsDependency)}
                    callApi={displayInput({
                      struct: item,
                      formData,
                    })}
                  />
                ) : null}
                {item?.fieldName ===
                ADVANCE_SEARCH.ELECTION_SETTINGS_UPAZILA ? (
                  <ElectionSettingsUpazilaSearch
                    watch={watch}
                    struct={item}
                    callApi={displayInput({
                      struct: item,
                      formData,
                    })}
                    emptyBelowData={emptyBelowData}
                    pathWatchList={getWatchList(item?.pathParamsDependency)}
                    queryWatchList={getWatchList(item?.queryParamsDependency)}
                    resetData={resetData}
                  />
                ) : null}
                {item?.fieldName ===
                ADVANCE_SEARCH.ELECTION_SETTINGS_UNION_OR_WARD ? (
                  <ElectionSettingsUnionOrWardsSearch
                    watch={watch}
                    struct={item}
                    callApi={displayInput({
                      struct: item,
                      formData,
                    })}
                    emptyBelowData={emptyBelowData}
                    watchList={getWatchList(item?.pathParamsDependency)}
                    filterList={getWatchList(item?.queryParamsDependency)}
                    resetData={resetData}
                    areQueriesOptional={areQueriesOptional(
                      item?.queryParamsDependency,
                      watch,
                    )}
                  />
                ) : null}

                {item?.fieldName === ADVANCE_SEARCH.BARTA_SHEET_STATUS ? (
                  <BartaSheetStatusSearch />
                ) : null}
                {item?.fieldName === ADVANCE_SEARCH.USER_TYPE_CODE ? (
                  <UserTypeCodeSearch
                    userType={userType}
                    emptyBelowData={emptyBelowData}
                    struct={item}
                    callApi={displayInput({
                      struct: item,
                      formData,
                    })}
                    resetData={resetData}
                  />
                ) : null}

                {/* api call needs to be fixed */}
                {item?.fieldName === ADVANCE_SEARCH.USER_PROFILE_LOGIN_ID ? (
                  <UserProfileLoginIdSearch
                    userType={userType}
                    emptyBelowData={emptyBelowData}
                    struct={item}
                    resetData={resetData}
                    queryWatchList={getWatchList(item?.queryParamsDependency)}
                    callApi={displayInput({
                      struct: item,
                      formData,
                    })}
                  />
                ) : null}

                {item?.fieldName === ADVANCE_SEARCH.POLLING_CENTER_TYPE ? (
                  <VoteCenterTypeSearch
                    struct={item}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                  />
                ) : null}
                {item?.fieldName === ADVANCE_SEARCH.CASE ? (
                  <CaseSearch />
                ) : null}
                {item?.fieldName === ADVANCE_SEARCH.RESULT_STATUS ? (
                  <ResultStatusSearch />
                ) : null}
                {item?.fieldName === ADVANCE_SEARCH.DRAFT_RESULT_STATUS ? (
                  <DraftResultStatusSearch />
                ) : null}
                {item?.fieldName === ADVANCE_SEARCH.REARRANGE_SEAT ? (
                  <ElectionAreaReorganizedSearch />
                ) : null}
                {item?.fieldName === ADVANCE_SEARCH.RESULT_TYPE ? (
                  <ResultTypeSearch />
                ) : null}

                {item?.fieldName === ADVANCE_SEARCH.LOG_TYPE ? (
                  <LogTypeSearch />
                ) : null}
                {/* date to  */}
                {item?.fieldName === ADVANCE_SEARCH.DATE_TO ? (
                  <DateToSearch defaultToDate={defaultToDate} />
                ) : null}

                {/* date from  */}
                {item?.fieldName === ADVANCE_SEARCH.DATE_FROM ? (
                  <DateFromSearch defaultFromDate={defaultFromDate} />
                ) : null}
                {item?.fieldName === ADVANCE_SEARCH.YEAR ? (
                  <YearSearch defaultYear={defaultYear} />
                ) : null}
                {item?.fieldName === ADVANCE_SEARCH.MONTH ? (
                  <MonthSearch defaultMonth={defaultMonth} />
                ) : null}

                {item?.fieldName === ADVANCE_SEARCH.INSTITUTE_NAME ? (
                  <InstituteNameSearch
                    queryWatchList={getWatchList(item?.queryParamsDependency)}
                    pathWatchList={getWatchList(item?.pathParamsDependency)}
                    callApi={displayInput({
                      struct: item,
                      formData,
                    })}
                    struct={item}
                    emptyBelowData={emptyBelowData}
                    resetData={resetData}
                  />
                ) : null}
                {item?.fieldName === ADVANCE_SEARCH.IS_ACTIVE ? (
                  <IsActiveSearch
                    struct={item}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                  />
                ) : null}
                {item?.fieldName === ADVANCE_SEARCH.DESIGNATION ? (
                  <DesignationSearch
                    userTypeCodesIncludingAll={userTypeCodesIncludingAll}
                  />
                ) : null}

                {/* বণ্টনকৃত কর্মকর্তা */}
                {item?.fieldName === ADVANCE_SEARCH.DISTRIBUTED_OFFICER ? (
                  <DistributedOfficerSearch />
                ) : null}

                {/* প্রতিষ্ঠানের ধরন */}
                {item?.fieldName === ADVANCE_SEARCH.AGENCY_TYPE_IDS ? (
                  <AgencyTypesSearch
                    struct={item}
                    resetData={resetData}
                    emptyBelowData={emptyBelowData}
                  />
                ) : null}
                {item?.fieldName === ADVANCE_SEARCH.POLLING_CENTER ? (
                  <PollingCenterSearch
                    struct={item}
                    resetData={resetData}
                    pathWatchList={getWatchList(item?.pathParamsDependency)}
                    queryWatchList={getWatchList(item?.queryParamsDependency)}
                    emptyBelowData={emptyBelowData}
                  />
                ) : null}
                {item?.fieldName === ADVANCE_SEARCH.CENTER_STATUS ? (
                  <CenterStatusSelect />
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
