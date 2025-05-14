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
      `${t('RESULTS.RESULT_PUBLISHED')}`,
      `${t('RESULTS.IN_PROCESS')}`,
      `${t('RESULTS.RESULT_RETURN')}`,
      `${t('SUBMIT_RESULTS.SUSPENDED')}`,
    ],
    datasets: [
      {
        data: [
          data?.approvedByAroCount,
          data?.forwardedByOpCount,
          data?.returnedByAroCount,
          data?.cancelledCenterCount,
        ],
        backgroundColor: ['#17B26A', '#F79009', '#475467', '#F04438'],
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
