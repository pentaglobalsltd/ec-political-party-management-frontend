import classNames from 'classnames';

interface Props {
  position?: string;
}

export default function Loader({ position = 'align-items-center' }: Props) {
  return (
    <div
      className={classNames(
        'd-flex justify-content-center w-100 vh-100',
        position,
      )}
    >
      <img src="/loading-gif.gif" alt="loader" width={100} />
    </div>
  );
}
