export const RESULT_MANAGEMENT = {
  MESSAGE_SEND_LIST_PREPARE: {
    ATTACH_FILE: 'attachFile',
  },

  MESSAGE_SEND_LIST_PUBLISH: {
    CHECK: 'check',
    FINAL_FILE: 'finalFile',
  },

  VOTE_CENTER_HALT: {
    COMMENT: 'comment',
  },

  RESULT: {
    CANDIDATE_TYPE: 'candidateType',
    UNION_OR_WARD: 'unionOrWard',
    IN_PROCESS: 'FORWARDED_BY_OP',
    RESULT_PUBLISHED: 'APPROVED_BY_ARO',
    RESULT_RETURN: 'RETURNED_BY_ARO, RETURNED_BY_ADMIN',
    REQUEST_RESULT_RETURN: 'REQUESTED_BY_RO',
    POLLING_CENTER_NAME: 'pollingCenterName',
    ELECTION_SETTINGS: 'electionSettingsId',
    CHECK_SUSPENDED: 'isActive',
    PAGE: 'pageNo',
    CHECKBOX: 'checkboxes',
  },

  SUBMIT_RESULTS: {
    SCHEDULE: 'schedule',
    CONSTITUENCY: 'constituency',
    CANDIDATE_TYPE: 'candidateType',
    POLLING_CENTERS: 'pollingCenters',
    UNION_OR_WARD: 'unionOrWard',
    // UP_ELECTION_SETTINGS_ID: 'upElectionSettingsId', //for union parishad all candidates election settings
    // UP_UNION_OR_WARD_ID: 'upUnionOrWardId', // only for members-> to hold the union or ward data
    UP_UNION_OR_WARD: 'upUnionOrWard',
    UP_WARD: 'upWard',

    UPAZILA: 'upazila',
    ELECTION_SETTINGS: 'electionSettingsId',
    POLLING_CENTER_NAME: 'pollingCenterName',

    // Dynamic fields - Candidate Vote Counts (entire array)
    CANDIDATE_VOTE_DETAILS: 'candidateVoteDetails',
    // CANDIDATE_VOTE_COUNTS: 'candidateVoteCounts',

    // Dynamic fields - Candidate Vote Counts
    LEGAL_VOTE_COUNT: 'legalVoteCount',
    CHALLENGED_LEGAL_VOTE_COUNT: 'challengedLegalVoteCount',
    TOTAL_ROW_VOTE_COUNT: 'totalLegalVoteCount',
    TOTAL_ROW_POSTAL_VOTE_COUNT: 'voteCount',

    // Static fields
    TOTAL_LEGAL_VOTE_COUNT: 'totalLegalVoteCount',
    TOTAL_ILLEGAL_VOTE_COUNT: 'totalIllegalVoteCount',
    NET_TOTAL: 'netTotalVotes',
    TOTAL_ABSENT_VOTE_COUNT: 'totalAbsentVoteCount',

    TOTAL_POSTAL_VOTE_COUNT: 'totalVoteCount',

    RESULT_FILE: 'resultFile',
    RESULT_FILE_POSTAL: 'fileFromRo',
    CHECK_SUBMITTED: 'FORWARDED_BY_OP, APPROVED_BY_ARO',
    CHECK_NOT_SUBMITTED:
      'REQUESTED_BY_RO, RETURNED_BY_ARO, RETURNED_BY_ADMIN, CREATED_BY_OP',
    CHECK_SUSPENDED: 'isActive',
    PAGE: 'pageNo',
    CHECKBOX: 'checkboxes',
  },
};
