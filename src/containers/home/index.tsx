import { Text, UserInfoCard } from '@pentabd/ui';

import Logo from '@images/eclogo.svg';
import RightSideNavMenu from '@components/RightSideNavMenu';
import { useHome } from '@hooks/miscellaneous/home/useHome';

import HomeCard from './components/HomeCard';
import { HomeCardType } from './constants';

function Home() {
  const { homeCardArray } = useHome();

  return (
    <div className="bg-light vh-100 d-flex align-items-center overflow-y-auto">
      {/* topbar */}
      <div className="px-12 d-flex justify-content-between py-4 position-absolute top-0 w-100">
        {/* left */}
        <div className="d-flex justify-content-between align-items-center gap-6">
          <Logo />
          <UserInfoCard weight="medium" />
        </div>

        {/* right */}
        <div className="d-flex justify-content-between align-items-center gap-6">
          <RightSideNavMenu />
        </div>
      </div>

      <div className="container-96 mb-24">
        {/* cards */}

        <div className="d-grid grid-cols-2 grid-cols-md-3 gap-12 justify-content-center align-items-center">
          {homeCardArray?.map(
            ({ text, routeName, icon }: HomeCardType, index: number) => (
              <HomeCard
                text={text}
                routeName={routeName}
                icon={icon}
                key={index}
              />
            ),
          )}
        </div>

        {homeCardArray.length === 0 ? (
          <div className="d-flex justify-content-center">
            <Text component="h1"> You have no permitted module</Text>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
