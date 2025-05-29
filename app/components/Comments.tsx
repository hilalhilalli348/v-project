'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleLeftIcon, PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

interface Comment {
  id: number;
  author: string;
  content: string;
  likes: number;
  date: string;
}

interface CommentsProps {
  postId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function Comments({ postId, isOpen, onClose }: CommentsProps) {
  const { isDarkMode } = useTheme();
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: 'Kullanıcı1',
      content: 'Harika bir ilan!',
      likes: 12,
      date: '2 saat önce'
    },
    {
      id: 2,
      author: 'Kullanıcı2',
      content: 'Fiyatı nedir?',
      likes: 5,
      date: '3 saat önce'
    },
    {
      id: 3,
      author: 'Kullanıcı3',
      content: 'Detaylı bilgi alabilir miyim?',
      likes: 8,
      date: '5 saat önce'
    }
  ]);

  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([
        {
          id: comments.length + 1,
          author: 'Ben',
          content: newComment,
          likes: 0,
          date: 'Şimdi'
        },
        ...comments
      ]);
      setNewComment('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className={`fixed inset-y-0 right-0 w-full max-w-md ${isDarkMode ? 'bg-zinc-900/95' : 'bg-white/95'} backdrop-blur-md shadow-xl z-[60]`}
        >
          <div className="h-full flex flex-col">
            <div className={`p-4 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'} flex justify-between items-center`}>
              <h2 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>Yorumlar</h2>
              <button
                onClick={onClose}
                className={`${isDarkMode ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} p-2 rounded-full`}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${isDarkMode ? 'bg-white/5' : 'bg-gray-50'} rounded-lg p-3`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium text-sm`}>{comment.author}</span>
                      <p className={`${isDarkMode ? 'text-white/80' : 'text-gray-700'} text-sm mt-1`}>{comment.content}</p>
                    </div>
                    <span className={`${isDarkMode ? 'text-white/40' : 'text-gray-500'} text-xs`}>{comment.date}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <button className={`${isDarkMode ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-xs`}>Beğen</button>
                    <button className={`${isDarkMode ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-xs`}>Yanıtla</button>
                  </div>
                </motion.div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Yorum yaz..."
                  className="flex-1 bg-white/10 text-white placeholder-white/50 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <button
                  type="submit"
                  className="bg-white/10 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 