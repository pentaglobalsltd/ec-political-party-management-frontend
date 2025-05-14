import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FORM_FIELDS } from '@constants/forms';
import { Instructions } from '../constants';

import DataEntryModal from '@components/inputs/DataEntryModal';

const OFFICER_LIST =
  FORM_FIELDS.CENTER_OFFICER_MANAGEMENT.CONTROLLER_LIST.OFFICER_LIST;

function FileUpload() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation();
  const methods = useForm();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const downloadExcel = () => {};
  const downloadInstitueType = () => {};

  return (
    <>
      <FormProvider {...methods}>
        <form>
          <DataEntryModal
            isOpen={isModalOpen}
            closeAble
            onClose={closeModal}
            overlay
            title={t('OFFICER_LIST.MODAL_TITLE')}
            buttonText1="OFFICER_LIST.DOWNLOAD_EXCEL"
            buttonText2="OFFICER_LIST.DOWNLOAD_INSTITUTE_TYPE"
            instructions={Instructions(t)}
            buttonOneOnClick={downloadExcel}
            buttonTwoOnClick={downloadInstitueType}
            fileRegisterName={OFFICER_LIST.FILE}
          />
        </form>
      </FormProvider>
    </>
  );
}

export default FileUpload;
