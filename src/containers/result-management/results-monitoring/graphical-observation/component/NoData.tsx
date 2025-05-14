interface Props {
  isPie?: boolean;
}
const NoData = ({ isPie = true }: Props) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <img
        src={isPie ? '/image/pie.svg' : '/image/bar.svg'}
        alt="No data"
        height={400}
        width={400}
      />
    </div>
  );
};

export default NoData;
