import { useTranslation } from 'react-i18next';
import { Table, Text } from '@pentabd/ui';

import { useLanguage } from '@hooks/miscellaneous/custom-hook/useLanguage';
import FormInput from '@components/inputs/FormInput';
import { FORM_FIELDS } from '@constants/forms';
import { childrenTableColumns } from '../constants';
import { CandidateChildrenType } from '@type/candidate-info-management/candidate-confirmation/persona-info';

const PERSONAL =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_CONFIRMATION
    .PERSONAL;

const SecondHalf = ({
  childrenInfo,
  maritalStatuses,
}: CandidateChildrenType) => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <div className="pb-10">
      <Text
        component="p"
        sizeType="fs"
        size="md"
        weight="semibold"
        className="mb-12"
      >
        {t('CANDIDATE_CONFIRMATION.EMERGENCY_CONTACT')}
      </Text>
      <FormInput
        title="CANDIDATE_CONFIRMATION.TELEPHONE_NUMBER"
        registerName={PERSONAL.EMERGENCY_CONTACT.TELEPHONE_NUMBER}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.MOBILE_NUMBER"
        registerName={PERSONAL.EMERGENCY_CONTACT.MOBILE_NUMBER}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.EMAIL_ADDRESS"
        registerName={PERSONAL.EMERGENCY_CONTACT.EMAIL_ADDRESS}
        disabled
      />
      <Text
        component="p"
        sizeType="fs"
        size="md"
        weight="semibold"
        className="mb-12"
      >
        {' '}
        {t('CANDIDATE_CONFIRMATION.CURRENT_WORKPLACE')}
      </Text>
      <FormInput
        title="CANDIDATE_CONFIRMATION.WORKPLACE_NAME"
        registerName={PERSONAL.CURRENT_WORKPLACE.WORKPLACE_NAME}
        disabled
      />
      <FormInput
        title="CANDIDATE_CONFIRMATION.WORKPLACE_ADDRESS"
        registerName={PERSONAL.CURRENT_WORKPLACE.WORKPLACE_ADDRESS}
        disabled
      />
      <Text component="p" sizeType="fs" size="md" weight="semibold">
        {t('CANDIDATE_CONFIRMATION.CHILDREN_TITLE')}
      </Text>
      <Text
        component="p"
        sizeType="fs"
        size="sm"
        weight="normal"
        color="title"
        className="mb-8"
      >
        {t('CANDIDATE_CONFIRMATION.CHILDREN_SUBTITLE')}
      </Text>
      <div className="mb-12">
        <Table
          rows={
            childrenInfo?.map((item, idx) => ({
              ...item,
              id: idx,
            })) || []
          }
          columns={childrenTableColumns(t, maritalStatuses, language)}
        />
      </div>
      {/* <FormInput
        title="CANDIDATE_CONFIRMATION.DATE"
        registerName={PERSONAL.DATE}
        disabled
      /> */}
    </div>
  );
};
export default SecondHalf;
