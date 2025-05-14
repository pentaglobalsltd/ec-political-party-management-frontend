import { IconTrash01 } from '@pentabd/icons';
import { Text } from '@pentabd/ui';
import classNames from 'classnames';
import { useContext } from 'react';
import { ElectionSettingContext } from '../../CreateElectionSettings';
import {
  ElectionSettingsContextConstituencyDetailsTypeType,
  ElectionSettingsContextDataType,
} from '@type/election-declaration-management/election/election-settings';

export const SelectedConstituencies = ({ constituencyDetails }: any) => {
  const { setAddElectionSettings, addElectionSetting } = useContext(
    ElectionSettingContext,
  )!;
  const handleClicK = (constituencyId: number) => {
    let newArray = [...addElectionSetting];
    newArray.forEach((obj: ElectionSettingsContextDataType) => {
      if (obj.regionId === constituencyDetails.regionId) {
        obj.constituencyDetails = obj?.constituencyDetails?.filter(
          (obj: ElectionSettingsContextConstituencyDetailsTypeType) =>
            obj.constituencyId !== constituencyId,
        );
      }
    });
    newArray = newArray.filter(
      (obj) => obj?.constituencyDetails && obj?.constituencyDetails.length > 0,
    );

    setAddElectionSettings(newArray);
  };
  return (
    <div>
      {constituencyDetails.constituencyDetails.map(
        (item: any, index: any, arr: any) => {
          return (
            <div
              className={classNames(
                'd-flex justify-content-between py-8 align-items-center',
                { 'border-bottom': arr.length - 1 !== index },
              )}
              key={index}
            >
              <div>
                <Text size="lg" weight="medium">
                  {item.constituencyName}
                </Text>
                <br />
                <Text color="subtitle2" size="md" weight="normal">
                  {item.constituencyId} | {item.zillaName}
                </Text>
              </div>
              <div
                className="pointer"
                onClick={(e) => handleClicK(item.constituencyId)}
              >
                <IconTrash01 size="20" fill="fill-subtitle2" />
              </div>
            </div>
          );
        },
      )}
    </div>
  );
};
