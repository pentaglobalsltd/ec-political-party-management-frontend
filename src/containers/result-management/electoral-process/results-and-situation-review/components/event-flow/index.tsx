import { ProgressSteps, Table, Text } from '@pentabd/ui';
import { TFunction } from 'i18next';
import {
  GetAllEventsTableHeader,
  GetResolvedCaseTableHeader,
  getResolvedCaseTableColumns,
  getResolvedCaseTableRows,
} from '../../constants';

interface EventFlowProps {
  t: TFunction<'translation', undefined>;
}

const items = [
  {
    title: 'ভোটকেন্দ্র পরিস্থিতি শান্তিপূর্ণ নয়',
    subtitle: 'সিভিল এভিয়েশন উচ্চ বিদ্যালয়',
  },
  {
    title: 'ভোটকেন্দ্র পরিস্থিতি শান্তিপূর্ণ নয়',
    subtitle: 'সিভিল এভিয়েশন উচ্চ বিদ্যালয়',
  },
];

const EventFlow = (props: EventFlowProps) => {
  const { t } = props;
  return (
    <div>
      <div className="panel">
        <div className="mt-8 border border-secondary-light rounded p-5 rounded-bottom-0">
          <Text weight="bold" size="md" color="subtitle2">
            {t('RESULT_AND_SITUATION_REVIEW.LATEST_INCIDENT')}
          </Text>
        </div>
        <div
          className="border border-secondary-light p-5 rounded rounded-top-0 border-top-0"
          style={{ height: 180 }}
        >
          <ProgressSteps mode="vr" items={items} />
        </div>
      </div>

      <div className="resolved-case mt-10 mb-10">
        <Table
          headerExtension={GetResolvedCaseTableHeader(t)}
          rows={getResolvedCaseTableRows()}
          columns={getResolvedCaseTableColumns(t)}
          pagination={{ language: 'bn', totalPage: 1 }}
        />
      </div>

      <div className="all-events mb-10">
        <Table
          headerExtension={GetAllEventsTableHeader(t)}
          rows={getResolvedCaseTableRows()}
          columns={getResolvedCaseTableColumns(t)}
          pagination={{ language: 'bn', totalPage: 1 }}
        />
      </div>
    </div>
  );
};

export default EventFlow;
