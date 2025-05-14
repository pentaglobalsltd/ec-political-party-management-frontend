import { useTranslation } from 'react-i18next';
import { Text } from '@pentabd/ui';

import PersonalInfo from './PersonalInfo';
import Address from './Address';
import CurrentWorkplace from './CurrentWorkplace';
import EmergencyContact from './EmergencyContact';
import Children from './Children';

import { GenericPersonalInfoProps } from '../types';

export const NationalElection = (props: GenericPersonalInfoProps) => {
  const { t } = useTranslation();
  const { openEditModal } = props;

  return (
    <>
      <PersonalInfo />

      <Text
        component="p"
        sizeType="fs"
        size="md"
        weight="semibold"
        className="mb-8"
      >
        {t('CANDIDATE_PERSONAL_INFO.ADDRESS')}
      </Text>
      <Address />

      <Text
        component="p"
        sizeType="fs"
        size="md"
        weight="semibold"
        className="mb-8"
      >
        {t('CANDIDATE_PERSONAL_INFO.EMERGENCY_CONTACT')}
      </Text>
      <EmergencyContact />

      <Text
        component="p"
        sizeType="fs"
        size="md"
        weight="semibold"
        className="mb-8"
      >
        {t('CANDIDATE_PERSONAL_INFO.CURRENT_WORKPLACE')}
      </Text>
      <CurrentWorkplace />

      <Text component="p" sizeType="fs" size="md" weight="semibold">
        {t('CANDIDATE_PERSONAL_INFO.CHILDREN_TITLE')}
      </Text>
      <Text
        component="p"
        sizeType="fs"
        size="sm"
        weight="normal"
        color="title"
        className="mb-8"
      >
        {t('CANDIDATE_PERSONAL_INFO.CHILDREN_SUBTITLE')}
      </Text>
      <Children openEditModal={openEditModal} />
    </>
  );
};
