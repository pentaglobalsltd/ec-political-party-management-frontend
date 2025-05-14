import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import FirstHalf from './FirstHalf';
import SecondHalf from './SecondHalf';
import { useCandidatePersonalInfo } from '@hooks/candidate-info-management/controller-list/candidate-confirmation/useCandidatePersonalInfo';
import { useMaritalStatuses } from '@hooks/candidate-info-management/controller-list/candidate-confirmation/useMaritalStatuses';
import {
  PersonalInfoValidationSchemaType,
  personalInfoValidationSchema,
} from '@validations/candidate-info-management/controller-list/candidate-confirmation/personalInfoValidation';

const Personal = () => {
  const { electionSettingsId, candidateElectionDetailsId } = useParams();
  const { candidatePersonalInfo } = useCandidatePersonalInfo({
    electionSettingsId,
    candidateElectionDetailsId,
  });
  const { maritalStatuses } = useMaritalStatuses();

  const methods = useForm<PersonalInfoValidationSchemaType>({
    resolver: yupResolver(personalInfoValidationSchema),
    values: candidatePersonalInfo as PersonalInfoValidationSchemaType,
  });

  return (
    <FormProvider {...methods}>
      <form className="container">
        <FirstHalf image={candidatePersonalInfo?.image} />
        <SecondHalf
          childrenInfo={candidatePersonalInfo?.childrenInfo}
          maritalStatuses={maritalStatuses}
        />
      </form>
    </FormProvider>
  );
};
export default Personal;
