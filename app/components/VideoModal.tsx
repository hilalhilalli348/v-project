import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { VideoModalProps } from '../types';
import { VideoPlayer } from './VideoPlayer';

export const VideoModal: React.FC<VideoModalProps> = ({
  post,
  posts,
  isDarkMode,
  onClose,
  onNavigate,
}) => {
  if (!post) return null;

  const currentIndex = posts.findIndex(p => p.id === post.id);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < posts.length - 1;

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (canGoPrevious) {
      onNavigate(posts[currentIndex - 1]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (canGoNext) {
      onNavigate(posts[currentIndex + 1]);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 ${isDarkMode ? 'bg-black/90' : 'bg-white/90'} z-50 flex items-center justify-center p-4 cursor-default`}
        onClick={onClose}
      >
        <div 
          className={`w-full max-w-7xl h-[90vh] ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg overflow-hidden flex mx-auto`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left Side - Video Player */}
          <div className="w-2/5 h-full bg-black relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 z-10">
              <button 
                onClick={handlePrevious}
                disabled={!canGoPrevious}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button 
                onClick={handleNext}
                disabled={!canGoNext}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </div>

            <VideoPlayer url={post.videoUrl} />
          </div>

          {/* Right Side - Video Info */}
          <div className={`w-3/5 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} p-6 flex flex-col`}>
            <div className="mb-4">
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                {post.title}
              </h1>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                {post.description}
              </p>
              <div className={`flex items-center space-x-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.views} görüntülenme</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
            </div>

            {/* Interaction Stats */}
            <div className={`flex items-center space-x-6 py-4 border-t border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              <div className="flex items-center space-x-2">
                <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-semibold`}>
                  {post.likes}
                </span>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Beğeni
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-semibold`}>
                  {post.comments}
                </span>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Yorum
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-semibold`}>
                  {post.shares}
                </span>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Paylaşım
                </span>
              </div>
            </div>

            {/* Comments section could be added here */}
            <div className="flex-1 pt-4">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Yorumlar
              </h3>
              <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>
                Henüz yorum yapılmamış
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}; 