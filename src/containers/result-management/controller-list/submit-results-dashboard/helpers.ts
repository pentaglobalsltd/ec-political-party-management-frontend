import { ELECTION_INFO } from '@constants/election-info';
import { CENTER_NUMBER_STATUS } from './constants';
import { SelectOptionArray } from '@type/selection-option-type';

export const mapCenterLabel = (item: any) => {
  switch (item) {
    case CENTER_NUMBER_STATUS.TOTAL.nameEn:
      return CENTER_NUMBER_STATUS.TOTAL.nameBn;

    case CENTER_NUMBER_STATUS.SUBMITTED.nameEn:
      return CENTER_NUMBER_STATUS.SUBMITTED.nameBn;

    case CENTER_NUMBER_STATUS.SUSPENDED.nameEn:
      return CENTER_NUMBER_STATUS.SUSPENDED.nameBn;
    case CENTER_NUMBER_STATUS.NOT_SUBMITTED.nameEn:
      return CENTER_NUMBER_STATUS.NOT_SUBMITTED.nameBn;
    default:
      return CENTER_NUMBER_STATUS.TOTAL.nameBn;
  }
};

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
