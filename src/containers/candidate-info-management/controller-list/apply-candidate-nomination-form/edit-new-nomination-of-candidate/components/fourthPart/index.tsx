import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import { useTranslation } from 'react-i18next';
import { SectionHeader, Text, RadioGroup, Button } from '@pentabd/ui';

import { mapFourthPart } from '../../filterData';
import { FORM_FIELDS } from '@constants/forms';

import { useCandidateNominationFormFourthPart } from '@hooks/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/useCandidateNominationFormFourthPart';
import { createFourthPartInitialState } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/fourth-part/fourth-part-actions';
import { fourthPartValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/fourthPartValidation';
import { IconCheckCircleBroken, IconRefreshCcw01 } from '@pentabd/icons';
import SelectedYes from './SelectedYes';
import SelectedNo from './SelectedNo';
import { SELECT_OPTION, isElectedOption } from './constant';
import { ROUTES } from '@constants/routes';

const FOURTH_PART =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.FOURTH_PART;

export type FormData = yup.InferType<typeof fourthPartValidation>;

const FourthPart = ({ onEdit }: { onEdit?: (data: number) => void }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    electionSettingsId,
    candidateElectionDetailsId,
    isFromNominationPage,
  } = useParams();
  const {
    isCreateRequested,
    createCandidateNominationFormFourthPartInfo,
    candidateNominationFormFourthPart,
    isCreateSuccess,
    getFourthPartInitialStateHandler,
  } = useCandidateNominationFormFourthPart({
    electionSettingsId,
    candidateElectionDetailsId,
  });

  const methods = useForm<FormData>({
    resolver: yupResolver(fourthPartValidation),
    defaultValues: {
      [FOURTH_PART.IS_ELECTED_BEFORE]: 'yes',
    },
    values: candidateNominationFormFourthPart as any,
  });

  useEffect(() => {
    if (isCreateSuccess) {
      dispatch(createFourthPartInitialState());

      if (!onEdit) {
        if (isFromNominationPage === 'false') navigate(-1);
        else if (isFromNominationPage === 'true')
          navigate(ROUTES.CANDIDATE_NOMINATION);
      } else {
        onEdit && onEdit(2);
      }
    }

    return () => {
      getFourthPartInitialStateHandler();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateSuccess]);

  const onSubmit: SubmitHandler<any> = (postData: any) => {
    const data = mapFourthPart(postData);
    createCandidateNominationFormFourthPartInfo({
      electionSettingsId,
      candidateElectionDetailsId,
      data,
    });
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = methods;
  const selectedRadioValue = watch(FOURTH_PART.IS_ELECTED_BEFORE);

  return (
    <FormProvider {...methods}>
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <SectionHeader
          title={t('FOURTH_PART.FORM_TITLE')}
          subtitle={t('FOURTH_PART.FORM_SUBTITLE')}
        />
        <div className="d-flex flex-column gap-8 pt-9">
          <div className="d-flex gap-9">
            <div>
              <Text weight="medium" size="sm" color="title">
                {t('FOURTH_PART.SELECTED_BEFORE')}
              </Text>
            </div>
            <div>
              <RadioGroup
                {...register(FOURTH_PART.IS_ELECTED_BEFORE)}
                id={FOURTH_PART.IS_ELECTED_BEFORE}
                options={isElectedOption(t)}
              />
              <ErrorMessage
                errors={errors}
                name={FOURTH_PART.IS_ELECTED_BEFORE}
                render={({ message }) => (
                  <Text color="danger">{t(message)}</Text>
                )}
              />
            </div>
          </div>
        </div>
        {selectedRadioValue === SELECT_OPTION.YES ? (
          <SelectedYes
            candidateName={candidateNominationFormFourthPart?.candidateName}
          />
        ) : selectedRadioValue === SELECT_OPTION.NO ? (
          <SelectedNo
            candidateName={candidateNominationFormFourthPart?.candidateName}
          />
        ) : null}

        <div className="border-top pt-8">
          <div className="col-12 d-flex justify-content-end gap-6">
            <Button
              fill="outline"
              className="border-info"
              type="info"
              onClick={() => reset()}
            >
              {t('NOMINATION_FORM_FIRST_PART.RESET_BUTTON')}
              <IconRefreshCcw01 size="20" fill="info" />
            </Button>
            <Button
              fill="fill"
              className="border-primary"
              type="success"
              loading={isCreateRequested}
              htmlType="submit"
            >
              {t('NOMINATION_FORM_FIRST_PART.SUBMIT_BUTTON')}
              <IconCheckCircleBroken size="20" fill="white" />
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
export default FourthPart;
