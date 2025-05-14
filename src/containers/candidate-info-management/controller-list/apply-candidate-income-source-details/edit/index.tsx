import { Header } from '@pentabd/ui';

import EditIncomeSourceDetailsFirstPart from './first-part';
import { useTranslation } from 'react-i18next';
import { BothPartsForm } from './BothPartsForm';
import { useParams } from 'react-router-dom';
import { ELECTION_INFO } from '@constants/election-info';

const EditIncomeSourceDetails = ({
  onEdit,
}: {
  onEdit?: (data: number) => void;
}) => {
  const { t } = useTranslation();
  const { electionTypeId } = useParams();
  const renderComponent = () => {
    switch (Number(electionTypeId)) {
      case ELECTION_INFO.MUNICIPALITY.ID:
        return <BothPartsForm />;
      case ELECTION_INFO.UNION_PARISHAD.ID:
        return <BothPartsForm />;
      default:
        return <EditIncomeSourceDetailsFirstPart />;
    }
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10"
        headerText={{
          header: t('INCOME_SOURCE_DETAILS.HEADING'),
          subHeader: t('INCOME_SOURCE_DETAILS.SUBTITLE'),
        }}
      />

      {renderComponent()}
    </div>
  );
};

export default EditIncomeSourceDetails;
