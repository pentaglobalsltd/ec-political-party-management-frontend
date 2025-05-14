import { TFunction } from 'i18next';
import {
  IconDownloadCloud02,
  IconHomeLine,
  IconPencil02,
  IconSearch,
} from '@pentabd/icons';
import { Button, DownloadButtons, InputText } from '@pentabd/ui';
import { FORM_FIELDS } from '@constants/forms';
import { API_SERVICE } from '@components/application-search/constants';
import { ADVANCE_SEARCH } from '@components/application-search/SearchComponents';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { NavigateOptions, To } from 'react-router-dom';
import { ROUTES } from '@constants/routes';

const NOMINATION_LETTER =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.ELECTION.NOMINATION_LETTER;

export const nominationLetterTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('NOMINATION_LETTER.NOMINATION_LETTER'),
  },
];

export const nominationLetterTableHeader = {
  leftComponents: [
    <InputText
      key={1}
      name="pre-input"
      outline
      placeholder="Search"
      prefix={<IconSearch size="20" />}
      type="text"
      status="default"
    />,
  ],
  rightComponents: [<DownloadButtons key={1} fileName="test" />],
};

export const nominationLetterTableColumns = ({
  t,
  navigate,
}: {
  t: TFunction<'translation', undefined>;
  navigate: (to: To, options?: NavigateOptions) => void;
}) => [
  {
    id: 1,
    name: t('NOMINATION_LETTER.ELECTION_NAME'),
    key: `${NOMINATION_LETTER.ELECTION_TYPE}`,
  },
  {
    id: 2,
    name: t('NOMINATION_LETTER.CANDIDATE_TYPE'),
    key: `${NOMINATION_LETTER.CANDIDATE_TYPE}`,
  },
  {
    id: 3,
    name: t('NOMINATION_LETTER.LETTER'),
    key: `${NOMINATION_LETTER.NOMINATION_FILE}`,
    render: (data: string, row: any) => (
      <Button
        type="primary"
        onClick={() => console.log('do something', row?.id)}
      >
        <IconDownloadCloud02 fill="light" size="20" />
      </Button>
    ),
  },
  {
    id: 4,
    name: '',
    key: 'id',
    render: (id: any) => (
      <div
        className="pointer"
        onClick={() => navigate(ROUTES.EDIT_NOMINATION_LETTER(id))}
      >
        <IconPencil02 size="20" fill="primary" />
      </div>
    ),
  },
];

export const nominationLetterTableRows = [
  {
    id: 1,
    electionType: 'জাতীয় সংসদ নির্বাচন',
    candidateType: 'সংসদ সদস্য',
    letter: '',
  },
];

export const options = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
];

export const newNominationLetterBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('NOMINATION_LETTER.NOMINATION_LETTER'),
    link: '',
  },
  {
    label: t('NOMINATION_LETTER.ADD_NOMINATION_LETTER'),
  },
];

export const editNominationLetterBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('NOMINATION_LETTER.NOMINATION_LETTER'),
    link: '',
  },
  {
    label: t('NOMINATION_LETTER.EDIT_NOMINATION_LETTER'),
  },
];

export const allSelectedData = {
  electionTypeMaster: false,
  electionTypeMasterOptions: false,
  candidateType: false,
  candidateTypeOptions: false,
};

const clearElectionSchedule = {
  candidateType: true,
};
export const inputs = {
  electionTypeMaster: {
    refreshData: { ...clearElectionSchedule },
    nonRefreshData: {
      electionTypeMaster: false,
      electionTypeMasterOptions: false,
      candidateTypeOptions: false,
    },
  },
  candidateType: {
    nonRefreshData: {
      candidateType: false,
    },
  },
};
export const searchStruct = [
  { fieldName: ADVANCE_SEARCH.ELECTION_TYPE, apiService: API_SERVICE.MASTER },
  {
    fieldName: ADVANCE_SEARCH.CANDIDATE_TYPE,
    apiService: '',
    pathParamsDependency: {
      'election-types': APPLICATION_SEARCH.ELECTION_TYPE,
    },
  },
];
