import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  FileText, 
  Palette, 
  Volume2, 
  Camera, 
  Video,
  Users, 
  TrendingUp, 
  Clock, 
  Star,
  Plus,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalContent: 0,
    totalWorksheets: 0,
    totalVisualAids: 0,
    totalAssessments: 0,
    totalVideos: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Fetch user stats
    fetchUserStats();
    fetchRecentActivity();
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await fetch(`/api/user/${user?.id || 'demo-user'}/stats`);
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRecentActivity = () => {
    // Mock recent activity data
    setRecentActivity([
      {
        id: 1,
        type: 'content',
        title: 'Mathematics Lesson Plan - Fractions',
        timestamp: '2 hours ago',
        icon: BookOpen,
        color: 'blue'
      },
      {
        id: 2,
        type: 'worksheet',
        title: 'Science Worksheet - Water Cycle',
        timestamp: '1 day ago',
        icon: FileText,
        color: 'green'
      },
      {
        id: 3,
        type: 'visual_aid',
        title: 'Solar System Chart Instructions',
        timestamp: '2 days ago',
        icon: Palette,
        color: 'orange'
      },
      {
        id: 4,
        type: 'assessment',
        title: 'Voice Assessment - English Speaking',
        timestamp: '3 days ago',
        icon: Volume2,
        color: 'purple'
      }
    ]);
  };

  const features = [
    {
      title: 'Content Generator',
      description: 'Create localized lesson plans, activities, and educational content',
      icon: BookOpen,
      color: 'blue',
      path: '/content-generator',
      stats: stats.totalContent
    },
    {
      title: 'Worksheet Generator',
      description: 'Generate personalized worksheets for multi-grade classrooms',
      icon: FileText,
      color: 'green',
      path: '/worksheet-generator',
      stats: stats.totalWorksheets
    },
    {
      title: 'Visual Aid Generator',
      description: 'Create instructions for low-cost visual learning materials',
      icon: Palette,
      color: 'orange',
      path: '/visual-aid-generator',
      stats: stats.totalVisualAids
    },
    {
      title: 'Voice Assessment',
      description: 'Conduct voice-based evaluations with AI feedback',
      icon: Volume2,
      color: 'purple',
      path: '/voice-assessment',
      stats: stats.totalAssessments
    },
    {
      title: 'Image Analyzer',
      description: 'Extract educational insights from images and photos',
      icon: Camera,
      color: 'cyan',
      path: '/image-analyzer',
      stats: 0
    },
    {
      title: 'Video Creator',
      description: 'Record and process educational videos with language selection',
      icon: Video,
      color: 'pink',
      path: '/video-creator',
      stats: stats.totalVideos
    }
  ];

  const quickActions = [
    {
      title: 'Create Lesson Plan',
      description: 'Generate a new lesson plan',
      path: '/content-generator',
      icon: BookOpen,
      color: 'blue'
    },
    {
      title: 'Make Worksheet',
      description: 'Create a personalized worksheet',
      path: '/worksheet-generator',
      icon: FileText,
      color: 'green'
    },
    {
      title: 'Record Video',
      description: 'Create educational video content',
      path: '/video-creator',
      icon: Video,
      color: 'pink'
    },
    {
      title: 'Voice Assessment',
      description: 'Start a voice evaluation',
      path: '/voice-assessment',
      icon: Volume2,
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome back, {user?.displayName || 'Teacher'}!</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome to Sahayak</h2>
              <p className="text-blue-100 text-lg">Your AI-powered teaching assistant for rural education</p>
              <p className="text-blue-200 mt-2">Empowering teachers with localized content, personalized worksheets, and innovative assessment tools</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/20 rounded-lg p-4">
                <Users className="h-12 w-12 text-white mb-2" />
                <div className="text-sm text-blue-100">Serving</div>
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-blue-100">Teachers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Content Created</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalContent}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Worksheets</p>
                <p className="text-2xl font-bold text-green-600">{stats.totalWorksheets}</p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Visual Aids</p>
                <p className="text-2xl font-bold text-orange-600">{stats.totalVisualAids}</p>
              </div>
              <Palette className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Assessments</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalAssessments}</p>
              </div>
              <Volume2 className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Videos</p>
                <p className="text-2xl font-bold text-pink-600">{stats.totalVideos}</p>
              </div>
              <Video className="h-8 w-8 text-pink-600" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 group"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-${action.color}-100`}>
                    <action.icon className={`h-6 w-6 text-${action.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Features */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Link
                  key={index}
                  to={feature.path}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-${feature.color}-100 group-hover:bg-${feature.color}-200 transition-colors`}>
                      <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {feature.title}
                        </h4>
                        {feature.stats > 0 && (
                          <span className={`px-2 py-1 text-xs font-medium bg-${feature.color}-100 text-${feature.color}-800 rounded-full`}>
                            {feature.stats}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                      <div className="flex items-center text-blue-600 text-sm font-medium">
                        <span>Get Started</span>
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg bg-${activity.color}-100`}>
                      <activity.icon className={`h-4 w-4 text-${activity.color}-600`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
                
                {recentActivity.length === 0 && (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No recent activity</p>
                    <p className="text-sm text-gray-400">Start creating content to see your activity here</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tips Section */}
            <div className="mt-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-start space-x-3">
                <Star className="h-6 w-6 text-yellow-300 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">Pro Tip</h4>
                  <p className="text-sm text-green-100">
                    Use the Voice Assessment feature to evaluate student pronunciation and provide instant feedback in their local language.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Getting Started Guide */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Getting Started with Sahayak</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Choose Your Tool</h4>
              <p className="text-sm text-gray-600">Select from content generation, worksheets, visual aids, or assessments based on your teaching needs.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Customize Settings</h4>
              <p className="text-sm text-gray-600">Set your subject, grade level, language, and specific requirements for personalized results.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Generate & Use</h4>
              <p className="text-sm text-gray-600">Get AI-generated content tailored for rural classrooms and start teaching with confidence.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

