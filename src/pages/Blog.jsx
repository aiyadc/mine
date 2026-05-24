import { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import BlogSkeleton from '../components/BlogSkeleton';
import { categories } from '../data/mockData';
import { usePosts } from '../context/PostContext';

function Blog() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAllPosts } = usePosts();

  useEffect(() => {
    async function loadPosts() {
      const posts = await getAllPosts();
      setBlogPosts(posts);
      setLoading(false);
    }
    loadPosts();
  }, [getAllPosts]);

  const filteredPosts = activeCategory === '全部'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

  if (loading) {
    return <BlogSkeleton />;
  }

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <p className="text-gray-500 text-sm sm:text-base">暂无该分类下的文章</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;
