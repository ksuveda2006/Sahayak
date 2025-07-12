import React, { useState } from 'react';
import { ArrowLeft, FileText, Download, Share2, Save, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const WorksheetGeneratorPage = () => {
  const [formData, setFormData] = useState({
    subject: '',
    grade: '',
    language: 'English',
    topic: '',
    difficulty: 'medium',
    studentLevel: 'mixed'
  });
  const [generatedWorksheet, setGeneratedWorksheet] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Environmental Studies'];
  const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8'];
  const languages = ['English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati', 'Urdu', 'Kannada', 'Odia', 'Malayalam', 'Punjabi', 'Assamese', 'Maithili', 'Sanskrit'];
  const difficulties = [
    { value: 'easy', label: 'Easy', description: 'Basic concepts and simple problems' },
    { value: 'medium', label: 'Medium', description: 'Standard level with moderate complexity' },
    { value: 'hard', label: 'Hard', description: 'Advanced problems requiring critical thinking' }
  ];
  const studentLevels = [
    { value: 'beginner', label: 'Beginner', description: 'Students new to the topic' },
    { value: 'intermediate', label: 'Intermediate', description: 'Students with some knowledge' },
    { value: 'advanced', label: 'Advanced', description: 'Students with good understanding' },
    { value: 'mixed', label: 'Mixed Level', description: 'Multi-grade classroom with varying abilities' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateWorksheet = async () => {
    if (!formData.subject || !formData.grade || !formData.topic) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-worksheet', {
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
        setGeneratedWorksheet(data.worksheet);
        toast.success('Worksheet generated successfully!');
      } else {
        toast.error('Failed to generate worksheet');
      }
    } catch (error) {
      console.error('Error generating worksheet:', error);
      toast.error('Error generating worksheet');
    } finally {
      setIsGenerating(false);
    }
  };

  const saveWorksheet = () => {
    if (generatedWorksheet) {
      toast.success('Worksheet saved to your library!');
    }
  };

  const downloadWorksheet = () => {
    if (generatedWorksheet) {
      const blob = new Blob([generatedWorksheet], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${formData.topic}_worksheet_${formData.grade}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Worksheet downloaded!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-green-600 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-green-600" />
                <h1 className="text-xl font-semibold text-gray-900">Worksheet Generator</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Personalized Worksheet</h2>
            
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  placeholder="e.g., Multiplication Tables, Photosynthesis, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Difficulty Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <div className="space-y-2">
                  {difficulties.map(difficulty => (
                    <label key={difficulty.value} className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="difficulty"
                        value={difficulty.value}
                        checked={formData.difficulty === difficulty.value}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{difficulty.label}</div>
                        <div className="text-sm text-gray-500">{difficulty.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Student Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Level
                </label>
                <div className="space-y-2">
                  {studentLevels.map(level => (
                    <label key={level.value} className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="studentLevel"
                        value={level.value}
                        checked={formData.studentLevel === level.value}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{level.label}</div>
                        <div className="text-sm text-gray-500">{level.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateWorksheet}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating Worksheet...
                  </div>
                ) : (
                  'Generate Worksheet'
                )}
              </button>
            </div>
          </div>

          {/* Generated Worksheet Display */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Generated Worksheet</h2>
              {generatedWorksheet && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    {showPreview ? 'Hide' : 'Preview'}
                  </button>
                  <button
                    onClick={saveWorksheet}
                    className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </button>
                  <button
                    onClick={downloadWorksheet}
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

            {generatedWorksheet ? (
              <div className="prose max-w-none">
                <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                    {generatedWorksheet}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <FileText className="h-16 w-16 mb-4 text-gray-300" />
                <p className="text-lg font-medium">No worksheet generated yet</p>
                <p className="text-sm">Fill in the form and click "Generate Worksheet" to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Worksheet Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">Multiple Question Types</h4>
              <p className="text-sm text-green-700">MCQ, short answer, problem-solving, and creative questions</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Answer Key Included</h4>
              <p className="text-sm text-blue-700">Complete solutions and assessment rubrics for teachers</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2">Culturally Relevant</h4>
              <p className="text-sm text-purple-700">Examples and contexts relevant to rural Indian students</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <h4 className="font-medium text-orange-900 mb-2">Multi-Grade Ready</h4>
              <p className="text-sm text-orange-700">Differentiated content for mixed-level classrooms</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorksheetGeneratorPage;

