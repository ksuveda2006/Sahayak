import React, { useState } from 'react';
import { ArrowLeft, Palette, Download, Share2, Save, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const VisualAidGeneratorPage = () => {
  const [formData, setFormData] = useState({
    subject: '',
    grade: '',
    language: 'English',
    topic: '',
    aidType: 'chart'
  });
  const [generatedAid, setGeneratedAid] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Environmental Studies'];
  const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8'];
  const languages = ['English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati', 'Urdu', 'Kannada', 'Odia', 'Malayalam', 'Punjabi', 'Assamese', 'Maithili', 'Sanskrit'];
  const aidTypes = [
    { value: 'chart', label: 'Educational Chart', description: 'Wall charts with diagrams and information' },
    { value: 'poster', label: 'Learning Poster', description: 'Colorful posters for classroom display' },
    { value: 'flashcards', label: 'Flash Cards', description: 'Interactive cards for quick learning' },
    { value: 'model', label: '3D Model', description: 'Physical models using local materials' },
    { value: 'game_board', label: 'Educational Game Board', description: 'Board games for learning' },
    { value: 'timeline', label: 'Timeline', description: 'Sequential visual representations' },
    { value: 'infographic', label: 'Infographic', description: 'Visual information graphics' },
    { value: 'puppet_show', label: 'Puppet Show Setup', description: 'Educational puppet theater' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateVisualAid = async () => {
    if (!formData.subject || !formData.grade || !formData.topic) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-visual-aid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: 'demo-user'
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setGeneratedAid(data.description);
        toast.success('Visual aid instructions generated successfully!');
      } else {
        toast.error('Failed to generate visual aid');
      }
    } catch (error) {
      console.error('Error generating visual aid:', error);
      toast.error('Error generating visual aid');
    } finally {
      setIsGenerating(false);
    }
  };

  const saveAid = () => {
    if (generatedAid) {
      toast.success('Visual aid saved to your library!');
    }
  };

  const downloadAid = () => {
    if (generatedAid) {
      const blob = new Blob([generatedAid], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${formData.topic}_${formData.aidType}_instructions.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Instructions downloaded!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-orange-600 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <Palette className="h-6 w-6 text-orange-600" />
                <h1 className="text-xl font-semibold text-gray-900">Visual Aid Generator</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Visual Learning Aid</h2>
            
            <div className="space-y-6">
              {/* Subject Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              {/* Grade Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grade Level *
                </label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Grade</option>
                  {grades.map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>

              {/* Language Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {languages.map(language => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
              </div>

              {/* Topic Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic *
                </label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  placeholder="e.g., Solar System, Parts of a Plant, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Visual Aid Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visual Aid Type
                </label>
                <div className="space-y-3">
                  {aidTypes.map(type => (
                    <label key={type.value} className="flex items-start space-x-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="aidType"
                        value={type.value}
                        checked={formData.aidType === type.value}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{type.label}</div>
                        <div className="text-sm text-gray-500">{type.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateVisualAid}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-orange-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating Instructions...
                  </div>
                ) : (
                  'Generate Visual Aid Instructions'
                )}
              </button>
            </div>
          </div>

          {/* Generated Instructions Display */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Creation Instructions</h2>
              {generatedAid && (
                <div className="flex space-x-2">
                  <button
                    onClick={saveAid}
                    className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </button>
                  <button
                    onClick={downloadAid}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                  <button
                    onClick={() => toast.success('Share link copied!')}
                    className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </button>
                </div>
              )}
            </div>

            {generatedAid ? (
              <div className="prose max-w-none">
                <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                    {generatedAid}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <Palette className="h-16 w-16 mb-4 text-gray-300" />
                <p className="text-lg font-medium">No instructions generated yet</p>
                <p className="text-sm">Fill in the form and click "Generate Instructions" to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
            Why Use Visual Aids in Rural Classrooms?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-orange-50 rounded-lg p-4">
              <h4 className="font-medium text-orange-900 mb-2">Low-Cost Materials</h4>
              <p className="text-sm text-orange-700">All instructions use locally available, affordable materials like cardboard, natural colors, and household items</p>
            </div>
            <div className="bg-pink-50 rounded-lg p-4">
              <h4 className="font-medium text-pink-900 mb-2">Enhanced Learning</h4>
              <p className="text-sm text-pink-700">Visual aids help students understand complex concepts better and retain information longer</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2">Interactive Teaching</h4>
              <p className="text-sm text-purple-700">Make lessons more engaging and interactive, especially important for multi-grade classrooms</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Cultural Relevance</h4>
              <p className="text-sm text-blue-700">All visual aids incorporate local cultural elements and familiar examples from rural life</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">Reusable Resources</h4>
              <p className="text-sm text-green-700">Create durable visual aids that can be used across multiple lessons and academic years</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">Student Participation</h4>
              <p className="text-sm text-yellow-700">Involve students in creating visual aids, making learning collaborative and hands-on</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualAidGeneratorPage;

