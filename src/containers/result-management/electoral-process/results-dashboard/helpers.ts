import { ELECTION_INFO } from '@constants/election-info';
import { SelectOptionArray } from '@type/selection-option-type';
import { CENTER_NUMBER_STATUS } from './constants';

export const mapDashboardSettingsSubTitle = (
  electionTypeId: number | string,
  electionSettings?: SelectOptionArray[],
) => {
  switch (Number(electionTypeId)) {
    case ELECTION_INFO.CITY_CORPORATION.ID:
      return electionSettings?.map((obj) => obj?.label).join(',');
    case ELECTION_INFO.UPAZILLA.ID:
      return electionSettings?.[0]?.label;
    case ELECTION_INFO.NATIONAL.ID:
      return electionSettings?.[0]?.label;
    default:
      return electionSettings?.map((obj) => obj?.label).join(',');
  }
};

export const mapCenterCircleCardShape = ({ status }: { status?: string }) => {
  switch (status) {
    case CENTER_NUMBER_STATUS.SUSPENDED:
      return 'shape-bg-red';
    case CENTER_NUMBER_STATUS.IN_PROCESS:
      return 'shape-bg-yellow';
    case CENTER_NUMBER_STATUS.RESULT_PUBLISHED:
      return 'shape-bg-green';
    case CENTER_NUMBER_STATUS.RESULT_RETURN:
      return 'shape-bg-light';
    case CENTER_NUMBER_STATUS.TOTAL:
      return 'shape-bg-blue';
    default:
      return 'shape-bg-blue';
  }
};

export const mapCenterCircleCardNumber = ({ status }: { status?: string }) => {
  switch (status) {
    case CENTER_NUMBER_STATUS.SUSPENDED:
      return 'number-text-red';
    case CENTER_NUMBER_STATUS.IN_PROCESS:
      return 'number-text-yellow';
    case CENTER_NUMBER_STATUS.RESULT_PUBLISHED:
      return 'number-text-green';
    case CENTER_NUMBER_STATUS.RESULT_RETURN:
      return 'number-text-white';
    case CENTER_NUMBER_STATUS.TOTAL:
      return 'number-text-blue';
    default:
      return 'number-text-white';
  }
};
