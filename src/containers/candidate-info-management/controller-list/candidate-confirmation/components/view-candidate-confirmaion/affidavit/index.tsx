import Liability from './Liability';
import AffidavitFirst from './AffidaitFirst';
import MovableProperty from './MovableProperty';
import ImmovableProperty from './ImmvableProperty';

const Affidavit = () => {
  return (
    <div>
      <AffidavitFirst />
      <MovableProperty />
      <ImmovableProperty />
      <Liability />
    </div>
  );
};
export default Affidavit;
