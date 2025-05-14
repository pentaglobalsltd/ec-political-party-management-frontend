import { CenterCircleCards } from './components/centerCircleCards';
import { CenterRectangleCards } from './components/centerRectangleCards';
import { CENTER_NUMBER_STATUS } from './constants';
import { Pagination, Skeleton, Text, useDebounce } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import Input from '@components/inputs/Input';
import { IconSearch } from '@pentabd/icons';
import { FormProvider, useForm } from 'react-hook-form';
import { CandidateTypeWisePollingCenterCount } from '@type/result-management/electoral-process/submit-results/submitResults';
import { useEffect, useState } from 'react';
import { SelectOptionArray } from '@type/selection-option-type';
import { FORM_FIELDS } from '@constants/forms';
import { useCandidateWisePollingCentersDetailsListAro } from '@hooks/result-management/useCandidateWisePollingCenterResultAro';
import { POLLING_CENTER_RESULT_STATUS } from '@constants/polling-center-results';
import { ElectionWiseComponent } from './components/election-wise-components';

export const RESULTS = FORM_FIELDS.RESULT_MANAGEMENT.RESULT;

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
  electionTypeId,
}: {
  data?: CandidateTypeWisePollingCenterCount;
  electionScheduleId?: string | number;
  electionSettings?: SelectOptionArray[];
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
  } = useCandidateWisePollingCentersDetailsListAro();

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
    if (key === RESULTS.PAGE && page)
      setQueryParams((prevState) => ({
        ...prevState,
        pageNo: page - 1,
      }));
    else if (key === RESULTS.CHECK_SUSPENDED) {
      setQueryParams((prevState) => ({
        ...prevState,
        pageNo: 0,
        isActive: !prevState?.isActive,
      }));
    } else if (key === RESULTS.CHECKBOX && checkboxValue) {
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
    } else if (key === RESULTS.ELECTION_SETTINGS) {
      setQueryParams((prevState) => ({
        ...prevState,
        pageNo: 0,
        electionSettingsValue: electionSettings ? electionSettings : '',
      }));
    } else if (key === RESULTS.POLLING_CENTER_NAME) {
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
  }, [electionScheduleId, queryParams, data?.candidateTypeId]);

  useEffect(() => {
    handleQueryParams({
      key: RESULTS.POLLING_CENTER_NAME,
      pollingCenter: debouncedValue,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  useEffect(() => {
    if (electionSettings && electionSettings?.length === 1) {
      handleQueryParams({
        key: RESULTS.ELECTION_SETTINGS,
        electionSettings: electionSettings?.[0]?.value,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="p-8 d-flex justify-content-between align-items-center ">
        <form className="d-flex gap-6 align-items-center w-25">
          <div className="d-flex gap-3">
            <input
              type="checkbox"
              id={RESULTS.IN_PROCESS}
              name={RESULTS.IN_PROCESS}
              onChange={() =>
                handleQueryParams({
                  key: RESULTS.CHECKBOX,
                  checkboxValue: RESULTS.IN_PROCESS,
                })
              }
            />
            <Text color="warning" weight="semibold">
              {t('RESULTS.IN_PROCESS')}
            </Text>
          </div>
          <div className="d-flex gap-3">
            <input
              type="checkbox"
              id={RESULTS.RESULT_PUBLISHED}
              name={RESULTS.RESULT_PUBLISHED}
              onChange={() =>
                handleQueryParams({
                  key: RESULTS.CHECKBOX,
                  checkboxValue: RESULTS.RESULT_PUBLISHED,
                })
              }
            />
            <Text color="success" weight="semibold">
              {t('RESULTS.RESULT_PUBLISHED')}
            </Text>
          </div>
          <div className="d-flex gap-3">
            <input
              type="checkbox"
              id={RESULTS.RESULT_RETURN}
              name={RESULTS.RESULT_RETURN}
              onChange={() =>
                handleQueryParams({
                  key: RESULTS.CHECKBOX,
                  checkboxValue: RESULTS.RESULT_RETURN,
                })
              }
            />
            <Text weight="semibold" color="dark">
              {t('RESULTS.RESULT_RETURN')}
            </Text>
          </div>
          <div className="d-flex gap-3">
            <input
              type="checkbox"
              id={RESULTS.CHECK_SUSPENDED}
              name={RESULTS.CHECK_SUSPENDED}
              onChange={() =>
                handleQueryParams({ key: RESULTS.CHECK_SUSPENDED })
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
              registerName={RESULTS.POLLING_CENTER_NAME}
              prefix={<IconSearch size="20" />}
              onchange={(event) => {
                setPollingCenterName(event?.target?.value);
              }}
            />
          </form>
        </FormProvider>
      </div>

      <div className="d-grid grid-cols-lg-10 gap-12 grid-cols-md-10 my-16">
        <CenterCircleCards
          value={data?.totalCenterCount}
          status={CENTER_NUMBER_STATUS.TOTAL}
          label={t('RESULTS.TOTAL_CENTER')}
        />
        <CenterCircleCards
          value={data?.forwardedByOpCount}
          status={CENTER_NUMBER_STATUS.IN_PROCESS}
          label={t('RESULTS.IN_PROCESS')}
        />
        <CenterCircleCards
          value={data?.approvedByAroCount}
          status={CENTER_NUMBER_STATUS.RESULT_PUBLISHED}
          label={t('RESULTS.RESULT_PUBLISHED')}
        />
        <CenterCircleCards
          value={data?.returnedByAroCount}
          status={CENTER_NUMBER_STATUS.RESULT_RETURN}
          label={t('RESULTS.RESULT_RETURN')}
        />
        <CenterCircleCards
          value={data?.cancelledCenterCount}
          status={CENTER_NUMBER_STATUS.SUSPENDED}
          label={t('RESULTS.SUSPENDED')}
        />
      </div>
      <div className="d-grid gap-6 grid-cols-lg-10 grid-cols-md-10">
        {loading
          ? Array.from({ length: 15 })?.map((_, index: number) => (
              <Skeleton height="150px" className="col-span-2" key={index} />
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
        <div className="py-10">
          <Pagination
            totalPage={totalPage}
            activePage={activePage}
            onClick={(page) => handleQueryParams({ key: RESULTS.PAGE, page })}
          />
        </div>
      ) : null}
    </div>
  );
};
