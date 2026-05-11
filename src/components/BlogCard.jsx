import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';

function BlogCard({ post }) {
  return (
    <Link to={`/blog/${post.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="aspect-video overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-4 mb-3">
            <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-gray-500 text-xs">
              <Calendar size={12} />
              {post.date}
            </span>
            <span className="flex items-center gap-1 text-gray-500 text-xs">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>
          <h3 title={post.title} className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 truncate">
            {post.title}
          </h3>
          <p title={post.excerpt} className="text-gray-600 text-sm mb-4 line-clamp-2 truncate">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;