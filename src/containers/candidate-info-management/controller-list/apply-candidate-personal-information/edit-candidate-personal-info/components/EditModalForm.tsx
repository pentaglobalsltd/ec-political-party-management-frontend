import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconCalendar } from '@pentabd/icons';
import { Button, InputDate, InputSelect, Text } from '@pentabd/ui';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { SelectionType } from '@pentabd/ui/build/atoms/select/types';

import { maritalStatusSelectOptions } from './formOptions';
import {
  CHILDREN,
  ChildrenValidationSchemaType,
  childrenValidationSchema,
} from '@validations/candidate-info-management/operator/personalInfoValidation';
import { ChildType } from '@type/candidate-info-management/operator-view/candidatePersonalInformation';
import { useCandidatePersonalInformation } from '@hooks/candidate-info-management/operator-view/candidate-management/candidate-personal-information/useCandidatePersonalInformation';
import FormChildInput from '@components/inputs/FormChildInput';
import { mapCreateChildrenInfo } from '../../helpers';

interface EditModalFormPropsType {
  childId?: string | number;
  closeEditModal: () => void;
}

export default function EditModalForm({
  childId,
  closeEditModal,
}: EditModalFormPropsType) {
  const { electionSettingsId, candidateElectionDetailsId } = useParams();

  const { candidateChild, updateCandidateChildHandler } =
    useCandidatePersonalInformation({
      electionSettingsId,
      candidateElectionDetailsId,
    });

  const methods = useForm<ChildrenValidationSchemaType>({
    resolver: yupResolver(childrenValidationSchema),
    values: candidateChild as ChildrenValidationSchemaType,
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const { t } = useTranslation();

  const onSubmit: SubmitHandler<ChildrenValidationSchemaType> = (
    postData: ChildType,
  ) => {
    const data: ChildType = mapCreateChildrenInfo(postData);
    if (childId) {
      updateCandidateChildHandler({
        data,
        electionSettingsId,
        candidateElectionDetailsId,
        childId,
      });
      closeEditModal();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-9">
          <Text size="lg" weight="semibold">
            {t('CANDIDATE_PERSONAL_INFO.CHILDREN_TITLE')}
          </Text>
          <div className="d-flex flex-column gap-9 mt-9">
            <FormChildInput
              registerName={CHILDREN.NAME}
              title={t('CANDIDATE_PERSONAL_INFO.CHILD_NAME')}
              control={control}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <FormChildInput
              registerName={CHILDREN.EDUCATIONAL_QUALIFICATION}
              title={t(
                'CANDIDATE_PERSONAL_INFO.CHILD_EDUCATIONAL_QUALIFICATION',
              )}
              control={control}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <Controller
              control={control}
              name={CHILDREN.DATE_OF_BIRTH}
              render={({ field }) => {
                return (
                  <InputDate
                    title={t('CANDIDATE_PERSONAL_INFO.CHILD_DOB')}
                    name={CHILDREN.DATE_OF_BIRTH}
                    onSelectDate={(date) => field.onChange(date)}
                    value={field.value as string}
                    defaultValue={field.value as string}
                    error={errors as any}
                    placeholder={t('CANDIDATE_PERSONAL_INFO.CHILD_DOB')}
                    minWidth
                    prefix={
                      <IconCalendar size="20" fill="none" stroke="subtitle2" />
                    }
                    maximumDate={dayjs()}
                    getTranslation={t}
                  />
                );
              }}
            />

            <FormChildInput
              registerName={CHILDREN.INSTITUTE_ADDRESS}
              title={t('CANDIDATE_PERSONAL_INFO.CHILD_INSTITUTE_ADDRESS')}
              control={control}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <Controller
              control={control}
              name={CHILDREN.MARITAL_STATUS}
              render={({ field }) => (
                <InputSelect
                  title={t('CANDIDATE_PERSONAL_INFO.CHILD_MARITAL_STATUS')}
                  name={CHILDREN.MARITAL_STATUS}
                  onSelectItem={(data: SelectionType) => field.onChange(data)}
                  value={field.value as string}
                  defaultValue={field.value as string}
                  error={errors as any}
                  minWidth
                  options={maritalStatusSelectOptions(t)}
                  placeholder={t('PLACEHOLDER.SELECT')}
                  getTranslation={t}
                />
              )}
            />

            <div className="d-flex gap-5">
              <Button fill="outline" type="light" className="flex-fill">
                {t('CANDIDATE_PERSONAL_INFO.CANCEL_BUTTON_TEXT')}
              </Button>
              <Button
                fill="fill"
                type="primary"
                className="flex-fill"
                htmlType="submit"
              >
                {t('CANDIDATE_PERSONAL_INFO.CREATE_BUTTON_TEXT')}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
