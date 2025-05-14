import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';

import { SectionHeader, Text, Table, Button } from '@pentabd/ui';

import { useImmovableProperty } from '@hooks/candidate-info-management/operator-view/candidate-management/affidavit-form/useImmovableProperty';
import { ImmovablePropertyType } from '@type/candidate-info-management/operator-view/affidavit-form/immovable-property';
import { immovablePropertyTableColumns } from './formOptions';
import { createImmovablePropertyInitialState } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/immovable-property-actions';

type Props = {
  handleCurrent: (step: number) => void;
};
interface PostDataProps {
  [key: string]: string | number;
}

const ImmovablePropertyStepThree = ({ handleCurrent }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { electionSettingsId, candidateElectionDetailsId } = useParams();
  const {
    createAffidavitImmovableProperty,
    isCreateSuccess,
    immovableProperty,
    isCreateRequested,
  } = useImmovableProperty({ electionSettingsId, candidateElectionDetailsId });

  const { handleSubmit, register } = useForm({
    values: immovableProperty?.immovableAssets,
  });

  useEffect(() => {
    if (isCreateSuccess) {
      dispatch(createImmovablePropertyInitialState());
      handleCurrent(3);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateSuccess]);
  const onSubmit: SubmitHandler<any> = (submittedData: PostDataProps) => {
    const data: ImmovablePropertyType = {};
    const modifiedData = immovableProperty?.immovableAssets?.map((item) => ({
      serialNo: item.serialNo as number,
      label: item.label as string,
      self: submittedData[`self_${item.serialNo}`] as string,
      spouse: submittedData[`spouse_${item.serialNo}`] as string,
      dependent: submittedData[`dependent_${item.serialNo}`] as string,
      jointOwnership: submittedData[
        `jointOwnership_${item.serialNo}`
      ] as string,
      shareInJointOwnership: submittedData[
        `shareInJointOwnership_${item.serialNo}`
      ] as string,
    }));
    data.immovableAssets = modifiedData;
    createAffidavitImmovableProperty({
      electionSettingsId,
      candidateElectionDetailsId,
      data,
    });
  };
  return (
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
      <SectionHeader title={t('AFFIDAVIT_STEP_ONE.COUNTABLE_PROPERTY')} />
      <div className="d-flex flex-column gap-9 py-9">
        <Text size="sm" weight="medium" color="title">
          {t('AFFIDAVIT_IMMOVABLE_PROPERTY.DESCRIPTION')}
        </Text>
        <Table
          columns={immovablePropertyTableColumns(t, register)}
          rows={
            immovableProperty?.immovableAssets?.map((item, idx) => ({
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

export default ImmovablePropertyStepThree;
