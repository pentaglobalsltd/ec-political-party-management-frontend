import PDFViewer from '@components/PDFViewer';

const ElectionCeremonyInformation = () => {
  const pdfUrl = 'https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK';

  return (
    <div className="container-96 mb-24">
      <PDFViewer pdfURL={pdfUrl} showList />
    </div>
  );
};

export default ElectionCeremonyInformation;
