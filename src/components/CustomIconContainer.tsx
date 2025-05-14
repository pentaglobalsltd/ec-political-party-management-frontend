import { JSX, ReactNode } from 'react';

interface CustomIconContainerType {
  type: 'success' | 'warning' | 'primary' | 'secondary' | 'info' | 'danger';
  iconComponent: JSX.Element | ReactNode;
}

export default function CustomIconContainer({
  type,
  iconComponent,
}: CustomIconContainerType) {
  return (
    <div
      className={`d-flex justify-content-center align-items-center rounded-circle confirmation-message-model-check-icon-grand-parent
        bg-${type}-50`}
    >
      <div
        className={`d-flex justify-content-center align-items-center bg-${type}-100 rounded-circle confirmation-message-model-check-icon-parent p-2`}
      >
        {iconComponent}
      </div>
    </div>
  );
}
