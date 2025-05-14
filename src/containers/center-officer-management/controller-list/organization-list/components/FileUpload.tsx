import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import DataEntryModal from '@components/inputs/DataEntryModal';
import { FORM_FIELDS } from '@constants/forms';

import { instructionOrganizationListModal } from '../constants';

const FILE =
  FORM_FIELDS.CENTER_OFFICER_MANAGEMENT.CONTROLLER_LIST.ORGANIZATION_LIST.FILE;

function FileUpload() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const methods = useForm();

  const buttonOneOnClick = () => {};
  const buttonTwoOnClick = () => {};
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <FormProvider {...methods}>
      <form>
        <DataEntryModal
          isOpen={isModalOpen}
          closeAble
          onClose={closeModal}
          overlay
          title="ORGANIZATION_LIST.MODAL_TITLE"
          buttonText1="ORGANIZATION_LIST.BUTTON_TEXT_1"
          buttonText2="ORGANIZATION_LIST.BUTTON_TEXT_2"
          buttonOneOnClick={buttonOneOnClick}
          buttonTwoOnClick={buttonTwoOnClick}
          instructions={instructionOrganizationListModal}
          fileRegisterName={FILE}
        />
      </form>
    </FormProvider>
  );
}

export default FileUpload;
