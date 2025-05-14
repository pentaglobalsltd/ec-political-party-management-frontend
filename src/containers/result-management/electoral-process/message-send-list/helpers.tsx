import { Badge } from '@pentabd/ui';
import { TFunction } from 'i18next';

export function resultStatusBadge(
  data: string,
  t: TFunction<'translation', undefined>,
): JSX.Element {
  switch (data) {
    case 'PUBLISHED':
      return (
        <Badge
          className="text-nowrap"
          size="sm"
          label={t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.PUBLISHED')}
          type="success"
        />
      );
    case 'FORWARDED':
      return (
        <Badge
          className="text-nowrap"
          size="sm"
          label={t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.FORWARDED')}
          type="info"
        />
      );
    case 'FINAL':
      return (
        <Badge
          className="text-nowrap"
          size="sm"
          label={t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.FINAL')}
          type="danger"
        />
      );
    default:
      return <Badge label={data} type="warning" />;
  }
}
