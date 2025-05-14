import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { IconDownloadCloud02, IconSearch } from '@pentabd/icons';
import { Button, DownloadButtons, Header, InputText, Table } from '@pentabd/ui';

import { SearchComponents } from '@components/application-search/SearchComponents';

import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { allSelectedData, searchStruct } from './searchConstants';
import {
  CWNSCReportTableBreadcrumbs,
  CWNSCReportTableColumns,
} from './constants';

import { useCWNSCReportPdfGenerator } from '@hooks/miscellaneous/reports/cwnsc-report-pdf-generator';
import { useCWNSCList } from '@hooks/candidate-info-management/report/useCWNSCList';
import { NominationListSearchProps } from '@type/candidate-info-management/nomination-list-type';
import { getParams } from '@utils';

function CWNSCReport() {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    CWNSCList,
    getCWNSCListData,
    adminActivePage,
    adminLoading,
    adminTotalPage,
  } = useCWNSCList();

  const {
    CWNSCList: downloadCWNSCList,
    getCWNSCListData: downloadGetCWNSCListData,
  } = useCWNSCList();

  const {
    generatePdf,
    currentPdfGeneratorData,
    setGenerateCWNSCReportPdfRequestData,
    generatePdfLoading,
  } = useCWNSCReportPdfGenerator();

  const onSubmitSearch = (data: NominationListSearchProps) => {
    data.bengaliAlphabetOrder = true;

    getCWNSCListData({
      searchItems: data,
    });

    setGenerateCWNSCReportPdfRequestData({
      electionScheduleId: data.electionScheduleId,
    });
  };

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      getCWNSCListData({
        searchItems: { ...params },
      });

      if (params.electionScheduleId) {
        setGenerateCWNSCReportPdfRequestData({
          electionScheduleId: Number(params.electionScheduleId),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownloadTable = () => {
    downloadGetCWNSCListData({
      searchItems: params,
      size: MAX_ROW_SIZE,
    });
  };

  const tableHeaderExt = {
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
        fileName="CWNSC-report"
        columns={CWNSCReportTableColumns(t)}
        rows={downloadCWNSCList || []}
        onClickDownload={handleDownloadTable}
        downloadLoading={false}
      />,
    ],
  };

  return (
    <div className="container-96 mb-24 mb-20">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('CWNSC_REPORT.CWNSC_REPORT_TITLE'),
        }}
        breadcrumbs={CWNSCReportTableBreadcrumbs(t)}
        actions={[
          <Button
            key={3}
            type="primary"
            htmlType="button"
            size="sm"
            onClick={() => generatePdf()}
            loading={generatePdfLoading}
            disabled={!currentPdfGeneratorData?.electionScheduleId}
          >
            <IconDownloadCloud02 fill="light" size="20" />{' '}
            {t('CWNSC_REPORT.CWNSC_REPORT_DOWNLOAD_BUTTON_TEXT')}
          </Button>,
        ]}
      />

      <SearchComponents
        struct={searchStruct}
        selectAny
        allSelectedData={allSelectedData}
        onSubmitHandler={onSubmitSearch}
        requiredField={[
          SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
          SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
        ]}
      />

      <Table
        headerExtension={tableHeaderExt}
        rows={CWNSCList || []}
        columns={CWNSCReportTableColumns(t)}
        pagination={{
          language: 'bn',
          totalPage: adminTotalPage,
          activePage: adminActivePage,
          onClick: (page: number) => {
            getCWNSCListData({
              page: page - 1,
              searchItems: { ...params },
            });

            setSearchParams({ ...params, page: (page - 1).toString() });
          },
        }}
        loading={adminLoading}
        loadingItemCount={10}
      />
    </div>
  );
}

export default CWNSCReport;
