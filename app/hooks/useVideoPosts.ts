import { useState } from 'react';
import { VideoPost } from '../types';
import { mockVideoPosts } from '../data/mockData';

export const useVideoPosts = () => {
  const [posts, setPosts] = useState<VideoPost[]>(mockVideoPosts);

  const handleLike = (postId: number) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked
          };
        }
        return post;
      })
    );
  };

  const getPostById = (id: number): VideoPost | undefined => {
    return posts.find(post => post.id === id);
  };

  return {
    posts,
    handleLike,
    getPostById,
  };
}; 