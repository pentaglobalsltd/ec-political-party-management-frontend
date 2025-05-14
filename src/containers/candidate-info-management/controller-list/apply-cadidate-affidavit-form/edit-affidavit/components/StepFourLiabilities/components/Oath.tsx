import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import { Text } from '@pentabd/ui';
import { IconCalendar } from '@pentabd/icons';

import FormInput from '@components/inputs/FormInput';
import FormDate from '@components/inputs/FormDate';

import { ELECTION_INFO } from '@constants/election-info';
import { AFFIDAVIT_OATH } from '@validations/candidate-info-management/operator/affidavit/fourthStepLiabilitiesValidation';
import { electionNameMapping } from '@helpers/election-type';

const UPAZILLA_ELECTION = ELECTION_INFO.UPAZILLA;
const UNION_PARISHAD_ELECTION = ELECTION_INFO.UNION_PARISHAD;

const Oath = () => {
  const { t } = useTranslation();
  const { electionTypeId } = useParams();

  const electionTypeKey = electionNameMapping(Number(electionTypeId));

  return (
    <div className="d-flex flex-column gap-9 pb-9">
      <div className="p-9 bg-primary-50 rounded-4">
        <Text size="sm" weight="normal" color="title">
          {t(`AFFIDAVIT_LIABILITIES.OATH.${electionTypeKey}`)}
        </Text>
      </div>
      <div>
        <FormInput
          title={`AFFIDAVIT_LIABILITIES.CANDIDATE_NAME.${electionTypeKey}`}
          registerName={`oath.candidateInfo.${AFFIDAVIT_OATH.CANDIDATE_INFO.NAME}`}
          placeholder="PLACEHOLDER.ENTER"
          subtitle={
            Number(electionTypeId) === UPAZILLA_ELECTION.ID || Number(electionTypeId) === UNION_PARISHAD_ELECTION.ID
              ? 'AFFIDAVIT_LIABILITIES.CANDIDATE_NAME_SUBTITLE'
              : ''
          }
          disabled
        />
        <FormInput
          title="AFFIDAVIT_LIABILITIES.FATHER_OR_HUSBAND_NAME"
          registerName={`oath.candidateInfo.${AFFIDAVIT_OATH.CANDIDATE_INFO.FATHER_OR_HUSBAND_NAME}`}
          placeholder="PLACEHOLDER.ENTER"
          disabled
        />
        <FormInput
          title="AFFIDAVIT_LIABILITIES.MOTHER_NAME"
          registerName={`oath.candidateInfo.${AFFIDAVIT_OATH.CANDIDATE_INFO.MOTHER_NAME}`}
          placeholder="PLACEHOLDER.ENTER"
          disabled
        />
        <FormInput
          title="AFFIDAVIT_LIABILITIES.CANDIDATE_ADDRESS"
          registerName={`oath.candidateInfo.${AFFIDAVIT_OATH.CANDIDATE_INFO.ADDRESS}`}
          placeholder="PLACEHOLDER.ENTER"
          disabled
        />
        <FormInput
          title="AFFIDAVIT_LIABILITIES.IDENTIFIER_NAME"
          registerName={`oath.identifierInfo.${AFFIDAVIT_OATH.IDENTIFIER_INFO.NAME}`}
          placeholder="PLACEHOLDER.ENTER"
        />
        <FormInput
          title="AFFIDAVIT_LIABILITIES.IDENTIFIER_ADDRESS"
          registerName={`oath.identifierInfo.${AFFIDAVIT_OATH.IDENTIFIER_INFO.ADDRESS}`}
          placeholder="PLACEHOLDER.ENTER"
        />
        <FormDate
          name="AFFIDAVIT_OATH.HOLOFNAMA_SUBMISSION_DATE"
          title="AFFIDAVIT_LIABILITIES.IDENTIFY_DATE"
          placeholder="PLACEHOLDER.SELECT"
          registerName={`oath.${AFFIDAVIT_OATH.HOLOFNAMA_SUBMISSION_DATE}`}
          inputSubtitle="AFFIDAVIT_LIABILITIES.IDENTIFY_DATE_SUBTITLE"
          prefix={<IconCalendar size="20" fill="subtitle2" />}
          maximumDate={dayjs()}
        />
        <FormInput
          title="AFFIDAVIT_LIABILITIES.MAGISTRATE_NAME"
          registerName={`oath.magistrateNotaryPublic.${AFFIDAVIT_OATH.MAGISTRATE_NOTARY_PUBLIC.NAME}`}
          placeholder="PLACEHOLDER.ENTER"
        />
        <FormDate
          name="AFFIDAVIT_OATH.MAGISTRATE_NOTARY_PUBLIC.SIGNING_DATE"
          title="AFFIDAVIT_LIABILITIES.MAGISTRATE_SIGN_DATE"
          placeholder="PLACEHOLDER.SELECT"
          registerName={`oath.magistrateNotaryPublic.${AFFIDAVIT_OATH.MAGISTRATE_NOTARY_PUBLIC.SIGNING_DATE}`}
          prefix={<IconCalendar size="20" fill="subtitle2" />}
          maximumDate={dayjs()}
        />
      </div>
    </div>
  );
};

export default Oath;
