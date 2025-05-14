import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IconPlus, IconSearch } from '@pentabd/icons';
import { Button, Header, Table, InputText, DownloadButtons } from '@pentabd/ui';

import { useGetPoliticalPartyList } from '@hooks/center-officer-management/controller-list/political-party/useGetPoliticalPartyList';

import { ROUTES } from '@constants/routes';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import {
  politicalPartyTableColumns,
  politicalPartyTableBreadcrumbs,
} from './constants';
import { getParams } from '@utils';

function PoliticalParty() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    politicalPartyList,
    getPoliticalPartyList,
    loading,
    activePage,
    totalPage,
  } = useGetPoliticalPartyList();

  // for download
  const {
    politicalPartyList: downloadPoliticalPartyList,
    getPoliticalPartyList: downloadGetPoliticalPartyList,
    loading: downloadLoading,
  } = useGetPoliticalPartyList();

  useEffect(() => {
    getPoliticalPartyList({ page: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // download function
  const onClickDownload = () => {
    downloadGetPoliticalPartyList({
      page: 0,
      size: MAX_ROW_SIZE,
    });
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{ header: t('POLITICAL_PARTY.POLITICAL_PARTY_LIST') }}
        breadcrumbs={politicalPartyTableBreadcrumbs(t)}
        actions={[
          <Button
            key={1}
            type="primary"
            htmlType="button"
            size="sm"
            onClick={() => navigate(ROUTES.CREATE_POLITICAL_PARTY)}
          >
            <IconPlus size="20" fill="light" /> {t('POLITICAL_PARTY.ADD_NEW')}
          </Button>,
        ]}
      />

      <Table
        headerExtension={{
          leftComponents: [
            <InputText
              key={2}
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
              key={3}
              fileName={'political-party-list'}
              columns={politicalPartyTableColumns({
                t,
                isDownload: true,
                navigate,
              })}
              rows={downloadPoliticalPartyList}
              onClickDownload={onClickDownload}
              downloadLoading={downloadLoading}
            />,
          ],
        }}
        rows={politicalPartyList}
        columns={politicalPartyTableColumns({ t, navigate })}
        pagination={{
          language: 'bn',
          totalPage: totalPage,
          activePage: activePage,
          onClick: (page: number) => {
            getPoliticalPartyList({ page: page - 1 });
            setSearchParams({ ...params, page: (page - 1).toString() });
          },
        }}
        loading={loading}
        loadingItemCount={10}
      />
    </div>
  );
}

export default PoliticalParty;
