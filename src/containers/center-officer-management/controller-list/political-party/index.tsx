import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Header, Table, DownloadButtons } from '@pentabd/ui';

import { useGetPoliticalPartyList } from '@hooks/center-officer-management/controller-list/political-party/useGetPoliticalPartyList';

import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { politicalPartyTableColumns } from './constants';
import { getParams } from '@utils';
import SearchInput from '@components/SearchInput';

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

  // useEffect(() => {
  //   getPoliticalPartyList({ page: 0 });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleTableSearch = (searchItems: any) => {
    console.log('searchItems:', searchItems);
  };
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
      />

      <Table
        headerExtension={{
          leftComponents: [<SearchInput callback={handleTableSearch} />],
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
