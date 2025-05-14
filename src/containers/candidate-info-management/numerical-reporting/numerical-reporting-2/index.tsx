import { useTranslation } from 'react-i18next';

import {
  TableSecondary,
  TableRow,
  TableData,
  Select,
  InputText,
  Text,
  Button,
  Header,
} from '@pentabd/ui';
import { IconPlus, IconTrash01, IconCheckCircleBroken } from '@pentabd/icons';

import {
  numericalReporting2TableBreadcrumbs,
  numericalReporting2TableColumns,
  options,
} from './constants';
import { SearchComponents } from '@components/application-search/SearchComponents';
import { searchStruct, allSelectedData } from './searchConstants';

function NumericalReporting2() {
  const { t } = useTranslation();

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('NUMERICAL_REPORTING_2.PARTIES_FILED_NOMINATION'),
        }}
        breadcrumbs={numericalReporting2TableBreadcrumbs(t)}
      />

      <SearchComponents
        struct={searchStruct}
        selectAny
        allSelectedData={allSelectedData}
        onSubmitHandler={() => {}}
      />
      <div>
        <TableSecondary
          border
          columns={numericalReporting2TableColumns(t)}
          headerExtension={{
            leftComponents: [
              <Text color="#F38744" size="md" weight="normal">
                {t('NUMERICAL_REPORTING_2.WRITE_ENGLISH')}
              </Text>,
            ],
            rightComponents: [
              <Button
                fill="outline"
                onClick={function noRefCheck() {}}
                size="md"
                type="light"
              >
                <IconPlus size="20" fill="dark" />{' '}
                {t('NUMERICAL_REPORTING_2.ADD_NEW_LINE')}
              </Button>,
            ],
          }}
        >
          <TableRow>
            <TableData>
              <Select name="party" options={options} portal />
            </TableData>
            <TableData>
              <InputText name="appliedCandidate" />
            </TableData>
            <TableData>
              <InputText name="cancelesCandidate" />
            </TableData>
            <TableData>
              <InputText name="withdrawnCandidate" />
            </TableData>
            <TableData>
              <InputText name="finalCandidate" />
            </TableData>
            <TableData>
              <Button
                fill="fill"
                onClick={function noRefCheck() {}}
                size="md"
                type="danger"
              >
                <IconTrash01 size="20" fill="light" />
              </Button>
            </TableData>
          </TableRow>
        </TableSecondary>
        <div className="d-flex justify-content-end py-8">
          <Button fill="fill" type="primary" htmlType="button">
            {t('NUMERICAL_REPORTING_2.SUBMIT')}
            <IconCheckCircleBroken size="20" fill="light" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NumericalReporting2;
