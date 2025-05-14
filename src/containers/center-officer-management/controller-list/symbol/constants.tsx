import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';

import ImageViewer from '@components/ImageViewer';
import {
  ADVANCE_SEARCH,
  APPLICATION_SEARCH,
} from '@components/application-search/SearchComponents';
import { API_SERVICE } from '@components/application-search/constants';
import Actions from './components/Actions';

export const symbolBreadcrumbs = (t: TFunction<'translation', undefined>) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('SYMBOL.SYMBOL_LIST'),
  },
];

export const symbolTableColumns = ({
  t,
  isDownload = false,
}: {
  t: TFunction<'translation', undefined>;
  isDownload?: boolean;
}) => {
  return [
    {
      id: 1,
      name: t('SYMBOL.SYMBOL'),
      key: 'symbol',
    },
    ...(isDownload
      ? []
      : [
          {
            id: 2,
            name: t('SYMBOL.IMAGE'),
            key: 'picture',
            render: (data: any) => {
              return <ImageViewer imagePath={data} usePublicPath={true} />;
            },
          },
          {
            id: 3,
            name: t('SYMBOL.OPERATIONS'),
            key: 'electionType',
            className: 'justify-content-end',
            render: (data: any, row: any) => <Actions row={row} />,
          },
        ]),
  ];
};

export const symbolTableElectionAndCandidateTypeColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: '',
    key: 'serial',
  },
  {
    id: 2,
    name: t('SYMBOL.ELECTION_TYPE'),
    key: 'electionTypeName',
  },
  {
    id: 3,
    name: t('SYMBOL.CANDIDATE_TYPE'),
    key: 'candidateTypeName',
  },
];

export const addSymbolBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('SYMBOL.SYMBOL_LIST'),
  },
  {
    label: t('SYMBOL.ADD_SYMBOL'),
  },
];

export const editSymbolBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('SYMBOL.SYMBOL_LIST'),
  },
  {
    label: t('SYMBOL.CHANGE_SYMBOL'),
  },
];

export const allSelectedData = {
  electionType: false,
  electionTypeOptions: false,
  candidateType: false,
  candidateTypeOptions: false,
};

const clearElectionSchedule = {
  candidateType: true,
};
export const inputs = [
  {
    fieldName: ADVANCE_SEARCH.ELECTION_TYPE,
    apiService: API_SERVICE.MASTER,
    refreshData: { ...clearElectionSchedule },
    nonRefreshData: {
      electionType: false,
      electionTypeOptions: false,
      candidateTypeOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.CANDIDATE_TYPE,
    pathParamsDependency: {
      'election-types': APPLICATION_SEARCH.ELECTION_TYPE,
    },
    nonRefreshData: {
      candidateType: false,
    },
  },
];
