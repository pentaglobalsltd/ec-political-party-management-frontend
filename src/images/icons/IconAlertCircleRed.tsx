import { Svg } from '@pentabd/icons';

const IconAlertCircle = ({ ...props }) => (
  <Svg
    {...props}
    width="38"
    height="38"
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.3">
      <rect
        x="6"
        y="6"
        width="26"
        height="26"
        rx="13"
        stroke="#D92D20"
        strokeWidth="2"
      />
    </g>
    <g opacity="0.1">
      <rect
        x="1"
        y="1"
        width="36"
        height="36"
        rx="18"
        stroke="#D92D20"
        strokeWidth="2"
      />
    </g>
    <g clipPath="url(#clip0_5677_1163)">
      <path
        d="M19.0013 15.666V18.9993M19.0013 22.3327H19.0096M27.3346 18.9993C27.3346 23.6017 23.6037 27.3327 19.0013 27.3327C14.3989 27.3327 10.668 23.6017 10.668 18.9993C10.668 14.397 14.3989 10.666 19.0013 10.666C23.6037 10.666 27.3346 14.397 27.3346 18.9993Z"
        stroke="#D92D20"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_5677_1163">
        <rect width="20" height="20" fill="white" transform="translate(9 9)" />
      </clipPath>
    </defs>
  </Svg>
);

export default IconAlertCircle;
