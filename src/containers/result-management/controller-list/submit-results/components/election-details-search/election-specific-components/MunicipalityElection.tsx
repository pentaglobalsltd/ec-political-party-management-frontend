import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { SelectOptionArray } from '@type/selection-option-type';
import classNames from 'classnames';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { getParams } from '@utils';
import { SubmitResultContext } from '../../../context/submitResultContext';
import { FORM_FIELDS } from '@constants/forms';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import { usePollingCentersOpAroOpListSelect } from '@hooks/result-management/submit-results/usePollingCentersOpAroOp';
import { resetSubmitResultContextDataForCandidate } from '../helper/reset-context-data-for-candidate';
import Select from '@components/inputs/Select';
import { OptionType } from '@pentabd/ui/build/atoms/select/types';
import { IconChevronDown } from '@pentabd/icons';

const SUBMIT_RESULTS = FORM_FIELDS.RESULT_MANAGEMENT.SUBMIT_RESULTS;

const MunicipalityElection = () => {
  const { t } = useTranslation();
  const [wards, setWards] = useState<SelectOptionArray[]>([]);

  const { candidateTypeId, electionSettingsId } = useParams();

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    isAdmin,
    electionSettings,
    candidateTypes,
    electionSchedules,
    subject: userIdElectionUser,
  } = useFiltersRedux();

  const { watch, setValue } = useFormContext();

  const { contextData, setContextData, resetFileUrl, setFileUploadDisable } =
    useContext(SubmitResultContext)!;

  const scheduleIdWatch = watch(SUBMIT_RESULTS.SCHEDULE);

  const isCouncillorElection = [
    CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID,
    CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID,
  ].includes(Number(contextData?.candidateType));

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
    // for all candidates
    resetSubmitResultContextDataForCandidate({
      candidateType,
      setContextData,
      electionSettings,
    });

    resetUploadPdf();

    setValue(SUBMIT_RESULTS.POLLING_CENTERS, null);

    const isMayor = candidateType === CANDIDATE_INFO.MUNICIPALITY_MAYOR.ID;

    // only for mayor
    if (isMayor) {
      setValue(SUBMIT_RESULTS.UNION_OR_WARD, null);
      getPollingCentersForMayor(candidateType);
    }

    // only for councillor
    else {
      getWardsForCouncillor(candidateType);
      resetPollingCentersListSelect();
    }
  };

  const getPollingCentersForMayor = (candidateType: number) => {
    const mayorSettingsObj = electionSettings?.find(
      (item) => item?.extra?.candidateTypeId === candidateType,
    );

    const mayorSettingsId = mayorSettingsObj?.extra?.electionSettingsId;

    getPollingCentersListSelect({
      scheduleId: scheduleIdWatch as number,
      electionSettingsId: mayorSettingsId as number,
      userId: isAdmin ? params?.userId : (userIdElectionUser as string),
    });
  };

  const onSelectWard = (wardSettingsId: number) => {
    if (wardSettingsId) {
      setValue(SUBMIT_RESULTS.POLLING_CENTERS, null);

      setContextData((prev: any) => {
        return {
          ...prev,
          selectedWardId: wardSettingsId,
          selectedCandidateSettings: electionSettings?.find(
            (item) => item?.extra?.electionSettingsId === wardSettingsId,
          ),
        };
      });

      resetUploadPdf();

      getPollingCentersListSelect({
        scheduleId: scheduleIdWatch as number,
        electionSettingsId: wardSettingsId,
        userId: isAdmin ? params?.userId : (userIdElectionUser as string),
      });
    }
  };

  const getWardsForCouncillor = (candidateType: number) => {
    if (!electionSettings) return;

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
           * because here admin is searching 'polling-centers' on behalf of an election-user
           */
        }));

      setWards(adminData);
    } else {
      setWards(
        electionSettings?.filter((item) => {
          return candidateType === item?.extra?.candidateTypeId;
        }),
      );
    }
  };

  useEffect(() => {
    if (
      scheduleIdWatch &&
      candidateTypeId &&
      electionSettingsId &&
      electionSettings?.length
    ) {
      const isMayor =
        Number(candidateTypeId) === CANDIDATE_INFO.MUNICIPALITY_MAYOR.ID;

      setValue(SUBMIT_RESULTS.CANDIDATE_TYPE, Number(candidateTypeId));

      setContextData((prev: any) => {
        return {
          ...prev,
          candidateType: Number(candidateTypeId),
          selectedCandidateSettings: electionSettings?.find(
            (item) =>
              item?.extra?.electionSettingsId === Number(electionSettingsId),
          ),

          ...(!isMayor ? { selectedWardId: Number(electionSettingsId) } : {}),
        };
      });

      if (!isMayor) {
        getWardsForCouncillor(Number(candidateTypeId));
        setValue(SUBMIT_RESULTS.UNION_OR_WARD, Number(electionSettingsId));
      }

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
        <div className="d-grid grid-cols-1 grid-cols-md-5 gap-6">
          <div
            className={classNames(
              { 'col-span-5': !isCouncillorElection },
              { 'col-span-3': isCouncillorElection },
            )}
          >
            <Select
              title={t('SUBMIT_RESULTS.FOR_POST')}
              name={SUBMIT_RESULTS.CANDIDATE_TYPE}
              options={candidateTypes as OptionType[]}
              suffix={<IconChevronDown size="20" fill="subtitle2" />}
              resetData={(data) =>
                data && onSelectCandidateType(data as number)
              }
            />
          </div>
          {isCouncillorElection ? (
            <div className="col-span-2">
              <Select
                title={t('SUBMIT_RESULTS.WARD_NUMBER')}
                name={SUBMIT_RESULTS.UNION_OR_WARD}
                options={wards}
                suffix={<IconChevronDown size="20" fill="subtitle2" />}
                resetData={(data) => onSelectWard(data as number)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default MunicipalityElection;
