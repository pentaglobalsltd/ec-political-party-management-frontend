import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Header, Modal } from '@pentabd/ui';

import PublishModal from './components/PublishModal';
import { resultsPublishedOnWebsiteTableBreadcrumbs } from './constants';
import { searchStruct } from './searchConstants';
import { SearchComponents } from '@components/application-search/SearchComponents';

function ResultsPublishedOnWebsite() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const closePublishModal = () => {
    setIsOpen(false);
  };

  const openPublishModal = (data: any) => {
    setIsOpen(true);
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t(
            'RESULTS_PUBLISHED_ON_WEBSITE.RESULTS_PUBLISHED_ON_WEBSITE',
          ),
        }}
        breadcrumbs={resultsPublishedOnWebsiteTableBreadcrumbs(t)}
      />

      <SearchComponents
        totalCol="grid-cols-lg-10"
        colSpan="col-span-3"
        struct={searchStruct}
        isPublishButton
        onSubmitHandler={(data: any) => openPublishModal(data)}
      />

      <Modal isOpen={isOpen} closeAble overlay onClose={closePublishModal}>
        <PublishModal closePublishModal={closePublishModal} />
      </Modal>
    </div>
  );
}

export default ResultsPublishedOnWebsite;
