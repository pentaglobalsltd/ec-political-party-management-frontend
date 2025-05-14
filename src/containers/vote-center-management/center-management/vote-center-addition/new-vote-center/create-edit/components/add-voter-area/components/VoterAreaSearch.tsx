import { useContext } from 'react';
import classNames from 'classnames';
import MultiSelect from './MultiSelect';
import { Button, Text } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import Select from '@components/inputs/Select';
import { VoterAreaSearchParams } from '../../..';
import useVoterAreaFields from '../useVoterAreaFields';
import { ELECTION_INFO } from '@constants/election-info';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { NewVoteCenterContext } from '../../../context/NewVoteCenterContext';
import { VOTE_CENTER_MANAGEMENT } from '@constants/forms/vote-center-management/vote-center-management';
import { useSearchParams } from 'react-router-dom';
import { getParams } from '@utils';

const { ADD_VOTE_CENTER } =
  VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT.VOTE_CENTER_ADDITION.NEW_CENTER;

export interface VoterAreaSearchDefaultValues {
  upazilaId?: number | string;
  unionOrWardId?: number | string;
}

interface Props {
  requiredField?: string[];
  handleVoterAreaSearch: (data: VoterAreaSearchParams) => void;
  searchDefaultValues: VoterAreaSearchDefaultValues;
}

const VoterAreaSearch = ({
  requiredField,
  handleVoterAreaSearch,
  searchDefaultValues,
}: Props) => {
  const { t } = useTranslation();

  const { contextData, setContextData } = useContext(NewVoteCenterContext)!;

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);
  const { unionWardId } = params;

  const isUnionParishadElection =
    ELECTION_INFO.UNION_PARISHAD.ID ===
    contextData?.potentialPollingCenter?.electionTypeId;

  const methods = useForm({
    values: {
      [ADD_VOTE_CENTER.UPAZILA]: searchDefaultValues?.upazilaId
        ? Number(searchDefaultValues?.upazilaId)
        : undefined,
      [ADD_VOTE_CENTER.UNION]: searchDefaultValues?.unionOrWardId
        ? Number(searchDefaultValues?.unionOrWardId)
        : undefined,

      [ADD_VOTE_CENTER.UP_WARD]: unionWardId ? Number(unionWardId) : undefined,
    },
  });

  const { watch, resetField, getValues } = methods;

  const { upazilas, unionsOrWards, upWards, isSearchBtnDisable } =
    useVoterAreaFields({
      watch,
      requiredField,
      resetField,
    });

  const onSubmit: SubmitHandler<any> = (e: any) => {
    e.stopPropagation();
    const data = getValues();

    if (handleVoterAreaSearch) {
      handleVoterAreaSearch({
        uniOrWardsIds: data?.[ADD_VOTE_CENTER.UNION] as any,
        unionWardIds: data?.[ADD_VOTE_CENTER.UP_WARD] as any,
      });
    }

    if (data?.[ADD_VOTE_CENTER.UP_WARD]) {
      setContextData((prev: any) => ({
        ...prev,
        upUnionWardId: data?.[ADD_VOTE_CENTER.UP_WARD],
      }));
    }
  };

  return (
    <div className="box-ex border rounded-5 bg-extra-light p-10">
      <Text component="h3">{t('ADD_VOTE_CENTER.SEARCH_VOTER_AREA')}</Text>

      <FormProvider {...methods}>
        <form className="my-9">
          <div
            className={classNames(
              'd-grid grid-cols-1 gap-6 align-items-end mb-12',
              {
                'grid-cols-lg-9': !isUnionParishadElection,
                'grid-cols-lg-11': isUnionParishadElection,
              },
            )}
          >
            {/* 6 - উপজেলা  - by constituency */}
            <div
              className={classNames({
                'col-span-4': !isUnionParishadElection,
                'col-span-2': isUnionParishadElection,
              })}
            >
              <Select
                title="ADD_VOTE_CENTER.UPAZILA"
                name={ADD_VOTE_CENTER.UPAZILA}
                options={upazilas}
                disabled={upazilas?.length === 0 || isUnionParishadElection}
              />
            </div>

            {/* 7 - ইউনিয়ন */}
            <div className="col-span-4">
              <MultiSelect
                title={'ADD_VOTE_CENTER.UNION'}
                registerName={ADD_VOTE_CENTER.UNION}
                options={unionsOrWards}
                disabled={isUnionParishadElection}
              />
            </div>

            {/* ওয়ার্ড */}
            {isUnionParishadElection ? (
              <div className="col-span-4">
                <Select
                  title="ADD_VOTE_CENTER.WARD"
                  name={ADD_VOTE_CENTER.UP_WARD}
                  options={upWards}
                />
              </div>
            ) : null}

            {/* search button */}
            <Button
              type="primary"
              htmlType="button"
              disabled={isSearchBtnDisable}
              onClick={onSubmit}
            >
              {t('ADD_VOTE_CENTER.SEARCH_BUTTON')}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default VoterAreaSearch;
