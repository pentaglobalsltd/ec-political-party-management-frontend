import { useImage } from '@hooks/miscellaneous/documents/useImage';
import { DocumentServiceType } from '@type/documents/document-service-type';

const CandidateImage = ({ image }: DocumentServiceType) => {
  const { document } = useImage({
    documentId: image?.documentId,
    fileId: image?.fileId,
    formatId: 1,
    filePath: image?.filePath,
  });

  return (
    <>
      {document && (
        <img
          src={`data:image/jpeg;base64,${document}`}
          className="rounded w-100 h-100 d-block"
          alt="candidate"
        />
      )}
    </>
  );
};

export default CandidateImage;
