import { CenterCircleCards } from './components/centerCircleCards';
import { CenterRectangleCards } from './components/centerRectangleCards';
import { CENTER_NUMBER_STATUS } from './constants';
import NotificationComponent from './components/notification-component';
import { Pagination, Skeleton, Text, useDebounce } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import Input from '@components/inputs/Input';
import { IconSearch } from '@pentabd/icons';
import { FormProvider, useForm } from 'react-hook-form';
import {
  CandidateTypeWisePollingCenterCount,
  ResubmittedPollingCenters,
} from '@type/result-management/electoral-process/submit-results/submitResults';
import { useEffect, useState } from 'react';
import { SelectOptionArray } from '@type/selection-option-type';
import { FORM_FIELDS } from '@constants/forms';
import { useCandidateWisePollingCentersDetailsListAroOp } from '@hooks/result-management/useCandidateWisePollingCenterResultAroOp';
import { POLLING_CENTER_RESULT_STATUS } from '@constants/polling-center-results';
import { ElectionWiseComponent } from './election-wise-components';

export const SUBMIT_RESULTS = FORM_FIELDS.RESULT_MANAGEMENT.SUBMIT_RESULTS;

export interface QueryParamsType {
  pageNo: number;
  isActive: boolean;
  checkedCheckboxes: string[];
  electionSettingsValue: number | string;
  pollingCenter?: string;
}

