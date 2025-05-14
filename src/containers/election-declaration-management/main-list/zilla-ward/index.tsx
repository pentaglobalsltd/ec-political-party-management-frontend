import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button, Header, Table, Text } from '@pentabd/ui';
import { IconPlus } from '@pentabd/icons';

import { ROUTES } from '@constants/routes';

import {
  zillaWardBreadcrumbs,
  zillaWardTableColumns,
  zillaWardTableHeader,
  electionTransferTableRows,
} from './constants';
import MainListSearch from '@components/application-search/MainListSearch';

const ZillaWard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="container-96 mb-24">
      <Header
        headerText={{ header: t('ZILLA_WARD.TITLE_LIST_OF_ZILLA_WARD') }}
        breadcrumbs={zillaWardBreadcrumbs(t)}
        actions={[
          <Link to={ROUTES.CREATE_ZILLA_WARD}>
            <Button type="primary" htmlType="button" size="sm">
              <IconPlus size="20" fill="light" />
              <Text weight="semibold" size="sm">
                {t('ZILLA_WARD.ADD_NEW_ZILLA_WARD')}
              </Text>
            </Button>
          </Link>,
        ]}
        className="mb-10 pt-10"
      />

      <MainListSearch
        totalCol="grid-cols-lg-9"
        colSpan="col-span-4"
        inputs={{
          region: true,
          district: true,
        }}
        onSubmitHandler={() => {}}
      />

      <Table
        headerExtension={zillaWardTableHeader}
        rows={electionTransferTableRows}
        columns={zillaWardTableColumns({ t, navigate })}
        pagination={{
          language: 'bn',
          totalPage: 10,
          onClick: (page: number) => {
            console.log(page);
          },
        }}
      />
    </div>
  );
};

export default ZillaWard;
