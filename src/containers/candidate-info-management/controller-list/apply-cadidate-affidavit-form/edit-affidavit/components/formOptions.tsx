import { TFunction } from 'i18next';
import { Input, Text } from '@pentabd/ui';
import { ImmovablePropertyChildType } from '@type/candidate-info-management/operator-view/affidavit-form/immovable-property';
import { MovablePropertySingleType } from '@type/candidate-info-management/operator-view/affidavit-form/movable-property';

export const immovablePropertyTableColumns = (
  t: TFunction<'translation', undefined>,
  register: any,
) => [
  {
    id: 1,
    key: 'idx',
    name: t('AFFIDAVIT_IMMOVABLE_PROPERTY.ID'),
    render: (data: string) => (
      <Text weight="normal" color="subtitle1" size="sm">
        {data}
      </Text>
    ),
  },
  {
    id: 2,
    key: 'label',
    name: t('AFFIDAVIT_IMMOVABLE_PROPERTY.PROPERTY_DESCRIPTION'),
    render: (data: string) => {
      return (
        <Text weight="normal" color="subtitle1" size="sm">
          {data}
        </Text>
      );
    },
  },
  {
    id: 3,
    key: 'self',
    name: t('AFFIDAVIT_IMMOVABLE_PROPERTY.OWN'),
    render: (data: string, raw: ImmovablePropertyChildType) => (
      <Input
        type="text"
        {...register(`self_${raw.serialNo}`)}
        placeholder={t('PLACEHOLDER.ENTER')}
        defaultValue={data}
        minWidth
      />
    ),
  },
  {
    id: 4,
    key: 'spouse',
    name: t('AFFIDAVIT_IMMOVABLE_PROPERTY.HUSBAND_OR_WIFE'),
    render: (data: string, raw: ImmovablePropertyChildType) => (
      <Input
        type="text"
        {...register(`spouse_${raw.serialNo}`)}
        placeholder={t('PLACEHOLDER.ENTER')}
        defaultValue={data}
        minWidth
      />
    ),
  },
  {
    id: 5,
    key: 'dependent',
    name: t('AFFIDAVIT_IMMOVABLE_PROPERTY.DEPENDENT'),
    render: (data: string, raw: ImmovablePropertyChildType) => (
      <Input
        type="text"
        {...register(`dependent_${raw.serialNo}`)}
        placeholder={t('PLACEHOLDER.ENTER')}
        defaultValue={data}
        minWidth
      />
    ),
  },
  {
    id: 6,
    key: 'jointOwnership',
    name: t('AFFIDAVIT_IMMOVABLE_PROPERTY.JOIN_OWNERSHIP'),
    render: (data: string, raw: ImmovablePropertyChildType) => (
      <Input
        type="text"
        {...register(`jointOwnership_${raw.serialNo}`)}
        placeholder={t('PLACEHOLDER.ENTER')}
        defaultValue={data}
        minWidth
      />
    ),
  },
  {
    id: 7,
    key: 'shareInJointOwnership',
    name: t('AFFIDAVIT_IMMOVABLE_PROPERTY.CANDIDATE_SHARE'),
    render: (data: string, raw: ImmovablePropertyChildType) => (
      <Input
        type="text"
        {...register(`shareInJointOwnership_${raw.serialNo}`)}
        placeholder={t('PLACEHOLDER.ENTER')}
        defaultValue={data}
      />
    ),
  },
];

export const movablePropertyTableColumns = (
  t: TFunction<'translation', undefined>,
  register: any,
) => [
  {
    id: 1,
    key: 'idx',
    name: t('AFFIDAVIT_MOVABLE_PROPERTY.ID'),
    render: (data: string) => (
      <Text weight="normal" color="subtitle1" size="sm">
        {data}
      </Text>
    ),
  },
  {
    id: 2,
    key: 'label',
    name: t('AFFIDAVIT_MOVABLE_PROPERTY.PROPERTY_TYPE'),
    render: (data: string) => (
      <Text weight="normal" color="subtitle1" size="sm">
        {data}
      </Text>
    ),
  },
  {
    id: 3,
    key: 'self',
    name: t('AFFIDAVIT_MOVABLE_PROPERTY.OWN'),
    render: (data: string, raw: MovablePropertySingleType) => (
      <Input
        type="text"
        {...register(`self_${raw.serialNo}`)}
        placeholder={t('PLACEHOLDER.ENTER')}
        defaultValue={data}
        minWidth
      />
    ),
  },
  {
    id: 4,
    key: 'spouse',
    name: t('AFFIDAVIT_MOVABLE_PROPERTY.HUSBAND_OR_WIFE'),
    render: (data: string, raw: MovablePropertySingleType) => (
      <Input
        type="text"
        {...register(`spouse_${raw.serialNo}`)}
        placeholder={t('PLACEHOLDER.ENTER')}
        defaultValue={data}
        minWidth
      />
    ),
  },
  {
    id: 5,
    key: 'dependent',
    name: t('AFFIDAVIT_MOVABLE_PROPERTY.DEPENDENT'),
    render: (data: string, raw: MovablePropertySingleType) => (
      <Input
        type="text"
        {...register(`dependent_${raw.serialNo}`)}
        placeholder={t('PLACEHOLDER.ENTER')}
        defaultValue={data}
        minWidth
      />
    ),
  },
];
