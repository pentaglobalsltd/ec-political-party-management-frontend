import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import { IconPlus } from '@pentabd/icons';
import { Button, DownloadButtons, Header, Table } from '@pentabd/ui';
import { ROUTES } from '@constants/routes';

import {
  nominationLetterTableColumns,
  nominationLetterTableHeader,
  nominationLetterTableBreadcrumbs,
  searchStruct,
} from './constants';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { useGetNominationLetterList } from '@hooks/election-schedule-management/election/nomination-letter/useGetNominationLetterList';
import { getParams } from '@utils';
import { SearchComponents } from '@components/application-search/SearchComponents';

function NominationLetter() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    activePage,
    totalPage,
    loading,
    nominationLetterList,
    getNominationLetterList,
  } = useGetNominationLetterList();

  const onSubmitSearch = (data: any) => {
    getNominationLetterList({
      electionTypeId: data?.electionTypeId,
      candidateTypeId: data?.candidateTypeId,
    });
  };

  useEffect(() => {
    if (params?.electionTypeId && params?.candidateTypeId) {
      getNominationLetterList({
        electionTypeId: params?.electionTypeId,
        candidateTypeId: params?.candidateTypeId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{ header: t('NOMINATION_LETTER.NOMINATION_LETTER') }}
        breadcrumbs={nominationLetterTableBreadcrumbs(t)}
        actions={[
          <Button
            key={1}
            type="primary"
            htmlType="button"
            size="sm"
            onClick={() => navigate(ROUTES.CREATE_NOMINATION_LETTER)}
          >
            <IconPlus size="20" fill="light" />
            {t('NOMINATION_LETTER.ADD_NEW')}
          </Button>,
        ]}
      />

      <SearchComponents
        totalCol="grid-cols-lg-9"
        colSpan="col-span-4"
        struct={searchStruct}
        onSubmitHandler={onSubmitSearch}
        requiredField={[
          SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
          SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
        ]}
      />
      <Table
        headerExtension={{
          ...nominationLetterTableHeader,
          rightComponents: [
            <DownloadButtons
              key={1}
              fileName={'nomination letter'}
              columns={nominationLetterTableColumns({ t, navigate })}
              rows={nominationLetterList || []}
            />,
          ],
        }}
        rows={nominationLetterList}
        columns={nominationLetterTableColumns({ t, navigate })}
        loading={loading}
        pagination={{
          language: 'bn',
          totalPage: totalPage,
          activePage: activePage,

          onClick: (page) => {
            if (params?.electionTypeId) {
              getNominationLetterList({
                electionTypeId: params?.electionTypeId,
                candidateTypeId: params?.candidateTypeId,
                page: page - 1,
              });
            }
          },
        }}
      />
    </div>
  );
}

export default NominationLetter;
