import { useSearchParams } from 'react-router-dom';

import { BailForfeitedSearchPropsType } from '@type/candidate-info-management/report/get-bail-forfeited-list-types';
import { getParams } from '@utils';

interface Props {
  getBailForfeitedListData: ({
    page,
    size,
    electionScheduleId,
    candidateTypeId,
    zillaId,
    constituencyId,
  }: BailForfeitedSearchPropsType) => void;
  activePage: number;
  totalPage: number;
}

const TablePagination = ({
  getBailForfeitedListData,
  activePage,
  totalPage,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const onClickPagination = (page: number) => {
    getBailForfeitedListData({
      page: page - 1,
      electionScheduleId: Number(params?.electionScheduleId),
      candidateTypeId: Number(params?.candidateTypeId),
      zillaId: Number(params?.zillaId),
      constituencyId: Number(params?.constituencyId),
    });

    setSearchParams({ ...params, page: (page - 1).toString() });
  };

  return {
    language: 'bn' as const,
    totalPage,
    activePage,
    onClick: (page: number) => onClickPagination(page),
  };
};

export default TablePagination;
