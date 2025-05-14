import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header, Tab } from '@pentabd/ui';
import Attachments from './Attachments';
import Nomination from './nomination';
import Personal from './personal-info';
import Affidavit from './affidavit';
import ElectionExpenses from './election-expenses';
import AssetIncomeDetails from './asset-income-details';
import Collateral from './collateral';
import { ELECTION_INFO } from '@constants/election-info';
import { candidateConfirmationBreadcrumbs } from '../../constants';
import { CANDIDATE_INFO } from '@constants/candidate-info';

const ViewCandidateConfirmation = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const { electionTypeId, candidateTypeId } = useParams();

  const isNationalElection =
    Number(electionTypeId) === ELECTION_INFO.NATIONAL.ID;

  const isUnionParishadElection =
    Number(electionTypeId) === ELECTION_INFO.UNION_PARISHAD.ID;

  const isMemberOrReservedMember = [
    CANDIDATE_INFO.UNION_PARISHAD_GENERAL_MEMBER.ID,
    CANDIDATE_INFO.UNION_PARISHAD_RESERVED_MEMBER.ID,
  ].includes(Number(candidateTypeId));

  const hideHalafnama = isUnionParishadElection && isMemberOrReservedMember;
  const showElectionExpense = [
    ELECTION_INFO.NATIONAL.ID,
    ELECTION_INFO.UPAZILLA.ID,
    ELECTION_INFO.UNION_PARISHAD.ID,
  ].includes(Number(electionTypeId));

  const tabData = [
    {
      label: t('CANDIDATE_CONFIRMATION.ATTACHMENT'),
      component: <Attachments />,
    },
    {
      label: t('CANDIDATE_CONFIRMATION.NOMINATION'),
      component: <Nomination />,
    },
    { label: t('CANDIDATE_CONFIRMATION.PERSONAL'), component: <Personal /> },

    hideHalafnama
      ? {}
      : {
          label: t('CANDIDATE_CONFIRMATION.AFFIDAVIT'),
          component: <Affidavit />,
        },

    showElectionExpense
      ? {
          label: t('CANDIDATE_CONFIRMATION.ELECTION_EXPENSES'),
          component: <ElectionExpenses />,
        }
      : {},

    isNationalElection
      ? {
          label: t('CANDIDATE_CONFIRMATION.ASSET_INCOME_DETAILS'),
          component: <AssetIncomeDetails />,
        }
      : {},
    {
      label: t('CANDIDATE_MANAGEMENT.COLLATERAL'),
      component: <Collateral />,
    },
  ];

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('CANDIDATE_CONFIRMATION.CANDIDATE_CONFIRMATION'),
          subHeader: t(
            'CANDIDATE_CONFIRMATION.CANDIDATE_CONFIRMATION_SUBTITLE',
          ),
        }}
        breadcrumbs={candidateConfirmationBreadcrumbs(t)}
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
export default ViewCandidateConfirmation;
