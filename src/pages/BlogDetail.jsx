import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
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
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-500">文章未找到</p>
          <Link to="/blog" className="text-blue-600 hover:underline mt-4 inline-block">
            返回博客列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
        <Link
          to="/blog"
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 sm:mb-8 transition-colors"
        >
          <ArrowLeft size={18} sm:size={20} />
          <span className="text-sm sm:text-base">返回博客列表</span>
        </Link>

        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-48 sm:h-56 md:h-72 lg:h-80 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-contain bg-gray-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
              <span className="inline-block px-2 sm:px-3 py-1 bg-blue-600 text-xs sm:text-sm rounded-full mb-2 sm:mb-3">
                {post.category}
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                {post.title}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
            <span className="flex items-center gap-1.5 text-gray-500 text-xs sm:text-sm">
              <Calendar size={14} sm:size={16} />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5 text-gray-500 text-xs sm:text-sm">
              <Clock size={14} sm:size={16} />
              {post.readTime}
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Tag size={14} sm:size={16} className="text-gray-500" />
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

          <div className="p-4 sm:p-6 md:p-8">
            <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                h1: ({children}) => <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">{children}</h1>,
                h2: ({children}) => <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 mt-6 sm:mt-8">{children}</h2>,
                h3: ({children}) => <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3 mt-4 sm:mt-6">{children}</h3>,
                p: ({children}) => <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{children}</p>,
                strong: ({children}) => <strong className="font-bold text-gray-900">{children}</strong>,
                em: ({children}) => <em className="italic text-gray-700">{children}</em>,
                ul: ({children}) => <ul className="list-disc list-inside mb-3 sm:mb-4 text-gray-700 space-y-1.5 sm:space-y-2 text-sm sm:text-base">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal list-inside mb-3 sm:mb-4 text-gray-700 space-y-1.5 sm:space-y-2 text-sm sm:text-base">{children}</ol>,
                li: ({children}) => <li className="text-gray-700 text-sm sm:text-base">{children}</li>,
                blockquote: ({children}) => <blockquote className="border-l-4 border-blue-500 pl-3 sm:pl-4 italic text-gray-600 my-3 sm:my-4 text-sm sm:text-base">{children}</blockquote>,
                code: ({className, children}) => {
                  const language = className?.replace('language-', '') || '';
                  return <code className={`${language ? `language-${language}` : ''} bg-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-mono text-gray-800`}>{children}</code>;
                },
                pre: ({children}) => <pre className="bg-[rgb(247,250,255)] text-white p-3 sm:p-4 rounded-lg overflow-x-auto mb-3 sm:mb-4 text-xs sm:text-sm"><code className="font-mono">{children}</code></pre>,
                a: ({href, children}) => <a href={href} className="text-blue-600 hover:text-blue-700 underline">{children}</a>,
                hr: () => <hr className="border-gray-200 my-6 sm:my-8" />,
                img: ({src, alt}) => (
                  <img src={src} alt={alt || 'Image'} loading='lazy' className="max-w-full h-auto rounded-lg my-3 sm:my-4 shadow-md" />
                )
              }}>
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>

        <div className="flex justify-between mt-6 sm:mt-8">
          <Link
            to="/blog"
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={16} sm:size={18} />
            <span className="text-sm sm:text-base">返回列表</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
