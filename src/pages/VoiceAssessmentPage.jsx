import React, { useState, useRef } from 'react';
import { ArrowLeft, Mic, MicOff, Play, Pause, Square, Download, Save, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const VoiceAssessmentPage = () => {
  const [formData, setFormData] = useState({
    subject: '',
    grade: '',
    language: 'English',
    question: ''
  });
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  const subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Environmental Studies'];
  const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8'];
  const languages = ['English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati', 'Urdu', 'Kannada', 'Odia', 'Malayalam', 'Punjabi', 'Assamese', 'Maithili', 'Sanskrit'];

  const sampleQuestions = {
    'Mathematics': [
      'Explain how you would solve 15 + 27',
      'What is multiplication and give an example',
      'Describe the difference between odd and even numbers',
      'How do you find the area of a rectangle?'
    ],
    'Science': [
      'Explain the water cycle in your own words',
      'What happens to plants without sunlight?',
      'Describe how we breathe',
      'Why do objects fall down when dropped?'
    ],
    'English': [
      'Tell me about your favorite story',
      'Describe your daily routine',
      'What did you learn in school today?',
      'Explain the difference between nouns and verbs'
    ],
    'Hindi': [
      'अपने परिवार के बारे में बताइए',
      'आपका पसंदीदा त्योहार कौन सा है और क्यों?',
      'स्कूल में आपको क्या अच्छा लगता है?',
      'प्रकृति के बारे में कुछ बताइए'
    ]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const selectSampleQuestion = (question) => {
    setFormData(prev => ({
      ...prev,
      question: question
    }));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      toast.success('Recording started');
    } catch (error) {
      console.error('Error starting recording:', error);
      toast.error('Could not start recording. Please check microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
      toast.success('Recording stopped');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const analyzeRecording = async () => {
    if (!audioBlob || !formData.question) {
      toast.error('Please record audio and enter a question');
      return;
    }

    setIsAnalyzing(true);
    try {
      // Convert blob to base64 for API
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = reader.result.split(',')[1];
        
        const response = await fetch('/api/process-voice-assessment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subject: formData.subject,
            grade: formData.grade,
            language: formData.language,
            question: formData.question,
            audioData: base64Audio,
            userId: 'demo-user'
          }),
        });

        const data = await response.json();
        
        if (data.success) {
          setAnalysis(data.analysis);
          toast.success('Voice assessment completed!');
        } else {
          toast.error('Failed to analyze recording');
        }
      };
      reader.readAsDataURL(audioBlob);
    } catch (error) {
      console.error('Error analyzing recording:', error);
      toast.error('Error analyzing recording');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const saveAssessment = () => {
    if (analysis) {
      toast.success('Assessment saved to your records!');
    }
  };

  const downloadReport = () => {
    if (analysis) {
      const report = `Voice Assessment Report
      
Subject: ${formData.subject}
Grade: ${formData.grade}
Language: ${formData.language}
Question: ${formData.question}

ANALYSIS RESULTS:
================

Transcription: ${analysis.transcription}

Scores:
- Overall Accuracy: ${analysis.accuracy}%
- Fluency Score: ${analysis.fluency_score}%
- Pronunciation Score: ${analysis.pronunciation_score}%
- Content Score: ${analysis.content_score}%
- Grade: ${analysis.grade}

Key Points:
${analysis.keyPoints.map(point => `- ${point}`).join('\n')}

Areas for Improvement:
${analysis.improvements.map(improvement => `- ${improvement}`).join('\n')}

Teacher Feedback:
${analysis.feedback}

Suggestions for Next Steps:
${analysis.suggestions.map(suggestion => `- ${suggestion}`).join('\n')}

Generated by Sahayak AI Teaching Assistant
`;

      const blob = new Blob([report], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `voice_assessment_${formData.subject}_${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Report downloaded!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <Volume2 className="h-6 w-6 text-purple-600" />
                <h1 className="text-xl font-semibold text-gray-900">Voice Assessment</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Setup and Recording */}
          <div className="space-y-6">
            {/* Assessment Setup */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Assessment Setup</h2>
              
              <div className="space-y-4">
                {/* Subject Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    Grade Level
                  </label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {languages.map(language => (
                      <option key={language} value={language}>{language}</option>
                    ))}
                  </select>
                </div>

                {/* Question Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assessment Question
                  </label>
                  <textarea
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    placeholder="Enter the question you want to ask the student..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Sample Questions */}
                {formData.subject && sampleQuestions[formData.subject] && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sample Questions for {formData.subject}
                    </label>
                    <div className="space-y-2">
                      {sampleQuestions[formData.subject].map((question, index) => (
                        <button
                          key={index}
                          onClick={() => selectSampleQuestion(question)}
                          className="w-full text-left p-3 bg-gray-50 hover:bg-purple-50 rounded-lg text-sm transition-colors"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recording Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Voice Recording</h3>
              
              <div className="text-center space-y-4">
                {/* Recording Timer */}
                {(isRecording || audioUrl) && (
                  <div className="text-2xl font-mono text-purple-600">
                    {formatTime(recordingTime)}
                  </div>
                )}

                {/* Recording Button */}
                <div className="flex justify-center">
                  {!isRecording ? (
                    <button
                      onClick={startRecording}
                      className="flex items-center justify-center w-20 h-20 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                    >
                      <Mic className="h-8 w-8" />
                    </button>
                  ) : (
                    <button
                      onClick={stopRecording}
                      className="flex items-center justify-center w-20 h-20 bg-gray-500 hover:bg-gray-600 text-white rounded-full transition-colors"
                    >
                      <Square className="h-8 w-8" />
                    </button>
                  )}
                </div>

                <p className="text-sm text-gray-600">
                  {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
                </p>

                {/* Audio Playback */}
                {audioUrl && (
                  <div className="mt-4">
                    <audio ref={audioRef} controls className="w-full">
                      <source src={audioUrl} type="audio/wav" />
                      Your browser does not support audio playback.
                    </audio>
                  </div>
                )}

                {/* Analyze Button */}
                {audioUrl && formData.question && (
                  <button
                    onClick={analyzeRecording}
                    disabled={isAnalyzing}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Analyzing Recording...
                      </div>
                    ) : (
                      'Analyze Recording'
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Assessment Results</h2>
              {analysis && (
                <div className="flex space-x-2">
                  <button
                    onClick={saveAssessment}
                    className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </button>
                  <button
                    onClick={downloadReport}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Report
                  </button>
                </div>
              )}
            </div>

            {analysis ? (
              <div className="space-y-6">
                {/* Scores */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">{analysis.accuracy}%</div>
                    <div className="text-sm text-blue-700">Overall Accuracy</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">{analysis.grade}</div>
                    <div className="text-sm text-green-700">Grade</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-600">{analysis.fluency_score}%</div>
                    <div className="text-sm text-purple-700">Fluency</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-orange-600">{analysis.content_score}%</div>
                    <div className="text-sm text-orange-700">Content</div>
                  </div>
                </div>

                {/* Transcription */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Transcription</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-800">{analysis.transcription}</p>
                  </div>
                </div>

                {/* Feedback */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Teacher Feedback</h4>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-blue-800">{analysis.feedback}</p>
                  </div>
                </div>

                {/* Key Points */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Strengths</h4>
                  <ul className="space-y-1">
                    {analysis.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improvements */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Areas for Improvement</h4>
                  <ul className="space-y-1">
                    {analysis.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-500 mr-2">→</span>
                        <span className="text-gray-700">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next Steps */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Next Steps</h4>
                  <ul className="space-y-1">
                    {analysis.next_steps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <Volume2 className="h-16 w-16 mb-4 text-gray-300" />
                <p className="text-lg font-medium">No assessment results yet</p>
                <p className="text-sm">Record audio and click "Analyze Recording" to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Use Voice Assessment</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2">1. Setup</h4>
              <p className="text-sm text-purple-700">Choose subject, grade, language, and enter your assessment question</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">2. Record</h4>
              <p className="text-sm text-blue-700">Click the microphone button and have the student answer the question</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">3. Analyze</h4>
              <p className="text-sm text-green-700">Get instant feedback on pronunciation, fluency, content, and suggestions for improvement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssessmentPage;

