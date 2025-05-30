export interface VideoPost {
  id: number;
  videoUrl: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  date: string;
  author: string;
  views: number;
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  avatar?: string;
}

export type Category = 'all' | 'trending' | 'new' | 'popular';

export interface VideoPlayerProps {
  url: string;
  playing?: boolean;
  loop?: boolean;
  muted?: boolean;
  width?: string | number;
  height?: string | number;
}

export interface VideoCardProps {
  post: VideoPost;
  onLike: (postId: number) => void;
  onComment: (postId: number, e?: React.MouseEvent) => void;
  onVideoClick: (post: VideoPost) => void;
  isDarkMode: boolean;
}

export interface VideoModalProps {
  post: VideoPost | null;
  posts: VideoPost[];
  isDarkMode: boolean;
  onClose: () => void;
  onNavigate: (post: VideoPost) => void;
} 