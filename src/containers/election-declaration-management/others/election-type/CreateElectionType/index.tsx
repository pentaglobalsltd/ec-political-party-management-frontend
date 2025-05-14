import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { IconCheckCircleBroken, IconRefreshCcw01 } from '@pentabd/icons';
import { Button, Header } from '@pentabd/ui';

import FormInputDouble from '@components/inputs/FormInputDouble';
import { FORM_FIELDS } from '@constants/forms';
import {
  ElectionTypeDataType,
  electionTypeValidation,
} from '@validations/election-declaration-management/others/election-type/electionTypeValidation';
import { newElectionTypeBreadcrumbs } from '../constants';

const ELECTION_TYPE =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.OTHERS.ELECTION_TYPE;

function CreateElectionType() {
  const { t } = useTranslation();

  const methods = useForm<ElectionTypeDataType>({
    resolver: yupResolver(electionTypeValidation),
  });

  const { handleSubmit, reset } = methods;
  const submitElectionTypeForm = (data: any) => {
    console.log(data);
  };

  const resetElectionTypeForm = () => {
    reset();
  };

  return (
    <div className="container-96 mb-24">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitElectionTypeForm)}>
          <Header
            className="mb-10 pt-10"
            headerText={{ header: t('ELECTION_TYPE.ELECTION_TYPE_ADD') }}
            breadcrumbs={newElectionTypeBreadcrumbs(t)}
          />

          <div className="mb-9">
            <div className="d-flex flex-column gap-8 p-9 border rounded-5">
              <FormInputDouble
                title="ELECTION_TYPE.ELECTION_CATEGORY"
                placeholder={t('PLACEHOLDER.ENTER')}
                registerName={{
                  type1: ELECTION_TYPE.ELECTION_TYPE_BN,
                  type2: ELECTION_TYPE.ELECTION_TYPE_EN,
                }}
                inputLabel1="ELECTION_TYPE.BANGLA"
                inputLabel2="ELECTION_TYPE.ENGLISH"
              />
            </div>
          </div>

          <div className="d-flex justify-content-end align-items-center gap-6 border-top pt-8">
            <Button
              fill="outline"
              key={1}
              htmlType="button"
              type="primary"
              onClick={resetElectionTypeForm}
            >
              {t('ELECTION_TYPE.RESET')}
              <IconRefreshCcw01 size="20" fill="primary" />
            </Button>
            <Button key={2} htmlType="submit" type="success">
              {t('ELECTION_TYPE.FILED')}
              <IconCheckCircleBroken size="20" fill="light" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default CreateElectionType;
