import { Badge } from '@pentabd/ui';
import { getDigitBanglaFromEnglish } from '@utils';

function Percentage({ data }: { data: number | string }) {
  return (
    <div className="d-flex">
      <Badge
        className="text-nowrap"
        size="sm"
        label={getDigitBanglaFromEnglish(data) as string}
        type={data === '0' ? 'danger' : data === '50' ? 'warning' : 'success'}
      />
    </div>
  );
}

export default Percentage;
