import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IconCheckCircleBroken, IconRefreshCcw01 } from '@pentabd/icons';
import { Button, Header } from '@pentabd/ui';

import FormInput from '@components/inputs/FormInput';
import FormSelect from '@components/inputs/FormSelect';
import FormTextArea from '@components/inputs/FormTextArea';
import { FORM_FIELDS } from '@constants/forms';
import {
  PoliticalPartyDataType,
  politicalPartyValidation,
} from '@validations/center-officer-management/controller-list/political-party/politicalPartyValidation';
import { newPoliticalPartyBreadcrumbs } from '../constants';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useCreatePoliticalParty } from '@hooks/center-officer-management/controller-list/political-party/useCreatePoliticalParty';
import { useSymbolListSelect } from '@hooks/center-officer-management/controller-list/symbol/useSymbolListSelect';

const POLITICAL_PARTY =
  FORM_FIELDS.CENTER_OFFICER_MANAGEMENT.CONTROLLER_LIST.POLITICAL_PARTY;

function CreatePoliticalParty() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { addPoliticalParty, loading, success } = useCreatePoliticalParty();

  const { symbolList, getSymbolList } = useSymbolListSelect();

  const methods = useForm<PoliticalPartyDataType>({
    resolver: yupResolver(politicalPartyValidation),
  });

  const { handleSubmit, reset } = methods;
  const submitPoliticalPartyForm = (data: PoliticalPartyDataType) => {
    const __data = {
      ...data,
      regNo: Number(data?.regNo),
      symbolId: Number(data?.symbolId),
    };
    addPoliticalParty(__data);
  };

  const resetPoliticalPartyForm = () => {
    reset();
  };

  useEffect(() => {
    if (success) {
      navigate(-1);
    }

    // eslint-disable-next-line
  }, [success]);

  useEffect(() => {
    getSymbolList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{ header: t('POLITICAL_PARTY.NEW_PARTY_ADD') }}
        breadcrumbs={newPoliticalPartyBreadcrumbs(t)}
      />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitPoliticalPartyForm)}>
          <div className="mb-9">
            <div className="d-flex flex-column gap-8 p-9 border rounded-5">
              <FormInput
                title="POLITICAL_PARTY.REGISTRATION_NO"
                registerName={POLITICAL_PARTY.REGISTRATION_NO}
              />

              <FormInput
                title="POLITICAL_PARTY.PARTY_NAME_BANGLA"
                registerName={POLITICAL_PARTY.PARTY_NAME_BN}
              />

              <FormInput
                title="POLITICAL_PARTY.PARTY_NAME_ENGLISH"
                registerName={POLITICAL_PARTY.PARTY_NAME_EN}
              />

              <FormTextArea
                title="POLITICAL_PARTY.ADDRESS"
                registerName={POLITICAL_PARTY.ADDRESS}
              />

              <FormSelect
                title={t('POLITICAL_PARTY.SYMBOL')}
                name={POLITICAL_PARTY.SYMBOL}
                options={symbolList}
              />

              {/* <FormSelect
                title={t('POLITICAL_PARTY.CONDITION')}
                name={POLITICAL_PARTY.CONDITION}
                options={statusOptions}
              /> */}
            </div>
          </div>

          <div className="d-flex justify-content-end align-items-center gap-6 border-top py-8">
            <Button
              fill="outline"
              key={1}
              htmlType="button"
              type="primary"
              onClick={resetPoliticalPartyForm}
            >
              {t('POLITICAL_PARTY.RESET')}
              <IconRefreshCcw01 size="20" fill="primary" />
            </Button>
            <Button key={2} htmlType="submit" type="success" loading={loading}>
              {t('POLITICAL_PARTY.FILED')}
              <IconCheckCircleBroken size="20" fill="light" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default CreatePoliticalParty;
