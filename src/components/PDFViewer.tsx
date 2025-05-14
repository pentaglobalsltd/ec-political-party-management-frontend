import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import classNames from 'classnames';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min?url';

import {
  IconChevronLeft,
  IconChevronRight,
  IconMinus,
  IconPlus,
} from '@pentabd/icons';
import { Button, Text } from '@pentabd/ui';
import Loader from './Loader';

interface PDFViewerProps {
  pdfURL: string;
  showList?: boolean;
  showZoom?: boolean;
  initialZoom?: number;
}
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const PDFViewer = ({
  pdfURL,
  showList,
  showZoom,
  initialZoom = 1,
}: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [isPreviousDisabled, setIsPreviousDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [zoom, setZoom] = useState<number>(initialZoom);
  // initialZoom can only be in the range of 0.5 - 3

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

  return (
    <>
      {(showList || showZoom) && (
        <div className="py-10 d-flex justify-content-evenly align-items-center gap-8 bg-dark shadow-2xl">
          {showList ? (
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
          ) : null}

          {showZoom ? (
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
          ) : null}
        </div>
      )}
      <div className="bg-light border-top h-100">
        <Document
          className="w-100"
          file={pdfURL}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<Loader />}
        >
          <div className="d-grid grid-cols-4 gap-12">
            {showList ? (
              <div className="col-span-1 vh-100 overflow-y-auto bg-dark px-10">
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

                    <Text color="light">{index + 1}</Text>
                  </div>
                ))}
              </div>
            ) : null}

            <div
              className={classNames('d-flex justify-content-center', {
                'col-span-3': showList,
                'col-span-4': !showList,
              })}
            >
              {showList ? <Page pageNumber={pageNumber} scale={zoom} /> : null}
              {!showList ? (
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
              ) : null}
            </div>
          </div>
        </Document>
      </div>
    </>
  );
};

export default PDFViewer;
