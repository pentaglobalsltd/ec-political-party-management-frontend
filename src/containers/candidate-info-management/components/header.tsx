import { ReactNode } from 'react';
import { t } from 'i18next';
import { Header } from '@pentabd/ui';
import { ELECTION_INFO } from '@constants/election-info';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';

export const HeaderComponentCMS = ({
  breadcrumbs,
  headerText,
  subHeaderText,
  actions,
}: {
  headerText: string;
  breadcrumbs?: {
    label?: string;
    onClick?: () => void;
    link?: string;
    icon?: ReactNode;
  }[];
  subHeaderText?: string;
  actions?: JSX.Element | JSX.Element[];
}) => {
  const { electionTypes } = useFiltersRedux();
  const electionUserNationalType =
    electionTypes?.[0]?.value === ELECTION_INFO.NATIONAL.ID;

  return (
    <>
      {electionUserNationalType ? (
        <Header
          headerClassName="py-6"
          noBorder={true}
          size="sm"
          headerText={{
            header: t(headerText),
            ...(subHeaderText && { subHeader: t(subHeaderText) }),
          }}
          actions={actions}
        />
      ) : (
        <Header
          className="mb-12 pt-10"
          headerText={{
            header: t(headerText),
            ...(subHeaderText && { subHeader: t(subHeaderText) }),
          }}
          breadcrumbs={breadcrumbs}
          actions={actions}
        />
      )}
    </>
  );
};
