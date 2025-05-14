import { IconHomeLine } from "@pentabd/icons";
import { TFunction } from "i18next";

export const messageSendPublishAndViewBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('MESSAGE_SEND_LIST_PUBLISH.MESSAGE_SEND_LIST_PUBLISH'),
  },
];