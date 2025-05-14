import { useState } from 'react';
import { ProgressSteps } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import { progressStepsItems } from './constants';
import EditIncomeSourceDetailsFirstPart from './first-part';
import { EditIncomeSourceDetailsSecondPartForm } from './second-part';

export const BothPartsForm = () => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(1);

  const handleOnClick = (id: number) => {
    if (id === 0) {
      setCurrent(id + 1);
    }
    if (id === 1) {
      setCurrent(id + 1);
    }
  };

  function renderComponent() {
    switch (current) {
      case 2:
        return <EditIncomeSourceDetailsSecondPartForm />;
      default:
        return <EditIncomeSourceDetailsFirstPart setCurrent={setCurrent} />;
    }
  }

  return (
    <div>
      <div className="py-9 my-9 bg-primary-50 rounded-4">
        <ProgressSteps
          mode="hr"
          current={current}
          className="w-100"
          size="sm"
          items={progressStepsItems(t)}
          onClick={(id) => handleOnClick(id)}
        />
      </div>
      {renderComponent()}
    </div>
  );
};
