import { IconHomeLine, IconPencil02 } from '@pentabd/icons';
import { TFunction } from 'i18next';

import { FORM_FIELDS } from '@constants/forms';
import { LANGUAGE } from '@hooks/miscellaneous/custom-hook/useLanguage';
import { ROUTES } from '@constants/routes';
import { NavigateOptions, To } from 'react-router-dom';

const UNION =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.UNION.CREATE_UNION;

export const unionTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('UNION.MAIN_LIST'),
  },
  {
    label: t('UNION.UNION'),
  },
];

export const newUnionBreadcrumbs = (t: TFunction<'translation', undefined>) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('UNION.MAIN_LIST'),
  },
  {
    label: t('UNION.UNION'),
  },
  {
    label: t('UNION.ADD_NEW'),
  },
];

export const editUnionBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('UNION.MAIN_LIST'),
  },
  {
    label: t('UNION.UNION'),
  },
  {
    label: t('UNION.CHANGE'),
  },
];

export const unionTableColumns = ({
  t,
  isDownload,
  language,
  navigate,
}: {
  t: TFunction<'translation', undefined>;
  isDownload?: boolean;
  language: string | null;
  navigate: (to: To, options?: NavigateOptions) => void;
}) => [
  {
    id: 1,
    name: t('UNION.UNION_OR_WARD_NAME_BANGLA'),
    key: `${UNION.NAME_BN}`,
  },
  {
    id: 2,
    name: t('UNION.UNION_OR_WARD_NAME_ENGLISH'),
    key: `${UNION.NAME_EN}`,
  },
  {
    id: 3,
    name: t('UNION.MUNICIPALITY_OR_CITY_CORPORATION_NAME'),
    key: `${
      language === LANGUAGE.BANGLA
        ? UNION.MUNICIPALITY_NAME_BN
        : UNION.MUNICIPALITY_NAME_EN
    }`,
  },
  {
    id: 4,
    name: t('UNION.SUB_DISTRICT_NAME'),
    key: `${
      language === LANGUAGE.BANGLA
        ? UNION.SUB_DISTRICT_NAME_BN
        : UNION.SUB_DISTRICT_NAME_EN
    }`,
  },
  {
    id: 5,
    name: t('UNION.DISTRICT_NAME'),
    key: `${
      language === LANGUAGE.BANGLA ? UNION.ZILLA_NAME_BN : UNION.ZILLA_NAME_EN
    }`,
  },
  {
    id: 6,
    name: t('UNION.GO_CODE'),
    key: `${UNION.GEO_CODE}`,
  },
  {
    id: 7,
    name: '',
    key: 'id',
    hide: isDownload,
    render: (id: any) => (
      <div className="pointer" onClick={() => navigate(ROUTES.EDIT_UNION(id))}>
        <IconPencil02 size="20" fill="primary" />
      </div>
    ),
  },
];

export const unionTableRows = [
  {
    id: 1,
    district: '',
    subDistrict: '',
    municipality: '',
    unionBn: '',
    unionEn: '',
    unionGoCode: '',
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
