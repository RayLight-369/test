"use client";

import type React from "react";
interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ( { videoUrl, thumbnailUrl } ) => {

  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
      <video
        key={ videoUrl }
        id="generated-video"
        className="w-full h-full object-contain"
        poster={ thumbnailUrl }
        autoPlay
        controls
      >
        <source src={ videoUrl } type="video/mp4" />
        Your browser does not support the video tag.
      </video>

    </div>
  );
};

export default VideoPlayer;
