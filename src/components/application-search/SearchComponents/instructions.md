# Search component 101

### Election Type-

**fieldName: ADVANCE_SEARCH.ELECTION_TYPE**

- apiService: Core or Master
- registerName: electionTypeId
- reset value:electionType, reset options: electionTypeOptions

### Election Schedule-

**fieldName: ADVANCE_SEARCH.ELECTION_SCHEDULE**

- reset value:electionSchedule, reset options: electionScheduleOptions
- registerName: electionScheduleId

### Candidate Type-

**fieldName: ADVANCE_SEARCH.CANDIDATE_TYPE**

- reset value:candidateType, reset options: candidateTypeOptions
- registerName: candidateTypeId

### District-

**fieldName: ADVANCE_SEARCH.DISTRICT**

- reset value:district, reset options: districtOptions
- registerName: zillaId

### Constituency-

**fieldName: APPLICATION_SEARCH.CONSTITUENCY**

- reset value: constituency, reset options: constituencyOptions
- registerName: constituencyId
- api endpoint- /constituencies
- Still now only accepts path params

### Upazila -

**fieldName: ADVANCE_SEARCH.SUB_DISTRICT_AS_CONSTITUENCIES**

- registerName: constituencyId
- reset value: upazilaAsConstituency,
- reset options: upazilaAsConstituencyOptions
- api endpoint- /constituencies
- Still now only accepts path params

**fieldName: ADVANCE_SEARCH.UPAZILA**

- registerName: upazilaId
- reset value: upazila,
- reset options: upazilaOptions
- api endpoint- /upazilas
- apiService- Core, Master

### Upazila/Thana

**fieldName: ADVANCE_SEARCH.UPAZILA_THANA**

- registerName: upazilaThanaId
- reset value: upazilaThana,
- reset options: upazilaThanaOptions
- api endpoint- /upazilas-or-thanas
- Still now only accepts path params

### Municipality-

**fieldName: ADVANCE_SEARCH.MUNICIPALITY_AS_CONSTITUENCY**

- registerName: constituencyId
- reset value: municipalityAsConstituency,
- reset options: municipalityAsConstituencyOptions
- api endpoint- /constituencies
- Still now only accepts path params

**fieldName: ADVANCE_SEARCH.MUNICIPALITY**

- registerName: municipalityId
- reset value: municipality,
- reset options: municipalityOptions
- api endpoint- /municipalities
- Still now only accepts path params

### Union Ward-

**fieldName: ADVANCE_SEARCH.UNION_OR_WARD_CONSTITUENCY**

- registerName: constituencyId
- reset value: municipalityAsConstituency,
- reset options: municipalityAsConstituencyOptions
- api endpoint- /constituencies
- Still now only accepts path params

**fieldName: ADVANCE_SEARCH.UNION_OR_WARD**

- registerName: unionOrWardId
- reset value: unionOrWard,
- reset options: unionOrWardOptions
- api endpoint- /unions-or-wards
- Still now only accepts path params

### Nomination Status-

**fieldName: ADVANCE_SEARCH.NOMINATION_STATUS**

- registerName: nominationStatusCodes
- Uses originally existing api
- Doesn’t have path or query params

### Barta Sheet Status-

**fieldName: ADVANCE_SEARCH.BARTA_SHEET_STATUS**

- registerName: messageSendStatus
- Uses originally existing api
- Doesn’t have path or query params

### User type-

**fieldName: ADVANCE_SEARCH.USER_TYPE_CODE**

- registerName: userTypeCode
- needs type(system or election) as queryParams
- can have userTypeCodes as queryParams
- Uses originally existing api
- Doesn’t have path or query params

### User Profile loginId-

**fieldName: ADVANCE_SEARCH.USER_PROFILE_LOGIN_ID**

- registerName: userId
- needs type(system or election) as queryParams
- reset value: userLogInId,
- reset options: userLogInIdOptions
- Still now only accepts query params

### Polling center type-

**fieldName: ADVANCE_SEARCH.POLLING_CENTER_TYPE**

- registerName: voterType
- reset value: voteCenterType,
- reset options: voteCenterTypeOptions
- Doesn’t have path or query params

### Case-

**fieldName: ADVANCE_SEARCH.CASE**

- registerName: isCaseAvailable
- uses hard code data

### Result status-

**fieldName: ADVANCE_SEARCH.RESULT_STATUS**

- registerName: status
- Doesn’t have path or query params

### Result status-

**fieldName: ADVANCE_SEARCH.DRAFT_RESULT_STATUS**

- registerName: status
- Doesn’t have path or query params

### Rearrange Seat-

**fieldName: ADVANCE_SEARCH.REARRANGE_SEAT**

- registerName: electionAreaReorganized
- Doesn’t have path or query params

### Result type-

**fieldName: ADVANCE_SEARCH.RESULT_TYPE**

- registerName: resultType
- Doesn’t have path or query params

## ONLY FOR POLLING CENTER

**fieldName:ADVANCE_SEARCH.ELECTION_SETTINGS_VOTE_CENTER**
