import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header, Tab } from '@pentabd/ui';

import FirstPart from './components/first-part';
import SecondPart from './components/second-part';
import ThirdPart from './components/third-part';
import FourthPart from './components/fourthPart';

function EditNewNominationOfCandidate({
  onEdit,
}: {
  onEdit?: (data: number) => void;
}) {
  const { t } = useTranslation();
  const divRef = useRef<HTMLDivElement>(null);

  const [currentTab, setCurrentTab] = useState(0);
  const handleActiveTab = (tabIndex: any) => setCurrentTab(tabIndex);

  const [tabItems, setTabItems] = useState([
    <Tab.Item
      key={0}
      index={0}
      label={t('FIRST_PART.PROGRESS_STEPS_FIRST_PART')}
    />,
    <Tab.Item
      key={1}
      index={1}
      label={t('FIRST_PART.PROGRESS_STEPS_SECOND_PART')}
    />,
    <Tab.Item
      key={2}
      index={2}
      label={t('FIRST_PART.PROGRESS_STEPS_THIRD_PART')}
    />,
  ]);

  useEffect(() => {
    divRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  });

  const addFourthPart = () => {
    if (tabItems.length === 3) {
      setTabItems((prev) => {
        if (prev?.length === 3) {
          return [
            ...prev,
            <Tab.Item
              key={3}
              index={3}
              label={t('FIRST_PART.PROGRESS_STEPS_FOURTH_PART')}
            />,
          ];
        }
        return prev;
      });
    }
  };

  const subtractFourthPart = () => {
    if (tabItems.length === 4) {
      setTabItems((current) =>
        current.filter(
          (item) =>
            item?.props?.label !== t('FIRST_PART.PROGRESS_STEPS_FOURTH_PART'),
        ),
      );
    }
  };

  return (
    <div className="container-96 mb-24" ref={divRef}>
      <Header
        headerText={{
          header: t('FIRST_PART.HEADER'),
          subHeader: t('FIRST_PART.SUBHEADER'),
        }}
      />
      <div className="py-9 my-9">
        <Tab
          active={currentTab}
          setActiveTab={handleActiveTab}
          className={`d-grid grid-cols-1 grid-cols-lg-${tabItems?.length} gap-6 justify-content-center`}
        >
          <Tab.Heads>{tabItems.map((item) => item)}</Tab.Heads>
          <Tab.ContentWrapper>
            <Tab.Content index={0}>
              <FirstPart handleCurrent={handleActiveTab} />
            </Tab.Content>
            <Tab.Content index={1}>
              <SecondPart handleCurrent={handleActiveTab} />
            </Tab.Content>
            <Tab.Content index={2}>
              <ThirdPart
                handleCurrent={handleActiveTab}
                addFourthPart={addFourthPart}
                subtractFourthPart={subtractFourthPart}
                onEdit={onEdit}
              />
            </Tab.Content>
            <Tab.Content index={3}>
              {tabItems.length === 4 ? <FourthPart onEdit={onEdit} /> : <></>}
            </Tab.Content>
          </Tab.ContentWrapper>
        </Tab>
      </div>
    </div>
  );
}

export default EditNewNominationOfCandidate;
