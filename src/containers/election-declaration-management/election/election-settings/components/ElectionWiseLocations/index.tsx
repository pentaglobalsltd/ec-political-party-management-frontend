import { useContext, useEffect, useState } from 'react';
import { useRegionConstituencies } from '@hooks/miscellaneous/core-hook/election-wise-location/useRegionConstituencies';
import { useTranslation } from 'react-i18next';
import { getDigitBanglaFromEnglish } from '@utils';
import { Text } from '@pentabd/ui';
import { ElectionSettingContext } from '../../CreateElectionSettings';
import { SelectedAreas } from '../ElectionSeatSelection/SelectedAreas';
import { RecursiveComponent } from './recursiveComponent';

import { areObjectsEqual, getLeafNodes } from '@utils/objectOperation';

interface Props {
  electionTypeId?: string | number;
  candidateTypeId?: string | number;
  electionScheduleId: string | number;
}

function ElectionWiseLocations({
  electionTypeId,
  candidateTypeId,
  electionScheduleId,
}: Props) {
  const { t } = useTranslation();
  const { regionConstituencies, getRegionConstituenciesData, totalSettings } =
    useRegionConstituencies();
  const { setAddElectionSettings } = useContext(ElectionSettingContext)!;

  const [selected, setSelected] = useState<any>([]);

  const handleClick = (clickedItem: any) => {
    const itemIndex: number = selected.findIndex((item: any) =>
      areObjectsEqual(item, clickedItem),
    );

    if (itemIndex === -1) setSelected((prev: any) => [...prev, clickedItem]);
    // If present, remove it from the state
    else
      setSelected((prev: any) =>
        prev.filter((item: any, index: number) => index !== itemIndex),
      );
  };

  const bulkRemove = (itemIds: any) => {
    const currentSelected = selected.filter(
      (item: any) =>
        !Object.keys(itemIds).every((key: any) => item[key] === itemIds[key]),
    );
    setSelected([...currentSelected]);
  };

  const options = getLeafNodes(regionConstituencies);
  const bulkAdd = (itemIds: any) => {
    const candidateToBeSelected = options.filter((item: any) => {
      const filteredSelected = Object.keys(itemIds).reduce(
        (prev: any, curr: any) => prev && item[curr] === itemIds[curr],
        true,
      );

      return filteredSelected && !item.settingsId;
    });

    const filteredAllreadySelected = candidateToBeSelected.filter(
      (item: any) =>
        selected.findIndex((selectedItem: any) =>
          areObjectsEqual(item, selectedItem),
        ) < 0,
    );

    setSelected((prev: any) => [...prev, ...filteredAllreadySelected]);
  };

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

  useEffect(() => {
    setAddElectionSettings(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <>
      <div className="pb-6">
        <Text size="md" weight="semibold">
          {t('ELECTION_SETTINGS.TOTAL_SETTINGS')}{' '}
          {getDigitBanglaFromEnglish(totalSettings)}
        </Text>
      </div>
      <div className="mb-9 d-grid grid-cols-lg-5 grid-cols-1 gap-5 align-items-start">
        <div className="rounded-4 col-span-lg-3">
          {regionConstituencies?.map((item: any, index: number) => (
            <RecursiveComponent
              key={index}
              item={item}
              handleClick={handleClick}
              selected={[...selected]}
              bulkRemove={bulkRemove}
              bulkAdd={bulkAdd}
            />
          ))}
        </div>

        <div className="border rounded-4 col-span-lg-2 d-flex flex-column align-items-start">
          <div className="p-12 border-bottom w-100">
            <Text size="xl" weight="semibold">
              {t('ELECTION_SETTINGS.SELECTED_AREAS')}
            </Text>

            <div className="pt-6">
              <Text size="md" weight="semibold">
                {t('ELECTION_SETTINGS.SELECTED_SETTINGS')}{' '}
                {getDigitBanglaFromEnglish(
                  selected.length ? (selected.length as number) : 0,
                )}
              </Text>
            </div>
          </div>

          <div
            className="p-10 w-100 overflow-auto"
            style={{
              height: '675px',
            }}
          >
            <SelectedAreas
              handleClick={handleClick}
              selected={selected}
              regionConstituencies={regionConstituencies}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ElectionWiseLocations;
