import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

function GalleryCard({ post, index, style }) {
  return (
    <Link to={`/blog/${post.id}`} className="block">
      <div 
        className="gallery-card group relative overflow-hidden rounded-2xl p-6"
        style={{
          ...style,
          animationDelay: `${index * 150}ms`,
          transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease',
        }}
      >
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span 
              className="text-sm font-mono"
              style={{ color: 'var(--accent-primary)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span 
              className="px-3 py-1 text-xs rounded-full"
              style={{
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                color: 'var(--accent-primary)',
                border: '1px solid rgba(0, 212, 255, 0.2)',
              }}
            >
              {post.category}
            </span>
          </div>

          <h3 
            className="text-xl font-bold mb-3 line-clamp-2"
            style={{ 
              color: 'var(--text-primary)',
              transition: 'color 0.2s ease',
            }}
          >
            {post.title}
          </h3>

          <p 
            className="text-sm mb-4 line-clamp-2"
            style={{ color: 'var(--text-muted)' }}
          >
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
              <Calendar size={14} />
              <span className="text-xs">{post.date}</span>
            </div>

            <div className="flex gap-2">
              {post.tags.slice(0, 2).map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-1 text-xs rounded"
                  style={{
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    color: 'var(--accent-secondary)',
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default GalleryCard;
