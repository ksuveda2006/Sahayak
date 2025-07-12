import React, { useState, useRef } from 'react';
import { ArrowLeft, Video, Play, Pause, Square, Download, Save, Upload, Mic, MicOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const VideoCreatorPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedContent, setProcessedContent] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [showLanguageSelection, setShowLanguageSelection] = useState(true);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'ur', name: 'Urdu', native: 'اردو' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
    { code: 'mai', name: 'Maithili', native: 'मैथिली' },
    { code: 'sa', name: 'Sanskrit', native: 'संस्कृत' }
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setShowLanguageSelection(false);
    toast.success(`Language selected: ${language.native}`);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setRecordedVideo(blob);
        setVideoUrl(URL.createObjectURL(blob));
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
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
      toast.error('Could not start recording. Please check camera and microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      toast.success('Recording stopped');
    }
  };

  const processVideo = async () => {
    if (!recordedVideo || !selectedLanguage) {
      toast.error('Please record a video and select a language');
      return;
    }

    setIsProcessing(true);
    try {
      // Convert blob to base64 for API
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Video = reader.result.split(',')[1];
        
        const response = await fetch('/api/process-video', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            language: selectedLanguage.name,
            videoData: base64Video,
            userId: 'demo-user'
          }),
        });

        const data = await response.json();
        
        if (data.success) {
          setProcessedContent(data.processedContent);
          toast.success('Video processed successfully!');
        } else {
          toast.error('Failed to process video');
        }
      };
      reader.readAsDataURL(recordedVideo);
    } catch (error) {
      console.error('Error processing video:', error);
      toast.error('Error processing video');
    } finally {
      setIsProcessing(false);
    }
  };

  const saveVideo = () => {
    if (processedContent) {
      toast.success('Video content saved to your library!');
    }
  };

  const downloadVideo = () => {
    if (recordedVideo) {
      const url = URL.createObjectURL(recordedVideo);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sahayak_video_${selectedLanguage?.code || 'unknown'}_${Date.now()}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Video downloaded!');
    }
  };

  const downloadContent = () => {
    if (processedContent) {
      const blob = new Blob([processedContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `video_content_${selectedLanguage?.code || 'unknown'}_${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Content downloaded!');
    }
  };

  const resetSession = () => {
    setSelectedLanguage('');
    setIsRecording(false);
    setRecordedVideo(null);
    setVideoUrl('');
    setProcessedContent('');
    setRecordingTime(0);
    setShowLanguageSelection(true);
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    toast.success('Session reset');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-pink-600 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <Video className="h-6 w-6 text-pink-600" />
                <h1 className="text-xl font-semibold text-gray-900">Video Creator</h1>
              </div>
            </div>
            {selectedLanguage && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Language:</span>
                <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">
                  {selectedLanguage.native}
                </span>
                <button
                  onClick={resetSession}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Change
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Language Selection */}
        {showLanguageSelection && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Your Language</h2>
              <p className="text-lg text-gray-600">Choose the language you'll be speaking in your educational video</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => selectLanguage(language)}
                  className="p-4 border-2 border-gray-200 rounded-xl hover:border-pink-500 hover:bg-pink-50 transition-all duration-200 group"
                >
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                      {language.name}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {language.native}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Video Recording Interface */}
        {!showLanguageSelection && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recording Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Record Educational Video</h2>
              
              {/* Video Preview/Playback */}
              <div className="mb-6">
                <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  {videoUrl ? (
                    <video
                      controls
                      className="w-full h-full object-cover"
                      src={videoUrl}
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full h-full object-cover"
                    />
                  )}
                  
                  {!videoUrl && !isRecording && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Camera preview will appear here</p>
                      </div>
                    </div>
                  )}
                  
                  {isRecording && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">REC {formatTime(recordingTime)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Recording Controls */}
              <div className="text-center space-y-4">
                {!videoUrl ? (
                  <div className="flex justify-center space-x-4">
                    {!isRecording ? (
                      <button
                        onClick={startRecording}
                        className="flex items-center justify-center w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                      >
                        <Video className="h-8 w-8" />
                      </button>
                    ) : (
                      <button
                        onClick={stopRecording}
                        className="flex items-center justify-center w-16 h-16 bg-gray-500 hover:bg-gray-600 text-white rounded-full transition-colors"
                      >
                        <Square className="h-8 w-8" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => {
                        setRecordedVideo(null);
                        setVideoUrl('');
                        setProcessedContent('');
                      }}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Record Again
                    </button>
                    <button
                      onClick={downloadVideo}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Video
                    </button>
                  </div>
                )}

                <p className="text-sm text-gray-600">
                  {isRecording 
                    ? 'Recording... Click the square to stop' 
                    : videoUrl 
                    ? 'Video recorded successfully!' 
                    : 'Click the red button to start recording'
                  }
                </p>

                {/* Process Video Button */}
                {videoUrl && (
                  <button
                    onClick={processVideo}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing Video...
                      </div>
                    ) : (
                      'Process Video Content'
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Processed Content */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Processed Content</h2>
                {processedContent && (
                  <div className="flex space-x-2">
                    <button
                      onClick={saveVideo}
                      className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </button>
                    <button
                      onClick={downloadContent}
                      className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                  </div>
                )}
              </div>

              {processedContent ? (
                <div className="prose max-w-none">
                  <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                      {processedContent}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <Video className="h-16 w-16 mb-4 text-gray-300" />
                  <p className="text-lg font-medium">No content processed yet</p>
                  <p className="text-sm">Record a video and click "Process Video Content" to get started</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Instructions */}
        {!showLanguageSelection && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Create Educational Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-pink-50 rounded-lg p-4">
                <h4 className="font-medium text-pink-900 mb-2">1. Select Language</h4>
                <p className="text-sm text-pink-700">Choose the language you'll be speaking in your video for accurate processing</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-2">2. Record Video</h4>
                <p className="text-sm text-purple-700">Click the record button and create your educational content</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">3. Process Content</h4>
                <p className="text-sm text-blue-700">AI will analyze your video and extract key educational insights</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">4. Save & Share</h4>
                <p className="text-sm text-green-700">Download your video and processed content for classroom use</p>
              </div>
            </div>
          </div>
        )}

        {/* Tips for Better Videos */}
        {!showLanguageSelection && (
          <div className="mt-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Tips for Better Educational Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium mb-2">Clear Audio</h4>
                <p className="text-sm text-pink-100">Speak clearly and ensure good audio quality for accurate processing</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Good Lighting</h4>
                <p className="text-sm text-pink-100">Record in well-lit conditions for better video quality</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Structured Content</h4>
                <p className="text-sm text-pink-100">Organize your content with clear introduction, main points, and conclusion</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCreatorPage;

