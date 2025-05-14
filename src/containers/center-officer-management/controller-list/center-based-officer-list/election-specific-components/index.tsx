import { ELECTION_INFO } from '@constants/election-info';
import { DefaultElection } from './default';
import { UpazilaElection } from './upazila';
import { useFormContext } from 'react-hook-form';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { CENTER_STATUS_CREATED } from '@components/application-search/constants';
import { useContext, useEffect } from 'react';
import { ContextDataType, PollingPersonnelLetterContext } from '..';

const ElectionSpecificComponents = ({
  setChildFilters,
}: {
  setChildFilters: (data: any) => void;
}) => {
  const { watch, setValue, clearErrors } = useFormContext();
  const { pollingPersonnelLetterContext, setPollingPersonnelLetterContext } =
    useContext(PollingPersonnelLetterContext)!;

  const trainingTimeWatch = watch(APPLICATION_SEARCH.TRAINING_DATE_AND_TIME);
  const trainingPlaceWatch = watch(APPLICATION_SEARCH.TRAINING_PLACE);
  const goodsReceiptDateTimeWatch = watch(
    APPLICATION_SEARCH.GOODS_RECEIVED_DATE_AND_TIME,
  );
  const nameWatch = watch(APPLICATION_SEARCH.NAME);
  const designationWatch = watch(APPLICATION_SEARCH.DESIGNATION);
  const trainingRoomWatch = watch(APPLICATION_SEARCH.TRAINING_ROOM);
  const goodsDistributionDateTimeWatch = watch(
    APPLICATION_SEARCH.GOODS_DISTRIBUTION_DATE_AND_TIME,
  );
  const electionTypeId = pollingPersonnelLetterContext?.electionTypeId;

  const renderComponents = () => {
    switch (electionTypeId) {
      case ELECTION_INFO.UPAZILLA.ID:
        return <UpazilaElection />;
      case ELECTION_INFO.MUNICIPALITY.ID:
        return <UpazilaElection />;
      default:
        return <DefaultElection />;
    }
  };

  useEffect(() => {
    setChildFilters({
      trainingPlace: trainingPlaceWatch,
      trainingDateTime: trainingTimeWatch,
      goodsReceiptDateTime: goodsReceiptDateTimeWatch,
      name: nameWatch,
      designation: designationWatch,
      trainingRoom: trainingRoomWatch,
      goodsDistributionDateTime: goodsDistributionDateTimeWatch,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    trainingTimeWatch,
    trainingPlaceWatch,
    goodsReceiptDateTimeWatch,
    nameWatch,
    designationWatch,
    trainingRoomWatch,
    goodsDistributionDateTimeWatch,
  ]);
  useEffect(() => {
    setValue(APPLICATION_SEARCH.TRAINING_PLACE, '');
    setValue(APPLICATION_SEARCH.TRAINING_ROOM, '');
    setValue(APPLICATION_SEARCH.NAME, '');
    setValue(APPLICATION_SEARCH.DESIGNATION, '');
    setPollingPersonnelLetterContext((prev: ContextDataType) => ({
      ...prev,
      dateResetValue: true,
    }));
    clearErrors();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pollingPersonnelLetterContext?.electionTypeId,
    pollingPersonnelLetterContext.statusId,
  ]);

  return (
    <div className="bg-light p-10 box-ex rounded-5">
      {pollingPersonnelLetterContext.statusId === CENTER_STATUS_CREATED
        ? renderComponents()
        : null}
    </div>
  );
};

export default ElectionSpecificComponents;
