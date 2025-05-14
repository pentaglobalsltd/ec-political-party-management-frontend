import { IconCheckSquare, IconXSquare } from '@pentabd/icons';

function Status({ data }: any) {
  return data ? (
    <IconCheckSquare size="26" fill="primary" />
  ) : (
    <IconXSquare size="26" fill="danger" />
  );
}

export default Status;
