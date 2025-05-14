import { useState } from 'react';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { generateFileExtension } from '@containers/candidate-info-management/dynamic-report/edit/helper';
import { generateDynamicReportFile } from '@api/candidate-info-management/dynamic-report/dynamic-report-file-generator';

interface DataType {
  mappedData: { mapValue: { [key: string]: string } };
  reportId: number;
}

interface GetBufferDataProps {
  data: DataType;
  reportType: string;
}

interface HookReturnType {
  isLoading: boolean;
  getBufferData: ({ data, reportType }: GetBufferDataProps) => void;
}

export const useDynamicReportFileGenerator = (): HookReturnType => {
  const [isLoading, setIsLoading] = useState(false);

  const { keycloak } = useAuthWrapper();

  const getBufferData = async ({
    data,
    reportType,
  }: {
    data: any;
    reportType: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await generateDynamicReportFile({
        data,
        reportType,
        token: keycloak?.token,
      });
      if (response instanceof Blob) {
        if (!response) {
          setIsLoading(false);
          return;
        }

        if (response instanceof Blob) {
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.download = `Report.${generateFileExtension(reportType)}`;

          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    getBufferData,
  };
};
