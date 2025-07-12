import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  FileText, 
  Image, 
  Mic, 
  BarChart3, 
  Clock, 
  Users, 
  TrendingUp,
  Plus,
  ArrowRight,
  Calendar,
  Star
} from 'lucide-react';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalContent: 0,
    totalWorksheets: 0,
    totalAssessments: 0,
    totalVisualAids: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Simulate loading user statistics
    setStats({
      totalContent: 24,
      totalWorksheets: 18,
      totalAssessments: 12,
      totalVisualAids: 8
    });

    // Simulate recent activity
    setRecentActivity([
      {
        id: 1,
        type: 'content',
        title: 'Mathematics - Fractions',
        subject: 'Mathematics',
        grade: 'Grade 5',
        language: 'Hindi',
        timestamp: '2 hours ago'
      },
      {
        id: 2,
        type: 'worksheet',
        title: 'Science - Plants Worksheet',
        subject: 'Science',
        grade: 'Grade 3',
        language: 'English',
        timestamp: '5 hours ago'
      },
      {
        id: 3,
        type: 'assessment',
        title: 'English Speaking Assessment',
        subject: 'English',
        grade: 'Grade 4',
        language: 'Hindi',
        timestamp: '1 day ago'
      }
    ]);
  }, [user]);

  const quickActions = [
    {
      title: 'Generate Content',
      description: 'Create localized educational content',
      icon: FileText,
      path: '/content-generator',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Create Worksheet',
      description: 'Design personalized worksheets',
      icon: BookOpen,
      path: '/worksheet-generator',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Visual Aid Generator',
      description: 'Create engaging visual materials',
      icon: Image,
      path: '/visual-aid-generator',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Voice Assessment',
      description: 'Conduct voice-based evaluations',
      icon: Mic,
      path: '/voice-assessment',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50'
    }
  ];

  const statCards = [
    {
      title: 'Content Generated',
      value: stats.totalContent,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Worksheets Created',
      value: stats.totalWorksheets,
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Assessments Done',
      value: stats.totalAssessments,
      icon: Mic,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Visual Aids',
      value: stats.totalVisualAids,
      icon: Image,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'content': return FileText;
      case 'worksheet': return BookOpen;
      case 'assessment': return Mic;
      case 'visual': return Image;
      default: return FileText;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'content': return 'text-blue-600 bg-blue-100';
      case 'worksheet': return 'text-green-600 bg-green-100';
      case 'assessment': return 'text-orange-600 bg-orange-100';
      case 'visual': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.displayName?.split(' ')[0] || 'Teacher'}! 👋
              </h1>
              <p className="text-lg text-gray-600">
                Ready to create amazing educational content today?
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={stat.title} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
            <Button variant="outline" size="sm">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link key={action.title} to={action.path}>
                <div className={`${action.bgColor} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 group cursor-pointer`}>
                  <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                  <div className="flex items-center text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    <Plus className="w-4 h-4 mr-1" />
                    Create Now
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity & Tips */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const ActivityIcon = getActivityIcon(activity.type);
                  const colorClass = getActivityColor(activity.type);
                  
                  return (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                      <div className={`w-10 h-10 ${colorClass} rounded-lg flex items-center justify-center`}>
                        <ActivityIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{activity.subject}</span>
                          <span>•</span>
                          <span>{activity.grade}</span>
                          <span>•</span>
                          <span>{activity.language}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{activity.timestamp}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tips & Insights */}
          <div className="space-y-6">
            {/* Daily Tip */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 ml-3">Daily Tip</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Try using voice assessments for language learning. Students often feel more comfortable speaking than writing!
              </p>
              <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                Learn More
              </Button>
            </div>

            {/* Usage Insights */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">This Week's Insights</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Most used feature</span>
                  <span className="text-sm font-medium text-gray-900">Content Generator</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Favorite subject</span>
                  <span className="text-sm font-medium text-gray-900">Mathematics</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Time saved</span>
                  <span className="text-sm font-medium text-green-600">12 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

