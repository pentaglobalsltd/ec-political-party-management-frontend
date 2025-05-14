import { useState } from 'react';
import { PostalBallotCenterType } from '@type/result-management/electoral-process/postal-ballot/postal-ballot-type';
import {
  GetPostalBallotCenterInfo,
  getPostalBallotCenterInfoApi,
} from '@api/result-management/electoral-process/postal-ballot/postal-ballot-center';

interface HookReturnType {
  postalBallotCenter: PostalBallotCenterType;
  getPostalBallotCenter: (obj: any) => void;
  loading: boolean;
}

const mapPostalBallotCenter = (data: any) => {
  return {
    ...data,
    candidateVoteCounts: data.candidateVoteCounts.map((item: any) =>
      item?.voteCount ? item : { ...item, voteCount: 0 },
    ),
  };
};

export const useGetPostalBallotCenter = (): HookReturnType => {
  const [postalBallotCenter, setPostalBallotCenter] = useState<any>();
  const [loading, setLoading] = useState(false);

  const getPostalBallotCenter = async ({
    scheduleId,
    settingsId,
  }: GetPostalBallotCenterInfo) => {
    try {
      setLoading(true);
      const response = await getPostalBallotCenterInfoApi({
        scheduleId,
        settingsId,
      });
      if (response?.data?.status === 200) {
        const res = mapPostalBallotCenter(response?.data?.data);
        setPostalBallotCenter(res);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return {
    loading,
    postalBallotCenter,
    getPostalBallotCenter,
  };
};
