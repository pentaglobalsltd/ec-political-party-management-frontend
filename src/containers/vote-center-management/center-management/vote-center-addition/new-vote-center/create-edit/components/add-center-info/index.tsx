import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@pentabd/ui';
import { IconChevronDown } from '@pentabd/icons';
import FormInput from '@components/inputs/FormInput';
import FormSelect from '@components/inputs/FormSelect';
import FormRadio from '@components/inputs/FormRadio';
import { VOTE_CENTER_MANAGEMENT } from '@constants/forms/vote-center-management/vote-center-management';
import {
  EvmResultsRadioOptions,
  tabCenterRadioOptions,
  temporaryRadioOptions,
} from '../../../../constants';
import useVoterTypes from '@hooks/vote-center-management/main-list/voter-areas/useVoterTypes';
import { NewVoteCenterContext } from '../../context/NewVoteCenterContext';

const { UPDATE_VOTE_CENTER } =
  VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT.VOTE_CENTER_ADDITION.NEW_CENTER;

const tAddCenterInfo = 'UPDATE_VOTE_CENTER.ADD_CENTER_INFO';

const AddCenterInfo = () => {
  const { t } = useTranslation();
  const { contextData } = useContext(NewVoteCenterContext)!;

  const { voterTypesList, getVoterTypesList } = useVoterTypes();

  //get voter-type
  useEffect(() => {
    if (Object.keys(voterTypesList).length === 0) {
      getVoterTypesList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="my-10">
      <Text className="text-title" size="xl" weight="semibold">
        {contextData?.potentialPollingInstitute?.instituteName} -{' '}
        {t(`${tAddCenterInfo}.Header`)}
      </Text>

      <div className="d-flex flex-column gap-8 p-10 border rounded-8 my-10">
        {/* ক্রমিক নং */}
        <FormInput
          title={t(`${tAddCenterInfo}.SERIAL_NO`)}
          registerName={UPDATE_VOTE_CENTER.SERIAL_NO}
          placeholder={t('PLACEHOLDER.ENTER')}
          required
        />

        {/* ============================== */}
        {/* প্রতিষ্ঠানের নাম (বাংলায়) */}
        <FormInput
          title={t(`${tAddCenterInfo}.INSTITUTE_NAME_BN`)}
          registerName={UPDATE_VOTE_CENTER.CENTER_INSTITUTE_NAME_BN}
          placeholder={t('PLACEHOLDER.ENTER')}
          required
        />

        {/* প্রতিষ্ঠানের নাম (ইংরেজি) */}
        <FormInput
          title={t(`${tAddCenterInfo}.INSTITUTE_NAME_EN`)}
          registerName={UPDATE_VOTE_CENTER.CENTER_INSTITUTE_NAME_EN}
          placeholder={t('PLACEHOLDER.ENTER')}
          required
        />
        {/* ============================== */}

        {/* কেন্দ্রের বিবরণী (বাংলায়) */}
        <FormInput
          title={t(`${tAddCenterInfo}.CENTER_DESCRIPTION_BANGLA`)}
          registerName={UPDATE_VOTE_CENTER.CENTER_DESCRIPTION_BANGLA}
          placeholder={t('PLACEHOLDER.ENTER')}
          required
        />

        {/* কেন্দ্রের বিবরণী (ইংরেজি) */}
        <FormInput
          title={t(`${tAddCenterInfo}.CENTER_DESCRIPTION_ENGLISH`)}
          registerName={UPDATE_VOTE_CENTER.CENTER_DESCRIPTION_ENGLISH}
          placeholder={t('PLACEHOLDER.ENTER')}
          required
        />

        {/* কেন্দ্রের ধরণ */}
        <FormSelect
          title={`${tAddCenterInfo}.CENTER_TYPE`}
          name={UPDATE_VOTE_CENTER.CENTER_TYPE}
          options={voterTypesList}
          suffix={<IconChevronDown size="20" fill="subtitle2" />}
          required
        />

        {/* কেন্দ্রের ঠিকানা (বাংলায়)*/}
        <FormInput
          title={t(`${tAddCenterInfo}.CENTER_ADDRESS_BANGLA`)}
          registerName={UPDATE_VOTE_CENTER.CENTER_ADDRESS_BANGLA}
          placeholder={t('PLACEHOLDER.ENTER')}
          disabled
        />

        {/* কেন্দ্রের ঠিকানা (ইংরেজি) */}
        <FormInput
          title={t(`${tAddCenterInfo}.CENTER_ADDRESS_ENGLISH`)}
          registerName={UPDATE_VOTE_CENTER.CENTER_ADDRESS_ENGLISH}
          placeholder={t('PLACEHOLDER.ENTER')}
          disabled
        />

        {/* মোট বুথ */}
        <FormInput
          title={t(`${tAddCenterInfo}.TOTAL_BOOTH`)}
          registerName={UPDATE_VOTE_CENTER.TOTAL_BOOTH}
          placeholder={t('PLACEHOLDER.ENTER')}
          required
        />

        {/* অস্থায়ী বুথের সংখ্যা */}
        <FormInput
          title={t(`${tAddCenterInfo}.NUMBER_OF_TEMPORARY_BOOTH`)}
          registerName={UPDATE_VOTE_CENTER.NUMBER_OF_TEMPORARY_BOOTH}
          placeholder={t('PLACEHOLDER.ENTER')}
        />

        {/* অস্থায়ী কেন্দ্র */}
        <FormRadio
          options={temporaryRadioOptions(t, tAddCenterInfo)}
          title={`${tAddCenterInfo}.TEMPORARY_CENTER`}
          name={UPDATE_VOTE_CENTER.TEMPORARY_CENTER}
          id={UPDATE_VOTE_CENTER.TEMPORARY_CENTER}
        />

        {/* ট্যাব কেন্দ্র */}
        <FormRadio
          options={tabCenterRadioOptions(t, tAddCenterInfo)}
          title={`${tAddCenterInfo}.TAB_CENTER`}
          name={UPDATE_VOTE_CENTER.TAB_CENTER}
          id={UPDATE_VOTE_CENTER.TAB_CENTER}
        />

        {/* ইভিএম ফলাফল  */}
        <FormRadio
          options={EvmResultsRadioOptions(t, tAddCenterInfo)}
          title={`${tAddCenterInfo}.EVM_RESULT`}
          name={UPDATE_VOTE_CENTER.EVM_RESULT}
          id={UPDATE_VOTE_CENTER.EVM_RESULT}
        />

        {/* {pollingCenterId ? (
          <FormRadio
            options={StatusRadioOptions(t)}
            title="VOTE_CENTER_ADDITION.VOTE_CENTER_STATUS"
            name={UPDATE_VOTE_CENTER.EVM_RESULT}
            id={UPDATE_VOTE_CENTER.EVM_RESULT}
          />
        ) : null} */}
      </div>
    </div>
  );
};

export default AddCenterInfo;
