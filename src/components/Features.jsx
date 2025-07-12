import { 
  BookOpen, 
  FileText, 
  Image, 
  Mic, 
  Globe, 
  Users, 
  Clock, 
  Heart,
  Zap,
  Shield,
  Smartphone,
  Wifi
} from 'lucide-react';

const Features = () => {
  const mainFeatures = [
    {
      icon: FileText,
      title: 'Localized Content Generation',
      description: 'Generate educational content in 15+ regional languages, tailored for rural classrooms with limited resources.',
      color: 'from-blue-500 to-cyan-500',
      benefits: ['Multi-language support', 'Cultural context awareness', 'Resource-conscious design']
    },
    {
      icon: BookOpen,
      title: 'Personalized Worksheets',
      description: 'Create custom worksheets adapted to different learning levels and student needs in your classroom.',
      color: 'from-green-500 to-emerald-500',
      benefits: ['Multi-grade support', 'Difficulty adaptation', 'Progress tracking']
    },
    {
      icon: Image,
      title: 'Visual Aid Creator',
      description: 'Design engaging visual materials using AI, with instructions for creating them with low-cost materials.',
      color: 'from-purple-500 to-pink-500',
      benefits: ['Low-cost materials', 'Step-by-step guides', 'Engaging designs']
    },
    {
      icon: Mic,
      title: 'Voice-Based Assessments',
      description: 'Conduct oral evaluations in regional languages with AI-powered speech recognition and analysis.',
      color: 'from-orange-500 to-red-500',
      benefits: ['Speech recognition', 'Instant feedback', 'Language flexibility']
    }
  ];

  const additionalFeatures = [
    {
      icon: Globe,
      title: 'Offline Ready',
      description: 'Works without internet connection once content is downloaded'
    },
    {
      icon: Users,
      title: 'Multi-Grade Support',
      description: 'Manage multiple grade levels in a single classroom'
    },
    {
      icon: Clock,
      title: 'Time Saving',
      description: 'Reduce preparation time from hours to minutes'
    },
    {
      icon: Heart,
      title: 'Inclusive Learning',
      description: 'Support diverse learning needs and abilities'
    },
    {
      icon: Zap,
      title: 'AI Powered',
      description: 'Advanced AI models for content generation and analysis'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Student data protection and privacy compliance'
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Works seamlessly on smartphones and tablets'
    },
    {
      icon: Wifi,
      title: 'Low Bandwidth',
      description: 'Optimized for areas with limited internet connectivity'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span className="gradient-text"> Rural Education</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sahayak provides comprehensive AI-powered tools designed specifically for 
            multi-grade, low-resource classrooms in rural areas.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
              
              <div className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-700">
                    <div className={`w-2 h-2 bg-gradient-to-r ${feature.color} rounded-full mr-3`}></div>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Built for Rural Classrooms
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every feature is designed with the unique challenges and opportunities 
              of rural education in mind.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div 
                key={feature.title}
                className="text-center p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              How Sahayak Works
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to transform your teaching experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Your Content',
                description: 'Select subject, grade level, and language for your content generation needs.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                step: '02',
                title: 'AI Generates Content',
                description: 'Our AI creates localized, culturally appropriate educational materials instantly.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                step: '03',
                title: 'Engage Your Students',
                description: 'Use the generated content, worksheets, and assessments in your classroom.',
                color: 'from-green-500 to-emerald-500'
              }
            ].map((step, index) => (
              <div key={step.step} className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

