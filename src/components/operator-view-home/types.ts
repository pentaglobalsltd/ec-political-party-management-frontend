export interface PropsCompleteTable {
  tableName: string;
  tableColumnsFn?: typeTableColumnsFn;
  queryParamsObj: QueryParamsObj;
  downloadFileName: string;
}

export interface PropsIncompleteTable {
  tableName: string;
  tableColumnsFn?: typeTableColumnsFn;
  queryParamsObj: QueryParamsObj;
  downloadFileName: string;
}

interface QueryParamsObj {
  isNominationComplete?: boolean;
  isPersonalInfoComplete?: boolean;
  isAttachmentComplete?: boolean;
  isHolofnamaComplete?: boolean;
  isAssetIncomeExpenditureComplete?: boolean;
  isCandidateElectionExpenseComplete?: boolean;
}

type typeTableColumnsFn = (obj: { isDownload: boolean }) => any[];
