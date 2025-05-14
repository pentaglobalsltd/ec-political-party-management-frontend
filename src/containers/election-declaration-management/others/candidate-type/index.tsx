import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { DownloadButtons, Header, InputText, Table } from '@pentabd/ui';

import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import {
  candidateTypeTableColumns,
  candidateTypeTableBreadcrumbs,
} from './constants';
import { useGetCandidateTypeList } from '@hooks/election-schedule-management/other/candidate-type/useGetCandidateTypeList';
import { IconSearch } from '@pentabd/icons';

function CandidateType() {
  const { t } = useTranslation();
  const {
    candidateTypes,
    loading,
    getCandidateTypeList,
    activePage,
    totalPage,
  } = useGetCandidateTypeList();

  // for download
  const {
    candidateTypes: downloadCandidateTypes,
    loading: downloadLoading,
    getCandidateTypeList: downloadGetCandidateTypeList,
  } = useGetCandidateTypeList();

  useEffect(() => {
    getCandidateTypeList({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickDownload = () => {
    downloadGetCandidateTypeList({
      size: MAX_ROW_SIZE,
    });
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{ header: t('CANDIDATE_TYPE.CANDIDATE_TYPE') }}
        breadcrumbs={candidateTypeTableBreadcrumbs(t)}
      />

      <Table
        headerExtension={{
          leftComponents: [
            <InputText
              key={1}
              name="pre-input"
              outline
              placeholder="Search"
              prefix={<IconSearch size="20" />}
              size="md"
              type="text"
              status="default"
            />,
          ],
          rightComponents: [
            <DownloadButtons
              key={2}
              fileName="candidate-type-list"
              columns={candidateTypeTableColumns(t)}
              rows={downloadCandidateTypes}
              onClickDownload={onClickDownload}
              downloadLoading={downloadLoading}
            />,
          ],
        }}
        rows={candidateTypes}
        columns={candidateTypeTableColumns(t)}
        loading={loading}
        pagination={{
          language: 'bn',
          totalPage: totalPage,
          activePage: activePage,
          onClick: (page) => {
            getCandidateTypeList({
              page: page - 1,
            });
          },
        }}
      />
    </div>
  );
}

export default CandidateType;
