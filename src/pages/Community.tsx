import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { MessageSquare, ThumbsUp, Send, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Community = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [replies, setReplies] = useState<any[]>([]);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchPosts();
  }, [user, navigate]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('forum_posts')
      .select(`
        *,
        profiles:user_id (full_name, email)
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  };

  const fetchReplies = async (postId: string) => {
    const { data } = await supabase
      .from('forum_replies')
      .select(`
        *,
        profiles:user_id (full_name, email)
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (data) {
      setReplies(data);
    }
  };

  const handleCreatePost = async () => {
    if (!user || !newPostTitle.trim() || !newPostContent.trim()) return;

    const { error } = await supabase.from('forum_posts').insert({
      user_id: user.id,
      title: newPostTitle,
      content: newPostContent,
      category: 'general',
    });

    if (!error) {
      setNewPostTitle('');
      setNewPostContent('');
      setShowNewPost(false);
      fetchPosts();
    }
  };

  const handleReply = async () => {
    if (!user || !selectedPost || !replyContent.trim()) return;

    const { error } = await supabase.from('forum_replies').insert({
      post_id: selectedPost.id,
      user_id: user.id,
      content: replyContent,
    });

    if (!error) {
      setReplyContent('');
      fetchReplies(selectedPost.id);
    }
  };

  const handleLike = async (postId: string, currentLikes: number) => {
    await supabase
      .from('forum_posts')
      .update({ likes: currentLikes + 1 })
      .eq('id', postId);

    fetchPosts();
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Community Forum
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Connect with others on their health journey
              </p>
            </div>
            <button
              onClick={() => setShowNewPost(!showNewPost)}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Post
            </button>
          </div>

          {showNewPost && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Create New Post
              </h2>
              <input
                type="text"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                placeholder="Post Title"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="What's on your mind?"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex space-x-4">
                <button
                  onClick={handleCreatePost}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Post
                </button>
                <button
                  onClick={() => setShowNewPost(false)}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => {
                    setSelectedPost(post);
                    fetchReplies(post.id);
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        By {post.profiles?.full_name || 'Anonymous'} •{' '}
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                      {post.category}
                    </span>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.content}
                  </p>

                  <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(post.id, post.likes);
                      }}
                      className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <ThumbsUp className="w-5 h-5 mr-2" />
                      {post.likes}
                    </button>
                    <div className="flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      View Replies
                    </div>
                  </div>
                </motion.div>
              ))}

              {posts.length === 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center">
                  <MessageSquare className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    No posts yet. Be the first to start a discussion!
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              {selectedPost ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg sticky top-20">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Replies
                  </h3>

                  <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                    {replies.map((reply) => (
                      <div key={reply.id} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                          {reply.profiles?.full_name || 'Anonymous'}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          {reply.content}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(reply.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))}

                    {replies.length === 0 && (
                      <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                        No replies yet. Be the first to reply!
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleReply}
                      className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Reply
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg sticky top-20 text-center">
                  <MessageSquare className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Select a post to view and add replies
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};
