import { Text } from '@pentabd/ui';
import ButtonState from './ConstituenciesItem';
import { LocationWiseConstituenciesZillasType } from '@type/election-declaration-management/election/election-settings';

interface DistrictItemProps {
  district: LocationWiseConstituenciesZillasType;
  region: {
    label: string;
    value: number;
  };
}

const DistrictItem = ({ district, region }: DistrictItemProps) => {
  return (
    <div className="bg-extra-light px-16 border-bottom py-12">
      <Text weight="medium" size="sm">
        {district?.zillaName}
      </Text>

      <div className="d-flex gap-10 flex-wrap pt-4">
        {district?.constituencyList?.map((item: any, index: number) => (
          <ButtonState
            constituency={item}
            key={index}
            region={region}
            zillaId={district?.zillaId}
            zillaName={district?.zillaName}
          />
        ))}
      </div>
    </div>
  );
};

export default DistrictItem;
