import React from 'react';
import { motion } from 'framer-motion';
import { VideoCardProps } from '../types';
import { VideoPlayer } from './VideoPlayer';
import { ActionButtons } from './ActionButtons';
import { formatViews } from '../utils/formatters';

interface VideoCardExtendedProps extends VideoCardProps {
  variant?: 'mobile' | 'desktop';
}

export const VideoCard: React.FC<VideoCardExtendedProps> = ({
  post,
  onLike,
  onComment,
  onVideoClick,
  isDarkMode,
  variant = 'desktop',
}) => {
  const isMobile = variant === 'mobile';

  const containerClasses = isMobile
    ? `relative h-[75vh] w-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} mb-3 rounded-lg overflow-hidden cursor-pointer`
    : `relative aspect-[4/5] ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg overflow-hidden group cursor-pointer`;

  const gradientClasses = isMobile
    ? "absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent"
    : "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/80 group-hover:via-black/40 transition-all duration-300";

  const titleClasses = isMobile
    ? "text-white text-base font-bold mb-1"
    : "text-white/80 group-hover:text-white text-base font-bold mb-2 transition-colors duration-300 line-clamp-2";

  const descriptionClasses = isMobile
    ? "text-white/80 text-xs mb-2"
    : "text-white/60 group-hover:text-white/80 text-sm mb-2 transition-colors duration-300 line-clamp-2";

  const metaClasses = isMobile
    ? "flex items-center text-white/60 text-[10px] space-x-2"
    : "flex items-center text-white/40 group-hover:text-white/60 text-[10px] space-x-2 transition-colors duration-300";

  const actionsClasses = isMobile
    ? "absolute right-3 bottom-16 flex flex-col items-center space-y-3"
    : "absolute right-4 bottom-16 flex flex-col items-center space-y-3";

  const handleClick = () => {
    if (!isMobile) {
      onVideoClick(post);
    }
  };

  const handleLikeClick = (e?: React.MouseEvent) => {
    if (e && !isMobile) {
      e.stopPropagation();
    }
    onLike(post.id);
  };

  const handleCommentClick = (e?: React.MouseEvent) => {
    if (e && !isMobile) {
      e.stopPropagation();
    }
    onComment(post.id, e);
  };

  const handleShareClick = (e?: React.MouseEvent) => {
    if (e && !isMobile) {
      e.stopPropagation();
    }
    // Share functionality can be implemented here
  };

  return (
    <motion.div
      className={containerClasses}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={!isMobile ? { scale: 1.02 } : {}}
      onClick={handleClick}
    >
      <div className="absolute inset-0">
        <VideoPlayer url={post.videoUrl} />
      </div>

      <div className={gradientClasses}>
        <div className={isMobile ? "" : "absolute bottom-0 left-0 right-0 p-4"}>
          <h2 className={titleClasses}>{post.title}</h2>
          <p className={descriptionClasses}>{post.description}</p>
          <div className={metaClasses}>
            <span>{post.author}</span>
            <span>•</span>
            <span>{formatViews(post.views)} görüntülenme</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
        </div>
      </div>

      <div className={actionsClasses}>
        <ActionButtons
          likes={post.likes}
          comments={post.comments}
          shares={post.shares}
          isLiked={post.isLiked}
          onLike={handleLikeClick}
          onComment={handleCommentClick}
          onShare={handleShareClick}
          size={isMobile ? 'lg' : 'md'}
        />
      </div>
    </motion.div>
  );
}; 