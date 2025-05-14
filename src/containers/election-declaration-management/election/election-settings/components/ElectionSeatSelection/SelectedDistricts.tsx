import { Button, Text } from '@pentabd/ui';
import { t } from 'i18next';
import { useContext } from 'react';
import { ElectionSettingContext } from '../../CreateElectionSettings';
import { SelectedConstituencies } from './SelectedConstituencies';
import { IconMinusSquare } from '@pentabd/icons';
export const SelectedDistricts = ({ constituencyDetails }: any) => {
  const { addElectionSetting, setAddElectionSettings } = useContext(
    ElectionSettingContext,
  )!;
  const handleRemove = () => {
    const newArray = addElectionSetting.filter(
      (item) => item.regionId !== constituencyDetails.regionId,
    );
    setAddElectionSettings(newArray);
  };
  return (
    <div>
      <div className="bg-extra-light py-6 px-12 d-flex justify-content-between align-items-center">
        <Text weight="semibold" size="md" color="title">
          {constituencyDetails?.regionName}
          {t('ELECTION_SETTINGS.REGION')}
        </Text>
        <Button type="info" size="sm" onClick={handleRemove}>
          <Text>{t('ELECTION_SETTINGS.REMOVE')}</Text>
          <Text>({constituencyDetails.constituencyDetails.length})</Text>
          <IconMinusSquare size="20" fill="danger" />
        </Button>
      </div>
      <SelectedConstituencies constituencyDetails={constituencyDetails} />
    </div>
  );
};
