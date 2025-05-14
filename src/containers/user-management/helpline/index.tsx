import { IconHomeLine } from '@pentabd/icons';
import { Button, Header, Text } from '@pentabd/ui';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

function HelpLine() {
  const { t } = useTranslation();

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('USER_HELPLINE.HELPLINE'),
        }}
        breadcrumbs={[
          {
            icon: <IconHomeLine fill="dark" size="20" />,
          },
          {
            label: t('USER_HELPLINE.HELPLINE'),
          },
        ]}
      />

      <div className="d-grid grid-cols-1 grid-cols-lg-12 gap-6 mb-20">
        <div className="col-span-4">
          <Text weight="semibold" size="lg" color="dark">
            {t('HELPLINE.UPCOMING_ELECTIONS')}
          </Text>
          <br />
          <div className="text-wrap" style={{ width: '18rem' }}>
            <Text weight="normal" color="subtitle1" className="lh-md">
              <Trans
                i18nKey="USER_HELPLINE.UPCOMING_ELECTIONS_CONTENT"
                values={{
                  ELECTION_PROCEDURE: 'নির্বাচন প্রক্রিয়া',
                  ELECTION_CALENDAR: 'নির্বাচনী ক্যলান্ডার',
                  POSSIBLE_SELECTION: 'সম্ভাব্য নির্বাচন',
                }}
                components={{
                  1: <Link to=""></Link>,
                  text: <Text color="primary"></Text>,
                }}
              ></Trans>
            </Text>
          </div>
        </div>
        <div className="col-span-4">
          <Text weight="semibold" size="lg" color="dark">
            {t('USER_HELPLINE.SPECIFIC_SELECTION')}
          </Text>
          <br />
          <div className="text-wrap" style={{ width: '18rem' }}>
            <Text weight="normal" color="subtitle1" className="lh-md">
              {t('USER_HELPLINE.SPECIFIC_SELECTION_CONTENT')}
            </Text>
          </div>
        </div>
        <div className="col-span-4">
          <Text weight="semibold" size="lg" color="dark">
            {t('USER_HELPLINE.CITY_CORPORATION_ELECTION')}
          </Text>
          <br />
          <div className="text-wrap" style={{ width: '18rem' }}>
            <Text weight="normal" color="subtitle1" className="lh-md">
              {t('USER_HELPLINE.CITY_CORPORATION_ELECTION_CONTENT')}
            </Text>
          </div>
        </div>
      </div>

      <div className="d-flex flex-row justify-content-between p-10 bg-light box-ex rounded-5">
        <div>
          <Text weight="bold" size="sm" color="title">
            {t('USER_HELPLINE.HAVE_QUESTIONS')}
          </Text>
          <br />
          <Text weight="medium" size="xs" color="subtitle2">
            {t('USER_HELPLINE.PLEASE_CONATCT')}
          </Text>
        </div>
        <div>
          <Button fill="fill" type="primary" htmlType="button">
            {t('USER_HELPLINE.GET_TOUCH')}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HelpLine;
