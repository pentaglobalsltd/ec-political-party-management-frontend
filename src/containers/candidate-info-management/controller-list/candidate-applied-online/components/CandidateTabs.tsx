import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Header, Tab } from '@pentabd/ui';

import EditAttachFile from '../../apply-candidate-attach-file/edit-attach-file';
import EditNewNominationOfCandidate from '../../apply-candidate-nomination-form/edit-new-nomination-of-candidate';
import EditCandidatePersonalInformation from '../../apply-candidate-personal-information/edit-candidate-personal-info';
import EditAffidavit from '../../apply-cadidate-affidavit-form/edit-affidavit';
import EditIncomeSourceDetails from '../../apply-candidate-income-source-details/edit';
import EditAssetLiabilitiesForm from '../../apply-candidate-asset-liabilities-form/edit';
import EditCollateral from './edit-collateral-manual-payment';

import { ELECTION_INFO } from '@constants/election-info';
import { candidateAppliedUpdateBreadcrumbs } from '../constants';

const CandidateTabs = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const { electionTypeId } = useParams();

  const isNationalElection =
    Number(electionTypeId) === ELECTION_INFO.NATIONAL.ID;
  const isUpazilaElection =
    Number(electionTypeId) === ELECTION_INFO.UPAZILLA.ID;

  const tabData = [
    {
      label: t('CANDIDATE_CONFIRMATION.ATTACHMENT'),
      component: <EditAttachFile onEdit={setActiveTab} />,
    },
    {
      label: t('CANDIDATE_CONFIRMATION.NOMINATION'),
      component: <EditNewNominationOfCandidate onEdit={setActiveTab} />,
    },
    {
      label: t('CANDIDATE_CONFIRMATION.PERSONAL'),
      component: <EditCandidatePersonalInformation onEdit={setActiveTab} />,
    },
    {
      label: t('CANDIDATE_CONFIRMATION.AFFIDAVIT'),
      component: <EditAffidavit onEdit={setActiveTab} />,
    },

    isNationalElection || isUpazilaElection
      ? {
          label: t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES'),
          component: <EditIncomeSourceDetails onEdit={setActiveTab} />,
        }
      : {},

    isNationalElection
      ? {
          label: t('CANDIDATE_CONFIRMATION.ASSET_INCOME_DETAILS'),
          component: <EditAssetLiabilitiesForm />,
        }
      : {},

    {
      label: t('CANDIDATE_CONFIRMATION.COLLATERAL'),
      component: <EditCollateral onEdit={setActiveTab} />,
    },
  ];

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('CANDIDATE_APPLIED_ONLINE.CANDIDATE_APPLIED_ONLINE_UPDATE'),
        }}
        breadcrumbs={candidateAppliedUpdateBreadcrumbs(t)}
      />
      <Tab active={activeTab} setActiveTab={setActiveTab} compact>
        <Tab.Heads>
          {tabData.map(({ label }, i) => (
            <Tab.Item key={i} index={i} label={label} />
          ))}
        </Tab.Heads>
        <Tab.ContentWrapper>
          {tabData.map(({ component }, i) => (
            <Tab.Content key={i} index={i}>
              {component}
            </Tab.Content>
          ))}
        </Tab.ContentWrapper>
      </Tab>
    </div>
  );
};

export default CandidateTabs;
