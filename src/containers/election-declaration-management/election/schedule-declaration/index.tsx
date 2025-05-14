import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';
import { IconPlus } from '@pentabd/icons';
import { Button, Header, Text } from '@pentabd/ui';

import { ROUTES } from '@constants/routes';
import SearchSchedule from './components/SearchSchedule';
import { getBreadcrumbs, getHeaderText } from './constants';

const ScheduleDeclaration = () => {
  const { t } = useTranslation();

  return (
    <div className="container-96 mb-24">
      <Header
        headerText={getHeaderText(t)}
        breadcrumbs={getBreadcrumbs(t)}
        actions={[
          <Link to={ROUTES.ADD_NEW_SCHEDULE_DECLARATION}>
            <Button type="primary" htmlType="button" size="sm">
              <IconPlus size="20" fill="light" />
              <Text weight="semibold" size="sm">
                {t('SCHEDULE_DECLARATION.ADD_NEW_SCHEDULE_BUTTON_TEXT')}
              </Text>
            </Button>
          </Link>,
        ]}
        className="mb-10 pt-10"
      />

      <SearchSchedule />
    </div>
  );
};

export default ScheduleDeclaration;
