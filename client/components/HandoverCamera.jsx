"use client";
import React, { useRef, useState, useEffect } from 'react';

export default function HandoverCamera({ onCapture }) {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Cleanup: Properly stop tracks to release hardware
    return () => {
      if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, [stream]);

  const startCamera = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: "environment" } // Rear camera for tool inspection
    });
    videoRef.current.srcObject = mediaStream;
    setStream(mediaStream);
  };

  const capture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    
    onCapture(canvas.toDataURL('image/jpeg'));
    setStream(null);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <video ref={videoRef} autoPlay playsInline className="rounded-3xl w-full bg-black aspect-video" />
      {!stream? (
        <button onClick={startCamera} className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold">
          START VISUAL AUDIT
        </button>
      ) : (
        <button onClick={capture} className="bg-green-600 text-white px-8 py-3 rounded-full font-bold animate-pulse">
          CAPTURE CONDITION
        </button>
      )}
    </div>
  );
}