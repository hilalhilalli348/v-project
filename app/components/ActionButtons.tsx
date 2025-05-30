import React from 'react';
import { Heart, MessageCircle, Share } from 'lucide-react';

interface ActionButtonsProps {
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  onLike: () => void;
  onComment: (e?: React.MouseEvent) => void;
  onShare?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  likes,
  comments,
  shares,
  isLiked,
  onLike,
  onComment,
  onShare,
  size = 'md',
  className = '',
}) => {
  const iconSize = {
    sm: 'h-6 w-6',
    md: 'h-7 w-7',
    lg: 'h-8 w-8',
  }[size];

  const textSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-sm',
  }[size];

  return (
    <div className={`flex flex-col items-center space-y-3 ${className}`}>
      <button
        onClick={onLike}
        className="flex flex-col items-center cursor-pointer group"
      >
        <Heart 
          className={`${iconSize} transition-colors ${
            isLiked 
              ? 'text-red-500 fill-red-500' 
              : 'text-white/60 group-hover:text-red-500'
          }`} 
        />
        <span className={`text-white/60 ${textSize} group-hover:text-red-500 transition-colors`}>
          {likes}
        </span>
      </button>

      <button 
        onClick={onComment}
        className="flex flex-col items-center cursor-pointer group"
      >
        <MessageCircle className={`${iconSize} text-white/60 group-hover:text-blue-400 transition-colors`} />
        <span className={`text-white/60 ${textSize} group-hover:text-blue-400 transition-colors`}>
          {comments}
        </span>
      </button>

      <button 
        onClick={onShare}
        className="flex flex-col items-center cursor-pointer group"
      >
        <Share className={`${iconSize} text-white/60 group-hover:text-green-400 transition-colors`} />
        <span className={`text-white/60 ${textSize} group-hover:text-green-400 transition-colors`}>
          {shares}
        </span>
      </button>
    </div>
  );
}; 