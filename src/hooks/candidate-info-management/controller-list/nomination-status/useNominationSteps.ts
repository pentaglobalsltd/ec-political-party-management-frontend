import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getNominationStep } from '@reducers/nomination-steps';
import { getNominationSteps } from '@api/candidate-info-management/nomination-list/nomination-steps';

const useNominationSteps = () => {
  const dispatch = useDispatch();

  const getNominationStepsData = async () => {
    try {
      const response = await getNominationSteps();
      if (response?.data?.status === 200) {
        dispatch(getNominationStep(response?.data?.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNominationStepsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useNominationSteps;