export const CandidateWiseComponent = ({
  data,
  electionScheduleId,
  electionSettings,
  notifications,
  electionTypeId,
}: {
  data?: CandidateTypeWisePollingCenterCount;
  electionScheduleId?: string | number;
  electionSettings?: SelectOptionArray[];
  notifications?: ResubmittedPollingCenters[];
  electionTypeId?: string | number;
}) => {
  const [queryParams, setQueryParams] = useState<QueryParamsType>({
    pageNo: 0,
    isActive: false,
    checkedCheckboxes: [],
    electionSettingsValue: 0,
    pollingCenter: '',
  });

  const [pollingCenterName, setPollingCenterName] = useState('');
  const debouncedValue = useDebounce<string>(pollingCenterName, 500);

  const {
    getCandidateWisePollingCentersList,
    pollingCenters,
    loading,
    activePage,
    totalPage,
  } = useCandidateWisePollingCentersDetailsListAroOp();

  const { t } = useTranslation();
  const methods = useForm();

  const handleQueryParams = ({
    key,
    page,
    checkboxValue,
    electionSettings,
    pollingCenter,
  }: {
    key: string;
    page?: number;
    checkboxValue?: string;
    electionSettings?: number | string | null;
    pollingCenter?: string;
  }) => {
    if (key === SUBMIT_RESULTS.PAGE && page)
      setQueryParams((prevState) => ({
        ...prevState,
        pageNo: page - 1,
      }));
    else if (key === SUBMIT_RESULTS.CHECK_SUSPENDED) {
      setQueryParams((prevState) => ({
        ...prevState,
        pageNo: 0,
        isActive: !prevState?.isActive,
      }));
    } else if (key === SUBMIT_RESULTS.CHECKBOX && checkboxValue) {
      if (queryParams?.checkedCheckboxes?.includes(checkboxValue)) {
        setQueryParams((prevState) => ({
          ...prevState,
          pageNo: 0,
          checkedCheckboxes: prevState?.checkedCheckboxes?.filter(
            (item) => item !== checkboxValue,
          ),
        }));
      } else {
        setQueryParams((prevState) => ({
          ...prevState,
          pageNo: 0,
          checkedCheckboxes: [
            ...(prevState?.checkedCheckboxes || []),
            checkboxValue,
          ],
        }));
      }
    } else if (key === SUBMIT_RESULTS.ELECTION_SETTINGS) {
      setQueryParams((prevState) => ({
        ...prevState,
        pageNo: 0,
        electionSettingsValue: electionSettings ? electionSettings : '',
      }));
    } else if (key === SUBMIT_RESULTS.POLLING_CENTER_NAME) {
      setQueryParams((prevState) => ({
        ...prevState,
        pageNo: 0,
        pollingCenter: pollingCenter,
      }));
    }
  };

  useEffect(() => {
    if (electionScheduleId && data?.candidateTypeId) {
      getCandidateWisePollingCentersList({
        electionScheduleId: electionScheduleId,
        candidateTypeId: data?.candidateTypeId,
        electionSettingsId: queryParams?.electionSettingsValue,
        status:
          queryParams?.checkedCheckboxes?.length > 0 || queryParams?.isActive
            ? queryParams?.checkedCheckboxes
            : [
                POLLING_CENTER_RESULT_STATUS.APPROVED_BY_ARO,
                POLLING_CENTER_RESULT_STATUS.FORWARDED_BY_OP,
                POLLING_CENTER_RESULT_STATUS.REQUESTED_BY_RO,
                POLLING_CENTER_RESULT_STATUS.RETURNED_BY_ADMIN,
                POLLING_CENTER_RESULT_STATUS.RETURNED_BY_ARO,
                POLLING_CENTER_RESULT_STATUS.CREATED_BY_OP,
              ],
        pollingCenterName: queryParams?.pollingCenter,
        page: queryParams?.pageNo,
        ...((queryParams?.isActive ||
          queryParams?.checkedCheckboxes?.length === 0) && {
          isActive: 'false',
        }),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleId, data?.candidateTypeId, queryParams]);

  useEffect(() => {
    handleQueryParams({
      key: SUBMIT_RESULTS.POLLING_CENTER_NAME,
      pollingCenter: debouncedValue,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  useEffect(() => {
    if (electionSettings && electionSettings?.length === 1) {
      handleQueryParams({
        key: SUBMIT_RESULTS.ELECTION_SETTINGS,
        electionSettings: electionSettings?.[0]?.value,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className=" d-flex justify-content-between align-items-center gap-10">
        <form className="d-flex gap-8 w-25">
          <div className="d-flex gap-3">
            <input
              type="checkbox"
              id={SUBMIT_RESULTS.CHECK_NOT_SUBMITTED}
              name={SUBMIT_RESULTS.CHECK_NOT_SUBMITTED}
              onChange={() =>
                handleQueryParams({
                  key: SUBMIT_RESULTS.CHECKBOX,
                  checkboxValue: SUBMIT_RESULTS.CHECK_NOT_SUBMITTED,
                })
              }
            />
            <Text color="dark" weight="semibold">
              {t('SUBMIT_RESULTS.NOT_SUBMITTED')}
            </Text>
          </div>
          <div className="d-flex gap-3">
            <input
              type="checkbox"
              id={SUBMIT_RESULTS.CHECK_SUBMITTED}
              name={SUBMIT_RESULTS.CHECK_SUBMITTED}
              onChange={() =>
                handleQueryParams({
                  key: SUBMIT_RESULTS.CHECKBOX,
                  checkboxValue: SUBMIT_RESULTS.CHECK_SUBMITTED,
                })
              }
            />
            <Text color="success" weight="semibold">
              {t('SUBMIT_RESULTS.SUBMITTED')}
            </Text>
          </div>

          <div className="d-flex gap-3">
            <input
              type="checkbox"
              id={SUBMIT_RESULTS.CHECK_SUSPENDED}
              name={SUBMIT_RESULTS.CHECK_SUSPENDED}
              onChange={() =>
                handleQueryParams({ key: SUBMIT_RESULTS.CHECK_SUSPENDED })
              }
            />
            <Text color="danger" weight="semibold">
              {t('SUBMIT_RESULTS.SUSPENDED')}
            </Text>
          </div>
        </form>

        {electionTypeId ? (
          <FormProvider {...methods}>
            <ElectionWiseComponent
              electionTypeId={electionTypeId}
              queryParams={queryParams}
              handleQueryParams={handleQueryParams}
              electionSettings={electionSettings}
              candidateTypeId={data?.candidateTypeId}
            />
          </FormProvider>
        ) : null}
        <FormProvider {...methods} key={2}>
          <form onSubmit={(event) => event.preventDefault()} className="w-25">
            <Input
              title="SEARCH.SEARCH_HERE"
              registerName={SUBMIT_RESULTS.POLLING_CENTER_NAME}
              prefix={<IconSearch size="20" />}
              onchange={(event) => {
                setPollingCenterName(event?.target?.value);
              }}
            />
          </form>
        </FormProvider>
      </div>

      <div className="d-grid grid-cols-lg-12 gap-12 grid-cols-md-12 my-16">
        <CenterCircleCards
          value={data?.totalCenterCount}
          status={CENTER_NUMBER_STATUS.TOTAL.nameEn}
        />
        <CenterCircleCards
          value={data?.createdByOpCount}
          status={CENTER_NUMBER_STATUS.NOT_SUBMITTED.nameEn}
        />
        <CenterCircleCards
          value={data?.forwardedByOpCount}
          status={CENTER_NUMBER_STATUS.SUBMITTED.nameEn}
        />
        <CenterCircleCards
          value={data?.cancelledCenterCount}
          status={CENTER_NUMBER_STATUS.SUSPENDED.nameEn}
        />
      </div>
      <div className="d-grid gap-6 grid-cols-lg-12 grid-cols-md-12">
        {loading
          ? Array.from({ length: 8 })?.map((_, index: number) => (
              <Skeleton height="150px" className="col-span-3" key={index} />
            ))
          : pollingCenters?.map((item: any, index: number) => (
              <CenterRectangleCards
                data={item}
                key={index}
                candidateTypeId={data?.candidateTypeId}
              />
            ))}
      </div>
      {!loading && totalPage !== 0 ? (
        <div className="pt-5">
          <Pagination
            totalPage={totalPage}
            activePage={activePage}
            onClick={(page) => {
              handleQueryParams({ key: SUBMIT_RESULTS.PAGE, page });
            }}
          />
        </div>
      ) : null}

      <div className="py-20">
        <NotificationComponent data={notifications} />
      </div>
    </div>
  );
};
