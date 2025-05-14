import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Header, Tab } from '@pentabd/ui';

import NominationDownload from './NominationDownload';
import { getBreadcrumbs, tabData } from './constants';

const ViewCandidateManagement = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const { electionTypeId, candidateTypeId } = useParams();

  const tabs = tabData({ t, electionTypeId, candidateTypeId });

  return (
    <div className="container-96 mb-24">
      <div className="my-5">
        <Header
          className="mb-10 pt-10"
          headerText={{
            header: t('CANDIDATE_MANAGEMENT.CANDIDATE_NOMINATION_DASHBOARD'),
          }}
          breadcrumbs={getBreadcrumbs(t)}
          actions={[<NominationDownload />]}
        />
      </div>

      <Tab active={activeTab} setActiveTab={setActiveTab} compact>
        <Tab.Heads>
          {tabs.map(({ label }, i) => (
            <Tab.Item key={i} index={i} label={label} />
          ))}
        </Tab.Heads>

        <Tab.ContentWrapper>
          {tabs.map(({ component }, i) => (
            <Tab.Content key={i} index={i}>
              {component}
            </Tab.Content>
          ))}
        </Tab.ContentWrapper>
      </Tab>
    </div>
  );
};

export default ViewCandidateManagement;
