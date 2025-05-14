import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Header, Tab } from '@pentabd/ui';

import AffidavitStepOne from './components/StepOneAffidavit';
import MovablePropertyStepTwo from './components/StepTwoMovableProperty';
import ImmovablePropertyStepThree from './components/StepThreeImmovableProperty';
import LiabilitiesStepFour from './components/StepFourLiabilities';

function EditAffidavit({ onEdit }: { onEdit?: (data: number) => void }) {
  const { t } = useTranslation();
  const divRef = useRef<HTMLDivElement>(null);

  const [currentTab, setCurrentTab] = useState(0);
  const handleActiveTab = (tabIndex: any) => setCurrentTab(tabIndex);

  useEffect(() => {
    divRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  });

  return (
    <div className="container-96 mb-24 py-8" ref={divRef}>
      <Header
        headerText={{
          header: t('AFFIDAVIT_STEP_ONE.CANDIDATE_AFFIDAVIT'),
          subHeader: '',
        }}
      />
      {/* <div className="py-9 my-9 bg-primary-50"> */}
      <div className="py-9 my-9 ">
        <Tab
          active={currentTab}
          setActiveTab={handleActiveTab}
          className="d-grid grid-cols-1 grid-cols-lg-4 gap-6 justify-content-center"
        >
          <Tab.Heads>
            <Tab.Item index={0} label={t('AFFIDAVIT_STEP_ONE.AFFIDAVIT')} />
            <Tab.Item
              index={1}
              label={t('AFFIDAVIT_STEP_ONE.UNCOUNTABLE_PROPERTY')}
            />
            <Tab.Item
              index={2}
              label={t('AFFIDAVIT_STEP_ONE.COUNTABLE_PROPERTY')}
            />
            <Tab.Item
              index={3}
              label={t('AFFIDAVIT_STEP_ONE.RESPONSIBILITY')}
            />
          </Tab.Heads>
          <Tab.ContentWrapper>
            <Tab.Content index={0}>
              <AffidavitStepOne handleCurrent={handleActiveTab} />
            </Tab.Content>
            <Tab.Content index={1}>
              <MovablePropertyStepTwo handleCurrent={handleActiveTab} />
            </Tab.Content>
            <Tab.Content index={2}>
              <ImmovablePropertyStepThree handleCurrent={handleActiveTab} />
            </Tab.Content>
            <Tab.Content index={3}>
              <LiabilitiesStepFour onEdit={onEdit} />
            </Tab.Content>
          </Tab.ContentWrapper>
        </Tab>
      </div>
    </div>
  );
}

export default EditAffidavit;
