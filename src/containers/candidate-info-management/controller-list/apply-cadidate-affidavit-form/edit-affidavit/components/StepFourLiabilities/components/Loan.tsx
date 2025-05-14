import { Trans, useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Text, Table } from '@pentabd/ui';

import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { ELECTION_INFO } from '@constants/election-info';
import { LiabilitiesType } from '@type/candidate-info-management/operator-view/affidavit-form/liabilities';
import { electionNameMapping } from '@helpers/election-type';
import { LIABILITY_LOAN_OATH } from '@validations/candidate-info-management/operator/affidavit/fourthStepLiabilitiesValidation';
import { loanInformationColumns } from '../formOptions';
import { getDigitBanglaFromEnglish } from '@utils';

const Loan = ({ loans }: LiabilitiesType) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { register, control, watch } = useFormContext();

  const checked = watch(LIABILITY_LOAN_OATH.NOT_RECEIVED_LOANS);
  const { electionTypeId } = useParams();

  const isUnionParishadElection = Number(electionTypeId) === ELECTION_INFO.UNION_PARISHAD.ID;

  const electionTypeKey = electionNameMapping(Number(electionTypeId));

  return (
    <div className="d-flex flex-column gap-9 py-9 ">
      <div className="d-flex flex-column gap-9 bg-primary-50 rounded-4 p-9">
        <div className="row g-9">
          <div className="col-xl-8">
          {
              isUnionParishadElection && <> 
              <Text weight="medium" size="sm" color="title">
                {getDigitBanglaFromEnglish(7)}. {t('AFFIDAVIT_LIABILITIES.LOAN_RELATED_INFO')}
              </Text>
              <br />
              </>
            }
            <Text weight="medium" size="sm" color="title">
              <Trans
                i18nKey={`AFFIDAVIT_LIABILITIES.NOT_TAKEN.${electionTypeKey}`}
                values={{
                  sectionSerial:
                    Number(electionTypeId) === ELECTION_INFO.NATIONAL.ID
                      ? language === LANGUAGE.BANGLA
                        ? getDigitBanglaFromEnglish(8)
                        : 8
                      : language === LANGUAGE.BANGLA
                      ? getDigitBanglaFromEnglish(7)
                      : 7,
                }}
              ></Trans>
            </Text>
            <br />
            <Text weight="medium" size="sm" color="title">
              {t('AFFIDAVIT_LIABILITIES.MARK_SIGN')}
            </Text>
          </div>
          <div className="col-xl-4">
            <input
              type="checkbox"
              id={`${LIABILITY_LOAN_OATH.NOT_RECEIVED_LOANS}`}
              {...register(`${LIABILITY_LOAN_OATH.NOT_RECEIVED_LOANS}`)}
              // onChange={(e) => handleClick(e)}
            />
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Text weight="medium" size="sm" color="title">
            {t('AFFIDAVIT_LIABILITIES.OR')}
          </Text>
          <div className="flex-1 horizontal-line"></div>
        </div>

        <div className="row g-0">
          <div className="col-xl-8">
            <Text weight="medium" size="sm" color="title">
              <Trans
                i18nKey={`AFFIDAVIT_LIABILITIES.TAKEN.${electionTypeKey}`}
                values={{
                  sectionSerial:
                    Number(electionTypeId) === ELECTION_INFO.NATIONAL.ID
                      ? language === LANGUAGE.BANGLA
                        ? getDigitBanglaFromEnglish(8)
                        : 8
                      : language === LANGUAGE.BANGLA
                      ? getDigitBanglaFromEnglish(7)
                      : 7,
                }}
              ></Trans>
            </Text>
          </div>
        </div>
      </div>
      {!checked && (
        <div>
          <Table
            columns={loanInformationColumns(t, register, control, electionTypeKey)}
            rows={
              loans?.map((item: any, idx: number) => ({
                id: idx,
                ...item,
              })) || []
            }
          />
        </div>
      )}
    </div>
  );
};
export default Loan;
