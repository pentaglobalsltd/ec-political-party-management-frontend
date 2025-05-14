import { URLS } from '@constants/urls';

export default function ImageViewer({ imagePath, usePublicPath = false }: any) {
  return (
    <div className="election-symbol-container">
      {imagePath &&
        (usePublicPath ? (
          <img
            src={`${import.meta.env.VITE_PUBLIC_DOCUMENT_UPLOAD_URL}${
              URLS.CREATE_DOCUMENT_SERVICE
            }/${imagePath}`}
            className="allocated-symbol"
            alt="protik-symbol"
          />
        ) : (
          <img
            src={`/${imagePath}`}
            className="allocated-symbol"
            alt="protik-symbol"
          />
        ))}
    </div>
  );
}
