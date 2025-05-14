import { useContext, useEffect } from 'react';
import RegionItem from './RegionItem';
import { useRegions } from '@hooks/election-schedule-management/main-list/region/useRegions';
import { SelectedAreas } from './SelectedAreas';
import { useRegionConstituencies } from '@hooks/miscellaneous/core-hook/election-wise-location/useRegionConstituencies';
import { useTranslation } from 'react-i18next';
import { getDigitBanglaFromEnglish } from '@utils';
import { Button, Text } from '@pentabd/ui';
import { ElectionSettingContext } from '../../CreateElectionSettings';
import {
  ElectionSettingsContextDataType,
  LocationWiseConstituenciesRegionsType,
  LocationWiseConstituenciesZillasType,
} from '@type/election-declaration-management/election/election-settings';

interface Props {
  electionTypeId?: string | number;
  candidateTypeId?: string | number;
  electionScheduleId: string | number;
}
function ElectionSeatSelection({
  electionTypeId,
  candidateTypeId,
  electionScheduleId,
}: Props) {
  const { t } = useTranslation();
  const { regions } = useRegions();
  const {
    regionConstituencies,
    getRegionConstituenciesData,
    totalSettings,
    selectedSettings,
  } = useRegionConstituencies();
  const { setAddElectionSettings } = useContext(ElectionSettingContext)!;

  useEffect(() => {
    if (electionTypeId && candidateTypeId && electionScheduleId) {
      getRegionConstituenciesData({
        electionTypeId: electionTypeId,
        candidateTypeId: candidateTypeId,
        electionScheduleId: electionScheduleId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionTypeId, candidateTypeId, electionScheduleId]);

  function findObjectByKeyValue(region: any) {
    return regionConstituencies?.find(
      (obj: { regionId: number }) => obj.regionId === region,
    );
  }

  const handleAddAll = () => {
    const mapData: any = regionConstituencies
      .filter(
        (region: LocationWiseConstituenciesRegionsType) =>
          region?.zillaList && region?.zillaList?.length > 0,
      )
      .map((region: LocationWiseConstituenciesRegionsType) => ({
        regionId: region.regionId,
        nameEn: region.nameEn,
        nameBn: region.nameBn,
        constituencyDetails: region?.zillaList?.flatMap(
          (zilla: LocationWiseConstituenciesZillasType) =>
            zilla?.constituencyList
              ?.filter((item) => item.settingsId === null)
              .map((constituency) => ({
                zillaId: zilla.zillaId,
                zillaName: zilla.zillaName,
                constituencyName: constituency.constituencyName,
                constituencyId: constituency.constituencyId,
              })),
        ),
      }));
    const removeEmptyList = mapData.filter(
      (region: ElectionSettingsContextDataType) =>
        region?.constituencyDetails && region?.constituencyDetails?.length > 0,
    );
    setAddElectionSettings(removeEmptyList);
  };

  const handleRemoveAll = () => {
    setAddElectionSettings([]);
  };

  return (
    <>
      <div className="pb-6">
        <Text size="md" weight="semibold">
          {t('ELECTION_SETTINGS.TOTAL_SETTINGS')}{' '}
          {getDigitBanglaFromEnglish(totalSettings)}
        </Text>
        <div className="d-flex gap-6 pt-6">
          <Button
            size="sm"
            fill="outline"
            type="primary"
            onClick={() => handleAddAll()}
          >
            <Text>{t('ELECTION_SETTINGS.ADD_ALL')}</Text>
          </Button>
          <Button
            type="danger"
            size="sm"
            fill="outline"
            onClick={() => handleRemoveAll()}
          >
            <Text>{t('ELECTION_SETTINGS.REMOVE_ALL')}</Text>
          </Button>
        </div>
      </div>
      <div className="mb-9 d-grid grid-cols-lg-4 grid-cols-1 gap-5 align-items-start">
        <div className="border rounded-4 col-span-lg-3">
          {regions?.map((item: any, index) => {
            return (
              <RegionItem
                key={index}
                region={item}
                regionConstituencies={findObjectByKeyValue(item.value)}
              />
            );
          })}
        </div>
        <div className="border rounded-4 col-span-lg-1 d-flex align-items-start">
          <SelectedAreas selectedSettings={selectedSettings} />
        </div>
      </div>
    </>
  );
}

export default ElectionSeatSelection;
