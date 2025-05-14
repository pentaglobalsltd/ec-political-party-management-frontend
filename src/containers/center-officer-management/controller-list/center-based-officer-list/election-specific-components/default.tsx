import { useTranslation } from 'react-i18next';

import Date from '@components/inputs/Date';
import Input from '@components/inputs/Input';
import { FORM_FIELDS } from '@constants/forms';
import { IconCalendar } from '@pentabd/icons';
import { useContext } from 'react';
import { PollingPersonnelLetterContext } from '..';

const POLLING_PERSONNEL_LETTER_SEARCH =
  FORM_FIELDS.POLLING_PERSONNEL_LETTER_SEARCH;

export const DefaultElection = () => {
  const { t } = useTranslation();
  const { setPollingPersonnelLetterContext, pollingPersonnelLetterContext } =
    useContext(PollingPersonnelLetterContext)!;

  return (
    <div className="d-grid grid-cols-1 grid-cols-lg-12 gap-6 align-items-end ">
      <div className="col-span-1 col-span-lg-3">
        <Date
          name={POLLING_PERSONNEL_LETTER_SEARCH.TRAINING_DATE_AND_TIME}
          title={t('SEARCH.TRAINING_DATE_AND_TIME')}
          placeholder={t('PLACEHOLDER.SELECT')}
          registerName={POLLING_PERSONNEL_LETTER_SEARCH.TRAINING_DATE_AND_TIME}
          prefix={<IconCalendar size="20" fill="subtitle2" />}
          isTimePicker
          required
          isResetValue={pollingPersonnelLetterContext?.dateResetValue}
          handleResetValue={() =>
            setPollingPersonnelLetterContext((prev: any) => ({
              ...prev,
              dateResetValue: false,
            }))
          }
        />
      </div>
      <div className="col-span-1 col-span-lg-3">
        <Input
          registerName={POLLING_PERSONNEL_LETTER_SEARCH.NAME}
          title={t('SEARCH.NAME')}
          required
        />
      </div>
      <div className="col-span-1 col-span-lg-3">
        <Input
          registerName={POLLING_PERSONNEL_LETTER_SEARCH.DESIGNATION}
          title={t('SEARCH.DESIGNATION')}
          required
        />
      </div>
      <div className="col-span-1 col-span-lg-3">
        <Input
          registerName={POLLING_PERSONNEL_LETTER_SEARCH.TRAINING_PLACE}
          title={t('SEARCH.TRAINING_PLACE')}
          required
        />
      </div>
      <div className="col-span-1 col-span-lg-3">
        <Input
          registerName={POLLING_PERSONNEL_LETTER_SEARCH.TRAINING_ROOM}
          title={t('SEARCH.TRAINING_ROOM')}
          required
        />
      </div>
      <div className="col-span-1 col-span-lg-3">
        <Date
          isResetValue={pollingPersonnelLetterContext?.dateResetValue}
          handleResetValue={() =>
            setPollingPersonnelLetterContext((prev: any) => ({
              ...prev,
              dateResetValue: false,
            }))
          }
          name={POLLING_PERSONNEL_LETTER_SEARCH.GOODS_RECEIVED_DATE_AND_TIME}
          title={t('SEARCH.GOODS_RECEIVED_DATE_AND_TIME')}
          placeholder={t('PLACEHOLDER.SELECT')}
          registerName={
            POLLING_PERSONNEL_LETTER_SEARCH.GOODS_RECEIVED_DATE_AND_TIME
          }
          prefix={<IconCalendar size="20" fill="subtitle2" />}
          isTimePicker
          required
        />
      </div>
      <div className="col-span-1 col-span-lg-3">
        <Date
          name={
            POLLING_PERSONNEL_LETTER_SEARCH.GOODS_DISTRIBUTION_DATE_AND_TIME
          }
          title={t('SEARCH.GOODS_DISTRIBUTION_DATE_AND_TIME')}
          placeholder={t('PLACEHOLDER.SELECT')}
          registerName={
            POLLING_PERSONNEL_LETTER_SEARCH.GOODS_DISTRIBUTION_DATE_AND_TIME
          }
          prefix={<IconCalendar size="20" fill="subtitle2" />}
          isTimePicker
          required
          isResetValue={pollingPersonnelLetterContext?.dateResetValue}
          handleResetValue={() =>
            setPollingPersonnelLetterContext((prev: any) => ({
              ...prev,
              dateResetValue: false,
            }))
          }
        />
      </div>
    </div>
  );
};
