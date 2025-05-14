import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { IconCheckCircleBroken } from '@pentabd/icons';
import { Button, Header } from '@pentabd/ui';

import FormInput from '@components/inputs/FormInput';
import FormTextArea from '@components/inputs/FormTextArea';
import FormSelect from '@components/inputs/FormSelect';
import { FORM_FIELDS } from '@constants/forms';
import {
  PoliticalPartyDataType,
  politicalPartyValidation,
} from '@validations/center-officer-management/controller-list/political-party/politicalPartyValidation';
import { editPoliticalPartyBreadcrumbs } from '../constants';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import { useGetPoliticalParty } from '@hooks/center-officer-management/controller-list/political-party/useGetPoliticalParty';
import { useUpdatePoliticalParty } from '@hooks/center-officer-management/controller-list/political-party/useUpdatePoliticalParty';
import { useSymbolListSelect } from '@hooks/center-officer-management/controller-list/symbol/useSymbolListSelect';
import FormRadio from '@components/inputs/FormRadio';
import { POLITICAL_PARTY_RADIO_CODES, radioOptions } from './constants';

const POLITICAL_PARTY =
  FORM_FIELDS.CENTER_OFFICER_MANAGEMENT.CONTROLLER_LIST.POLITICAL_PARTY;

function EditPoliticalParty() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { id } = useParams();

  const { politicalParty, getPoliticalParty } = useGetPoliticalParty();
  const { updatePoliticalParty, loading, success } = useUpdatePoliticalParty();
  const { symbolList, getSymbolList } = useSymbolListSelect();

  const methods = useForm<PoliticalPartyDataType>({
    resolver: yupResolver(politicalPartyValidation),
    values: {
      [POLITICAL_PARTY.REGISTRATION_NO]: politicalParty?.regNo || '',
      [POLITICAL_PARTY.PARTY_NAME_BN]: politicalParty?.nameBn || '',
      [POLITICAL_PARTY.PARTY_NAME_EN]: politicalParty?.nameEn || '',
      [POLITICAL_PARTY.ADDRESS]: politicalParty?.address || '',
      [POLITICAL_PARTY.SYMBOL]: politicalParty?.symbol?.symbolId || '',
      [POLITICAL_PARTY.IS_ACTIVE]: politicalParty?.isActive
        ? POLITICAL_PARTY_RADIO_CODES.ACTIVE
        : POLITICAL_PARTY_RADIO_CODES.INACTIVE,
    },
  });

  const { handleSubmit } = methods;

  const updatePoliticalPartyForm = (data: PoliticalPartyDataType) => {
    const isActive =
      data?.[POLITICAL_PARTY.IS_ACTIVE] === POLITICAL_PARTY_RADIO_CODES?.ACTIVE
        ? true
        : false;

    const __data = {
      ...data,
      isActive,
      regNo: Number(data?.regNo),
      symbolId: Number(data?.symbolId),
    };

    updatePoliticalParty(id || '', __data);
  };
  useEffect(() => {
    if (id) {
      getPoliticalParty(id);
      getSymbolList(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (success) {
      navigate(-1);
    }

    // eslint-disable-next-line
  }, [success]);

  return (
    <div className="container-96 mb-24">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(updatePoliticalPartyForm)}>
          <Header
            className="mb-10 pt-10"
            headerText={{ header: politicalParty?.nameBn || '' }}
            breadcrumbs={editPoliticalPartyBreadcrumbs(t)}
          />

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

              <FormRadio
                title="POLITICAL_PARTY.CONDITION"
                options={radioOptions(t)}
                name={POLITICAL_PARTY.IS_ACTIVE}
                id={POLITICAL_PARTY.IS_ACTIVE}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end align-items-center gap-6 border-top py-8">
            <Button
              fill="outline"
              key={1}
              htmlType="button"
              type="light"
              onClick={() => navigate(-1)}
            >
              {t('POLITICAL_PARTY.BACK')}
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

export default EditPoliticalParty;
