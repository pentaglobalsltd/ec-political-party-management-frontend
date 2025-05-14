import { useTranslation } from 'react-i18next';
import { Text } from '@pentabd/ui';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';
import NoData from './NoData';

interface Props {
  data?: any;
  options?: any;
}

const PieChartCard = ({ data, options }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="container-width rounded-5 pie-chart w-100 me-6">
      <div className="mb-12">
        <Text size="md" weight="bold" sizeType="display">
          {data?.title}
        </Text>
      </div>
      <div className="d-grid grid-cols-2 gap-6 w-100">
        <div className="bg-primary-lightest border border-primary p-10 rounded-5 w-100">
          <div className="mb-10 text-center">
            <Text size="md" weight="bold" sizeType="display">
              {t('GRAPHICAL_OBSERVATION.CANDIDATE_VOTE_RATIO')}
            </Text>
          </div>
          {data?.candidateVotePercentage ? (
            <div className="d-flex flex-column justify-content-start align-items-start w-100">
              <div className="chart-height w-100">
                <Pie data={data?.candidateVotePercentage} options={options} />
              </div>

              <div className="d-grid grid-cols-3 gap-4 mt-10 w-100 justify-content-around w-100">
                {data?.candidateVotePercentage.labels.map((label: any, index: any) => (
                  <div key={index} className="d-flex justify-content-center">
                    <div className="d-flex gap-4">
                      <div
                        className={`mt-3 name-pointer`}
                        style={{
                          backgroundColor:
                            data?.candidateVotePercentage?.datasets[0]?.backgroundColor[index],
                        }}
                      ></div>
                      <div className="d-flex flex-column">
                        <Text size="xl">{label}</Text>
                        <Text weight="bold">
                          {data?.candidateVotePercentage?.datasets[0]?.data[index]}%
                        </Text>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <NoData />
          )}
        </div>

        <div className="bg-primary-lightest border border-primary p-10 rounded-5 w-100">
          <div className="mb-10 text-center">
            <Text size="md" weight="bold" sizeType="display">
              {t('GRAPHICAL_OBSERVATION.CANDIDATE_VOTE_COUNT')}
            </Text>
          </div>
          {data?.candidateVoteNumber ? (
            <div className="d-flex flex-column justify-content-start align-items-start w-100">
              <div className="chart-height w-100">
                <Bar data={data?.candidateVoteNumber} options={options} />
              </div>

              <div className="d-grid grid-cols-3 gap-4 mt-10 w-100">
                {data?.candidateVoteNumber.labels.map((label: any, index: any) => (
                  <div key={index} className="d-flex justify-content-center">
                    <div className="d-flex gap-4">
                      <div
                        className={`mt-3 name-pointer`}
                        style={{
                          backgroundColor:
                            data?.candidateVoteNumber?.datasets[0]?.backgroundColor[index],
                        }}
                      ></div>
                      <div className="d-flex flex-column">
                        <Text size="xl">{label}</Text>
                        <Text weight="bold">
                          {data?.candidateVoteNumber?.datasets[0]?.totalVote[index]}
                        </Text>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <NoData isPie={false} />
          )}
        </div>

        <div className="bg-primary-lightest border border-primary p-10 rounded-5 w-100">
          <div className="mb-10 text-center">
            <Text size="md" weight="bold" sizeType="display">
              {t('GRAPHICAL_OBSERVATION.RATIO_OF_VOTES')}
            </Text>
          </div>
          {data?.voteCastStatus ? (
            <div className="d-flex flex-column justify-content-start align-items-start w-100">
              <div className="chart-height w-100">
                <Pie data={data?.voteCastStatus} options={options} />
              </div>

              <div className="d-grid grid-cols-3 gap-4 mt-10 w-100 justify-content-around">
                {data?.voteCastStatus.labels.map((label: any, index: any) => (
                  <div key={index} className="d-flex justify-content-center">
                    <div className="d-flex gap-4">
                      <div
                        className={`mt-3 name-pointer`}
                        style={{
                          backgroundColor:
                            data?.voteCastStatus?.datasets[0]?.backgroundColor[index],
                        }}
                      ></div>
                      <div className="d-flex flex-column">
                        <Text size="xl">{label}</Text>
                        <Text weight="bold">
                          {data?.voteCastStatus?.datasets[0]?.data[index]}%
                        </Text>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <NoData />
          )}
        </div>

        <div className="bg-primary-lightest border border-primary p-10 rounded-5 w-100">
          <div className="mb-10 text-center">
            <Text size="md" weight="bold" sizeType="display">
              {t('GRAPHICAL_OBSERVATION.MESSAGE_SHEET_STATUS_RATION')}
            </Text>
          </div>
          {data?.centerResultStatus ? (
            <div className="d-flex flex-column justify-content-start align-items-start w-100">
              <div className="chart-height w-100 d-flex justify-content-center">
                <Doughnut data={data?.centerResultStatus} options={options} />
              </div>

              <div className="d-grid grid-cols-3 gap-4 mt-10 w-100">
                {data?.centerResultStatus.labels.map((label: any, index: any) => (
                  <div key={index} className="d-flex justify-content-center">
                    <div className="d-flex gap-4">
                      <div
                        className={`mt-3 name-pointer`}
                        style={{
                          backgroundColor:
                            data?.centerResultStatus?.datasets[0]?.backgroundColor[index],
                        }}
                      ></div>
                      <div className="d-flex flex-column">
                        <Text size="xl">{label}</Text>
                        <Text weight="bold">
                          {data?.centerResultStatus?.datasets[0]?.data[index]}
                        </Text>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </div>
  );
};

export default PieChartCard;
