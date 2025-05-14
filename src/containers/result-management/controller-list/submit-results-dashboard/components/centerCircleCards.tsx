import classNames from 'classnames';
import { CENTER_NUMBER_STATUS } from '../constants';
import { Text } from '@pentabd/ui';
import { getDigitBanglaFromEnglish } from '@utils';
import { mapCenterLabel } from '../helpers';

export const CenterCircleCards = ({ value, status }: any) => {
  return (
    <div className="col-span-3  border rounded shadow-xl ">
      <div>
        <div
          className={classNames('shape', {
            'shape-bg-blue': status === CENTER_NUMBER_STATUS.TOTAL.nameEn,
            'shape-bg-red': status === CENTER_NUMBER_STATUS.SUSPENDED.nameEn,
            'shape-bg-green': status === CENTER_NUMBER_STATUS.SUBMITTED.nameEn,
            'shape-bg-light':
              status === CENTER_NUMBER_STATUS.NOT_SUBMITTED.nameEn,
          })}
        >
          <div
            className={classNames('number', {
              'number-text-blue': status === CENTER_NUMBER_STATUS.TOTAL.nameEn,
              'number-text-red':
                status === CENTER_NUMBER_STATUS.SUSPENDED.nameEn,
              'number-text-green':
                status === CENTER_NUMBER_STATUS.SUBMITTED.nameEn,
              'number-text-white':
                status === CENTER_NUMBER_STATUS.NOT_SUBMITTED.nameEn,
            })}
          >
            <Text sizeType="display" size="md" weight="semibold">
              {getDigitBanglaFromEnglish(value)}
            </Text>
          </div>
        </div>
        <div className="d-flex justify-content-center py-10">
          <Text size="lg" weight="medium" color="subtitle2">
            {mapCenterLabel(status)}
          </Text>
        </div>
      </div>
    </div>
  );
};
