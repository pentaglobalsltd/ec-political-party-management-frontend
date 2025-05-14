import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';
import { ELECTION_INFO } from '@constants/election-info';
import Attachment from '../components/Attachment';

import Proposer from '../../candidate-confirmation/components/view-candidate-confirmaion/nomination/proposer';
import Supporter from '../../candidate-confirmation/components/view-candidate-confirmaion/nomination/supporter';
import Candidate from '../../candidate-confirmation/components/view-candidate-confirmaion/nomination/candidate';

import Personal from '../../candidate-confirmation/components/view-candidate-confirmaion/personal-info';
import Affidavit from '../../candidate-confirmation/components/view-candidate-confirmaion/affidavit';
import ElectionExpenses from '../../candidate-confirmation/components/view-candidate-confirmaion/election-expenses';
import AssetIncomeDetails from '../../candidate-confirmation/components/view-candidate-confirmaion/asset-income-details';
import Collateral from '../../candidate-confirmation/components/view-candidate-confirmaion/collateral';
import { CANDIDATE_INFO } from '@constants/candidate-info';

export const getBreadcrumbs = (t: TFunction<'translation', undefined>) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CANDIDATE_MANAGEMENT.CANDIDATE_NOMINATION_DASHBOARD'),
  },
];

export const tabData = ({
  t,
  electionTypeId,
  candidateTypeId,
}: {
  t: TFunction<'translation', undefined>;
  electionTypeId?: string;
  candidateTypeId?: string;
}) => {
  const isNationalElection =
    Number(electionTypeId) === ELECTION_INFO.NATIONAL.ID;
  const isUpazilaElection =
    Number(electionTypeId) === ELECTION_INFO.UPAZILLA.ID;
  const isMunicipalityElection =
    Number(electionTypeId) === ELECTION_INFO.MUNICIPALITY.ID;
  const isUnionParishadElection =
    Number(electionTypeId) === ELECTION_INFO.UNION_PARISHAD.ID;

  const isMemberOrReservedMember = [
    CANDIDATE_INFO.UNION_PARISHAD_GENERAL_MEMBER.ID,
    CANDIDATE_INFO.UNION_PARISHAD_RESERVED_MEMBER.ID,
  ].includes(Number(candidateTypeId));

  const hideHalafnama = isUnionParishadElection && isMemberOrReservedMember;

  return [
    {
      label: t('CANDIDATE_MANAGEMENT.ATTACHMENT'),
      component: <Attachment />,
    },
    {
      label: t('CANDIDATE_MANAGEMENT.PROPOSER'),
      component: <Proposer />, // this component is from 'candidate-confirmation'
    },
    {
      label: t('CANDIDATE_MANAGEMENT.SUPPORTER'),
      component: <Supporter />, // this component is from 'candidate-confirmation'
    },
    {
      label: t('CANDIDATE_MANAGEMENT.NOMINATED_CANDIDATE'),
      component: <Candidate />, // this component is from 'candidate-confirmation'
    },

    { label: t('CANDIDATE_MANAGEMENT.PERSONAL'), component: <Personal /> },

    hideHalafnama
      ? {}
      : {
          label: t('CANDIDATE_MANAGEMENT.AFFIDAVIT'),
          component: <Affidavit />,
        },

    isNationalElection || isUpazilaElection || isMunicipalityElection
      ? {
          label: t('CANDIDATE_MANAGEMENT.ELECTION_EXPENSES'),
          component: <ElectionExpenses />,
        }
      : {},

    isNationalElection
      ? {
          label: t('CANDIDATE_MANAGEMENT.ASSET_INCOME_DETAILS'),
          component: <AssetIncomeDetails />,
        }
      : {},

    {
      label: t('CANDIDATE_MANAGEMENT.COLLATERAL'),
      component: <Collateral hideButton />,
    },
  ];
};
