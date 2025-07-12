import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Loader2, 
  Download, 
  Copy, 
  Share2, 
  Users,
  Target,
  Clock,
  Star
} from 'lucide-react';
import toast from 'react-hot-toast';

const WorksheetGenerator = ({ user }) => {
  const [formData, setFormData] = useState({
    subject: '',
    grade: '',
    language: '',
    topic: '',
    difficulty: 'medium',
    studentLevel: 'mixed',
    questionCount: '5'
  });
  const [generatedWorksheet, setGeneratedWorksheet] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const subjects = [
    'Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 
    'Environmental Studies', 'Art & Craft'
  ];

  const grades = [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'
  ];

  const languages = [
    'English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil',
    'Gujarati', 'Urdu', 'Kannada', 'Odia', 'Malayalam', 'Punjabi'
  ];

  const difficultyLevels = [
    { value: 'easy', label: 'Easy', description: 'Basic concepts and simple problems' },
    { value: 'medium', label: 'Medium', description: 'Moderate difficulty with some challenges' },
    { value: 'hard', label: 'Hard', description: 'Advanced concepts and complex problems' }
  ];

  const studentLevels = [
    { value: 'beginner', label: 'Beginner', description: 'Students new to the topic' },
    { value: 'intermediate', label: 'Intermediate', description: 'Students with some knowledge' },
    { value: 'advanced', label: 'Advanced', description: 'Students with good understanding' },
    { value: 'mixed', label: 'Mixed Levels', description: 'Multi-grade classroom with varying abilities' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateWorksheet = async () => {
    if (!formData.subject || !formData.grade || !formData.language || !formData.topic) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockWorksheet = `# WORKSHEET: ${formData.topic}
## Subject: ${formData.subject} | Grade: ${formData.grade} | Language: ${formData.language}

**Student Name:** _________________________ **Date:** _____________

**Instructions:** Read each question carefully and write your answers in the space provided. Show your work where applicable.

---

### SECTION A: Multiple Choice Questions (Choose the correct answer)

**Question 1:** What is the main concept related to ${formData.topic}?
a) Option A
b) Option B  
c) Option C
d) Option D

**Question 2:** Which of the following best describes ${formData.topic}?
a) First choice
b) Second choice
c) Third choice
d) Fourth choice

### SECTION B: Short Answer Questions

**Question 3:** Explain ${formData.topic} in your own words. (3 marks)
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

**Question 4:** Give two examples of ${formData.topic} from your daily life. (2 marks)
1. ____________________________________________________________
2. ____________________________________________________________

### SECTION C: Problem Solving

**Question 5:** Solve the following problem related to ${formData.topic}: (5 marks)
[Problem statement would be generated based on subject and topic]

**Work Space:**
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

**Answer:** ____________________________________________________

### SECTION D: Creative Activity

**Question 6:** Draw or describe how ${formData.topic} is used in your community. (3 marks)

[Drawing Space]




**Description:**
_________________________________________________________________
_________________________________________________________________

### SECTION E: Reflection

**Question 7:** What did you find most interesting about ${formData.topic}? Why? (2 marks)
_________________________________________________________________
_________________________________________________________________

---

### ASSESSMENT RUBRIC FOR TEACHERS:

**Excellent (4 points):**
- Complete understanding of ${formData.topic}
- Clear and accurate explanations
- Creative and relevant examples
- Neat presentation

**Good (3 points):**
- Good understanding with minor gaps
- Mostly accurate explanations
- Appropriate examples
- Well-organized work

**Satisfactory (2 points):**
- Basic understanding
- Some correct explanations
- Simple examples
- Adequate presentation

**Needs Improvement (1 point):**
- Limited understanding
- Unclear explanations
- Inappropriate examples
- Poor presentation

### ANSWER KEY:
1. c) Option C
2. b) Second choice
3. [Sample answer provided for teacher reference]
4. [Sample examples provided]
5. [Step-by-step solution provided]
6. [Sample creative response]
7. [Sample reflection answer]

### EXTENSION ACTIVITIES:
- Research more about ${formData.topic} using local resources
- Interview community members about their experience with ${formData.topic}
- Create a simple project demonstrating ${formData.topic}

### DIFFERENTIATION NOTES:
**For Advanced Students:** Add bonus questions or research tasks
**For Struggling Students:** Provide additional hints or reduce question complexity
**For Multi-Grade:** Adapt questions based on individual student levels

---
*Generated by Sahayak AI Teaching Assistant*
*Difficulty Level: ${formData.difficulty} | Student Level: ${formData.studentLevel}*`;

      setGeneratedWorksheet(mockWorksheet);
      toast.success('Worksheet generated successfully!');
    } catch (error) {
      toast.error('Failed to generate worksheet. Please try again.');
      console.error('Worksheet generation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedWorksheet);
    toast.success('Worksheet copied to clipboard!');
  };

  const downloadWorksheet = () => {
    const blob = new Blob([generatedWorksheet], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.topic}_Worksheet_${formData.grade}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Worksheet downloaded!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Worksheet Generator</h1>
              <p className="text-gray-600">Create personalized worksheets for your students</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Worksheet Details</h2>
              
              <div className="space-y-6">
                {/* Subject */}
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

                {/* Grade */}
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

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language *
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Language</option>
                    {languages.map(language => (
                      <option key={language} value={language}>{language}</option>
                    ))}
                  </select>
                </div>

                {/* Topic */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic *
                  </label>
                  <input
                    type="text"
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    placeholder="e.g., Addition, Photosynthesis, Grammar"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Difficulty Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <div className="space-y-2">
                    {difficultyLevels.map(level => (
                      <label key={level.value} className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="difficulty"
                          value={level.value}
                          checked={formData.difficulty === level.value}
                          onChange={handleInputChange}
                          className="mt-1 text-green-600 focus:ring-green-500"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{level.label}</div>
                          <div className="text-sm text-gray-600">{level.description}</div>
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
                  <select
                    name="studentLevel"
                    value={formData.studentLevel}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {studentLevels.map(level => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={generateWorksheet}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Generate Worksheet
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Worksheet Display Section */}
          <div className="lg:col-span-2">
            {!generatedWorksheet && !isLoading && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Create Worksheets</h3>
                <p className="text-gray-600 mb-6">
                  Configure your worksheet settings and generate personalized learning materials 
                  that adapt to your students' needs and abilities.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Target className="w-4 h-4" />
                    <span>Personalized</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Multi-Level</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Star className="w-4 h-4" />
                    <span>Assessment</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Quick</span>
                  </div>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-6"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Creating Your Worksheet</h3>
                <p className="text-gray-600">
                  Generating personalized questions and activities for your students...
                </p>
              </div>
            )}

            {generatedWorksheet && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                {/* Worksheet Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">Generated Worksheet</h3>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                        className="flex items-center space-x-1"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadWorksheet}
                        className="flex items-center space-x-1"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Worksheet Body */}
                <div className="p-6">
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                      {generatedWorksheet}
                    </pre>
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

export default WorksheetGenerator;

