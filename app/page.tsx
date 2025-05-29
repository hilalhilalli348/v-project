'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon, ChatBubbleLeftIcon, ShareIcon, EyeIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import dynamic from 'next/dynamic';
import Comments from './components/Comments';
import Navbar from './components/Navbar';
import { useTheme } from './context/ThemeContext';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

interface VideoPost {
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

export default function Home() {
  const { isDarkMode } = useTheme();
  const [posts, setPosts] = useState<VideoPost[]>([
    {
      id: 1,
      videoUrl: 'https://example.com/video1.mp4',
      title: 'Örnek İlan 1',
      description: 'Harika bir ürün!',
      likes: 120,
      comments: 45,
      shares: 23,
      isLiked: false,
      date: '2 saat önce',
      author: 'Kullanıcı1',
      views: 1234
    },
    {
      id: 2,
      videoUrl: 'https://example.com/video2.mp4',
      title: 'Örnek İlan 2',
      description: 'Süper fırsat!',
      likes: 85,
      comments: 32,
      shares: 15,
      isLiked: false,
      date: '5 saat önce',
      author: 'Kullanıcı2',
      views: 856
    },
    {
      id: 3,
      videoUrl: 'https://example.com/video3.mp4',
      title: 'Örnek İlan 3',
      description: 'Kaçırılmayacak fırsat!',
      likes: 210,
      comments: 67,
      shares: 45,
      isLiked: false,
      date: '1 gün önce',
      author: 'Kullanıcı3',
      views: 2345
    },
    {
      id: 4,
      videoUrl: 'https://example.com/video4.mp4',
      title: 'Örnek İlan 4',
      description: 'İnanılmaz indirim!',
      likes: 150,
      comments: 55,
      shares: 30,
      isLiked: false,
      date: '2 gün önce',
      author: 'Kullanıcı4',
      views: 1890
    },
    {
      id: 5,
      videoUrl: 'https://example.com/video5.mp4',
      title: 'Örnek İlan 5',
      description: 'Sınırlı süre!',
      likes: 180,
      comments: 62,
      shares: 38,
      isLiked: false,
      date: '3 gün önce',
      author: 'Kullanıcı5',
      views: 1567
    },
    {
      id: 6,
      videoUrl: 'https://example.com/video6.mp4',
      title: 'Örnek İlan 6',
      description: 'Yeni koleksiyon!',
      likes: 95,
      comments: 28,
      shares: 12,
      isLiked: false,
      date: '4 gün önce',
      author: 'Kullanıcı6',
      views: 987
    },
    {
      id: 7,
      videoUrl: 'https://example.com/video7.mp4',
      title: 'Örnek İlan 7',
      description: 'Özel teklif!',
      likes: 165,
      comments: 48,
      shares: 25,
      isLiked: false,
      date: '5 gün önce',
      author: 'Kullanıcı7',
      views: 1456
    },
    {
      id: 8,
      videoUrl: 'https://example.com/video8.mp4',
      title: 'Örnek İlan 8',
      description: 'Son fırsat!',
      likes: 142,
      comments: 39,
      shares: 18,
      isLiked: false,
      date: '6 gün önce',
      author: 'Kullanıcı8',
      views: 1324
    },
    {
      id: 9,
      videoUrl: 'https://example.com/video9.mp4',
      title: 'Örnek İlan 9',
      description: 'Büyük indirim!',
      likes: 178,
      comments: 52,
      shares: 29,
      isLiked: false,
      date: '1 hafta önce',
      author: 'Kullanıcı9',
      views: 1678
    },
    {
      id: 10,
      videoUrl: 'https://example.com/video10.mp4',
      title: 'Örnek İlan 10',
      description: 'Yeni ürün!',
      likes: 132,
      comments: 41,
      shares: 22,
      isLiked: false,
      date: '1 hafta önce',
      author: 'Kullanıcı10',
      views: 1245
    },
    {
      id: 11,
      videoUrl: 'https://example.com/video11.mp4',
      title: 'Örnek İlan 11',
      description: 'Özel koleksiyon!',
      likes: 198,
      comments: 58,
      shares: 32,
      isLiked: false,
      date: '1 hafta önce',
      author: 'Kullanıcı11',
      views: 1876
    },
    {
      id: 12,
      videoUrl: 'https://example.com/video12.mp4',
      title: 'Örnek İlan 12',
      description: 'Sezon sonu!',
      likes: 145,
      comments: 44,
      shares: 21,
      isLiked: false,
      date: '2 hafta önce',
      author: 'Kullanıcı12',
      views: 1345
    },
    {
      id: 13,
      videoUrl: 'https://example.com/video13.mp4',
      title: 'Örnek İlan 13',
      description: 'Yeni sezon!',
      likes: 167,
      comments: 49,
      shares: 27,
      isLiked: false,
      date: '2 hafta önce',
      author: 'Kullanıcı13',
      views: 1567
    },
    {
      id: 14,
      videoUrl: 'https://example.com/video14.mp4',
      title: 'Örnek İlan 14',
      description: 'Özel fırsat!',
      likes: 188,
      comments: 54,
      shares: 31,
      isLiked: false,
      date: '2 hafta önce',
      author: 'Kullanıcı14',
      views: 1789
    },
    {
      id: 15,
      videoUrl: 'https://example.com/video15.mp4',
      title: 'Örnek İlan 15',
      description: 'Sınırlı stok!',
      likes: 156,
      comments: 47,
      shares: 26,
      isLiked: false,
      date: '3 hafta önce',
      author: 'Kullanıcı15',
      views: 1456
    },
    {
      id: 16,
      videoUrl: 'https://example.com/video16.mp4',
      title: 'Örnek İlan 16',
      description: 'Yeni tasarım!',
      likes: 175,
      comments: 51,
      shares: 28,
      isLiked: false,
      date: '3 hafta önce',
      author: 'Kullanıcı16',
      views: 1654
    },
    {
      id: 17,
      videoUrl: 'https://example.com/video17.mp4',
      title: 'Örnek İlan 17',
      description: 'Özel indirim!',
      likes: 143,
      comments: 42,
      shares: 23,
      isLiked: false,
      date: '3 hafta önce',
      author: 'Kullanıcı17',
      views: 1345
    },
    {
      id: 18,
      videoUrl: 'https://example.com/video18.mp4',
      title: 'Örnek İlan 18',
      description: 'Yeni koleksiyon!',
      likes: 167,
      comments: 48,
      shares: 25,
      isLiked: false,
      date: '4 hafta önce',
      author: 'Kullanıcı18',
      views: 1567
    },
    {
      id: 19,
      videoUrl: 'https://example.com/video19.mp4',
      title: 'Örnek İlan 19',
      description: 'Son fırsat!',
      likes: 134,
      comments: 39,
      shares: 20,
      isLiked: false,
      date: '4 hafta önce',
      author: 'Kullanıcı19',
      views: 1234
    },
    {
      id: 20,
      videoUrl: 'https://example.com/video20.mp4',
      title: 'Örnek İlan 20',
      description: 'Büyük indirim!',
      likes: 189,
      comments: 55,
      shares: 33,
      isLiked: false,
      date: '4 hafta önce',
      author: 'Kullanıcı20',
      views: 1789
    }
  ]);

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<VideoPost | null>(null);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
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

  const handleVideoClick = (post: VideoPost) => {
    setSelectedPost(post);
    setSelectedPostId(post.id);
    setIsCommentsOpen(false);
  };

  const handleCloseVideo = () => {
    setSelectedPost(null);
    setSelectedPostId(null);
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  return (
    <main className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <Navbar 
        onCategoryChange={setSelectedCategory}
      />
      
      <div className={`px-4 md:px-12 lg:px-24 xl:px-0 max-w-6xl mx-auto w-full transition-all duration-300 pt-32`}>
        {/* Mobil görünüm */}
        <div className="w-full max-w-sm md:hidden mx-auto">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              className={`relative h-[75vh] w-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} mb-3 rounded-lg overflow-hidden cursor-pointer`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0">
                <ReactPlayer
                  url={post.videoUrl}
                  width="100%"
                  height="100%"
                  playing
                  loop
                  muted
                  playsinline
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <h2 className="text-white text-base font-bold mb-1">{post.title}</h2>
                <p className="text-white/80 text-xs mb-2">{post.description}</p>
                <div className="flex items-center text-white/60 text-[10px] space-x-2">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{formatViews(post.views)} görüntülenme</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
              </div>

              <div className="absolute right-3 bottom-16 flex flex-col items-center space-y-3">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  {post.isLiked ? (
                    <HeartIconSolid className="h-8 w-8 text-red-500" />
                  ) : (
                    <HeartIcon className="h-8 w-8 text-white group-hover:text-red-500 transition-colors" />
                  )}
                  <span className="text-white text-sm group-hover:text-red-500 transition-colors">{post.likes}</span>
                </button>

                <button 
                  onClick={() => handleCommentClick(post.id)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <ChatBubbleLeftIcon className="h-8 w-8 text-white group-hover:text-blue-400 transition-colors" />
                  <span className="text-white text-sm group-hover:text-blue-400 transition-colors">{post.comments}</span>
                </button>

                <button className="flex flex-col items-center cursor-pointer group">
                  <ShareIcon className="h-8 w-8 text-white group-hover:text-green-400 transition-colors" />
                  <span className="text-white text-sm group-hover:text-green-400 transition-colors">{post.shares}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Masaüstü görünüm */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                className={`relative aspect-[4/5] ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg overflow-hidden group cursor-pointer`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleVideoClick(post)}
              >
                <div className="absolute inset-0">
                  <ReactPlayer
                    url={post.videoUrl}
                    width="100%"
                    height="100%"
                    playing
                    loop
                    muted
                    playsinline
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/80 group-hover:via-black/40 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-white/80 group-hover:text-white text-base font-bold mb-2 transition-colors duration-300 line-clamp-2">{post.title}</h2>
                    <p className="text-white/60 group-hover:text-white/80 text-sm mb-2 transition-colors duration-300 line-clamp-2">{post.description}</p>
                    <div className="flex items-center text-white/40 group-hover:text-white/60 text-[10px] space-x-2 transition-colors duration-300">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{formatViews(post.views)} görüntülenme</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                  </div>

                  <div className="absolute right-4 bottom-16 flex flex-col items-center space-y-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(post.id);
                      }}
                      className="flex flex-col items-center cursor-pointer group"
                    >
                      {post.isLiked ? (
                        <HeartIconSolid className="h-7 w-7 text-red-500" />
                      ) : (
                        <HeartIcon className="h-7 w-7 text-white/60 group-hover:text-red-500 transition-colors" />
                      )}
                      <span className="text-white/60 text-sm group-hover:text-red-500 transition-colors">{post.likes}</span>
                    </button>

                    <button 
                      onClick={(e) => handleCommentClick(post.id, e)}
                      className="flex flex-col items-center cursor-pointer group"
                    >
                      <ChatBubbleLeftIcon className="h-7 w-7 text-white/60 group-hover:text-blue-400 transition-colors" />
                      <span className="text-white/60 text-sm group-hover:text-blue-400 transition-colors">{post.comments}</span>
                    </button>

                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="flex flex-col items-center cursor-pointer group"
                    >
                      <ShareIcon className="h-7 w-7 text-white/60 group-hover:text-green-400 transition-colors" />
                      <span className="text-white/60 text-sm group-hover:text-green-400 transition-colors">{post.shares}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 ${isDarkMode ? 'bg-black/90' : 'bg-white/90'} z-50 flex items-center justify-center p-4 cursor-default`}
            onClick={handleCloseVideo}
          >
            <div 
              className={`w-full max-w-7xl h-[90vh] ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg overflow-hidden flex mx-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Side - Video Player */}
              <div className="w-2/5 h-full bg-black relative">
                <button
                  onClick={handleCloseVideo}
                  className="absolute top-4 right-4 z-20 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors cursor-pointer"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>

                {/* Navigation Buttons */}
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 z-10">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const currentIndex = posts.findIndex(p => p.id === selectedPost?.id);
                      if (currentIndex > 0) {
                        handleVideoClick(posts[currentIndex - 1]);
                      }
                    }}
                    className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors cursor-pointer"
                  >
                    <ChevronLeftIcon className="h-8 w-8" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const currentIndex = posts.findIndex(p => p.id === selectedPost?.id);
                      if (currentIndex < posts.length - 1) {
                        handleVideoClick(posts[currentIndex + 1]);
                      }
                    }}
                    className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors cursor-pointer"
                  >
                    <ChevronRightIcon className="h-8 w-8" />
                  </button>
                </div>

                <ReactPlayer
                  url={selectedPost.videoUrl}
                  width="100%"
                  height="100%"
                  playing
                  controls
                  style={{ objectFit: 'contain' }}
                />
              </div>

              {/* Right Side - Details and Comments */}
              <div className="w-3/5 h-full flex flex-col bg-gray-900 border-l border-white/10">
                {/* Video Info */}
                <div className="p-4 border-b border-white/10">
                  <h2 className="text-white text-lg font-bold mb-2">{selectedPost.title}</h2>
                  <p className="text-white/80 text-sm mb-4">{selectedPost.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleLike(selectedPost.id)}
                        className="flex items-center space-x-1 text-white/80 hover:text-white"
                      >
                        {selectedPost.isLiked ? (
                          <HeartIconSolid className="h-6 w-6 text-red-500" />
                        ) : (
                          <HeartIcon className="h-6 w-6" />
                        )}
                        <span className="text-sm">{selectedPost.likes}</span>
                      </button>
                      <button 
                        onClick={() => handleCommentClick(selectedPost.id)}
                        className="flex items-center space-x-1 text-white/80 hover:text-white"
                      >
                        <ChatBubbleLeftIcon className="h-6 w-6" />
                        <span className="text-sm">{selectedPost.comments}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-white/80 hover:text-white">
                        <ShareIcon className="h-5 w-5" />
                        <span className="text-sm">Paylaş</span>
                      </button>
                    </div>
                    <div className="flex items-center text-white/60 text-xs space-x-2">
                      <span>{formatViews(selectedPost.views)} görüntülenme</span>
                      <span>•</span>
                      <span>{selectedPost.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comments Modal */}
      <Comments 
        postId={selectedPostId || 0} 
        isOpen={isCommentsOpen} 
        onClose={handleCloseComments} 
      />

      <style jsx global>{`
        .video-cursor {
          cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z'/><circle cx='12' cy='12' r='3'/></svg>") 12 12, auto;
        }
      `}</style>
    </main>
  );
}
