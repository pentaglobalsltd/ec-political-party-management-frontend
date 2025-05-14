import { useContext } from 'react';
import CenterNumber from '../../election-details-search/CenterNumber';
import { SubmitResultContext } from '../../../context/submitResultContext';

export const TotalVoter = () => {
  const { contextData } = useContext(SubmitResultContext)!;

  const currentPollingCenter = contextData?.contextPollingCenters?.find(
    (center) => center.id === contextData?.selectedCenterId,
  );

  return (
    <div className="d-grid grid-cols-4 gap-6 my-5 ">
      {/* মোট ভোটার */}
      <CenterNumber
        label="SUBMIT_RESULTS.TOTAL_VOTER"
        count={currentPollingCenter?.totalVoter}
      />

      {/* পুরুষ ভোটার */}
      <CenterNumber
        label="SUBMIT_RESULTS.MALE_VOTER"
        count={currentPollingCenter?.maleVoter}
      />

      {/* মহিলা ভোটার */}
      <CenterNumber
        label="SUBMIT_RESULTS.FEMALE_VOTER"
        count={currentPollingCenter?.femaleVoter}
      />

      {/* হিজড়া ভোটার */}
      <CenterNumber
        label="SUBMIT_RESULTS.THIRD_GENDER_VOTER"
        count={currentPollingCenter?.thirdGenderVoter}
      />
    </div>
  );
};
