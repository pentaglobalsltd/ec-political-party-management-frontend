import { TFunction } from 'i18next';
import { IconHomeLine, IconPencil02, IconTrash01 } from '@pentabd/icons';

import { ROUTES } from '@constants/routes';
import { dynamicColumnForElectionConstituency } from '@containers/candidate-info-management/helper/dynamicColumnForElectionConstituency';

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
];

export const nominationOfCandidatesCompleteTableColumns = ({
  t,
  editHandler,
  params,
  isDownload = false,
}: {
  t: TFunction<'translation', undefined>;
  editHandler: (raw: any) => void;
  params?: any;
  isDownload?: boolean;
}) => [
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

  ...dynamicColumnForElectionConstituency({ params, t }),

  {
    id: 12,
    name: t('NOMINATION_OF_CANDIDATES.POST_NAME'),
    key: 'candidateType',
  },
  {
    id: 4,
    name: t('NOMINATION_OF_CANDIDATES.DISTRICT'),
    key: 'electionZilla',
  },

  ...(!isDownload
    ? [
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
      ]
    : []),
];

export const nominationOfCandidatesIncompleteTableColumns = ({
  t,
  editHandler,
  deleteHandler,
  params,
  isDownload = false,
}: {
  t: TFunction<'translation', undefined>;
  editHandler: (raw: any) => void;
  deleteHandler: (raw: any) => void;
  params?: any;
  isDownload?: boolean;
}) => [
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
  ...dynamicColumnForElectionConstituency({ params, t }),

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

  ...(!isDownload
    ? [
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
      ]
    : []),
];

export const ID_TYPE = {
  NID: 'nid',
  VOTER_NO: 'voterNo',
};

export const nidOptions = [
  { label: 'NID No.', value: 'nid' },
  { label: 'Voter No.', value: 'voterNo' },
];
export const allSelectedData = {
  region: false,
  zilla: false,
  constituency: false,
  upazila: false,
  rmo: false,
  municipalities: false,
  unionWard: false,
  upWard: false,
  voterArea: false,

  upWardOptions: false,
  voterAreaOptions: false,
  unionWardOptions: false,
  municipalitiesOptions: false,
  rmoOptions: false,
  upazilaOptions: false,
  constituencyOption: false,
  zillaOption: false,
  regionOption: false,
};

export const optionVoterArea = {
  voterArea: true,
};

export const optionUpWard = {
  upWard: true,
};

export const optionUnionWard = {
  ...optionVoterArea,
  ...optionUpWard,
  unionWard: true,
  upWardOptions: true,
  voterAreaOptions: true,
};

export const optionMunicipalities = {
  ...optionUnionWard,
  municipalities: true,
  unionWardOptions: true,
};

export const optionRmo = {
  ...optionMunicipalities,
  rmo: true,
  municipalitiesOptions: true,
};

export const optionUpazilla = {
  ...optionRmo,
  upazila: true,
  rmoOptions: true,
};

export const optionConstituency = {
  ...optionUpazilla,
  constituency: true,
  upazilaOptions: true,
};

export const optionZilla = {
  ...optionConstituency,
  zilla: true,
  constituencyOption: true,
};

export const optionRegion = {
  ...optionZilla,
  region: false,
  regionOption: false,
  zillaOption: false,
};
