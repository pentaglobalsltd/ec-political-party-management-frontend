import { Outlet } from 'react-router-dom';

import ResultManagementTopBar from './ResultManagementTopbar';

const ResultManagementLayout = () => {
  return (
    <div className="container">
      <div className="row g-0">
        <div className="col-12 col-md-12 col-lg-12 col-xl-12 px-9 pt-64">
          <ResultManagementTopBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ResultManagementLayout;
