import { Dispatch, SetStateAction } from 'react';
import ReactImageGallery from 'react-image-gallery';
import { LatestResultsType } from '@type/result-management/result-monitoring/latest-results-obtained/latest-results-obtained-types';
import TableComponent from './TableComponent';
import { Countdown } from './Countdown';
import { Button } from '@pentabd/ui';
import { IconExpand06 } from '@pentabd/icons';
import { REFETCH_TIME_IN_SECONDS } from '../../constants/page-refresh-timer';

interface Props {
  latestResults: LatestResultsType[];
  isActiveFullScreen: boolean;
  setIsActiveFullScreen: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

const CarousalTable = (props: Props) => {
  const {
    latestResults,
    isActiveFullScreen,
    setIsActiveFullScreen,
    isLoading,
  } = props;

  const renderItems = () => {
    const items = latestResults
      ?.filter((result) => result && Object.keys(result)?.length > 0)
      ?.map((result, index) => {
        return {
          original: `candidate-0${index + 1}`,
          renderItem: () => (
            <TableComponent
              isActiveFullScreen={isActiveFullScreen}
              latestResults={result}
              isLoading={isLoading}
              rows={result?.bartaSheetCandidateVoteCounts}
            />
          ),
        };
      });

    return items;
  };

  return (
    <>
      {latestResults && latestResults?.length > 0 ? (
        <div className="mb-12 vh-100">
          <ReactImageGallery
            additionalClass="position-relative"
            useBrowserFullscreen={false}
            items={renderItems()}
            autoPlay={true}
            slideDuration={500}
            slideInterval={20_000}
            showFullscreenButton={true}
            showPlayButton={true}
            renderFullscreenButton={(onClick) => {
              return (
                <div>
                  <div
                    className="position-absolute"
                    style={{
                      bottom: isActiveFullScreen ? 20 : -60,
                      right: isActiveFullScreen ? 20 : 0,
                    }}
                  >
                    <div className="d-flex w-100">
                      <Countdown
                        refetch_time={REFETCH_TIME_IN_SECONDS}
                        isLoading={isLoading}
                        isActiveFullScreen={isActiveFullScreen}
                      />

                      <Button
                        type="primary"
                        fill="transparent"
                        onClick={(e) => {
                          onClick(e);
                          setIsActiveFullScreen((state) => !state);
                        }}
                      >
                        <IconExpand06
                          size="40"
                          fill={isActiveFullScreen ? 'white' : 'transparent'}
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </div>
      ) : null}
    </>
  );
};

export default CarousalTable;
