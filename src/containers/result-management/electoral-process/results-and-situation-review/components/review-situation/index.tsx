import { useState } from 'react';
import { TFunction } from 'i18next';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import { Expendable, Modal, Table, Text } from '@pentabd/ui';
import {
  getPhotoOfElectionCenterTableColumns,
  getPhotoOfElectionCenterTableRows,
  getReviewSituationTableColumns,
  getReviewSituationTableRows,
  getSpecialMessageTableColumns,
  getSpecialMessageTableRows,
  getVoterTurnoutTableColumns,
  getVoterTurnoutTableRows,
} from '../../constants';
import CenterModal from './components/CenterModal';
import CenterResultModal from './components/CenterResultModal';

interface ReviewSituationProps {
  t: TFunction<'translation', undefined>;
}

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

const ReviewSituation = (props: ReviewSituationProps) => {
  const { t } = props;

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isCenterModalOpen, setIsCenterModalOpen] = useState<boolean>(false);
  const [isCenterResultModalOpen, setIsCenterResultModalOpen] =
    useState<boolean>(false);

  const openPhotoModal = () => {
    setIsPhotoModalOpen(true);
  };

  const closePhotoModal = () => {
    setIsPhotoModalOpen(false);
  };

  const openCenterModal = () => {
    setIsCenterModalOpen(true);
  };

  const closeCenterModal = () => {
    setIsCenterModalOpen(false);
  };

  const openCenterResultModal = () => {
    setIsCenterResultModalOpen(true);
  };

  const closeCenterResultModal = () => {
    setIsCenterResultModalOpen(false);
  };

  return (
    <div>
      <div className="mt-8 mb-8">
        <Text weight="bold" size="md" color="black">
          {t('RESULT_AND_SITUATION_REVIEW.CURRENT_EVENT')}
        </Text>
      </div>

      <Expendable title={t('RESULT_AND_SITUATION_REVIEW.REVIEW_THE_SITUATION')}>
        <Table
          rows={getReviewSituationTableRows()}
          columns={getReviewSituationTableColumns(t, openCenterModal)}
          pagination={{ language: 'bn', totalPage: 1 }}
        />
        <Modal
          key={1}
          isOpen={isCenterModalOpen}
          closeAble
          overlay
          portal
          onClose={closeCenterModal}
        >
          <CenterModal />
        </Modal>
      </Expendable>

      <div className="mt-10 mb-10">
        <Expendable title={t('RESULT_AND_SITUATION_REVIEW.VOTER_TURNOUT')}>
          <Table
            rows={getVoterTurnoutTableRows()}
            columns={getVoterTurnoutTableColumns(t, openCenterResultModal)}
            pagination={{ language: 'bn', totalPage: 1 }}
          />
          <Modal
            key={2}
            isOpen={isCenterResultModalOpen}
            closeAble
            overlay
            portal
            onClose={closeCenterResultModal}
          >
            <CenterResultModal />
          </Modal>
        </Expendable>
      </div>

      <div className="mb-10">
        <Expendable title={t('RESULT_AND_SITUATION_REVIEW.SPECIAL_MESSAGE')}>
          <Table
            rows={getSpecialMessageTableRows()}
            columns={getSpecialMessageTableColumns(t)}
            pagination={{ language: 'bn', totalPage: 1 }}
          />
        </Expendable>
      </div>

      <div className="mb-10">
        <Expendable
          title={t('RESULT_AND_SITUATION_REVIEW.PHOTO_OF_ELECTION_CENTER')}
        >
          <Table
            rows={getPhotoOfElectionCenterTableRows()}
            columns={getPhotoOfElectionCenterTableColumns(t, openPhotoModal)}
            pagination={{ language: 'bn', totalPage: 1 }}
          />
          <Modal
            key={3}
            isOpen={isPhotoModalOpen}
            onClose={closePhotoModal}
            overlay
          >
            <ImageGallery items={images} />
          </Modal>
        </Expendable>
      </div>
    </div>
  );
};

export default ReviewSituation;
