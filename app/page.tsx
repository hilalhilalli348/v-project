'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Comments from './components/Comments';
import { VideoGrid } from './components/VideoGrid';
import { VideoModal } from './components/VideoModal';

// Hooks
import { useTheme } from './context/ThemeContext';
import { useVideoPosts } from './hooks/useVideoPosts';
import { useModal } from './hooks/useModal';
import { useScrollEffect } from './hooks/useScrollEffect';

// Types
import { Category } from './types';

export default function Home() {
  const { isDarkMode } = useTheme();
  const { posts, handleLike } = useVideoPosts();
  const {
    selectedPost,
    selectedPostId,
    isCommentsOpen,
    handleVideoClick,
    handleCloseVideo,
    handleCommentClick,
    handleCloseComments,
  } = useModal();
  const { isScrolled } = useScrollEffect();
  const [selectedCategory, setSelectedCategory] = useState<string | null>('all');

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <main className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <Navbar onCategoryChange={handleCategoryChange} />
      
      <div className={`px-4 md:px-12 lg:px-24 xl:px-0 max-w-6xl mx-auto w-full transition-all duration-300 pt-32`}>
        <VideoGrid
          posts={posts}
          onLike={handleLike}
          onComment={handleCommentClick}
          onVideoClick={handleVideoClick}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Video Detail Modal */}
      <VideoModal
        post={selectedPost}
        posts={posts}
        isDarkMode={isDarkMode}
        onClose={handleCloseVideo}
        onNavigate={handleVideoClick}
      />

      {/* Comments Modal */}
      <Comments 
        postId={selectedPostId || 0} 
        isOpen={isCommentsOpen} 
        onClose={handleCloseComments} 
      />
    </main>
  );
}
