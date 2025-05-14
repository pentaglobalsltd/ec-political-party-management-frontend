import Collateral from '@containers/candidate-info-management/controller-list/candidate-confirmation/components/view-candidate-confirmaion/collateral';

const EditCollateral = ({ onEdit }: { onEdit?: (data: number) => void }) => {
  return <Collateral hideButton editManualPayment onEdit={onEdit} />;
};

export default EditCollateral;
