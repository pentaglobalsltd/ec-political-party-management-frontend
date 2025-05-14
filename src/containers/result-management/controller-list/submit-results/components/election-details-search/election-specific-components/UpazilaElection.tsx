import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { useParams, useSearchParams } from 'react-router-dom';
import { IconChevronDown } from '@pentabd/icons';
import { OptionType } from '@pentabd/ui/build/atoms/select/types';
import Select from '@components/inputs/Select';
import { FORM_FIELDS } from '@constants/forms';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { SelectOptionArray } from '@type/selection-option-type';
import { resetSubmitResultContextDataForCandidate } from '../helper/reset-context-data-for-candidate';
import { SubmitResultContext } from '../../../context/submitResultContext';
import { usePollingCentersOpAroOpListSelect } from '@hooks/result-management/submit-results/usePollingCentersOpAroOp';
import { getParams } from '@utils';

const SUBMIT_RESULTS = FORM_FIELDS.RESULT_MANAGEMENT.SUBMIT_RESULTS;

const UpazilaElection = () => {
  const { t } = useTranslation();
  const [upazilas, setUpazilas] = useState<SelectOptionArray[]>([]);

  const { candidateTypeId, electionSettingsId } = useParams();

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { watch, setValue } = useFormContext();

  const { setContextData, resetFileUrl, setFileUploadDisable } =
    useContext(SubmitResultContext)!;

  const {
    isAdmin,
    electionSettings,
    candidateTypes,
    electionSchedules,
    subject: userIdElectionUser,
  } = useFiltersRedux();

  const scheduleIdWatch = watch(SUBMIT_RESULTS.SCHEDULE);

  const {
    // pollingCenters,
    getPollingCentersListSelect,
    resetPollingCentersListSelect,
  } = usePollingCentersOpAroOpListSelect(setContextData);

  const resetUploadPdf = () => {
    setFileUploadDisable(true);
    resetFileUrl();
  };

  const onSelectCandidateType = (candidateType: number) => {
    resetSubmitResultContextDataForCandidate({
      candidateType,
      setContextData,
      electionSettings,
    });

    resetUploadPdf();

    setValue(SUBMIT_RESULTS.POLLING_CENTERS, null);

    // only for upazila candidates
    setValue(SUBMIT_RESULTS.UPAZILA, null);

    if (electionSettings) {
      if (isAdmin) {
        const adminData = electionSettings
          ?.filter((item) => {
            return candidateType === item?.extra?.candidateTypeId;
          })
          .map((obj) => ({
            ...obj,
            value: obj?.extra?.electionSettingsId as number,
            /** usually for admin, the 'value' reflects 'constituencyId'
             * and for election-users, the 'value' reflects 'electionSettingsId'
             * but in this case,
             * though the user is 'ADMIN', but we still need 'electionSettingsId'
             * bcz here admin is searching 'polling-centers' on behalf of an election-user
             */
          }));

        setUpazilas(adminData);
      } else {
        setUpazilas(
          electionSettings?.filter((item) => {
            return candidateType === item?.extra?.candidateTypeId;
          }),
        );
      }
    }

    resetPollingCentersListSelect();
  };

  const onSelectUpazila = (upazilaSettingsId: number) => {
    if (upazilaSettingsId) {
      setValue(SUBMIT_RESULTS.POLLING_CENTERS, null);

      setContextData((prev: any) => {
        return {
          ...prev,
          selectedUpazilaId: upazilaSettingsId,
          selectedCandidateSettings: electionSettings?.find(
            (item) => item?.extra?.electionSettingsId === upazilaSettingsId,
          ),
        };
      });

      resetUploadPdf();

      getPollingCentersListSelect({
        scheduleId: scheduleIdWatch as number,
        electionSettingsId: upazilaSettingsId,
        userId: isAdmin ? params?.userId : (userIdElectionUser as string),
      });
    }
  };

  useEffect(() => {
    if (
      scheduleIdWatch &&
      candidateTypeId &&
      electionSettingsId &&
      electionSettings?.length
    ) {
      setValue(SUBMIT_RESULTS.CANDIDATE_TYPE, Number(candidateTypeId));

      setContextData((prev: any) => {
        return {
          ...prev,
          candidateType: Number(candidateTypeId),
          selectedCandidateSettings: electionSettings?.find(
            (item) =>
              item?.extra?.electionSettingsId === Number(electionSettingsId),
          ),

          selectedUpazilaId: Number(electionSettingsId),
        };
      });

      setUpazilas(
        electionSettings?.filter((item) => {
          return Number(candidateTypeId) === item?.extra?.candidateTypeId;
        }),
      );

      setValue(SUBMIT_RESULTS.UPAZILA, Number(electionSettingsId));

      getPollingCentersListSelect({
        scheduleId: scheduleIdWatch as number,
        electionSettingsId: Number(electionSettingsId),
        userId: isAdmin ? params?.userId : (userIdElectionUser as string),
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleIdWatch, candidateTypeId, electionSettingsId, electionSettings]);

  return (
    <>
      <div className="col-span-lg-5">
        <Select
          title={t('SUBMIT_RESULTS.ELECTION_ONLY_TITLE')}
          name={SUBMIT_RESULTS.SCHEDULE}
          options={electionSchedules as OptionType[]}
          suffix={<IconChevronDown size="20" fill="subtitle2" />}
          disabled
        />
      </div>
      <div className="col-span-lg-5">
        <div className="d-grid grid-cols-1 grid-cols-md-6 gap-6">
          <div className="col-span-3">
            <Select
              title={t('SUBMIT_RESULTS.POST_NAME')}
              name={SUBMIT_RESULTS.CANDIDATE_TYPE}
              options={candidateTypes as OptionType[]}
              suffix={<IconChevronDown size="20" fill="subtitle2" />}
              resetData={(data) =>
                data && onSelectCandidateType(data as number)
              }
            />
          </div>

          <div className="col-span-3">
            <Select
              title={t('SUBMIT_RESULTS.UPAZILA')}
              name={SUBMIT_RESULTS.UPAZILA}
              options={upazilas}
              suffix={<IconChevronDown size="20" fill="subtitle2" />}
              resetData={(data) => onSelectUpazila(data as number)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpazilaElection;
