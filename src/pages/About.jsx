import { personalInfo } from '../data/mockData';
import { Sparkles, Star, Heart, Zap, Book, Code, Brain, Rocket, Coffee } from 'lucide-react';

function About() {
  const decorations = [
    { icon: Star, color: 'text-yellow-400', size: 4 },
    { icon: Heart, color: 'text-pink-400', size: 3 },
    { icon: Sparkles, color: 'text-purple-400', size: 5 },
    { icon: Zap, color: 'text-amber-400', size: 3 },
    { icon: Coffee, color: 'text-orange-400', size: 4 },
    { icon: Rocket, color: 'text-blue-400', size: 5 },
    { icon: Brain, color: 'text-cyan-400', size: 4 },
  ];

  const experienceIcons = [Star, Sparkles, Rocket, Brain];
  const experienceTags = ['企业深耕', '相对全面的技术栈', '复杂领域实践', 'AI赋能提效'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Floating decorations */}
        {decorations.map((dec, i) => (
          <div
            key={i}
            className={`absolute ${dec.color} opacity-20 animate-float`}
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + (i * 8)}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            <dec.icon size={dec.size * 8} />
          </div>
        ))}

        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-4">
          {"Hiii~, I'm  " + personalInfo.name}
          </h1>
          <p className="text-xl text-gray-600">{personalInfo.title}</p>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-10">
            <Star className="text-yellow-400" size={24} />
            <h2 className="text-2xl font-bold text-gray-700">我的履历</h2>
            <Star className="text-yellow-400" size={24} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {personalInfo.experiences.map((exp, index) => {
              const IconComponent = experienceIcons[index % experienceIcons.length];
              const colors = ['from-pink-400 to-rose-400', 'from-purple-400 to-indigo-400', 'from-blue-400 to-cyan-400', 'from-teal-400 to-emerald-400'];
              
              return (
                <div
                  key={index}
                  className="relative bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div 
                    className={`absolute top-0 left-0 w-12 h-12 rounded-xl bg-gradient-to-br ${colors[index % colors.length]} flex items-center justify-center shadow-md`}
                    style={{ borderBottomLeftRadius: '0' }}
                  >
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <div className="text-center pt-4">
                    <span className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-600 px-4 py-2 rounded-full text-sm font-medium inline-block mb-3">
                      {experienceTags[index]}
                    </span>
                    <p className="text-gray-600 leading-relaxed">{exp}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Code className="text-purple-400" size={24} />
            <h2 className="text-2xl font-bold text-gray-700">我的技能树</h2>
            <Code className="text-purple-400" size={24} />
          </div>

          {/* Mastered Skills */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-400 to-rose-400" />
              <h3 className="text-xl font-semibold text-gray-700">掌握</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {personalInfo.skills.掌握.map((skillGroup, index) => {
                const bgColors = ['from-pink-50 to-rose-50 border-pink-200', 'from-purple-50 to-indigo-50 border-purple-200', 'from-blue-50 to-cyan-50 border-blue-200', 'from-teal-50 to-emerald-50 border-teal-200'];
                const textColors = ['text-pink-600', 'text-purple-600', 'text-blue-600', 'text-teal-600'];
                
                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${bgColors[index % bgColors.length]} border-2 rounded-3xl p-6 hover:shadow-lg transition-all duration-300`}
                  >
                    <h4 className={`font-bold mb-4 ${textColors[index % textColors.length]}`}>{skillGroup.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((item, idx) => (
                        <span
                          key={idx}
                          className="bg-white px-4 py-2 rounded-2xl text-sm font-medium text-gray-600 shadow-sm hover:shadow-md transition-shadow"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Familiar Skills */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400" />
              <h3 className="text-xl font-semibold text-gray-700">熟悉</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {personalInfo.skills.熟悉.map((skillGroup, index) => {
                const bgColors = ['from-amber-50 to-yellow-50 border-amber-200', 'from-orange-50 to-red-50 border-orange-200', 'from-green-50 to-lime-50 border-green-200'];
                const textColors = ['text-amber-600', 'text-orange-600', 'text-green-600'];
                
                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${bgColors[index % bgColors.length]} border-2 rounded-3xl p-6 hover:shadow-lg transition-all duration-300`}
                  >
                    <h4 className={`font-bold mb-4 ${textColors[index % textColors.length]}`}>{skillGroup.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((item, idx) => (
                        <span
                          key={idx}
                          className="bg-white px-4 py-2 rounded-2xl text-sm font-medium text-gray-600 shadow-sm hover:shadow-md transition-shadow"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-sm mb-6">
            <Heart className="text-pink-400" size={20} />
            <span className="text-gray-700 font-medium">感谢看到这里！</span>
            <Heart className="text-pink-400" size={20} />
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default About;
