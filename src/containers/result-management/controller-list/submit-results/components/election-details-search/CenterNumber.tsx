import { useTranslation } from 'react-i18next';
import { Text } from '@pentabd/ui';
import { getDigitBanglaFromEnglish } from '@utils';

interface CenterNumberProps {
  count: number | undefined;
  label: string;
}

const CenterNumber = ({ count, label }: CenterNumberProps) => {
  const { t } = useTranslation();

  return (
    <div className="col-span-1">
      <div className="d-flex flex-column">
        <Text color="title" weight="semibold" size="sm" className="mb-4">
          {t(label)}
        </Text>
        <Text className="bg-white py-7 px-10 rounded-4 border" size="md">
          {`${
            count
              ? getDigitBanglaFromEnglish(count)
              : getDigitBanglaFromEnglish(0)
          }`}
        </Text>
      </div>
    </div>
  );
};

export default CenterNumber;
