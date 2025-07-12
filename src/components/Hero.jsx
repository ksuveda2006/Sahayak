import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Users, 
  Globe, 
  Mic, 
  Image, 
  FileText,
  ArrowRight,
  Play,
  Star
} from 'lucide-react';

const Hero = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const stats = [
    { label: 'Teachers Empowered', value: '10,000+', icon: Users },
    { label: 'Content Generated', value: '50,000+', icon: FileText },
    { label: 'Languages Supported', value: '15+', icon: Globe },
    { label: 'Student Assessments', value: '25,000+', icon: BookOpen },
  ];

  const features = [
    {
      icon: FileText,
      title: 'Localized Content',
      description: 'Generate educational content in regional languages'
    },
    {
      icon: BookOpen,
      title: 'Personalized Worksheets',
      description: 'Create custom worksheets for different learning levels'
    },
    {
      icon: Image,
      title: 'Visual Aids',
      description: 'Design engaging visual materials with AI assistance'
    },
    {
      icon: Mic,
      title: 'Voice Assessments',
      description: 'Conduct voice-based evaluations in local languages'
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 floating-animation"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 floating-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 floating-animation" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Main Hero Content */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
              <Star className="w-4 h-4 mr-2" />
              AI-Powered Teaching Assistant
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 slide-in-left">
            Meet{' '}
            <span className="gradient-text">Sahayak</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto slide-in-right">
            Empowering rural teachers with AI tools that generate localized content, 
            personalized worksheets, visual aids, and voice-based assessments in regional languages.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/dashboard">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50 transition-all duration-300"
              onClick={() => setIsVideoPlaying(true)}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="feature-card p-6 rounded-2xl text-center"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of teachers who are already using Sahayak to create engaging, 
            localized educational content that resonates with their students.
          </p>
          <Link to="/dashboard">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Creating Content
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Sahayak Demo</h3>
              <Button 
                variant="ghost" 
                onClick={() => setIsVideoPlaying(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
            </div>
            <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Demo video would be embedded here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;

