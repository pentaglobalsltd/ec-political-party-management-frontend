import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { getParams } from '@utils';
import { ELECTION_INFO } from '@constants/election-info';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import { National } from './national';
import { Mayor } from './city-corporation/mayor';
import { Councilors } from './city-corporation/councilors';
import { Upazila } from './upazila';
import { ChairmanUnionParidshad } from './union-parishad-election/chairman';
import { MembersUnionParidshad } from './union-parishad-election/members';

export const ElecitonSpecificTab = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);
  const electionTypeId = Number(params?.electionTypeId);

  switch (electionTypeId) {
    //National Election
    case ELECTION_INFO.NATIONAL.ID:
      const nationalTabs = [
        {
          label: t('RESULT_AND_SITUATION_REVIEW.RESULT'),
          component: <National />,
        },
      ];
      return nationalTabs;

    // City Corporation Election
    case ELECTION_INFO.CITY_CORPORATION.ID:
      const cityCorporationTabs = [
        {
          label: t('RESULT_AND_SITUATION_REVIEW.RESULT_CITY_MAYOR'),
          component: <Mayor />,
        },
        {
          label: t('RESULT_AND_SITUATION_REVIEW.RESULT_CITY_COUNCILOR'),
          component: (
            <Councilors
              candidateTypeId={CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID}
            />
          ),
        },

        {
          label: t(
            'RESULT_AND_SITUATION_REVIEW.RESULT_CITY_RESERVED_COUNCILOR',
          ),
          component: (
            <Councilors
              candidateTypeId={
                CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID
              }
            />
          ),
        },
      ];
      return cityCorporationTabs;

    // Upazila Election
    case ELECTION_INFO.UPAZILLA.ID:
      const upazilaTabs = [
        {
          label: t('RESULT_AND_SITUATION_REVIEW.CHAIRMAN'),
          component: (
            <Upazila candidateTypeId={CANDIDATE_INFO.UPAZILLA_CHAIRMAN.ID} />
          ),
        },
        {
          label: t('RESULT_AND_SITUATION_REVIEW.RESULT_UPAZILA_VICE_CHAIRMAN'),
          component: (
            <Upazila
              candidateTypeId={CANDIDATE_INFO.UPAZILLA_VICE_CHAIRMAN.ID}
            />
          ),
        },

        {
          label: t(
            'RESULT_AND_SITUATION_REVIEW.RESULT_UPAZILA_WOMEN_VICE_CHAIRMAN',
          ),
          component: (
            <Upazila
              candidateTypeId={CANDIDATE_INFO.UPAZILLA_WOMEN_VICE_CHAIRMAN.ID}
            />
          ),
        },
      ];
      return upazilaTabs;
    case ELECTION_INFO.UNION_PARISHAD.ID:
      return [
        {
          label: t('RESULT_AND_SITUATION_REVIEW.CHAIRMAN'),
          component: (
            <ChairmanUnionParidshad
              candidateTypeId={CANDIDATE_INFO.UNION_PARISHAD_CHAIRMAN.ID}
            />
          ),
        },
        {
          label: t('RESULT_AND_SITUATION_REVIEW.GENERAL_MEMBER'),
          component: (
            <MembersUnionParidshad
              candidateTypeId={CANDIDATE_INFO.UNION_PARISHAD_GENERAL_MEMBER.ID}
            />
          ),
        },
        {
          label: t('RESULT_AND_SITUATION_REVIEW.RESERVED_MEMBER'),
          component: (
            <MembersUnionParidshad
              candidateTypeId={CANDIDATE_INFO.UNION_PARISHAD_RESERVED_MEMBER.ID}
            />
          ),
        },
      ];
      break;
    default:
      return [];
  }
};
