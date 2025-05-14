const SUPPORTED_IMAGE_FILE = ['image/jpeg', 'image/jpg'];
const SUPPORTED_DOCUMENT_FILE = ['application/pdf'];
const FILE_SIZE = 5; // MB
export interface FileUploadValidateFileProps {
  event: File;
  registerName: string;
  setError: any;
  fileSize?: number;
  errorMsg?: string;
  fileContainerType?: string;
}

function imageSize(event: any, setError: any, registerName: string) {
  let _URL = window.URL || window.webkitURL;
  let img: any;
  img = new Image();
  let objectUrl = _URL.createObjectURL(event);

  const promise = new Promise((resolve, reject) => {
    img.onload = () => {
      const width = img.width;
      const height = img.height;

      resolve({ width, height });
    };

    img.onerror = (error: any) => {
      setError(registerName, {
        type: 'custom',
        message: 'ATTACH_FILE_ERROR_MSG.IMAGE_TYPE',
      });

      return reject;
    };
  });

  img.src = objectUrl;

  return promise;
}

export const ValidateFile = async ({
  event,
  registerName,
  setError,
  fileSize = FILE_SIZE,
  errorMsg,
  fileContainerType,
}: FileUploadValidateFileProps) => {
  let data = false;
  if (event?.size > fileSize * 1000000) {
    setError(registerName, {
      type: 'custom',
      message: errorMsg,
    });
  } else {
    if (fileContainerType === 'image-upload') {
      let imageDimensions: any = {
        height: 0,
        width: 0,
      };

      if (SUPPORTED_IMAGE_FILE.includes(event.type)) {
        imageDimensions = await imageSize(event, setError, registerName);
      }

      if (imageDimensions.width > 300 || imageDimensions.height > 300) {
        setError(registerName, {
          type: 'custom',
          message: 'ATTACH_FILE_ERROR_MSG.IMAGE_HEIGHT_WIDTH',
        });
      } else if (!SUPPORTED_IMAGE_FILE.includes(event.type)) {
        setError(registerName, {
          type: 'custom',
          message: 'ATTACH_FILE_ERROR_MSG.IMAGE_TYPE',
        });
      } else {
        data = true;
      }
    } else {
      if (!SUPPORTED_DOCUMENT_FILE.includes(event.type)) {
        setError(registerName, {
          type: 'custom',
          message: 'ATTACH_FILE_ERROR_MSG.FILE_TYPE',
        });
      } else {
        data = true;
      }
    }
  }
  return { data };
};
