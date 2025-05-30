import React from 'react';
import dynamic from 'next/dynamic';
import { VideoPlayerProps } from '../types';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  playing = true,
  loop = true,
  muted = true,
  width = "100%",
  height = "100%",
  ...props
}) => {
  return (
    <ReactPlayer
      url={url}
      width={width}
      height={height}
      playing={playing}
      loop={loop}
      muted={muted}
      playsinline
      style={{ objectFit: 'cover' }}
      {...props}
    />
  );
}; 