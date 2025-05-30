import { useState } from 'react';
import { VideoPost } from '../types';

export const useModal = () => {
  const [selectedPost, setSelectedPost] = useState<VideoPost | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const handleVideoClick = (post: VideoPost) => {
    setSelectedPost(post);
    setSelectedPostId(post.id);
    setIsCommentsOpen(false);
  };

  const handleCloseVideo = () => {
    setSelectedPost(null);
    setSelectedPostId(null);
  };

  const handleCommentClick = (postId: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setSelectedPostId(postId);
    setIsCommentsOpen(true);
  };

  const handleCloseComments = () => {
    setIsCommentsOpen(false);
  };

  return {
    selectedPost,
    selectedPostId,
    isCommentsOpen,
    handleVideoClick,
    handleCloseVideo,
    handleCommentClick,
    handleCloseComments,
  };
}; 