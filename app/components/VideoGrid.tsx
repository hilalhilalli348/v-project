import React from 'react';
import { VideoPost } from '../types';
import { VideoCard } from './VideoCard';

interface VideoGridProps {
  posts: VideoPost[];
  onLike: (postId: number) => void;
  onComment: (postId: number, e?: React.MouseEvent) => void;
  onVideoClick: (post: VideoPost) => void;
  isDarkMode: boolean;
}

export const VideoGrid: React.FC<VideoGridProps> = ({
  posts,
  onLike,
  onComment,
  onVideoClick,
  isDarkMode,
}) => {
  return (
    <>
      {/* Mobile Layout */}
      <div className="w-full max-w-sm md:hidden mx-auto">
        {posts.map((post) => (
          <VideoCard
            key={post.id}
            post={post}
            onLike={onLike}
            onComment={onComment}
            onVideoClick={onVideoClick}
            isDarkMode={isDarkMode}
            variant="mobile"
          />
        ))}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {posts.map((post) => (
            <VideoCard
              key={post.id}
              post={post}
              onLike={onLike}
              onComment={onComment}
              onVideoClick={onVideoClick}
              isDarkMode={isDarkMode}
              variant="desktop"
            />
          ))}
        </div>
      </div>
    </>
  );
}; 