import * as yup from 'yup';

const FILE_SIZE = 50000000;
const SUPPORTED_IMAGE_FORMATS = ['image/jpeg', 'image/png'];
const SUPPORTED_FILE_FORMATS = ['file/pdf', 'application/pdf'];

export const imageValidation = (
  size = FILE_SIZE,
  supportedFiles = SUPPORTED_IMAGE_FORMATS,
) =>
  yup
    .mixed()
    .nullable()
    .notRequired()
    .test('FILE_SIZE', 'Image file is required', (value: any) => {
      return !value || value?.length > 0;
    })
    .test('FILE_SIZE', 'Image file is too big.', (value: any) => {
      return (
        !value ||
        (value &&
          value?.length &&
          value?.length > 0 &&
          Array.from(value)?.filter(
            (item, index) => (value[index].size || 0) <= size,
          )?.length > 0)
      );
    })
    .test('FILE_FORMATE', 'Image file has unsupported format', (value: any) => {
      return (
        !value ||
        (value &&
          value?.length &&
          value?.length > 0 &&
          Array.from(value)?.filter((item, index) =>
            supportedFiles.includes(value[index].type || 'image/png'),
          )?.length > 0)
      );
    });

export const fileValidation = (
  size = FILE_SIZE,
  supportedFiles = SUPPORTED_FILE_FORMATS,
) =>
  yup
    .mixed()
    .nullable()
    .notRequired()
    .test('FILE_SIZE', 'File is required', (value: any) => {
      return !value || value?.length > 0;
    })
    .test('FILE_SIZE', 'File is too big', (value: any) => {
      return (
        !value ||
        (value &&
          value?.length &&
          value?.length > 0 &&
          Array.from(value)?.filter(
            (item, index) => (value[index].size || 0) <= size,
          )?.length > 0)
      );
    })
    .test('FILE_FORMAT', 'File has unsupported format.', (value: any) => {
      return (
        !value ||
        (value &&
          value?.length &&
          value?.length > 0 &&
          Array.from(value)?.filter((item, index) =>
            supportedFiles.includes(value[index].type || 'image/pdf'),
          )?.length > 0)
      );
    });

// --------------



export const fileRequiredValidation = () =>
  yup
    .mixed()
    .nullable()
    .test('Required', 'CUSTOM_ERROR_MSG.FILE', function (value) {
      if (value && Object.keys(value).length !== 0) {
        return true;
      } else {
        return false;
      }
    });

export const imageRequiredValidation = () =>
  yup
    .mixed()
    .nullable()
    .test(
      'Required',
      'ATTACH_FILE_ERROR_MSG.CANDIDATE_IMAGE',
      function (value) {
        if (value && Object.keys(value).length !== 0) {
          return true;
        } else {
          return false;
        }
      },
    );

export const extractDataFromBlob = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target?.result) {
        const extractedData: string = event.target.result.toString();
        resolve(extractedData);
      } else {
        reject(new Error('Failed to read the Blob.'));
      }
    };

    fileReader.onerror = () => {
      reject(new Error('Error occurred while reading the Blob.'));
    };

    // Read the contents of the Blob as text
    fileReader.readAsText(blob);
  });
};

export const extractErrorMessageFromHTML = (
  htmlContent: string,
): string | null => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const preTag = doc.querySelector('pre');

  if (preTag) {
    const errorMessage =
      preTag.textContent
        ?.trim()
        ?.replace('Error:', '')
        ?.trim()
        ?.replace(/\sat\s.*/g, '') || '';

    return errorMessage || null;
  }

  return null;
};
