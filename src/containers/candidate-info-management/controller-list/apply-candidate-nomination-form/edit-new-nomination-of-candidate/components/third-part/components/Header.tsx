import { SectionHeader, Text } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

  return (
    <>
      <SectionHeader
        title={t('FIRST_PART.PROGRESS_STEPS_THIRD_PART')}
        subtitle={t('THIRD_PART.FORM_SUBTITLE')}
      />

      <div className="rounded-4 p-9 bg-light my-9">
        <Text weight="medium" size="lg" color="title">
          {t('NOMINATION_FORM_THIRD_PART.PERSONAL_INFO_OF_CANDIDATE')}
        </Text>
      </div>
    </>
  );
};

export default Header;
