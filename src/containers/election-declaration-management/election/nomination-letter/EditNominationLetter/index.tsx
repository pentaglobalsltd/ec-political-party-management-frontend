import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { IconCheckCircleBroken } from '@pentabd/icons';
import { Button, FileUpload, Header, Text } from '@pentabd/ui';

import FormSelect from '@components/inputs/FormSelect';
import { FORM_FIELDS } from '@constants/forms';
import { ErrorMessage } from '@hookform/error-message';
import {
  NominationDataType,
  nominationValidation,
} from '@validations/election-declaration-management/election/nominationValidation';
import { editNominationLetterBreadcrumbs, options } from '../constants';

const NOMINATION_LETTER =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.ELECTION.NOMINATION_LETTER;

const EditNominationLetter = () => {
  const { t } = useTranslation();

  const methods = useForm<NominationDataType>({
    resolver: yupResolver(nominationValidation),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const submitForm = (data: any) => {
    console.log(data);
  };

  return (
    <div className="container-96 mb-24">
      <Header
        headerText={{
          header: t('NOMINATION_LETTER.EDIT_NOMINATION_LETTER'),
        }}
        breadcrumbs={editNominationLetterBreadcrumbs(t)}
        className="mb-12 pt-10"
      />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="rounded-6 border p-12 mb-12">
            <FormSelect
              title={t('NOMINATION_LETTER.ELECTION_TYPE')}
              name={NOMINATION_LETTER.ELECTION_TYPE}
              options={options}
            />

            <FormSelect
              title={t('NOMINATION_LETTER.CANDIDATE_TYPE')}
              name={NOMINATION_LETTER.CANDIDATE_TYPE}
              options={options}
            />

            <div className="d-grid grid-cols-12 mb-12">
              <div className="col-span-3">
                <Text weight="semibold" size="sm" color="title">
                  {t('NOMINATION_LETTER.UPLOAD')}
                </Text>
              </div>
              <div className="col-span-lg-5">
                <div className=" d-flex flex-column gap-6">
                  <FileUpload
                    {...register(NOMINATION_LETTER.NOMINATION_FILE)}
                    id={NOMINATION_LETTER.NOMINATION_FILE}
                  />
                </div>
                <div className="py-3">
                  <ErrorMessage
                    errors={errors}
                    name={NOMINATION_LETTER.NOMINATION_FILE}
                    render={({ message }) => (
                      <Text color="danger">{message}</Text>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end align-items-center gap-6 border-top pt-8">
            <Button fill="outline" key={1} htmlType="button" type="light">
              {t('NOMINATION_LETTER.BACK')}
            </Button>
            <Button key={2} htmlType="submit" type="success">
              {t('NOMINATION_LETTER.SAVE')}
              <IconCheckCircleBroken size="20" fill="light" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditNominationLetter;
