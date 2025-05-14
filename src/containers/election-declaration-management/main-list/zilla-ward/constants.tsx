import { TFunction } from 'i18next';
import { IconHomeLine, IconPencil02, IconSearch } from '@pentabd/icons';
import { DownloadButtons, InputText } from '@pentabd/ui';
import { NavigateOptions, To } from 'react-router-dom';
import { ROUTES } from '@constants/routes';

export const zillaWardBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('ZILLA_WARD.MAIN_LIST'),
  },

  {
    label: t('ZILLA_WARD.ZILLA_WARD'),
  },
];

export const zillaWardTableHeader = {
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
  rightComponents: [<DownloadButtons key={1} fileName={'test'} />],
};

export const zillaWardTableColumns = ({
  t,
  isDownload,
  navigate,
}: {
  t: TFunction<'translation', undefined>;
  isDownload?: boolean;
  navigate: (to: To, options?: NavigateOptions) => void;
}) => [
  {
    id: 1,
    name: t('ZILLA_WARD.WARD_NAME_BN'),
    key: 'wardNameBn',
  },
  {
    id: 2,
    name: t('ZILLA_WARD.WARD_NAME_EN'),
    key: 'wardNameEn',
  },
  {
    id: 3,
    name: t('ZILLA_WARD.DISTRICT_NAME'),
    key: 'district',
  },
  {
    id: 4,
    name: t('ZILLA_WARD.GO_CODE'),
    key: 'goCode',
  },
  {
    id: 5,
    name: '',
    key: 'id',
    hide: isDownload,
    render: (id: any) => (
      <div
        className="pointer"
        onClick={() => navigate(ROUTES.EDIT_ZILLA_WARD(id))}
      >
        <IconPencil02 size="20" fill="primary" />
      </div>
    ),
  },
];

export const electionTransferTableRows = [
  {
    id: 1,
    wardNameBn: 'জাতীয় সংসদ নির্বাচন',
    wardNameEn: 'a',
    district: 'a',
    goCode: 'a',
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

export const addNewZillaWardBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('ZILLA_WARD.MAIN_LIST'),
  },

  {
    label: t('ZILLA_WARD.ZILLA_WARD'),
  },
  {
    label: t('ZILLA_WARD.ADD_ZILLA_WARD'),
  },
];

export const editZillaWardBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('ZILLA_WARD.MAIN_LIST'),
  },

  {
    label: t('ZILLA_WARD.ZILLA_WARD'),
  },
  {
    label: t('ZILLA_WARD.EDIT_ZILLA_WARD'),
  },
];
