import { CandidateTypeWisePollingCenterCount } from '@type/result-management/electoral-process/submit-results/submitResults';
import { Pie } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};
const PieChart = ({ data }: { data: CandidateTypeWisePollingCenterCount }) => {
  const { t } = useTranslation();

  const mappedData = {
    labels: [
      `${t('SUBMIT_RESULTS.SUBMITTED')}`,
      `${t('SUBMIT_RESULTS.NOT_SUBMITTED')}`,
      `${t('SUBMIT_RESULTS.SUSPENDED')}`,
    ],
    datasets: [
      {
        data: [
          data?.forwardedByOpCount,
          data?.createdByOpCount,
          data?.cancelledCenterCount,
        ],
        backgroundColor: ['#17B26A', '#475467', '#F04438'],
      },
    ],
  };
  return (
    <div className="pie-chart-size ">
      <Pie data={mappedData} options={options} />
    </div>
  );
};

export default PieChart;
