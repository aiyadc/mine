import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';

function BlogCard({ post, isSkeleton = false }) {
  return (
    <Link to={`/blog/${post.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
        <div className="aspect-video sm:aspect-[4/3] overflow-hidden flex-shrink-0">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <span className="px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded shrink-0">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-gray-500 text-xs">
              <Calendar size={10} sm:size={12} />
              {post.date}
            </span>
            <span className="flex items-center gap-1 text-gray-500 text-xs">
              <Clock size={10} sm:size={12} />
              {post.readTime}
            </span>
          </div>
          <h3 title={post.title} className={`text-base sm:text-lg font-semibold text-gray-900 mb-1.5 sm:mb-2 hover:text-blue-600 truncate flex-shrink-0 ${isSkeleton ? 'text-white' : ''}`}>
            {post.title}
          </h3>
          <p title={post.excerpt} className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 flex-grow">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 flex-shrink-0">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-600 text-xs rounded"
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