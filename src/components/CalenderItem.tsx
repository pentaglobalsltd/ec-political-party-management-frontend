import { ELECTION_INFO } from '@constants/election-info';
import { Text } from '@pentabd/ui';

const getColorByElectionType = (electionId:number)=>{
  switch (electionId) {
    case ELECTION_INFO.NATIONAL.ID:
      return 'info';

    case ELECTION_INFO.UPAZILLA.ID:
      return 'danger';

    case ELECTION_INFO.UNION_PARISHAD.ID:
      return 'secondary';

    case ELECTION_INFO.CITY_CORPORATION.ID:
      return 'primary';

    case ELECTION_INFO.MUNICIPALITY.ID:
      return 'purple';

    case ELECTION_INFO.PRESIDENT.ID:
      return 'success';

    case ELECTION_INFO.BY.ID:
      return 'warning';

    case ELECTION_INFO.NATIONAL_RESERVE_SEAT.ID:
      return 'info';

    case ELECTION_INFO.ZILLA_PARISHAD.ID:
      return 'purple';

    default:
      break;
  }
}

function CalenderItem({
  name,
  items,
  handleOnClick,
}: {
  name: string;
  items: { date: number | string; title: string ,type:number}[];
  handleOnClick: (item: any)=>void
}) {
  return (
    <div className='calender-card border border-light'>
      <div className="m-2 d-flex justify-content-center bg-primary-lighter">
        <Text>{name}</Text>
      </div>
      <div className='m-2 d-flex flex-column  align-items-left gap-4'>
      {items.map((item, index) => (
        <div className="d-flex flex-row gap-3 pointer" key={index} onClick={()=>handleOnClick(item)}>
          <div className="d-flex justify-content-center align-items-center border border-primary px-4">
            <Text>{item.date}</Text>
          </div>
          <div className={`bg-${getColorByElectionType(item?.type)} w-100 ps-2`}>
            <Text color="white">{item.title}</Text>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default CalenderItem;
