import { Skeleton } from '@pentabd/ui';

export const SecondPartLoading = () => {
  return (
    <div className="d-flex flex-column py-9 ">
      <Skeleton height="20px" width="300px" />
      <div className="d-flex flex-column pt-9 gap-5">
        <div className="row">
          <div className="col-3">
            <Skeleton className="w-50" height="30px" />
          </div>
          <div className="col-9">
            <Skeleton className="w-75" height="40px" />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <Skeleton className="w-50" height="30px" />
          </div>
          <div className="col-9">
            <Skeleton className="w-75" height="40px" />
          </div>
        </div>
      </div>
    </div>
  );
};
