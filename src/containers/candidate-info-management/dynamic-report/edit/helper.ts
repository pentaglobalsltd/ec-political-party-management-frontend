export const generateFileExtension = (reportType: string) => {
  switch (reportType) {
    case 'csv':
      return 'csv';

    case 'json':
      return 'json';

    case 'excel':
      return 'xlsx';

    default:
      return 'unknown';
  }
};
