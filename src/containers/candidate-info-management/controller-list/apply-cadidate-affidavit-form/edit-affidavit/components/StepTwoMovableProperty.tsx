import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';

import { SectionHeader, Text, Table, Button } from '@pentabd/ui';

import { useMovableProperty } from '@hooks/candidate-info-management/operator-view/candidate-management/affidavit-form/useMovableProperty';
import { MovablePropertyType } from '@type/candidate-info-management/operator-view/affidavit-form/movable-property';
import { movablePropertyTableColumns } from './formOptions';
import { createMovablePropertyInitialState } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/movable-property-actions';

type Props = {
  handleCurrent: (step: number) => void;
};

interface PostDataProps {
  [key: string]: string | number;
}

const MovablePropertyStepTwo = ({ handleCurrent }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { electionSettingsId, candidateElectionDetailsId } = useParams();
  const {
    createAffidavitMovableProperty,
    isCreateSuccess,
    movableProperty,
    isCreateRequested,
  } = useMovableProperty({ electionSettingsId, candidateElectionDetailsId });

  const { handleSubmit, register } = useForm({
    values: movableProperty?.movableAssets,
  });

  useEffect(() => {
    if (isCreateSuccess) {
      dispatch(createMovablePropertyInitialState());
      handleCurrent(2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateSuccess]);
  const onSubmit: SubmitHandler<any> = (submittedData: PostDataProps) => {
    const data: MovablePropertyType = {};
    const modifiedData = movableProperty?.movableAssets?.map((item) => ({
      serialNo: item.serialNo as number,
      label: item.label as string,
      self: submittedData[`self_${item.serialNo}`] as string,
      spouse: submittedData[`spouse_${item.serialNo}`] as string,
      dependent: submittedData[`dependent_${item.serialNo}`] as string,
    }));
    data.movableAssets = modifiedData;
    createAffidavitMovableProperty({
      electionSettingsId,
      candidateElectionDetailsId,
      data,
    });
  };
  return (
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
      <SectionHeader title={t('AFFIDAVIT_STEP_ONE.UNCOUNTABLE_PROPERTY')} />
      <div className="d-flex flex-column gap-9 py-9">
        <Text size="sm" weight="medium" color="title">
          {t('AFFIDAVIT_MOVABLE_PROPERTY.DESCRIPTION')}
        </Text>
        <Table
          columns={movablePropertyTableColumns(t, register)}
          rows={
            movableProperty?.movableAssets?.map((item, idx) => ({
              id: idx,
              ...item,
            })) || []
          }
        />
      </div>
      <div className="d-flex flex-row-reverse border-top pt-8">
        <Button
          key={1}
          htmlType="submit"
          type="info"
          loading={isCreateRequested}
        >
          {t('AFFIDAVIT_STEP_ONE.SAVE_NEXT')}
        </Button>
      </div>
    </form>
  );
};

export default MovablePropertyStepTwo;
