import { useTranslation } from 'react-i18next';
import { Table, Text } from '@pentabd/ui';

import {
  centerResultModalTableColumns,
  centerResultModalTableRows,
} from './constants';

const CenterModal = () => {
  const { t } = useTranslation();

  return (
    <div className="p-12 d-grid grid-cols-lg-4">
      <div className="col-span-lg-4">
        <Text weight="semibold" size="md">
          {t('RESULT_AND_SITUATION_REVIEW.CENTER_MODAL_TITLE')}
        </Text>

        <div className="mt-16">
          <Table
            columns={centerResultModalTableColumns(t)}
            rows={centerResultModalTableRows}
          />
        </div>
      </div>
    </div>
  );
};

export default CenterModal;
