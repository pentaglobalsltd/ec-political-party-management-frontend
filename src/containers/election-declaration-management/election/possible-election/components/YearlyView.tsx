import { useState } from 'react';
import CalenderItem from '@components/CalenderItem';
import { Modal, Text } from '@pentabd/ui';
import CalenderModalView from './calender-modal-view';
import { YearlyEventsType } from '@hooks/election-schedule-management/election/possible-election/useGetElectionCalenderEventsYearlyView';
import { IconArrowLeft, IconArrowRight } from '@pentabd/icons';

function YearlyView({
  events,
  setSearchParams,
  params,
}: {
  events?: YearlyEventsType;
  setSearchParams: any;
  params: any;
}) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>();

  const handleOnClick = (item: any) => {
    setOpenModal(true);
    setModalData(item);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between py-10">
        <div
          className="px-10 pointer"
          onClick={() =>
            setSearchParams({
              ...params,
              year: (Number(params?.year) - 1).toString(),
            })
          }
        >
          <IconArrowLeft size="20" />
        </div>
        <Text size="md" weight="bolder">
          {params?.year}
        </Text>
        <div
          className="px-10 pointer"
          onClick={() =>
            setSearchParams({
              ...params,
              year: (Number(params?.year) + 1).toString(),
            })
          }
        >
          <IconArrowRight size="20" />
        </div>
      </div>
      <div className="d-grid grid-cols-1 grid-cols-md-3 grid-cols-lg-6">
        <CalenderItem
          name="January"
          items={events?.[params?.year]?.january || []}
          handleOnClick={handleOnClick}
        />
        <CalenderItem
          name="Fabruary"
          items={events?.[params?.year]?.february || []}
          handleOnClick={handleOnClick}
        />
        <CalenderItem
          name="March"
          items={events?.[params?.year]?.march || []}
          handleOnClick={handleOnClick}
        />
        <CalenderItem
          name="April"
          items={events?.[params?.year]?.april || []}
          handleOnClick={handleOnClick}
        />
        <CalenderItem
          name="May"
          items={events?.[params?.year]?.may || []}
          handleOnClick={handleOnClick}
        />
        <CalenderItem
          name="June"
          items={events?.[params?.year]?.june || []}
          handleOnClick={handleOnClick}
        />
        <CalenderItem
          name="July"
          items={events?.[params?.year]?.july || []}
          handleOnClick={handleOnClick}
        />
        <CalenderItem
          name="August"
          items={events?.[params?.year]?.august || []}
          handleOnClick={handleOnClick}
        />
        <CalenderItem
          name="September"
          items={events?.[params?.year]?.september || []}
          handleOnClick={handleOnClick}
        />
        <CalenderItem
          name="October"
          items={events?.[params?.year]?.october || []}
          handleOnClick={handleOnClick}
        />
        <CalenderItem
          name="November"
          items={events?.[params?.year]?.november || []}
          handleOnClick={handleOnClick}
        />
        <CalenderItem
          name="December"
          items={events?.[params?.year]?.december || []}
          handleOnClick={handleOnClick}
        />
      </div>
      <Modal
        key={1}
        isOpen={openModal}
        closeAble
        overlay
        portal
        onClose={handleCloseModal}
      >
        <CalenderModalView
          data={modalData}
          handleCloseModal={handleCloseModal}
        />
      </Modal>
    </div>
  );
}

export default YearlyView;
