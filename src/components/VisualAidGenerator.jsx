import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Image, Loader2, Download, Copy, Share2, Palette, Lightbulb, Wrench } from 'lucide-react';
import toast from 'react-hot-toast';

const VisualAidGenerator = ({ user }) => {
  const [formData, setFormData] = useState({
    subject: '',
    grade: '',
    language: '',
    topic: '',
    aidType: 'poster'
  });
  const [generatedAid, setGeneratedAid] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Environmental Studies'];
  const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8'];
  const languages = ['English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati'];

  const aidTypes = [
    { value: 'poster', label: 'Educational Poster', icon: Image },
    { value: 'chart', label: 'Learning Chart', icon: Palette },
    { value: 'model', label: '3D Model Guide', icon: Wrench },
    { value: 'flashcard', label: 'Flash Cards', icon: Lightbulb }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateVisualAid = async () => {
    if (!formData.subject || !formData.grade || !formData.topic) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockAid = `# VISUAL AID: ${formData.aidType.toUpperCase()} - ${formData.topic}

## Subject: ${formData.subject} | Grade: ${formData.grade} | Language: ${formData.language}

### VISUAL DESCRIPTION:
Create a colorful and engaging ${formData.aidType} about ${formData.topic} with the following elements:

**Main Title:** "${formData.topic}" (Large, bold letters at the top)
**Color Scheme:** Bright, child-friendly colors (blue, green, yellow, red)
**Layout:** Divided into 4 main sections

**Section 1: Introduction**
- Simple definition of ${formData.topic}
- Use large, clear fonts
- Include a welcoming character or mascot

**Section 2: Key Concepts**
- 3-4 main points about ${formData.topic}
- Use bullet points or numbered lists
- Add simple illustrations for each point

**Section 3: Examples**
- Real-life examples from rural/local context
- Pictures or drawings of familiar objects
- Connect to students' daily experiences

**Section 4: Fun Facts**
- 2-3 interesting facts about ${formData.topic}
- Use colorful boxes or speech bubbles
- Make it memorable and engaging

### MATERIALS NEEDED (Low-Cost):
- Chart paper or large cardboard (from packaging)
- Colored pencils, crayons, or markers
- Old magazines for cutting pictures
- Glue or paste
- Ruler for straight lines
- Black marker for outlines

### STEP-BY-STEP CREATION GUIDE:

**Step 1: Prepare the Base (15 minutes)**
1. Take a large chart paper or flatten a cardboard box
2. Clean the surface and ensure it's smooth
3. Use a ruler to lightly mark the 4 sections
4. Write the main title at the top in large letters

**Step 2: Create Section 1 - Introduction (20 minutes)**
1. Write a simple definition in ${formData.language}
2. Draw or paste a relevant picture
3. Use bright colors to make it attractive
4. Add decorative borders

**Step 3: Develop Section 2 - Key Concepts (25 minutes)**
1. List the main concepts clearly
2. Draw simple illustrations for each concept
3. Use different colors for each point
4. Make sure text is large enough to read from distance

**Step 4: Add Section 3 - Examples (20 minutes)**
1. Include local examples students can relate to
2. Draw or cut pictures from magazines
3. Write short descriptions under each example
4. Use arrows to connect related ideas

**Step 5: Complete Section 4 - Fun Facts (15 minutes)**
1. Add interesting facts in colorful boxes
2. Use speech bubbles or star shapes
3. Include surprising information
4. Make it visually appealing

**Step 6: Final Touches (10 minutes)**
1. Add borders and decorative elements
2. Check all text is readable
3. Ensure colors are bright and attractive
4. Add your name as the creator

### CLASSROOM USAGE INSTRUCTIONS:

**Before the Lesson:**
- Display the visual aid prominently where all students can see
- Prepare questions related to each section
- Have students sit in a semicircle for better viewing

**During the Lesson:**
1. Start by asking students what they see
2. Go through each section systematically
3. Encourage students to ask questions
4. Point to specific parts while explaining
5. Ask students to identify examples from their own experience

**Interactive Activities:**
- Have students come up and point to different parts
- Ask them to explain sections in their own words
- Create games based on the visual aid content
- Encourage students to suggest additional examples

**After the Lesson:**
- Keep the visual aid displayed for reference
- Use it for quick reviews
- Let students create their own smaller versions
- Use it as a starting point for related topics

### ASSESSMENT OPPORTUNITIES:

**Observation Points:**
- Can students identify key concepts?
- Do they understand the examples?
- Can they explain the topic using the visual aid?
- Are they engaged and asking questions?

**Follow-up Activities:**
- Students draw their own version
- Create a class book about ${formData.topic}
- Have students teach younger students using the aid
- Connect to other subjects and topics

### STORAGE AND MAINTENANCE:
- Laminate with clear plastic if possible
- Store flat to prevent creasing
- Create a folder system for different subjects
- Involve students in caring for classroom materials

### EXTENSION IDEAS:
- Create a series of related visual aids
- Make smaller versions for student notebooks
- Develop interactive elements (flaps, wheels)
- Connect to digital resources when available

### CULTURAL ADAPTATION:
- Include local festivals and traditions
- Use regional examples and contexts
- Incorporate community knowledge
- Respect local customs and values

---
*Generated by Sahayak AI Teaching Assistant*
*Designed for low-resource rural classrooms*`;

      setGeneratedAid(mockAid);
      toast.success('Visual aid guide generated successfully!');
    } catch (error) {
      toast.error('Failed to generate visual aid. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Image className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Visual Aid Generator</h1>
              <p className="text-gray-600">Create engaging visual materials with low-cost resources</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Visual Aid Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <select name="subject" value={formData.subject} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                    <option value="">Select Subject</option>
                    {subjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grade *</label>
                  <select name="grade" value={formData.grade} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                    <option value="">Select Grade</option>
                    {grades.map(grade => <option key={grade} value={grade}>{grade}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language *</label>
                  <select name="language" value={formData.language} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                    <option value="">Select Language</option>
                    {languages.map(language => <option key={language} value={language}>{language}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Topic *</label>
                  <input type="text" name="topic" value={formData.topic} onChange={handleInputChange} placeholder="e.g., Solar System, Fractions" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Visual Aid Type</label>
                  <div className="space-y-3">
                    {aidTypes.map(type => (
                      <label key={type.value} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                        <input type="radio" name="aidType" value={type.value} checked={formData.aidType === type.value} onChange={handleInputChange} className="text-purple-600" />
                        <type.icon className="w-5 h-5 text-purple-600" />
                        <span className="font-medium">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button onClick={generateVisualAid} disabled={isLoading} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3">
                  {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generating...</> : <><Image className="w-4 h-4 mr-2" />Generate Visual Aid</>}
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {!generatedAid && !isLoading && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Image className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Create Visual Learning Materials</h3>
                <p className="text-gray-600">Generate step-by-step guides for creating engaging visual aids using low-cost, locally available materials.</p>
              </div>
            )}

            {isLoading && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-6"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Creating Your Visual Aid Guide</h3>
                <p className="text-gray-600">Designing instructions for engaging visual materials...</p>
              </div>
            )}

            {generatedAid && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">Visual Aid Creation Guide</h3>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(generatedAid)}><Copy className="w-4 h-4" /><span>Copy</span></Button>
                      <Button variant="outline" size="sm"><Download className="w-4 h-4" /><span>Download</span></Button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">{generatedAid}</pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualAidGenerator;

