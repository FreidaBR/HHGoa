import React, { useEffect, useRef, useState } from 'react';
import { soundFX } from '../utils/sound';
import { IconUpload, IconCamera } from './icons/DetailsIcons';

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });

const DetailsPhotoPicker = ({ photo, zoom = 1, onPhotoChange, onZoomChange, compact = false }) => {
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState('');

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  useEffect(() => () => stopCamera(), []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    soundFX.playClick();
    try {
      onPhotoChange(await readFileAsDataUrl(file));
    } catch {
      setCameraError('Could not read that image. Try another file.');
    }
    e.target.value = '';
  };

  const openCamera = async () => {
    soundFX.playClick();
    setCameraError('');
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError('Camera is not supported in this browser.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 1280 } },
        audio: false,
      });
      streamRef.current = stream;
      setCameraOpen(true);
    } catch {
      setCameraError('Camera access was denied or unavailable.');
    }
  };

  useEffect(() => {
    if (cameraOpen && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [cameraOpen]);

  const closeCamera = () => {
    stopCamera();
    setCameraOpen(false);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video?.videoWidth) return;
    soundFX.playClick();
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    onPhotoChange(canvas.toDataURL('image/jpeg', 0.92));
    closeCamera();
  };

  const adjustZoom = (delta) => {
    soundFX.playClick();
    const next = Math.min(Math.max(0.5, (zoom || 1) + delta), compact ? 2.5 : 3);
    onZoomChange(parseFloat(next.toFixed(1)));
  };

  const clearPhoto = () => {
    soundFX.playClick();
    onPhotoChange(null);
  };

  return (
    <>
      <section className="details-photo">
        <div className="details-photo-row">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            accept="image/*"
            className="sr-only"
            aria-hidden="true"
          />

          <div className={`details-photo-box ${photo ? 'has-photo' : ''}`} aria-label="Photo preview">
            {photo ? (
              <img
                src={photo}
                alt=""
                className="details-photo-img"
                style={{ transform: `scale(${zoom || 1})` }}
              />
            ) : (
              <span className="details-photo-placeholder">
                <IconCamera />
                <span>No photo yet</span>
              </span>
            )}
          </div>

          <div className="details-photo-controls">
            <div className="details-photo-source-btns">
              <button
                type="button"
                className="details-source-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                <IconUpload />
                Upload
              </button>
              <button type="button" className="details-source-btn" onClick={openCamera}>
                <IconCamera />
                Camera
              </button>
            </div>

            <div className="details-photo-zoom">
              <span className="details-photo-zoom-label">Zoom</span>
              <span className="details-photo-zoom-val">×{(zoom || 1).toFixed(1)}</span>
            </div>
            <div className="details-photo-btns">
              <button type="button" className="details-chip-btn" onClick={() => adjustZoom(-0.1)}>
                Out
              </button>
              <button type="button" className="details-chip-btn" onClick={() => adjustZoom(0.1)}>
                In
              </button>
              {photo && (
                <button type="button" className="details-chip-btn details-chip-danger" onClick={clearPhoto}>
                  Clear
                </button>
              )}
            </div>
            {!compact && (
              <p className="details-photo-note">Processed on your device — nothing is uploaded to a server.</p>
            )}
            {cameraError && !cameraOpen && (
              <p className="details-photo-error" role="alert">{cameraError}</p>
            )}
          </div>
        </div>
      </section>

      {cameraOpen && (
        <div className="details-camera-modal" role="dialog" aria-modal="true" aria-label="Take a photo">
          <div className="details-camera-panel">
            <div className="details-camera-head">
              <span>Take your photo</span>
              <button type="button" className="details-camera-close" onClick={closeCamera}>
                Close
              </button>
            </div>
            <div className="details-camera-view">
              <video ref={videoRef} autoPlay playsInline muted className="details-camera-video" />
            </div>
            <button type="button" className="details-camera-capture" onClick={capturePhoto}>
              Capture photo
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsPhotoPicker;
