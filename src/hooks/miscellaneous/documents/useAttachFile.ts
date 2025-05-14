import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { getAttachFile } from '@api/miscellaneous/documents/attach-file';
import {
  AttachFileTableData,
  AttachFileType,
} from '@type/documents/attach-file';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { ELECTION_INFO } from '@constants/election-info';

const mapAttachResData = (
  data: AttachFileType,
  t: TFunction<'translation', undefined>,
  electionTypeId?: string | number,
) => {
  const attachFileArr = [
    {
      id: 1,
      fileName: t('CANDIDATE_MANAGEMENT.CANDIDATE_PICTURE'),
      comment: '-',
      procedure: data?.candidateImage,
      type: 'img',
    },
    {
      id: 2,
      fileName: t('CANDIDATE_MANAGEMENT.AFFIDAVIT'),
      comment: '-',
      procedure: data?.candidateHalafnama,
    },
    {
      id: 4,
      fileName: t('CANDIDATE_MANAGEMENT.POLITICAL_PARTY_NOMINATION'),
      comment: '-',
      procedure: data?.candidatePoliticalNomination,
    },

    {
      id: 5,
      fileName: electionTypeId && Number(electionTypeId) === ELECTION_INFO.UNION_PARISHAD.ID ? 
        t('CANDIDATE_MANAGEMENT.INCOME_TAX_RETURN_COPY_FOR_UNION') : t('CANDIDATE_MANAGEMENT.INCOME_TAX_RETURN_COPY'),
      comment: '-',
      procedure: data?.candidateIncomeTax,
    },

    ...(electionTypeId && Number(electionTypeId) === ELECTION_INFO.NATIONAL.ID
      ? [
          {
            id: 6,
            fileName: t('CANDIDATE_MANAGEMENT.VOTER_SIGNATURE_LIST'),
            comment: '-',
            procedure: data?.candidateSupporters,
          },
        ]
      : []),

    {
      id: 8,
      fileName: t('CANDIDATE_MANAGEMENT.EDUCATIONAL_CERTIFICATE'),
      comment: '-',
      procedure: data?.candidateEducationalCertificate,
    },
    ...(electionTypeId &&
    Number(electionTypeId) !== ELECTION_INFO.UNION_PARISHAD.ID
      ? [
          {
            id: 9,
            fileName: t('ATTACH_FILE.FUNDS_TITLE'),
            comment: '-',
            procedure: data?.candidateExpenditure,
          },
        ]
      : []),

    {
      id: 10,
      fileName: t('CANDIDATE_MANAGEMENT.UTILITY_BILL_TITLE'),
      comment: '-',
      procedure: data?.candidateUtilityBill,
    },
    {
      id: 11,
      fileName: t('CANDIDATE_MANAGEMENT.VOTER_LIST_RECEIPT'),
      comment: '-',
      procedure: data?.candidateVoterListReceipt,
    },
    {
      id: 12,
      fileName: t('CANDIDATE_MANAGEMENT.OTHERS_DOCUMENT_TITLE'),
      comment: '-',
      procedure: data?.candidateOthers,
    },
  ];

  return attachFileArr;
};

interface UseAttachFilePropType {
  attachFile: AttachFileTableData[];
}

export const useAttachFile = ({
  electionSettingsId,
  candidateElectionDetailsId,
  electionTypeId,
}: UrlIdTypes): UseAttachFilePropType => {
  const [attachFile, setAttachFile] = useState<AttachFileTableData[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    getAttachFile({ electionSettingsId, candidateElectionDetailsId }).then(
      (response) => {
        const resData = response?.data?.data;

        const AttachFileTableData = mapAttachResData(
          resData,
          t,
          electionTypeId,
        );

        if (response?.data?.status === 200) {
          setAttachFile(AttachFileTableData);
        }
      },
    );
  }, [electionSettingsId, candidateElectionDetailsId, electionTypeId, t]);

  return {
    attachFile,
  };
};
