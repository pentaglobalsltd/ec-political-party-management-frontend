import { TFunction } from 'i18next';

import {
  IconHomeLine,
  IconPencil02,
  IconSearch,
  IconTrash01,
} from '@pentabd/icons';
import { DownloadButtons, InputText } from '@pentabd/ui';

import { ROUTES } from '@constants/routes';

export const nominationOfCandidatesTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('NOMINATION_OF_CANDIDATES.NOMINATION_OF_CANDIDATES'),
    URL: ROUTES.NOMINATION_OF_CANDIDATES,
  },

  {
    label: t('NOMINATION_OF_CANDIDATES.ADD_NOMINATION_OF_CANDIDATES'),
    URL: ROUTES.NOMINATION_OF_CANDIDATES,
  },
];

export const nominationOfCandidatesTableHeader = {
  leftComponents: [
    <InputText
      key={1}
      name="pre-input"
      outline
      placeholder="Search"
      prefix={<IconSearch size="20" />}
      size="md"
      type="text"
      status="default"
    />,
  ],
  rightComponents: [<DownloadButtons key={2} fileName={'test'} />],
};

export const nominationOfCandidatesCompleteTableColumns = (
  t: TFunction<'translation', undefined>,
  editHandler: (raw: any) => void,
) => [
  {
    id: 1,
    name: t('NOMINATION_OF_CANDIDATES.CANDIDATE_NAME'),
    key: 'candidateName',
  },
  {
    id: 2,
    name: t('NOMINATION_OF_CANDIDATES.NID'),
    key: 'nid',
  },
  {
    id: 3,
    name: t('NOMINATION_OF_CANDIDATES.POST_NAME'),
    key: 'candidateType',
  },
  {
    id: 4,
    name: t('NOMINATION_OF_CANDIDATES.DISTRICT'),
    key: 'electionZilla',
  },
  {
    id: 5,
    name: t('NOMINATION_OF_CANDIDATES.ELECTION_SEAT'),
    key: 'constituency',
  },
  {
    id: 6,
    name: t('NOMINATION_OF_CANDIDATES.PROCESS'),
    key: 'actions',
    render: (data: any, raw: any) => (
      <div className="pointer" onClick={() => editHandler(raw)}>
        <IconPencil02 size="20" fill="primary" />
      </div>
    ),
  },
];

export const nominationOfCandidatesIncompleteTableColumns = (
  t: TFunction<'translation', undefined>,
  editHandler: (raw: any) => void,
  deleteHandler: (raw: any) => void,
) => [
  {
    id: 1,
    name: t('NOMINATION_OF_CANDIDATES.CANDIDATE_NAME'),
    key: 'candidateName',
  },
  {
    id: 2,
    name: t('NOMINATION_OF_CANDIDATES.NID'),
    key: 'nid',
  },
  {
    id: 3,
    name: t('NOMINATION_OF_CANDIDATES.POST_NAME'),
    key: 'candidateType',
  },
  {
    id: 4,
    name: t('NOMINATION_OF_CANDIDATES.DISTRICT'),
    key: 'electionZilla',
  },
  {
    id: 5,
    name: t('NOMINATION_OF_CANDIDATES.ELECTION_SEAT'),
    key: 'constituency',
  },
  {
    id: 6,
    name: t('NOMINATION_OF_CANDIDATES.PROCESS'),
    key: 'actions',
    render: (data: any, raw: any) => (
      <div className="d-flex gap-12">
        <div className="pointer" onClick={() => editHandler(raw)}>
          <IconPencil02 size="20" fill="primary" />
        </div>
        <div className="pointer" onClick={() => deleteHandler(raw)}>
          <IconTrash01 size="20" fill="danger" />
        </div>
      </div>
    ),
  },
];

export const inputs = {
  electionType: true,
  electionName: true,
  candidateType: true,
  district: true,
  constituency: true,
};

export const SETTINGS_LABEL = {
  CONSTITUENCY: 'CONSTITUENCY',
  MUNICIPALITY: 'MUNICIPALITY',
};
