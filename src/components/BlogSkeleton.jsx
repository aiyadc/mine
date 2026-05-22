import { categories } from '../data/mockData';
import BlogCard from './BlogCard';

const mockPosts = [
  {
    id: 'skeleton-1',
    title: ' ',
    excerpt: ' ',
    category: '编程',
    date: ' ',
    readTime: ' ',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3C/svg%3E',
    tags: ['', '', '']
  },
  {
    id: 'skeleton-2',
    title: ' ',
    excerpt: ' ',
    category: '技术',
    date: ' ',
    readTime: ' ',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3C/svg%3E',
    tags: ['', '', '']
  },
  {
    id: 'skeleton-3',
    title: ' ',
    excerpt: ' ',
    category: '架构',
    date: ' ',
    readTime: ' ',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3C/svg%3E',
    tags: ['', '', '']
  },
  {
    id: 'skeleton-4',
    title: ' ',
    excerpt: ' ',
    category: '设计',
    date: ' ',
    readTime: ' ',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3C/svg%3E',
    tags: ['', '', '']
  },
  {
    id: 'skeleton-5',
    title: ' ',
    excerpt: ' ',
    category: '生活',
    date: ' ',
    readTime: ' ',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3C/svg%3E',
    tags: ['', '', '']
  },
  {
    id: 'skeleton-6',
    title: ' ',
    excerpt: ' ',
    category: '工具',
    date: ' ',
    readTime: ' ',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3C/svg%3E',
    tags: ['', '', '']
  }
];

function BlogSkeleton() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="animate-pulse">
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <div
                key={category}
                className="h-10 bg-gray-200 rounded-full px-4 py-2 text-sm font-medium"
              />
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPosts.map((post) => (
              <div key={post.id} className="skeleton-card">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogSkeleton;
