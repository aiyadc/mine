import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import { getPostById } from '../utils/postLoader';

function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      const postData = await getPostById(id);
      setPost(postData);
      setLoading(false);
    }
    loadPost();
  }, [id]);

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
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          to="/blog"
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>返回博客列表</span>
        </Link>

        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <span className="inline-block px-3 py-1 bg-blue-600 text-sm rounded-full mb-3">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 px-6 py-4 border-b border-gray-100">
            <span className="flex items-center gap-2 text-gray-500 text-sm">
              <Calendar size={16} />
              {post.date}
            </span>
            <span className="flex items-center gap-2 text-gray-500 text-sm">
              <Clock size={16} />
              {post.readTime}
            </span>
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-gray-500" />
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

          <div className="p-6 md:p-8">
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                h1: ({children}) => <h1 className="text-3xl font-bold text-gray-900 mb-6">{children}</h1>,
                h2: ({children}) => <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">{children}</h2>,
                h3: ({children}) => <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">{children}</h3>,
                p: ({children}) => <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>,
                strong: ({children}) => <strong className="font-bold text-gray-900">{children}</strong>,
                em: ({children}) => <em className="italic text-gray-700">{children}</em>,
                ul: ({children}) => <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-2">{children}</ol>,
                li: ({children}) => <li className="text-gray-700">{children}</li>,
                blockquote: ({children}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">{children}</blockquote>,
                code: ({className, children}) => {
                  const language = className?.replace('language-', '') || '';
                  return <code className={`${language ? `language-${language}` : ''} bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800`}>{children}</code>;
                },
                pre: ({children}) => <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4"><code className="font-mono text-sm">{children}</code></pre>,
                a: ({href, children}) => <a href={href} className="text-blue-600 hover:text-blue-700 underline">{children}</a>,
                hr: () => <hr className="border-gray-200 my-8" />,
                img: ({src, alt}) => (
                  <img src={src} alt={alt || 'Image'} loading='lazy' className="max-w-full h-auto rounded-lg my-4 shadow-md" />
                )
              }}>
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>

        <div className="flex justify-between mt-8">
          <Link
            to="/blog"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>返回列表</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
