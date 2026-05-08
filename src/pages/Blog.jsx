import { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import { categories } from '../data/mockData';
import { getAllPosts } from '../utils/postLoader';

function Blog() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      const posts = await getAllPosts();
      setBlogPosts(posts);
      setLoading(false);
    }
    loadPosts();
  }, []);

  const filteredPosts = activeCategory === '全部'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">暂无该分类下的文章</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;
