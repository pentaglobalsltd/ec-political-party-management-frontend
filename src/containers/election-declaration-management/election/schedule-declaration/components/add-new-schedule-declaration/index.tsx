import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header, ProgressSteps } from '@pentabd/ui';
import ScheduleInfoForm from './components/ScheduleInfoForm';
import ElectionInformationForm from './components/ElectionInformationForm';
import NecessaryManpowerForm from './components/NecessaryManpowerForm';
import ByElectionForm from './components/ByElectionForm';
import { STEPS, STEP_NAME, getBreadcrumbs, initialStep } from './constants';

export interface PropsScheduleInfoForm {
  handleGoToNextForm?: () => void;
  handleGoToPreviousForm?: () => void;
}

const AddNewScheduleDeclaration = () => {
  const { t } = useTranslation();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    divRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  });

  const [progressStepsItems] = useState(initialStep(t));

  const [current, setCurrent] = useState(1);

  const [currentSelected, setCurrentSelected] = useState(STEPS[current - 1]);

  const handleGoToPreviousForm = () => {
    setCurrent((current) => {
      if (current > 0) {
        return current - 1;
      }
      return 0;
    });
  };

  const handleGoToNextForm = () => {
    setCurrent((current) => {
      if (current <= progressStepsItems.length) {
        return current + 1;
      }
      return 1;
    });
  };

  useEffect(() => {
    setCurrentSelected(STEPS[current - 1]);
  }, [current, progressStepsItems]);

  const FormStep = () => {
    switch (currentSelected?.STEP) {
      case STEP_NAME.FIRST_STEP:
        return <ScheduleInfoForm handleGoToNextForm={handleGoToNextForm} />;
      case STEP_NAME.SECOND_STEP:
        return (
          <ElectionInformationForm
            handleGoToNextForm={handleGoToNextForm}
            handleGoToPreviousForm={handleGoToPreviousForm}
          />
        );

      case STEP_NAME.THIRD_STEP:
        return (
          <NecessaryManpowerForm
            handleGoToNextForm={handleGoToNextForm}
            handleGoToPreviousForm={handleGoToPreviousForm}
          />
        );

      case STEP_NAME.FOURTH_STEP:
        return (
          <ByElectionForm handleGoToPreviousForm={handleGoToPreviousForm} />
        );
    }
  };

  return (
    <div className="container-96 mb-24" ref={divRef}>
      <Header breadcrumbs={getBreadcrumbs(t)} className="py-10" />

      <div className="py-9 my-9 bg-primary-50">
        <ProgressSteps
          mode="hr"
          current={current}
          className="w-100"
          size="sm"
          items={progressStepsItems}
          onClick={() => {}}
        />
      </div>

      <div>{FormStep()}</div>
    </div>
  );
};

export default AddNewScheduleDeclaration;
