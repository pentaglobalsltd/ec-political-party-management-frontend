import { useContext } from 'react';
import { IconMinusSquare, IconPlus } from '@pentabd/icons';
import { Button, Text } from '@pentabd/ui';
import { ElectionSettingContext } from '../../CreateElectionSettings';
import {
  ElectionSettingsContextConstituencyDetailsTypeType,
  ElectionSettingsContextDataType,
  LocationWiseConstituenciesListType,
} from '@type/election-declaration-management/election/election-settings';

interface ConstituenciesItemProps {
  constituency: LocationWiseConstituenciesListType;
  region: {
    label: string;
    value: number;
  };
  zillaId?: number;
  zillaName?: string;
}

const ConstituenciesItem = ({
  constituency,
  region,
  zillaId,
  zillaName,
}: ConstituenciesItemProps) => {
  const { setAddElectionSettings, addElectionSetting } = useContext(
    ElectionSettingContext,
  )!;

  const alreadySelected = addElectionSetting.some(
    (obj: ElectionSettingsContextDataType) => {
      return obj?.constituencyDetails?.some(
        (subObj: ElectionSettingsContextConstituencyDetailsTypeType) =>
          subObj.constituencyId === constituency.constituencyId,
      );
    },
  );
  const alreadyCreated = constituency?.settingsId ? true : false;

  const newData = {
    zillaId,
    zillaName,
    constituencyId: constituency.constituencyId,
    constituencyName: constituency.constituencyName,
  };

  const handleClick = () => {
    let newArray = [...addElectionSetting];
    if (!alreadySelected) {
      let idExists = false;

      newArray.forEach((obj: ElectionSettingsContextDataType) => {
        if (obj.regionId === region.value) {
          idExists = true;
          obj?.constituencyDetails?.push(newData);
        }
      });

      if (!idExists) {
        newArray.push({
          regionId: region.value,
          regionName: region.label,
          constituencyDetails: [newData],
        });
      }
    }
    if (alreadySelected) {
      newArray.forEach((obj) => {
        if (obj.regionId === region.value) {
          obj.constituencyDetails = obj?.constituencyDetails?.filter(
            (obj: ElectionSettingsContextConstituencyDetailsTypeType) =>
              obj.constituencyId !== constituency.constituencyId,
          );
        }
      });

      newArray = newArray.filter(
        (obj) =>
          obj?.constituencyDetails && obj?.constituencyDetails.length > 0,
      );
    }
    setAddElectionSettings(newArray);
  };

  return (
    <div onClick={(e) => !constituency?.settingsId && handleClick()}>
      {alreadySelected || alreadyCreated ? (
        <Button type="info" size="sm" disabled={alreadyCreated}>
          <Text>{constituency.constituencyName}</Text>
          <IconMinusSquare size="20" fill="danger" />
        </Button>
      ) : (
        <Button type="default" size="sm">
          <Text>{constituency.constituencyName}</Text>
          <IconPlus size="20" fill="info" />
        </Button>
      )}
    </div>
  );
};

export default ConstituenciesItem;
