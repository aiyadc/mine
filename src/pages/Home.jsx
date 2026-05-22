import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";
import { getAllPosts } from "../utils/postLoader";
import "../css/pages/home.css";
import PageSkeleton from "../components/PageSkeleton";



function Home() {
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      const posts = await getAllPosts();
      setLatestPosts(posts.slice(0, 3));
      setLoading(false);
    }
    loadPosts();
  }, []);

  if (loading) {
    return (
      <PageSkeleton />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgba(255,179,255,0.2)] to-[#f7f8fa]" style={{padding: 24}}>
      <section className="bg-blue-50 py-16 cover">
        <div className="max-w-4xl mx-auto px-4 text-center">
 
          <div className="flex justify-start absolute" style={{left: 24, bottom: 24}}>
            <div className="w-150 h-150 sm:w-24 sm:h-24 rounded-full mr-4 bg-[url('https://shop.io.mi-img.com/app/shop/img?id=shop_6cc36130f7e7246a175add3cffb47041.jpeg')] bg-cover bg-center" style={{padding: 25}} />
            <div className="flex flex-col items-start justify-center">
              <h3 className="text-lg font-semibold text-white mb-2">
                Eachan
              </h3>
              <p className="text-white text-sm">
                记录工作和生活
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">最新文章</h2>
            <Link
              to="/blog"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
            >
              查看全部
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
