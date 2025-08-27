"use client";
import { useState } from "react";

interface VideoPlayerProps {
  src: string;
  width?: number;
  height?: number;
  title?: string;
  isExternal?: boolean;
  embedId?: string;
}

export default function VideoPlayer({ src, width = 600, height = 400, title = "Tutorial Video", isExternal = false, embedId }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadStart = () => setIsLoading(true);
  const handleCanPlay = () => setIsLoading(false);
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Handle Google Drive embed
  if (isExternal && embedId) {
    const driveEmbedUrl = `https://drive.google.com/file/d/${embedId}/preview`;
    return (
      <div style={{ position: "relative", width: `${width}px`, maxWidth: "100%" }}>
        <iframe
          src={driveEmbedUrl}
          width={width}
          height={height}
          allow="autoplay"
          style={{ borderRadius: "8px", border: "none" }}
          title={title}
        />
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: `${width}px`, maxWidth: "100%" }}>
      {isLoading && !hasError && (
        <div style={{ 
          position: "absolute", 
          top: "50%", 
          left: "50%", 
          transform: "translate(-50%, -50%)",
          zIndex: 1
        }}>
          Loading video...
        </div>
      )}
      
      {hasError ? (
        <div style={{ 
          width: `${width}px`, 
          height: `${height}px`, 
          backgroundColor: "#f0f0f0", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          border: "2px dashed #ccc",
          borderRadius: "8px"
        }}>
          <div style={{ textAlign: "center", color: "#666" }}>
            <p>📹 Video not available</p>
            <p style={{ fontSize: "0.9rem" }}>Upload tutorial.mp4 to /public/ directory</p>
          </div>
        </div>
      ) : (
        <video 
          controls 
          width={width}
          height={height}
          aria-label={title}
          onLoadStart={handleLoadStart}
          onCanPlay={handleCanPlay}
          onError={handleError}
          style={{ borderRadius: "8px" }}
        >
          <source src={src} type="video/mp4" />
          <source src={src} type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}