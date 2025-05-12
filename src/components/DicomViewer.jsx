import React, { useEffect, useRef, useState } from 'react';
import { App } from 'dwv';
import '../styles/DicomViewer.css';


const DicomViewer = ({ file }) => {
  const viewerRef = useRef(null);
  const [jpegUrl, setJpegUrl] = useState(null);

  useEffect(() => {
    if (!file || !viewerRef.current) return;

    const app = new App();
    app.init({
      containerDivId: viewerRef.current.id,
      tools: ['Scroll'],
    });

    const fileUrl = URL.createObjectURL(file);
    app.loadURLs([fileUrl]);

    app.addEventListener('load', () => {
      // After image is loaded, extract canvas and convert to JPEG
      const canvas = viewerRef.current.querySelector('canvas');
      if (canvas) {
        const jpegDataUrl = canvas.toDataURL('image/jpeg');
        setJpegUrl(jpegDataUrl);
      }
    });

    return () => {
      URL.revokeObjectURL(fileUrl);
    };
  }, [file]);

  return (
    <div>
      <div
        id="dwv-container"
        ref={viewerRef}
        style={{ width: '100%', height: '512px', backgroundColor: '#000' }}
      />
      {jpegUrl && (
        <div style={{ marginTop: '20px' }}>
          <h3>JPEG Preview:</h3>
          <img src={jpegUrl} alt="Converted DICOM" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default DicomViewer;
