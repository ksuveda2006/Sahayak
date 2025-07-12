import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Image, Upload, Loader2, Eye, BookOpen, Lightbulb } from 'lucide-react';
import toast from 'react-hot-toast';

const ImageAnalyzer = ({ user }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [formData, setFormData] = useState({
    subject: '',
    grade: '',
    language: ''
  });

  const subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Environmental Studies', 'Art & Craft'];
  const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8'];
  const languages = ['English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati'];

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      toast.success('Image uploaded successfully!');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp']
    },
    maxFiles: 1
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const analyzeImage = async () => {
    if (!selectedImage || !formData.subject || !formData.grade) {
      toast.error('Please upload an image and fill required fields');
      return;
    }

    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockAnalysis = {
        description: "This image shows a butterfly on a flower, demonstrating pollination in nature. The butterfly has colorful wings with patterns, and the flower appears to be a daisy or similar species.",
        educationalConcepts: [
          "Pollination process",
          "Insect-plant relationships",
          "Life cycles of butterflies",
          "Ecosystem interactions",
          "Colors and patterns in nature"
        ],
        lessonPlan: {
          title: "Understanding Pollination Through Nature",
          objectives: [
            "Students will understand the pollination process",
            "Students will identify the role of insects in plant reproduction",
            "Students will observe nature patterns and relationships"
          ],
          activities: [
            "Observe the image and identify different parts",
            "Discuss how butterflies help plants",
            "Draw their own butterfly-flower interaction",
            "Go on a nature walk to find similar examples",
            "Create a simple food chain including butterflies"
          ]
        },
        discussionQuestions: [
          "What do you see in this picture?",
          "Why do you think the butterfly is on the flower?",
          "What might happen if there were no butterflies?",
          "Can you find butterflies in your area?",
          "How do flowers attract butterflies?"
        ],
        crossCurricular: [
          {
            subject: "Art",
            activity: "Draw and color different types of butterflies"
          },
          {
            subject: "Mathematics",
            activity: "Count butterfly wing patterns and flower petals"
          },
          {
            subject: "Language",
            activity: "Write a story about a butterfly's journey"
          }
        ],
        assessmentIdeas: [
          "Ask students to explain pollination in their own words",
          "Have them identify butterfly parts",
          "Check understanding through drawing activities",
          "Observe participation in nature walk",
          "Listen to their stories about butterflies"
        ],
        culturalConnections: [
          "Local festivals celebrating nature",
          "Traditional stories about butterflies",
          "Regional flowers and their pollinators",
          "Community gardens and farming practices"
        ]
      };

      setAnalysis(mockAnalysis);
      toast.success('Image analysis completed!');
    } catch (error) {
      toast.error('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Image Analyzer</h1>
              <p className="text-gray-600">Analyze images for educational content and lesson ideas</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload and Settings */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Image Upload & Settings</h2>
              
              {/* Image Upload */}
              <div className="mb-6">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                    isDragActive ? 'border-cyan-500 bg-cyan-50' : 'border-gray-300 hover:border-cyan-400'
                  }`}
                >
                  <input {...getInputProps()} />
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                      <p className="text-sm text-gray-600">Click or drag to replace image</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-gray-600">Drop an image here, or click to select</p>
                        <p className="text-sm text-gray-500">Supports JPG, PNG, GIF</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Settings */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select name="subject" value={formData.subject} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500">
                    <option value="">Select Subject</option>
                    {subjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level</label>
                  <select name="grade" value={formData.grade} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500">
                    <option value="">Select Grade</option>
                    {grades.map(grade => <option key={grade} value={grade}>{grade}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select name="language" value={formData.language} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500">
                    <option value="">Select Language</option>
                    {languages.map(language => <option key={language} value={language}>{language}</option>)}
                  </select>
                </div>

                <Button onClick={analyzeImage} disabled={isAnalyzing || !selectedImage} className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-3">
                  {isAnalyzing ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Analyzing...</> : <><Eye className="w-4 h-4 mr-2" />Analyze Image</>}
                </Button>
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="lg:col-span-2">
            {!analysis && !isAnalyzing && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Image className="w-12 h-12 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Analyze Images</h3>
                <p className="text-gray-600">Upload an image and let AI identify educational opportunities, suggest lesson plans, and create engaging activities.</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin mx-auto mb-6"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Analyzing Image</h3>
                <p className="text-gray-600">Identifying educational concepts and generating lesson ideas...</p>
              </div>
            )}

            {analysis && (
              <div className="space-y-6">
                {/* Image Description */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">📸 Image Description</h3>
                  <p className="text-gray-700">{analysis.description}</p>
                </div>

                {/* Educational Concepts */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">🎓 Educational Concepts</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {analysis.educationalConcepts.map((concept, index) => (
                      <div key={index} className="bg-cyan-50 px-3 py-2 rounded-lg text-sm font-medium text-cyan-800">
                        {concept}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lesson Plan */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-2 mb-4">
                    <BookOpen className="w-6 h-6 text-cyan-600" />
                    <h3 className="text-lg font-bold text-gray-900">Suggested Lesson Plan</h3>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-3">{analysis.lessonPlan.title}</h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Learning Objectives:</h5>
                      <ul className="space-y-1">
                        {analysis.lessonPlan.objectives.map((obj, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2"></div>
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Activities:</h5>
                      <ul className="space-y-1">
                        {analysis.lessonPlan.activities.map((activity, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Discussion Questions */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">💬 Discussion Questions</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {analysis.discussionQuestions.map((question, index) => (
                      <div key={index} className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-gray-700">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cross-Curricular Connections */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-2 mb-4">
                    <Lightbulb className="w-6 h-6 text-cyan-600" />
                    <h3 className="text-lg font-bold text-gray-900">Cross-Curricular Connections</h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    {analysis.crossCurricular.map((connection, index) => (
                      <div key={index} className="border border-gray-200 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">{connection.subject}</h4>
                        <p className="text-sm text-gray-700">{connection.activity}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assessment and Cultural Connections */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Assessment Ideas</h3>
                    <ul className="space-y-2">
                      {analysis.assessmentIdeas.map((idea, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                          <span>{idea}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">🌍 Cultural Connections</h3>
                    <ul className="space-y-2">
                      {analysis.culturalConnections.map((connection, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                          <span>{connection}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageAnalyzer;

