import { Skeleton } from '@pentabd/ui';

const ChartLoading = () => {
  const Item = () => (
    <div className="d-flex flex-column gap-5 justify-content-center align-items-center">
      <div>
        <Skeleton height="20px" width="300px" className="mb-5" />
        <Skeleton height="300px" width="300px" className="rounded-circle" />
      </div>
      <div className="d-flex flex-row gap-5">
        <div className="mb-8">
          <Skeleton height="16px" width="100px" className="mb-4" />
          <Skeleton height="16px" width="100px" />
        </div>
        <div className="mb-8">
          <Skeleton height="16px" width="100px" className="mb-4" />
          <Skeleton height="16px" width="100px" />
        </div>
        <div className="mb-8">
          <Skeleton height="16px" width="100px" className="mb-4" />
          <Skeleton height="16px" width="100px" />
        </div>
      </div>
    </div>
  );

  const BarChartItem = () => (
    <div className="d-flex flex-column gap-5 justify-content-center align-items-center">
      <div>
        <Skeleton height="20px" width="300px" className="mb-5" />
        <Skeleton height="300px" width="400px" />
      </div>
      <div className="d-flex flex-row gap-5">
        <div className="mb-8">
          <Skeleton height="16px" width="100px" className="mb-4" />
          <Skeleton height="16px" width="100px" />
        </div>
        <div className="mb-8">
          <Skeleton height="16px" width="100px" className="mb-4" />
          <Skeleton height="16px" width="100px" />
        </div>
        <div className="mb-8">
          <Skeleton height="16px" width="100px" className="mb-4" />
          <Skeleton height="16px" width="100px" />
        </div>
      </div>
    </div>
  );
  return (
    <div
      className="w-100 bg-white p-10"
      style={{
        height: '900px',
      }}
    >
      <Skeleton height="40px" width="400px" className="mb-22" />
      <div className="d-grid grid-cols-2 gap-5">
        <Item />
        <BarChartItem />
        <Item />
        <Item />
      </div>
    </div>
  );
};

export default ChartLoading;
