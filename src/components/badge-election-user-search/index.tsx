import { useEffect } from 'react';
import { Badge } from '@pentabd/ui';
import classNames from 'classnames';

interface Props {
  headerComponent?: JSX.Element;
  callback: (data?: any) => void;
  children?: JSX.Element | null;
  labels: {
    electionTypes?: string;
    electionSchedules?: string;
    candidateTypes?: string;
    zillas?: string;
    constituencies?: string;
  };
  alignment?: 'right' | 'below';
}

export const BadgeElectionUserSearch = ({
  callback,
  labels,
  children = null,
  alignment = 'right',
}: Props) => {
  useEffect(() => {
    if (callback) {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback]);

  return (
    <div
      className={classNames('mb-5', {
        'd-flex justify-content-between align-items-center':
          alignment === 'right',
      })}
    >
      <div className="d-flex align-items-center gap-6">
        {labels.electionTypes && (
          <Badge label={labels.electionTypes} size="lg" />
        )}

        {labels.electionSchedules && (
          <Badge label={labels.electionSchedules} size="lg" />
        )}

        {labels.candidateTypes && (
          <Badge label={labels.candidateTypes} size="lg" />
        )}

        {labels.zillas && <Badge label={labels.zillas} size="lg" />}

        {labels.constituencies && (
          <Badge label={labels.constituencies} size="lg" />
        )}
      </div>

      {children}
    </div>
  );
};
