import { createContext, useContext, useState, useCallback } from 'react';
import { getAllPosts as fetchAllPosts, getPostById as fetchPostById } from '../utils/postLoader';

const PostContext = createContext(null);

export function PostProvider({ children }) {
  const [allPostsCache, setAllPostsCache] = useState(null);
  const [singlePostCache, setSinglePostCache] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getAllPosts = useCallback(async (forceRefresh = false) => {
    if (!forceRefresh && allPostsCache !== null) {
      return allPostsCache;
    }

    setIsLoading(true);
    try {
      const posts = await fetchAllPosts();
      setAllPostsCache(posts);
      setIsLoading(false);
      return posts;
    } catch (error) {
      console.error('Failed to fetch all posts:', error);
      setIsLoading(false);
      throw error;
    }
  }, [allPostsCache]);

  const getPostById = useCallback(async (id, forceRefresh = false) => {
    if (!forceRefresh && singlePostCache[id]) {
      return singlePostCache[id];
    }

    setIsLoading(true);
    try {
      const post = await fetchPostById(id);
      setSinglePostCache(prev => ({
        ...prev,
        [id]: post
      }));
      setIsLoading(false);
      return post;
    } catch (error) {
      console.error(`Failed to fetch post ${id}:`, error);
      setIsLoading(false);
      throw error;
    }
  }, [singlePostCache]);

  const clearCache = useCallback(() => {
    setAllPostsCache(null);
    setSinglePostCache({});
  }, []);

  const value = {
    getAllPosts,
    getPostById,
    clearCache,
    isLoading,
    hasAllPostsCache: allPostsCache !== null,
    hasPostCache: (id) => singlePostCache[id] !== undefined
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
}

export default PostContext;
