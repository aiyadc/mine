import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { usePosts } from '../context/PostContext';

function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getPostById } = usePosts();

  useEffect(() => {
    async function loadPost() {
      const postData = await getPostById(id);
      setPost(postData);
      setLoading(false);
    }
    loadPost();
  }, [id, getPostById]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
          <span className="text-gray-500 text-sm">加载中...</span>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-3">文章未找到</p>
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm"
          >
            <ArrowLeft size={14} />
            返回博客列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-full">
      <div className="w-full px-3 sm:px-4 py-4 sm:py-6">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-gray-500 hover:text-blue-600 text-xs sm:text-sm transition-colors mb-3 sm:mb-4"
        >
          <ArrowLeft size={14} />
          <span>返回</span>
        </Link>

        <article className="w-full">
          <header className="mb-4 sm:mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-medium rounded">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-gray-400 text-xs">
                <Calendar size={12} />
                {post.date}
              </span>
              <span className="flex items-center gap-1 text-gray-400 text-xs">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-snug break-words">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="w-full">
            <div className="prose prose-xs sm:prose-sm md:prose-base max-w-none break-words">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                h1: ({children}) => <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 mt-4 sm:mt-6 break-words">{children}</h1>,
                h2: ({children}) => <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 mt-4 sm:mt-5 break-words">{children}</h2>,
                h3: ({children}) => <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-1.5 sm:mb-2 mt-3 sm:mt-4 break-words">{children}</h3>,
                h4: ({children}) => <h4 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 mb-1.5 break-words">{children}</h4>,
                p: ({children}) => <p className="text-gray-600 mb-2 sm:mb-3 leading-relaxed text-xs sm:text-sm break-words">{children}</p>,
                strong: ({children}) => <strong className="font-semibold text-gray-800">{children}</strong>,
                em: ({children}) => <em className="italic text-gray-600">{children}</em>,
                ul: ({children}) => <ul className="list-disc list-inside mb-2 sm:mb-3 text-gray-600 space-y-1 text-xs sm:text-sm">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal list-inside mb-2 sm:mb-3 text-gray-600 space-y-1 text-xs sm:text-sm">{children}</ol>,
                li: ({children}) => <li className="text-gray-600 text-xs sm:text-sm break-words">{children}</li>,
                blockquote: ({children}) => <blockquote className="border-l-3 border-blue-500 pl-3 sm:pl-4 italic text-gray-500 my-2 sm:my-3 text-xs sm:text-sm break-words">{children}</blockquote>,
                code: ({node, className, children, ...props}) => {
                  const match = /language-(\w+)/.exec(className || '');
                  const isInline = !match && !className;
                  if (isInline) {
                    return (
                      <code className="bg-gray-100 px-1 py-0.5 rounded text-[10px] sm:text-xs font-mono text-gray-700 break-all" {...props}>
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className={`${match ? `language-${match[1]}` : ''} text-[10px] sm:text-xs font-mono`} {...props}>
                      {children}
                    </code>
                  );
                },
                pre: ({children}) => (
                  <div className="relative group my-2 sm:my-3">
                    <pre className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg overflow-x-auto text-[10px] sm:text-xs leading-relaxed">
                      <code className="font-mono whitespace-pre">{children}</code>
                    </pre>
                  </div>
                ),
                a: ({href, children}) => <a href={href} className="text-blue-600 hover:text-blue-700 underline break-all text-xs sm:text-sm">{children}</a>,
                hr: () => <hr className="border-gray-200 my-3 sm:my-4" />,
                img: ({src, alt}) => (
                  <img src={src} alt={alt || 'Image'} loading='lazy' className="max-w-full h-auto rounded my-2 sm:my-3 shadow-sm" />
                ),
                table: ({children}) => (
                  <div className="overflow-x-auto my-2 sm:my-3 rounded border border-gray-200">
                    <table className="w-full text-[10px] sm:text-xs border-collapse min-w-full">{children}</table>
                  </div>
                ),
                thead: ({children}) => <thead className="bg-gray-50">{children}</thead>,
                th: ({children}) => <th className="border border-gray-200 px-2 py-1.5 text-left font-semibold text-gray-700 whitespace-nowrap">{children}</th>,
                td: ({children}) => <td className="border border-gray-200 px-2 py-1.5 text-gray-600 break-words">{children}</td>
              }}>
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>

        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-xs sm:text-sm"
          >
            <ArrowLeft size={14} />
            <span>返回列表</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
