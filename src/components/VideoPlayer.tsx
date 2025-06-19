"use client";

import type React from "react";
import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ( { videoUrl, thumbnailUrl } ) => {
  const [ isPlaying, setIsPlaying ] = useState( false );

  const handlePlayPause = () => {
    const video = document.getElementById( "generated-video" ) as HTMLVideoElement;
    if ( video ) {
      if ( isPlaying ) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying( !isPlaying );
    }
  };

  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
      <video
        id="generated-video"
        className="w-full h-full object-cover"
        poster={ thumbnailUrl }
        onPlay={ () => setIsPlaying( true ) }
        onPause={ () => setIsPlaying( false ) }
        onEnded={ () => setIsPlaying( false ) }
        controls
      >
        <source src={ videoUrl } type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      { !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <Button
            onClick={ handlePlayPause }
            size="lg"
            className="rounded-full w-16 h-16 bg-white bg-opacity-90 hover:bg-opacity-100 text-black"
          >
            <Play className="h-6 w-6 ml-1" />
          </Button>
        </div>
      ) }
    </div>
  );
};

export default VideoPlayer;
