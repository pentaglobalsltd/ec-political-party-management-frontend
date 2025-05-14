import { useNavigate } from 'react-router-dom';
import { Text } from '@pentabd/ui';
import { ReactNode } from 'react';
export interface HomeCardType {
  routeName: string;
  text: string;
  icon: ReactNode;
}

const HomeCard = ({ routeName, text, icon }: HomeCardType) => {
  const navigate = useNavigate();

  const clickOnPage = (routeName: any) => {
    navigate(routeName);
  };

  return (
    <div
      className="pointer bg-white shadow-lg p-12 rounded-4 d-flex flex-column justify-content-center align-items-center"
      onClick={() => clickOnPage(routeName)}
    >
      {icon}

      <Text size="xl" weight="semibold">
        {text}
      </Text>
    </div>
  );
};

export default HomeCard;
