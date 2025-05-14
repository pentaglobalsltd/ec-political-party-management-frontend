import { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text } from '@pentabd/ui';
import classNames from 'classnames';

import {
  IconChevronDown,
  IconChevronUp,
  IconMinusSquare,
} from '@pentabd/icons';
import { ElectionSettingContext } from '../../CreateElectionSettings';
import DistrictItem from './DistrictItem';
import {
  ElectionSettingsContextConstituencyDetailsTypeType,
  ElectionSettingsContextDataType,
  LocationWiseConstituenciesListType,
  LocationWiseConstituenciesRegionsType,
  LocationWiseConstituenciesZillasType,
} from '@type/election-declaration-management/election/election-settings';
interface RegionItemProps {
  regionConstituencies?: LocationWiseConstituenciesRegionsType;
  region: {
    label: string;
    value: number;
  };
}
const RegionItem = ({ region, regionConstituencies }: RegionItemProps) => {
  const { t } = useTranslation();
  const { setAddElectionSettings, addElectionSetting } = useContext(
    ElectionSettingContext,
  )!;
  const [removeItem, setRemoveItem] = useState<boolean>();
  const [constituencyLength, setConstituencyDetailsLength] = useState<number>();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const selectedRegion = addElectionSetting.find(
      (item) => item.regionId === region.value,
    );

    if (selectedRegion) {
      const valueLength = selectedRegion.constituencyDetails?.length;
      setConstituencyDetailsLength(valueLength);
      setRemoveItem(true);
    } else {
      setRemoveItem(false);
    }
  }, [addElectionSetting, region.value]);

  const handleRemove = () => {
    const newArray = addElectionSetting.filter(
      (item) => item.regionId !== region.value,
    );

    setAddElectionSettings(newArray);
  };

  const handleSelect = () => {
    const transformedData: ElectionSettingsContextConstituencyDetailsTypeType[] =
      [];

    regionConstituencies?.zillaList?.forEach(
      (zilla: LocationWiseConstituenciesZillasType) => {
        zilla?.constituencyList?.forEach(
          (item: LocationWiseConstituenciesListType) => {
            const transformedObject = {
              constituencyId: item.constituencyId,
              constituencyName: item.constituencyName,
              zillaId: zilla.zillaId,
              zillaName: zilla.zillaName,
            };
            if (item.settingsId === null)
              transformedData.push(transformedObject);
          },
        );
      },
    );

    const existingRegionIndex = addElectionSetting.findIndex(
      (obj: ElectionSettingsContextDataType) => obj.regionId === region.value,
    );
    if (existingRegionIndex !== -1) {
      setAddElectionSettings((prevData) => {
        const newData = [...prevData];
        newData[existingRegionIndex].constituencyDetails = transformedData;
        return newData;
      });
    } else if (transformedData.length !== 0) {
      setAddElectionSettings((prevData) => [
        ...prevData,
        {
          regionId: region.value,
          regionName: region.label,
          constituencyDetails: transformedData,
        },
      ]);
    }
  };

  const handleClicK = () => {
    setOpen((item) => !item);
  };

  return (
    <div>
      <div
        className={classNames(
          'py-8 border-bottom d-flex justify-content-between px-16',
          { 'bg-extra-light': open },
        )}
      >
        <Text weight="semibold" size="md" sizeType="fs">
          {region?.label}
          {t('ELECTION_SETTINGS.REGION')}
        </Text>
        <div className="d-flex align-items-center gap-5">
          {removeItem ? (
            <Button type="info" size="sm" onClick={handleRemove}>
              <Text>{t('ELECTION_SETTINGS.REMOVE')}</Text>
              <Text>({constituencyLength})</Text>
              <IconMinusSquare size="20" fill="danger" />
            </Button>
          ) : null}
          <div onClick={(e) => handleClicK()} className="pointer">
            {open ? (
              <IconChevronUp size="20" fill="info" />
            ) : (
              <IconChevronDown size="20" fill="fill-subtitle2" />
            )}
          </div>
        </div>
      </div>
      {open &&
        Array.isArray(regionConstituencies?.zillaList) &&
        regionConstituencies?.zillaList?.length &&
        regionConstituencies?.zillaList?.length > 0 ? (
        <div className="px-16 py-12">
          <Button type="light" size="sm" fill="outline" onClick={handleSelect}>
            <Text>{t('ELECTION_SETTINGS.ADD_ALL')}</Text>
          </Button>
        </div>
      ) : null}
      {open
        ? regionConstituencies?.zillaList?.map(
          (item: LocationWiseConstituenciesZillasType, index: number) => (
            <DistrictItem district={item} key={index} region={region} />
          ),
        )
        : null}
    </div>
  );
};

export default RegionItem;
