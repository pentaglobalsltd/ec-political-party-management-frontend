import { Link } from 'react-router-dom';

import { TopBar } from '@pentabd/ui';

import Logo from '@images/eclogo.svg';

const CenterOfficerTopbar = () => {
  const brand = {
    icon: <Logo />,
    link: '#',
  };

  const userDetails = {
    name: 'Olivia Rhye',
    email: 'olivia@pentabd.com',
    component: <></>,
  };

  return (
    <>
      <TopBar
        brand={brand}
        userDetails={userDetails}
        Link={Link}
        dropdownMenu
      />
    </>
  );
};

export default CenterOfficerTopbar;
