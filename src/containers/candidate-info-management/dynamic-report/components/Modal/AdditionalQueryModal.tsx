import { useTranslation } from 'react-i18next';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { Button, Text } from '@pentabd/ui';

import FormInputDouble from '@components/inputs/FormInputDouble';

import { mapSubmitData } from './helper';
import { MappedDynamicReportType } from '@type/candidate-info-management/dynamic-report/dynamic-report-listing-type';
import { getDigitBanglaFromEnglish } from '@utils';
import { useDynamicReportFileGenerator } from '@hooks/candidate-info-management/dynamic-report/useDynamicReportFileGenerator';

import { FORM_FIELDS } from '@constants/forms';
import { REPORT_TYPE } from '../../edit/constants';
import IconJSON from '@images/icons/IconJSON';
import IconCSV from '@images/icons/IconCSV';
import { IconExcel } from '@images/icons';

interface Props {
  reportType: string;
  handleCloseModal: () => void;
  rowData?: MappedDynamicReportType;
}

const DYNAMIC_REPORT = FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.DYNAMIC_REPORT;

const AdditionalQueryModal = ({
  handleCloseModal,
  reportType,
  rowData,
}: Props) => {
  const { t } = useTranslation();

  const { getBufferData, isLoading } = useDynamicReportFileGenerator();

  const methods = useForm({
    values: {
      additionalQuery: rowData?.conditionList.map((item) => [`${item}`]),
    },
  });

  const { control, handleSubmit } = methods;

  const { fields: additionalQueryFields } = useFieldArray({
    name: 'additionalQuery',
    control,
  });

  const onSubmit = (data: any) => {
    const mappedData = mapSubmitData(data?.additionalQuery);

    if (rowData?.id) {
      getBufferData({
        data: { mappedData, reportId: rowData.id },
        reportType,
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="p-12">
        <div className="pb-8 d-flex justify-content-center border-bottom">
          <Text weight="semibold" size="md">
            {t('DYNAMIC_REPORT.MODAL_TITLE')}
          </Text>
        </div>

        {additionalQueryFields?.map((item: any, index: number) => (
          <div key={`div.${item.id}`} className="d-flex flex-column pt-9">
            <FormInputDouble
              title=""
              placeholder={t('PLACEHOLDER.ENTER')}
              registerName={{
                type1: `additionalQuery.${index}.${[item.ungaBunga]}`,
                type2: `additionalQuery.${index}.${DYNAMIC_REPORT.VALUE}`,
              }}
              inputLabel1={`${getDigitBanglaFromEnglish(index + 1)}. ${t(
                'DYNAMIC_REPORT.MODAL_INPUT_WHERE',
              )}`}
              inputLabel2={`${getDigitBanglaFromEnglish(index + 1)}. ${t(
                'DYNAMIC_REPORT.MODAL_INPUT_VALUE',
              )}`}
              isEmbeddedMessage
              disabled1
            />
          </div>
        ))}

        <div className="d-flex flex-row-reverse pt-10 gap-5 border-top">
          <Button
            htmlType="button"
            type="light"
            className="border"
            loading={isLoading}
            onClick={() => handleSubmit(onSubmit)()}
          >
            {reportType === REPORT_TYPE.EXCEL ? (
              <IconExcel size="20" />
            ) : reportType === REPORT_TYPE.CSV ? (
              <IconCSV size="20" fill="fill-subtitle2" />
            ) : reportType === REPORT_TYPE.JSON ? (
              <IconJSON size="20" fill="fill-subtitle2" />
            ) : null}
            {t('DYNAMIC_REPORT.MODAL_DOWNLOAD')}
          </Button>

          <Button
            htmlType="button"
            type="light"
            className="border"
            disabled={isLoading}
            onClick={() => handleCloseModal()}
          >
            {t('DYNAMIC_REPORT.MODAL_RETURN')}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
};

export default AdditionalQueryModal;
