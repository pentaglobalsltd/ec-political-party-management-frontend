import { useEffect, useRef } from 'react';

import { Text } from '@pentabd/ui';
import { IconX } from '@pentabd/icons';
import IconAlertCircleRed from '@images/icons/IconAlertCircleRed';

const NotificationItem = ({ id, title, text, isVisible, onIconClick }: any) => {
  const notificationRef = useRef<any>(null);

  useEffect(() => {
    const handleTransitionEnd = () => {
      if (!isVisible) notificationRef.current.style.display = 'none';
    };

    notificationRef.current.addEventListener(
      'transitionend',
      handleTransitionEnd,
    );
  }, [isVisible]);

  const handleIconClick = () => {
    onIconClick(id);
  };

  return (
    <div
      ref={notificationRef}
      className={`d-flex justify-content-between px-8 py-6 my-4 bg-danger-lightest border border-danger rounded-5 notification-container ${
        isVisible ? 'visible' : 'hidden'
      }`}
    >
      <div className="d-flex align-items-center">
        <IconAlertCircleRed className="pointer" onClick={handleIconClick} />
        <div className="d-flex flex-column">
          <Text size="sm" className=" lh-sm text-danger px-4">
            {title}
          </Text>
          <Text size="sm" weight="semibold" className=" lh-sm text-danger px-4">
            {text}
          </Text>
        </div>
      </div>
      <div className="d-flex pointer align-items-center">
        <IconX
          size="26"
          fill="dark"
          className="pointer"
          onClick={handleIconClick}
        />
      </div>
    </div>
  );
};

export default NotificationItem;
