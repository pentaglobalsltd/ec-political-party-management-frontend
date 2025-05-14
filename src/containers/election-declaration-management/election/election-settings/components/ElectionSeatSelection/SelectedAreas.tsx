import { Text } from '@pentabd/ui';
import { areObjectsEqual } from '@utils/objectOperation';
import { IconCheck } from '@pentabd/icons';

const Area = ({ area, selected, handleClick }: any) => {
  return (
    <div className="w-100">
      {area.children ? (
        <div className="px-8 pt-8 border-start w-100">
          <div className="d-flex align-items-center flex-wrap justify-content-between">
            <Text size="md" color="subtitle1">
              {area?.nameBn}
            </Text>
          </div>
          {area?.children?.map((item: any, index: number) => (
            <Area
              key={index}
              area={item}
              selected={selected}
              handleClick={handleClick}
            />
          ))}
        </div>
      ) : selected?.filter((item: any) => areObjectsEqual(item, area))
          ?.length ? (
        <div
          onClick={() => !area.settingsId && handleClick(area)}
          className="px-8 pt-8 pointer"
        >
          <Text size="lg" color="info" className="px-8 pt-8 border-start">
            {area?.nameBn}
          </Text>
        </div>
      ) : (
        <div
          onClick={() => !area.settingsId && handleClick(area)}
          className="px-8 pt-8 pointer d-flex align-items-center gap-5"
        >
          <Text
            color={area.settingsId ? 'success' : 'subtitle3'}
            size={area.settingsId ? 'md' : 'sm'}
            weight={area.settingsId ? 'bolder' : 'light'}
            className="px-8 pt-8 border-start"
          >
            {area.nameBn}
          </Text>
          {area.settingsId && <IconCheck size={24} fill="success" />}
        </div>
      )}
    </div>
  );
};

export const SelectedAreas = ({
  selected,
  regionConstituencies,
  handleClick,
}: any) => {
  return (
    <div className="rounded-4 col-span-lg-3">
      {regionConstituencies?.map((item: any, index: number) => (
        <Area
          key={index}
          area={item}
          selected={selected}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};
