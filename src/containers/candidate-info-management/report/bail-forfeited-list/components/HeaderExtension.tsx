import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { DownloadButtons } from '@pentabd/ui';

import { useBailForfeitedList } from '@hooks/candidate-info-management/report/useBailForfeitedList';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { BailForfeitedListTableColumns } from '../constants';
import { getParams } from '@utils';

const HeaderExtension = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    getBailForfeitedListData: downloadGetBailForfeitedListData,
    bailForfeitedList: downloadBailForfeitedList,
    isLoading: downloadIsLoading,
  } = useBailForfeitedList();

  const handleDownloadCandidateList = () => {
    if (Object.keys(params).length > 0) {
      downloadGetBailForfeitedListData({
        electionScheduleId: Number(params?.electionScheduleId),
        size: MAX_ROW_SIZE,
        candidateTypeId: Number(params?.candidateTypeId),
        zillaId: Number(params?.zillaId),
        constituencyId: Number(params?.constituencyId),
      });
    }
  };

  return {
    rightComponents: [
      <DownloadButtons
        key={1}
        fileName="bail-forfeited-list"
        columns={BailForfeitedListTableColumns({
          t,
          electionTypeId: params?.electionTypeId,
          candidateTypeId: params?.candidateTypeId,
        })}
        rows={downloadBailForfeitedList}
        onClickDownload={handleDownloadCandidateList}
        downloadLoading={downloadIsLoading}
      />,
    ],
  };
};

export default HeaderExtension;
