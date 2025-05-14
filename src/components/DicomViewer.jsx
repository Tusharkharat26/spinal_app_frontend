import React, { useEffect, useRef, useState } from 'react';
import { App } from 'dwv';
import '../styles/DicomViewer.css'; // Your custom CSS (not DWV's, as DWV may not have it in NPM build)

const DicomViewer = ({ file }) => {
  const viewerRef = useRef(null);
  const [jpegUrl, setJpegUrl] = useState(null);

  useEffect(() => {
    if (!file || !viewerRef.current) return;

    const app = new App();
    app.init({
      containerDivId: viewerRef.current.id
      // ❌ Removed tools: DWV NPM builds sometimes fail with this
    });

    const fileUrl = URL.createObjectURL(file);
    app.loadURLs([fileUrl]);

    app.addEventListener('load', () => {
      setTimeout(() => {
        const canvas = viewerRef.current?.querySelector('canvas');
        if (canvas) {
          const jpegDataUrl = canvas.toDataURL('image/jpeg');
          setJpegUrl(jpegDataUrl);
        } else {
          console.warn('No canvas found.');
        }
      }, 500);
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
