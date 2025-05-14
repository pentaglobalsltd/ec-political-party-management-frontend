import Loader from '@components/Loader';
import {
  IconChevronLeft,
  IconChevronRight,
  IconMinus,
  IconPlus,
} from '@pentabd/icons';
import { Button, Text } from '@pentabd/ui';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min?url';

interface PDFViewerProps {
  pdfBuffer: Blob | null;
  showList?: boolean;
  showZoom?: boolean;
  initialZoom?: number;
  handlePrint: () => void;
  buttonLabelDownload?: string;
}

// Initialize pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const PDFViewer: React.FC<PDFViewerProps> = ({
  pdfBuffer,
  showList,
  showZoom,
  initialZoom = 1,
  handlePrint,
  buttonLabelDownload,
}: PDFViewerProps) => {
  const { t } = useTranslation();
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isPreviousDisabled, setIsPreviousDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [zoom, setZoom] = useState<number>(initialZoom);

  useEffect(() => {
    if (pageNumber <= 1) {
      setIsPreviousDisabled(true);
    } else {
      setIsPreviousDisabled(false);
    }

    if (pageNumber >= numPages) {
      setIsNextDisabled(true);
    } else {
      setIsNextDisabled(false);
    }
  }, [pageNumber, numPages]);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: any) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  const previousPage = () => {
    if (pageNumber <= 1) {
      setIsPreviousDisabled(true);
      return;
    }
    changePage(-1);
  };

  const nextPage = () => {
    if (pageNumber >= numPages) {
      setIsNextDisabled(true);
      return;
    }
    changePage(1);
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.25, 3)); // Increase zoom by 0.1, up to a maximum of 3
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.25, 0.5)); // Decrease zoom by 0.1, down to a minimum of 0.5
  };

  useEffect(() => {
    if (pdfBuffer && pdfBuffer instanceof Blob) {
      const pdfUrl = URL.createObjectURL(pdfBuffer);
      pdfjs
        .getDocument(pdfUrl)
        .promise.then((pdf) => {
          setNumPages(pdf.numPages);
        })
        .catch((error) => {
          console.error('Error occurred while loading PDF:', error);
        });
    }
  }, [pdfBuffer]);

  return (
    <>
      {pdfBuffer && pdfBuffer instanceof Blob && (
        <>
          <div className="bg-primary rounded-top-5">
            <div className="d-flex justify-content-between py-7 px-14">
              {showList && (
                <div className="d-flex gap-8 align-items-center">
                  <Button
                    size="sm"
                    type="light"
                    fill="outline"
                    onClick={previousPage}
                    disabled={isPreviousDisabled}
                  >
                    <IconChevronLeft size="20" fill="light" />
                  </Button>
                  <Text color="light">
                    {pageNumber} / {numPages}
                  </Text>
                  <Button
                    size="sm"
                    type="light"
                    fill="outline"
                    onClick={nextPage}
                    disabled={isNextDisabled}
                  >
                    <IconChevronRight size="20" fill="light" />
                  </Button>
                </div>
              )}

              {showZoom && (
                <div className="d-flex gap-8 align-items-center">
                  <Button
                    type="light"
                    size="sm"
                    fill="outline"
                    onClick={handleZoomOut}
                  >
                    <IconMinus size="20" fill="light" />
                  </Button>
                  <Text color="light">{`${zoom * 100}%`}</Text>
                  <Button
                    type="light"
                    fill="outline"
                    size="sm"
                    onClick={handleZoomIn}
                  >
                    <IconPlus size="20" fill="light" />
                  </Button>
                </div>
              )}
              <div>
                <Button size="md" onClick={handlePrint}>
                  <Text color="primary" weight="normal">
                    {buttonLabelDownload
                      ? buttonLabelDownload
                      : t('MESSAGE_SEND_LIST_PREPARE.PRINT')}
                  </Text>
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-light border">
            <Document
              className="w-100"
              file={pdfBuffer}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<Loader />}
            >
              <div className="d-grid grid-cols-4 gap-12">
                {showList && (
                  <div className="col-span-1 overflow-y-auto bg-dark px-10">
                    {[...Array(numPages)].map((item, index) => (
                      <div
                        key={index}
                        className={classNames(
                          'd-flex flex-column align-items-center pointer',
                          {
                            'opacity-50': pageNumber !== index + 1,
                          },
                        )}
                        onClick={() => setPageNumber(index + 1)}
                      >
                        <Page pageNumber={index + 1} scale={0.3} />

                        <Text color="dark">{index + 1}</Text>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className={classNames('d-flex justify-content-center', {
                    'col-span-3': showList,
                    'col-span-4': !showList,
                  })}
                >
                  {showList && <Page pageNumber={pageNumber} scale={zoom} />}
                  {!showList && (
                    <div className="d-flex flex-column vh-100 overflow-x-hidden overflow-y-auto">
                      {[...Array(numPages)].map((item, index) => (
                        <div
                          key={index}
                          className="d-flex flex-column align-items-center pointer"
                          onClick={() => setPageNumber(index + 1)}
                        >
                          <Page pageNumber={index + 1} scale={zoom} />

                          <Text color="light">{index + 1}</Text>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Document>
          </div>
        </>
      )}
    </>
  );
};

export default PDFViewer;
