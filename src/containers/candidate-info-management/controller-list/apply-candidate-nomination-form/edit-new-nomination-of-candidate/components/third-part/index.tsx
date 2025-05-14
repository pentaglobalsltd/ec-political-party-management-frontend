import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { usePoliticalPartyDynamicValidation } from './usePoliticalPartyDynamicValidation';
import { useCandidateNominationFormThirdPart } from '@hooks/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/useCandidateNominationFormThirdPart';
import Announcement from './announcement';
import { FORM_FIELDS } from '@constants/forms';
import { ELECTION_INFO } from '@constants/election-info';
import { INDEPENDENT_PARTY_ID } from '@constants/political-party-info';
import { mapCandidatePersonalInfo } from '../../filterData';
import {
  thirdPartValidation,
  thirdPartValidationSchemaType,
} from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/third-part';
import { createThirdPartInitialState } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/third-part/third-part-actions';
import { ROUTES } from '@constants/routes';
import ThirdPartInputFields from './components/ThirdPartInputFields';
import ThirdPartSelectFields from './components/ThirdPartSelectFields';
import Header from './components/Header';
import ThirdPartButtons from './components/ThirdPartButtons';

type FormData = yup.InferType<typeof thirdPartValidation>;

interface Props {
  handleCurrent: (step: number) => void;
  addFourthPart: () => void;
  subtractFourthPart: () => void;
  onEdit?: (data: number) => void;
}

const CANDIDATE_POLITICAL_INFO =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.THIRD_PART
    .CANDIDATE_POLITICAL_INFO;

const ThirdPart = ({
  handleCurrent,
  addFourthPart,
  subtractFourthPart,
  onEdit,
}: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { validationSchema } = usePoliticalPartyDynamicValidation();

  const {
    electionSettingsId,
    candidateElectionDetailsId,
    electionTypeId,
    isFromNominationPage,
  } = useParams();

  const {
    isCreateSuccess,
    isCreateRequested,
    createCandidateNominationFormThirdPartData,
    candidateNominationFormThirdPart,
    getThirdPartInitialStateHandler,
  } = useCandidateNominationFormThirdPart({
    electionSettingsId,
    candidateElectionDetailsId,
  });

  const methods = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    values: candidateNominationFormThirdPart as thirdPartValidationSchemaType,
  });

  const { watch, reset } = methods;

  const selectedValue: any = watch(
    `candidatePoliticalInfo.${CANDIDATE_POLITICAL_INFO.POLITICAL_PARTY_ID}`,
  );

  const isIndependentPartyChecked = watch(
    `candidatePoliticalInfo.${CANDIDATE_POLITICAL_INFO.POLITICAL_PARTY_CHECKBOX}`,
  );

  const onSubmit: SubmitHandler<FormData> = (data: any) => {
    data.candidatePersonalInfo = mapCandidatePersonalInfo(
      data.candidatePersonalInfo,
    );

    data.candidatePoliticalInfo.politicalPartyId = data.candidatePoliticalInfo
      .politicalPartyCheckbox
      ? INDEPENDENT_PARTY_ID
      : (data.candidatePoliticalInfo.politicalPartyId as number);
    data.candidatePoliticalInfo.symbolId =
      candidateNominationFormThirdPart.candidatePoliticalInfo?.symbolId;
    data.candidatePoliticalInfo.preferredSymbolId = data.candidatePoliticalInfo
      ?.preferredSymbolId
      ? Number(data.candidatePoliticalInfo?.preferredSymbolId)
      : null;
    data.candidatePoliticalInfo.politicalParty.preferredSymbolId = data
      .candidatePoliticalInfo?.preferredSymbolId
      ? Number(data.candidatePoliticalInfo?.preferredSymbolId)
      : null;

    data = {
      ...data,
      candidatePersonalInfo: {
        ...data.candidatePersonalInfo,
        candidateAddress: data.candidatePersonalInfo.candidateAddress,
        gender: candidateNominationFormThirdPart?.candidatePersonalInfo?.gender,
        maritalStatus:
          candidateNominationFormThirdPart?.candidatePersonalInfo
            ?.maritalStatus,
      },
    };

    createCandidateNominationFormThirdPartData({
      electionSettingsId,
      candidateElectionDetailsId,
      data,
    });
  };

  const successRouteForOtherElections = () => {
    dispatch(createThirdPartInitialState());
    if (onEdit) onEdit(2);
    else if (isFromNominationPage === 'false') navigate(-1);
    else if (isFromNominationPage === 'true')
      navigate(ROUTES.CANDIDATE_NOMINATION);
  };

  useEffect(() => {
    if (isCreateSuccess) {
      const isNational = Number(electionTypeId) === ELECTION_INFO.NATIONAL.ID;
      const isIndependent =
        selectedValue === INDEPENDENT_PARTY_ID || isIndependentPartyChecked;

      if (isNational && isIndependent) {
        dispatch(createThirdPartInitialState());
        handleCurrent(3);
      } else {
        successRouteForOtherElections();
      }
    }

    return () => {
      getThirdPartInitialStateHandler();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateSuccess, isIndependentPartyChecked]);

  useEffect(() => {
    const isIndependent =
      selectedValue === INDEPENDENT_PARTY_ID || isIndependentPartyChecked;

    if (isIndependent && Number(electionTypeId) === ELECTION_INFO.NATIONAL.ID) {
      addFourthPart();
    } else {
      subtractFourthPart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, isIndependentPartyChecked]);

  return (
    <FormProvider {...methods}>
      <form className="container" onSubmit={methods.handleSubmit(onSubmit)}>
        <Header />

        <div className="d-flex flex-column pt-9">
          <ThirdPartInputFields />

          <ThirdPartSelectFields
            watch={watch}
            candidateNominationFormThirdPart={candidateNominationFormThirdPart}
          />

          <Announcement />

          <ThirdPartButtons
            reset={reset}
            isCreateRequested={isCreateRequested}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default ThirdPart;
