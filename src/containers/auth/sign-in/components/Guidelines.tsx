import { useTranslation, Trans } from 'react-i18next';
import { Text } from '@pentabd/ui';

interface Props {
  handleDownload: () => void;
}

const Guidelines = ({ handleDownload }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="d-flex justify-content-center py-10">
      <div className="col-sm-8 col-md-8 col-lg-8 col-xl-8 d-flex flex-column gap-9">
        <div className="d-flex align-items-center gap-6">
          <img
            src="/company-logo.png"
            alt="company-logo"
            width={30}
            height={33}
          />
          <Text size="lg" weight="semibold" color="dark">
            {t(`LOGIN.COMPANY_NAME`)}
          </Text>
        </div>
        <Text size="md" weight="semibold" color="dark">
          {t('LOGIN.GUIDELINES_TITLE')}
        </Text>
        <Text size="md" weight="normal" color="title">
          <ul>
            <Trans
              i18nKey={t('LOGIN.GUIDELINES_DESCRIPTION')}
              components={{
                li: <li></li>,
              }}
            ></Trans>
          </ul>
        </Text>
        <Text size="md" weight="semibold" color="dark">
          {t('LOGIN.DOCUMENTS_TITLE')}
        </Text>
        <Text size="md" weight="normal" color="title">
          <ul>
            <Trans
              i18nKey={t('LOGIN.DOCUMENTS_DESCRIPTION')}
              components={{
                li: <li></li>,
              }}
            ></Trans>
          </ul>
        </Text>
        <div
          onClick={handleDownload}
          className="text-underline text-primary pointer"
        >
          <a
            href="/files/ONSS_Manual.pdf"
            download="ONSS_Manual"
            rel="noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Text size="md" weight="normal">
              {t('LOGIN.GUIDELINES_DOWNLOAD')}
            </Text>
          </a>
        </div>
      </div>
      <div className="col-sm-2 col-md-2 col-lg-2 col-sm-2"></div>
    </div>
  );
};
export default Guidelines;
