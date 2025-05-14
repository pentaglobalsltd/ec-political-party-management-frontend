import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IconCheckCircleBroken, IconDownloadCloud01 } from '@pentabd/icons';
import { Button, Modal, Text } from '@pentabd/ui';
import { ModalProps } from '@pentabd/ui/build/atoms/modal/Modal';
import FileComponent from '@components/inputs/FileComponent';

interface Props extends ModalProps {
  title: string;
  instructions?: string | JSX.Element | JSX.Element[];
  buttonText1: string;
  buttonText2: string;
  buttonOneOnClick: () => void;
  buttonTwoOnClick: () => void;
  fileRegisterName: string;
}

const DataEntryModal = ({
  title,
  instructions,
  isOpen,
  buttonText1,
  buttonText2,
  buttonOneOnClick,
  buttonTwoOnClick,
  fileRegisterName,
  ...props
}: Props) => {
  const { t } = useTranslation();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const handleButtonDisable = (data: boolean) => {
    setButtonDisabled(data);
  };

  return (
    <Modal isOpen={isOpen} {...props}>
      <div className="p-12">
        <div className="pb-12">
          <Text size="lg" weight="semibold" component="h2" className="mb-10">
            {t(title)}
          </Text>

          <div className="bg-primary-lightest p-12 ">
            {/* Instructions goes here */}
            <div className="mb-12">{instructions}</div>

            <div className="d-flex gap-8">
              <Button
                type="primary"
                htmlType="button"
                size="sm"
                onClick={buttonOneOnClick}
              >
                <IconDownloadCloud01 size="20" fill="light" />
                <Text weight="semibold" size="sm">
                  {t(buttonText1)}
                </Text>
              </Button>
              <Button
                type="primary"
                htmlType="button"
                size="sm"
                fill="outline"
                onClick={buttonTwoOnClick}
              >
                <Text weight="semibold" size="sm">
                  {t(buttonText2)}
                </Text>
              </Button>
            </div>
          </div>
        </div>

        <FileComponent
          registerName={fileRegisterName}
          fullGridWidth={true}
          handleButtonDisable={handleButtonDisable}
        />
        <div className="d-flex flex-row-reverse py-10 px-12">
          <Button
            key={1}
            htmlType="submit"
            type="info"
            disabled={buttonDisabled}
          >
            {t('ORGANIZATION_LIST.SUBMIT')}
            <IconCheckCircleBroken size="20" fill="white" />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DataEntryModal;
