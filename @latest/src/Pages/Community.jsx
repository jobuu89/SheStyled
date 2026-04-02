import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth.jsx';
import CameraCapture from '../Components/CameraCapture.jsx';

const mockPosts = [];

const Community = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [posts, setPosts] = useState(mockPosts);
  const [newPost, setNewPost] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Camera states
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState('');

const likePost = (postId) => {
    setPosts(prevPosts => (prevPosts || []).map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + (post.liked ? -1 : 1), liked: !post.liked }
        : post
    ));
  };

  const addComment = (postId, comment) => {
    setPosts(prevPosts => (prevPosts || []).map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments ? [
            ...post.comments,
            {
              id: Date.now(),
              author: user?.displayName || 'You',
              avatar: user?.photoURL || '👩',
              text: comment,
              timestamp: 'Just now'
            }
          ] : [{
            id: Date.now(),
            author: user?.displayName || 'You',
            avatar: user?.photoURL || '👩',
            text: comment,
            timestamp: 'Just now'
          }]
        };
      }
      return post;
    }));
    setReplyText('');
  };

  const [showCamera, setShowCamera] = useState(false);

  const createPost = () => {
    if (newPost.trim()) {
      const newPostData = {
        id: Date.now(),
        author: user?.displayName || 'You',
        avatar: user?.photoURL || '👩',
        image: capturedImage || 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&h=600&fit=crop',
        caption: newPost,
        likes: 0,
        comments: 0,
        timestamp: 'Just now',
        liked: false
      };
      setPosts([newPostData, ...posts]);
      setNewPost('');
      setShowNewPost(false);
      setCapturedImage(''); // Reset
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 p-3 rounded-2xl shadow-lg flex items-center mr-6 border border-white/50"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">
                SheStyled Community
              </h1>
              <p className="text-xl text-gray-600 mt-1">Share outfits • Get inspired • Stay safe</p>
            </div>
          </div>
          <div className="text-2xl font-semibold text-purple-700 bg-purple-100 px-4 py-2 rounded-xl">
            {posts.length} Posts
          </div>
        </div>

        {/* Create Post Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-white/50">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
              {user?.displayName?.charAt(0) || 'S'}
            </div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your outfit or style tip... What are you wearing today?"
                className="w-full p-5 bg-white/50 border-2 border-purple-200 rounded-2xl resize-none focus:border-purple-400 focus:ring-4 focus:ring-purple-200/50 transition-all text-lg placeholder-gray-500 min-h-[100px]"
                rows="3"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={createPost}
              disabled={!newPost.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Share Post
            </button>
            <div className="flex items-center space-x-6 text-gray-500">
              <button onClick={() => setShowCamera(true)} className="p-3 hover:bg-purple-100 rounded-2xl hover:text-purple-700 transition-all flex flex-col items-center group">
                <span className="text-2xl mb-1">📸</span>
                <span className="text-xs font-medium group-hover:text-purple-700">Photo</span>
              </button>
              <button className="p-3 hover:bg-pink-100 rounded-2xl hover:text-pink-700 transition-all flex flex-col items-center group">
                <span className="text-2xl mb-1">🏷️</span>
                <span className="text-xs font-medium group-hover:text-pink-700">Tag</span>
              </button>
            </div>
          </div>

          {/* Captured image preview */}
          {capturedImage && (
            <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-dashed border-purple-200">
              <div className="flex items-center space-x-3">
                <img src={capturedImage} alt="Captured" className="w-20 h-20 rounded-xl object-cover ring-2 ring-white shadow-md flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-purple-800">Photo ready! ✨</p>
                  <button
                    onClick={() => { setCapturedImage(''); }}
                    className="text-sm text-purple-600 hover:text-purple-800 font-medium mt-1"
                  >
                    Change photo
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {(posts || []).map((post) => (
            <div key={post.id} className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-white/50 overflow-hidden">
              {/* Post Header */}
              <div className="p-6 border-b border-purple-100">
                <div className="flex items-center space-x-4">
                  <img 
                    src={post.avatar} 
                    alt={post.author}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white/50"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-shestyled-chocolate truncate">{post.author}</h3>
                    <p className="text-sm text-gray-500">{post.timestamp}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {(post.tags || []).map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Post Image */}
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.caption}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Post Content */}
              <div className="p-6 space-y-4">
                <p className="text-gray-800 leading-relaxed text-lg">{post.caption}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-8">
                    <button
                      onClick={() => likePost(post.id)}
                      className={`flex items-center space-x-2 p-2 rounded-2xl transition-all ${
                        post.liked 
                          ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                          : 'hover:bg-red-50 text-gray-600 hover:text-red-600'
                      }`}
                    >
                      <span className="text-xl">❤️</span>
                      <span className="font-bold">{post.likes}</span>
                    </button>
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="flex items-center space-x-2 p-2 rounded-2xl hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all"
                    >
                      <span className="text-xl">💬</span>
                      <span className="font-bold">{post.comments}</span>
                    </button>
                  </div>
                  <button className="text-sm text-purple-600 font-semibold hover:text-purple-700 hover:underline">
                    View full post
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

{showCamera && <CameraCapture onCapture={(url) => {
            setCapturedImage(url);
            setShowCamera(false);
          }} onClose={() => setShowCamera(false)} />}

        {selectedPost && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPost(null)}>
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              {/* Post modal content */}
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Comments ({selectedPost.comments})</h2>
                <div className="space-y-4 mb-8 max-h-96 overflow-y-auto">
                  {/* Mock comments */}
                  <div className="flex space-x-4 p-4 bg-gray-50 rounded-2xl">
                    <div className="w-10 h-10 bg-purple-400 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">
                      A
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Amanda S.</p>
                      <p className="text-gray-700">Love this look! Perfect for evening out. Which shoes are those?</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3 p-4 border-t border-gray-200">
                  <div className="w-10 h-10 bg-purple-400 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">
                    {user?.displayName?.charAt(0)}
                  </div>
                  <input
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 p-4 rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200/50 transition-all outline-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && replyText.trim()) {
                        addComment(selectedPost.id, replyText);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;

