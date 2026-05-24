import { useState, useEffect } from 'react';
import { Globe, User, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePosts } from '../context/PostContext';
import ParticleBackground from '../components/ParticleBackground';
import GeometricDecor from '../components/GeometricDecor';
import GalleryCard from '../components/GalleryCard';
import '../css/pages/home.css';
import PageSkeleton from '../components/PageSkeleton';

function Home() {
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const { getAllPosts } = usePosts();

  useEffect(() => {
    async function loadPosts() {
      const posts = await getAllPosts();
      setLatestPosts(posts.slice(0, 3));
      setLoading(false);
      setTimeout(() => setVisible(true), 100);
    }
    loadPosts();
  }, [getAllPosts]);

  if (loading) {
    return <PageSkeleton />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      <GeometricDecor />

      <main className="relative z-10">
        <section className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className={`text-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mb-8 relative inline-block">
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 rounded-full animate-spin-slow" 
                  style={{
                    background: 'conic-gradient(from 0deg, #00d4ff, #a855f7, #00d4ff)',
                    padding: '3px',
                  }}
                />
                <img
                  src="https://shop.io.mi-img.com/app/shop/img?id=shop_6cc36130f7e7246a175add3cffb47041.jpeg"
                  alt="Eachan"
                  className="relative z-10 rounded-full w-full h-full object-cover"
                />
              </div>
            </div>

            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #00d4ff 50%, #a855f7 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: visible ? 'gradient-shift 8s ease infinite' : 'none',
              }}
            >
              Eachan
            </h1>

            <p 
              className="text-xl md:text-2xl mb-4 tracking-wide"
              style={{ color: 'var(--text-muted)' }}
            >
              Developer & Creator
            </p>

            <p 
              className="text-base md:text-lg mb-12 max-w-2xl mx-auto"
              style={{ color: 'var(--text-muted)' }}
            >
              记录工作与生活，探索技术的边界
            </p>

            <div className="flex justify-center gap-6 mb-12">
              <a 
                href="https://github.com/aiyadc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full transition-all duration-300 hover:scale-110 group"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.boxShadow = 'var(--glow-cyan)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Globe size={24} className="group-hover:text-[var(--accent-primary)] transition-colors" />
              </a>
              <Link 
                to="/about"
                className="p-3 rounded-full transition-all duration-300 hover:scale-110 group"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.boxShadow = 'var(--glow-cyan)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <User size={24} className="group-hover:text-[var(--accent-primary)] transition-colors" />
              </Link>
              <a 
                href="mailto:aiyadc@163.com"
                className="p-3 rounded-full transition-all duration-300 hover:scale-110 group"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.boxShadow = 'var(--glow-cyan)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Mail size={24} className="group-hover:text-[var(--accent-primary)] transition-colors" />
              </a>
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className={`mb-16 transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center gap-4 mb-4">
                <h2 
                  className="text-3xl md:text-4xl font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  最新文章
                </h2>
              </div>
              <div 
                className="h-px w-full"
                style={{
                  background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary), transparent)',
                }}
              />
            </div>

            <div className="posts-gallery">
              {latestPosts.map((post, index) => {
                const gridSpan = index === 0 ? 'col-span-5' : index === 1 ? 'col-span-4' : 'col-span-3';
                return (
                  <div key={post.id} className={`${gridSpan}`}>
                    <GalleryCard post={post} index={index} />
                  </div>
                );
              })}
            </div>

            <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 group"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                  color: '#fff',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--glow-cyan)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                查看全部文章
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
