import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Play, Pause, Square, Upload, Download, BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';

const VoiceAssessment = ({ user }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [formData, setFormData] = useState({
    subject: '',
    grade: '',
    language: '',
    question: ''
  });

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const subjects = ['English', 'Hindi', 'Mathematics', 'Science', 'Social Studies'];
  const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'];
  const languages = ['English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil'];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      toast.success('Recording started');
    } catch (error) {
      toast.error('Could not access microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success('Recording stopped');
    }
  };

  const analyzeAudio = async () => {
    if (!audioBlob || !formData.question) {
      toast.error('Please record audio and provide a question');
      return;
    }

    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockAnalysis = {
        transcription: "The student answered about photosynthesis, explaining that plants make their own food using sunlight, water, and carbon dioxide. They mentioned chlorophyll and the green color of leaves.",
        accuracy: 85,
        keyPoints: [
          "Correctly identified sunlight as energy source",
          "Mentioned water and carbon dioxide as inputs",
          "Understood the role of chlorophyll",
          "Could explain the process in simple terms"
        ],
        improvements: [
          "Could elaborate more on the oxygen production",
          "Practice pronunciation of scientific terms",
          "Add more examples from daily life"
        ],
        feedback: `Great job! You showed good understanding of photosynthesis. Your explanation was clear and you mentioned the key components. Try to include how plants release oxygen as a byproduct. Keep practicing scientific vocabulary in ${formData.language}.`,
        score: "B+",
        suggestions: [
          "Read more about plant biology",
          "Observe plants in your garden",
          "Practice explaining to family members"
        ]
      };

      setAnalysis(mockAnalysis);
      toast.success('Analysis completed!');
    } catch (error) {
      toast.error('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Voice Assessment</h1>
              <p className="text-gray-600">Conduct voice-based evaluations in regional languages</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Assessment Setup */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Assessment Setup</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select name="subject" value={formData.subject} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="">Select Subject</option>
                    {subjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
                  <select name="grade" value={formData.grade} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="">Select Grade</option>
                    {grades.map(grade => <option key={grade} value={grade}>{grade}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select name="language" value={formData.language} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="">Select Language</option>
                    {languages.map(language => <option key={language} value={language}>{language}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                  <textarea name="question" value={formData.question} onChange={handleInputChange} placeholder="Enter the question you asked the student..." className="w-full px-3 py-2 border border-gray-300 rounded-lg h-24 resize-none" />
                </div>

                {/* Recording Controls */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Audio Recording</h3>
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <Button
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`w-20 h-20 rounded-full ${isRecording ? 'bg-red-500 hover:bg-red-600 recording-pulse' : 'bg-orange-500 hover:bg-orange-600'} text-white`}
                      >
                        {isRecording ? <Square className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                      </Button>
                    </div>
                    
                    {isRecording && (
                      <div className="text-center">
                        <div className="text-red-600 font-medium">Recording...</div>
                        <div className="text-sm text-gray-600">Click to stop</div>
                      </div>
                    )}

                    {audioBlob && (
                      <div className="space-y-2">
                        <audio controls className="w-full">
                          <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
                        </audio>
                        <Button onClick={analyzeAudio} disabled={isAnalyzing} className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white">
                          {isAnalyzing ? 'Analyzing...' : 'Analyze Response'}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="lg:col-span-2">
            {!analysis && !isAnalyzing && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mic className="w-12 h-12 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Ready for Voice Assessment</h3>
                <p className="text-gray-600">Set up your assessment details, record student responses, and get instant AI-powered analysis and feedback.</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-6"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Analyzing Response</h3>
                <p className="text-gray-600">Processing speech and evaluating student understanding...</p>
              </div>
            )}

            {analysis && (
              <div className="space-y-6">
                {/* Transcription */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Transcription</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{analysis.transcription}</p>
                </div>

                {/* Score and Accuracy */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">Accuracy Score</h3>
                      <BarChart3 className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-orange-600 mb-2">{analysis.accuracy}%</div>
                      <div className="text-lg font-semibold text-gray-700">Grade: {analysis.score}</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Overall Feedback</h3>
                    <p className="text-gray-700">{analysis.feedback}</p>
                  </div>
                </div>

                {/* Key Points and Improvements */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">✅ Key Points Identified</h3>
                    <ul className="space-y-2">
                      {analysis.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <span className="text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">📈 Areas for Improvement</h3>
                    <ul className="space-y-2">
                      {analysis.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                          <span className="text-gray-700">{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Learning Suggestions</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {analysis.suggestions.map((suggestion, index) => (
                      <div key={index} className="bg-orange-50 p-4 rounded-lg">
                        <p className="text-gray-700">{suggestion}</p>
                      </div>
                    ))}
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

export default VoiceAssessment;

