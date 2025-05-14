import classNames from 'classnames';

import { Text } from '@pentabd/ui';
import { getDigitBanglaFromEnglish } from '@utils';
import {
  mapCenterCircleCardNumber,
  mapCenterCircleCardShape,
} from '../helpers';

export const CenterCircleCards = ({
  value,
  status,
  label,
}: {
  value?: number;
  status?: string;
  label?: string;
}) => {
  return (
    <div className="col-span-2 border rounded shadow-xl ">
      <div>
        <div
          className={classNames('shape', mapCenterCircleCardShape({ status }))}
        >
          <div
            className={classNames(
              'number',
              mapCenterCircleCardNumber({ status }),
            )}
          >
            <Text sizeType="display" size="md" weight="semibold">
              {getDigitBanglaFromEnglish(value)}
            </Text>
          </div>
        </div>
        <div className="d-flex justify-content-center py-10">
          <Text size="lg" weight="medium" color="subtitle2" className="px-10">
            {label}
          </Text>
        </div>
      </div>
    </div>
  );
};
