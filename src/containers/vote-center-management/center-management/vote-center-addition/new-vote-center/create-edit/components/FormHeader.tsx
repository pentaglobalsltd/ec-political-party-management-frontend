import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '@pentabd/ui';
import { getBreadcrumbsEditVoteCenter } from '../../../constants';
import { NewVoteCenterContext } from '../context/NewVoteCenterContext';

const FormHeader = () => {
  const { t } = useTranslation();
  const { contextData } = useContext(NewVoteCenterContext)!;

  return (
    <div className="my-5">
      <Header
        className="border-none"
        breadcrumbs={getBreadcrumbsEditVoteCenter(
          t,
          contextData?.potentialPollingInstitute,
        )}
      />
      <Header
        className=""
        headerText={{
          header: contextData?.potentialPollingInstitute?.instituteName,
        }}
      />
    </div>
  );
};

export default FormHeader;
