import { TFunction } from 'i18next';

export const upazilaElectionColumns = (
  t: TFunction<'translation', undefined>,
) => {
  return [
    {
      id: 3,
      name: t('GRAPHICAL_OBSERVATION.SUB_DISTRICT'),
      key: 'upazilaName',
    },
  ];
};
