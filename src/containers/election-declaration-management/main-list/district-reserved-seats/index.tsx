import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { IconPlus } from '@pentabd/icons';
import { Button, Header, Table } from '@pentabd/ui';

import { ROUTES } from '@constants/routes';
import {
  districtReservedSeatsTableBreadcrumbs,
  districtReservedSeatsTableColumns,
  districtReservedSeatsTableHeader,
  districtReservedSeatsTableRows,
} from './constants';

import MainListSearch from '@components/application-search/MainListSearch';

function DistrictReservedSeats() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('DISTRICT_RESERVED_SEATS.DISTRICT_RESERVED_SEAT_LIST'),
        }}
        breadcrumbs={districtReservedSeatsTableBreadcrumbs(t)}
        actions={[
          <Button
            key={2}
            type="primary"
            htmlType="button"
            size="sm"
            onClick={() => navigate(ROUTES.CREATE_DISTRICT_RESERVED_SEATS)}
          >
            <IconPlus size="20" fill="light" />{' '}
            {t('DISTRICT_RESERVED_SEATS.ADD_NEW_DISTRICT_RESERVED_SEAT')}
          </Button>,
        ]}
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
        headerExtension={districtReservedSeatsTableHeader}
        rows={districtReservedSeatsTableRows}
        columns={districtReservedSeatsTableColumns({ t, navigate })}
        pagination={{ language: 'bn', totalPage: 1 }}
      />
    </div>
  );
}

export default DistrictReservedSeats;
