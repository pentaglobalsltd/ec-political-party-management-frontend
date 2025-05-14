import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFieldArray, useFormContext } from 'react-hook-form';

import {
  Button,
  ConfirmationModal,
  TableData,
  TableRow,
  TableSecondary,
  Text,
} from '@pentabd/ui';
import { IconEdit05, IconPlus, IconTrash03 } from '@pentabd/icons';

import FormChildInput from '@components/inputs/FormChildInput';

import { useLiabilities } from '@hooks/candidate-info-management/operator-view/candidate-management/affidavit-form/useLiabilities';
import {
  AFFIDAVIT_COMMITMENT_ACHIEVEMENTS,
  LIABILITY_LOAN_OATH,
} from '@validations/candidate-info-management/operator/affidavit/fourthStepLiabilitiesValidation';
import { CommitmentAchievementChildType } from '@type/candidate-info-management/operator-view/affidavit-form/liabilities';
import { commitmentAchievementTableColumns } from '../formOptions';
import { commitmentAchievementFormDefaultValue } from '../defaultValue';

interface Props {
  submitData: boolean;
  openCommitmentAchievementEditModal: (childId?: string | number) => void;
}

const CommitmentAchievement = ({
  submitData,
  openCommitmentAchievementEditModal,
}: Props) => {
  const { t } = useTranslation();
  const { control, register, watch } = useFormContext();
  const checked = watch(`${LIABILITY_LOAN_OATH.NOT_ELECTED_BEFORE}`);
  const {
    fields: commitmentAchievementFields,
    append: commitmentAchievementAppend,
    remove: commitmentAchievementRemove,
  } = useFieldArray({
    control,
    name: 'commitmentAchievements',
  });
  const { electionSettingsId, candidateElectionDetailsId } = useParams();
  const { deleteCommitmentAchievementChildHandler } = useLiabilities({
    electionSettingsId,
    candidateElectionDetailsId,
  });

  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] =
    useState(false);
  const [commitmentAchievementId, seCommitmentAchievementId] = useState<
    string | number
  >();

  const openDeleteConfirmationModal = (
    id?: number | string,
    index?: number,
  ) => {
    if (id) {
      seCommitmentAchievementId(id);
      setIsOpenDeleteConfirmModal(true);
    } else {
      commitmentAchievementRemove(index);
    }
  };
  const closeDeleteConfirmationModal = () => {
    setIsOpenDeleteConfirmModal(false);
  };
  const confirmDeleteChildren = (commitmentAchievementId?: string | number) => {
    if (commitmentAchievementId) {
      deleteCommitmentAchievementChildHandler({
        electionSettingsId,
        candidateElectionDetailsId,
        commitmentAchievementId,
      });
      setIsOpenDeleteConfirmModal(false);
    }
  };
  return (
    <div className="d-flex flex-column gap-9 py-9 border-bottom">
      <div className="p-9 bg-primary-50 rounded-4 d-flex flex-column gap-9">
        <div className="row g-0">
          <div className="col-xl-4">
            <Text weight="medium" size="sm" color="title">
              {t('AFFIDAVIT_LIABILITIES.NOT_SELECTED')}
            </Text>
            <br />
            <Text weight="medium" size="sm" color="subtitle2">
              {t('AFFIDAVIT_LIABILITIES.MARK_SIGN')}
            </Text>
          </div>
          <div className="col-xl-8">
            <input
              type="checkbox"
              id={`${LIABILITY_LOAN_OATH.NOT_ELECTED_BEFORE}`}
              {...register(`${LIABILITY_LOAN_OATH.NOT_ELECTED_BEFORE}`)}
            />
          </div>
        </div>
        <Text weight="medium" size="sm" color="title">
          {t('AFFIDAVIT_LIABILITIES.SELECTED')}
        </Text>
      </div>

      {!checked && (
        <div>
          <TableSecondary columns={commitmentAchievementTableColumns(t)}>
            {commitmentAchievementFields.map(
              (childInfo: CommitmentAchievementChildType, index) => (
                <TableRow key={index}>
                  <TableData>{index + 1}</TableData>
                  <TableData>
                    <FormChildInput
                      registerName={`commitmentAchievements.${index}.${AFFIDAVIT_COMMITMENT_ACHIEVEMENTS.PROMISES}`}
                      isMinWidth
                      placeholder={t('PLACEHOLDER.ENTER')}
                      disabled={Boolean(childInfo.idx)}
                    />
                  </TableData>
                  <TableData>
                    <FormChildInput
                      registerName={`commitmentAchievements.${index}.${AFFIDAVIT_COMMITMENT_ACHIEVEMENTS.ACHIEVEMENTS}`}
                      isMinWidth
                      placeholder={t('PLACEHOLDER.ENTER')}
                      disabled={Boolean(childInfo.idx)}
                    />
                  </TableData>
                  <TableData>
                    <div className="d-flex justify-content-between">
                      <div
                        className="pointer me-7"
                        onClick={() =>
                          openCommitmentAchievementEditModal(childInfo.idx)
                        }
                      >
                        {childInfo?.idx && <IconEdit05 size="20" fill="dark" />}
                      </div>
                      <div
                        className="pointer"
                        onClick={() =>
                          openDeleteConfirmationModal(childInfo.idx, index)
                        }
                      >
                        <IconTrash03 size="20" fill="dark" />
                      </div>
                    </div>
                  </TableData>
                </TableRow>
              ),
            )}
          </TableSecondary>
          <div className="px-9 py-8 rounded-4 bg-white">
            <Button
              fill="outline"
              type="light"
              htmlType="button"
              onClick={() =>
                commitmentAchievementAppend({
                  ...commitmentAchievementFormDefaultValue,
                  id: '',
                })
              }
            >
              <IconPlus size="16" fill="dark" />
              {t('CANDIDATE_PERSONAL_INFO.CHILD_ADD_BUTTON_TEXT')}
            </Button>
            {!checked &&
              commitmentAchievementFields.length === 0 &&
              submitData && (
                <Text color="danger" className="p-10">
                  {t(
                    `AFFIDAVIT_STEP_FOUR_ERROR_MSG.COMMITMENT_ACHIEVEMENT_ERROR`,
                  )}
                </Text>
              )}
          </div>
          <ConfirmationModal
            title={`${t(
              'CANDIDATE_PERSONAL_INFO.DELETE_CHILD_CONFIRMATION_MODAL_TITLE',
            )}`}
            isOpen={isOpenDeleteConfirmModal}
            onClose={closeDeleteConfirmationModal}
            cancelButton={{
              onClick: closeDeleteConfirmationModal,
              label: `${t('CANDIDATE_PERSONAL_INFO.CANCEL_BUTTON_TEXT')}`,
              fill: 'outline',
              type: 'light',
            }}
            confirmButton={{
              onClick: () => confirmDeleteChildren(commitmentAchievementId),
              label: `${t('CANDIDATE_PERSONAL_INFO.CONFIRM_BUTTON_TEXT')}`,
              fill: 'fill',
              type: 'info',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CommitmentAchievement;
