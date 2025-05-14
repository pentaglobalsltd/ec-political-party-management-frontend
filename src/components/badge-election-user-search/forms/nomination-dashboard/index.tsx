// import { t } from 'i18next';
// import { Button, Text } from '@pentabd/ui';
import { FormProvider, useForm } from 'react-hook-form';
import { NominationStatusElectionUserSearch } from './NominationStatusElectionUserSearch';

interface Props {
  callback: (data?: any) => void;
}

export const NominationDashboardSearch = ({ callback }: Props) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form className="w-25">
        <div className="d-grid grid-cols-1 gap-6 align-items-end grid-cols-lg-4 pb-6">
          <NominationStatusElectionUserSearch callback={callback} />
        </div>
      </form>
    </FormProvider>
  );
};
