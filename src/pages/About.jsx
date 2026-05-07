import { Code, Server, Palette, Heart } from 'lucide-react';
import { personalInfo } from '../data/mockData';

const iconMap = {
  code: Code,
  server: Server,
  palette: Palette,
  heart: Heart
};

function About() {
  return (
    <div className="min-h-screen">
      <section className="bg-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-4xl font-bold">张</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {personalInfo.name}
          </h1>
          <p className="text-gray-600 mb-6">{personalInfo.title}</p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {personalInfo.bio}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            专业技能
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalInfo.skills.map((skill, index) => {
              const IconComponent = iconMap[skill.icon] || Code;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {skill.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {skill.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;