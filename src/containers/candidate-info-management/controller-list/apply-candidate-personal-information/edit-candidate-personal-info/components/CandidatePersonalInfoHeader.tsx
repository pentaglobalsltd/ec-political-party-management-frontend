import { useTranslation } from 'react-i18next';
import { Header } from '@pentabd/ui';

export const CandidatePersonalInfoHeader = () => {
  const { t } = useTranslation();

  const headerText = {
    header: t('CANDIDATE_PERSONAL_INFO.HEADER'),
    subHeader: t('CANDIDATE_PERSONAL_INFO.SUBHEADER'),
  };
  return <Header headerText={headerText} />;
};
