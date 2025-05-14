const SUPPORTED_DOCUMENT_FILE = ['application/pdf'];
const FILE_SIZE = 5000000;

export const ValidateFile = (
  event: File,
  registerName: string,
  fileContainerType: string,
  setError: any,
) => {
  let data = false;
  if (event.size > FILE_SIZE) {
    setError(registerName, {
      type: 'custom',
      message: 'File size should not be greater than 5MB',
    });
  } else {
    if (!SUPPORTED_DOCUMENT_FILE.includes(event.type)) {
      setError(registerName, {
        type: 'custom',
        message: 'File type should be PDF',
      });
    } else {
      data = true;
    }
  }
  return { data };
};
