import { TFunction } from 'i18next';

export const nationalElectionColumns = (
  t: TFunction<'translation', undefined>,
) => {
  return [
    {
      id: 3,
      name: t('GRAPHICAL_OBSERVATION.CONSTITUENCY'),
      key: 'constituencyName',
    },
  ];
};
